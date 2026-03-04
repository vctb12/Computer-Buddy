import { NextRequest } from 'next/server';
import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { RunnableSequence } from '@langchain/core/runnables';
import { PromptTemplate } from '@langchain/core/prompts';
import { formatDocumentsAsString } from 'langchain/util/document';

// Optional: Load environment variables
const openAIApiKey = process.env.OPENAI_API_KEY;

export async function POST(req: NextRequest) {
  if (!openAIApiKey) {
    return new Response('Missing OpenAI API key', { status: 500 });
  }

  try {
    const { messages } = await req.json();

    // Initialize the OpenAI model
    const model = new ChatOpenAI({
      modelName: 'gpt-4-turbo',
      temperature: 0.7,
      openAIApiKey,
    });

    // Define the prompt template
    const prompt = PromptTemplate.fromTemplate(
      `You are Computer Buddy AI, a helpful assistant for Computer Buddy gaming store. 
      Use the following context to answer the user's question:
      
      {context}
      
      Current conversation:
      {chat_history}
      
      User's question: {question}
      
      Be helpful, friendly, and knowledgeable about gaming hardware and software. 
      If you don't know something, offer to create a support ticket.`
    );

    // Create the chain
    const chain = RunnableSequence.from([prompt, model, new BytesOutputParser()]);

    // For now, we'll pass a simple context (in a real implementation, this would come from your database)
    const context = "Computer Buddy is a premium gaming e-commerce store selling GPUs, CPUs, motherboards, RAM, storage, monitors, peripherals, games, and PC bundles. We offer compatibility checking tools and excellent customer support.";
    
    // Format chat history
    const chatHistory = messages.map((m: Message) => `${m.role}: ${m.content}`).join('\n');
    
    // Prepare the input for the chain
    const input = {
      context,
      chat_history: chatHistory,
      question: messages[messages.length - 1].content,
    };

    // Call the chain and get the stream
    const stream = await chain.stream(input);

    // Convert the stream to a StreamingTextResponse
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(readableStream);
  } catch (error) {
    console.error('Error in chat route:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}