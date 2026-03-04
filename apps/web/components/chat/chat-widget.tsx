'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, X, MessageCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    isLoading: isGenerating,
  } = useChat({
    api: '/api/chat',
    onError: (error) => {
      console.error('Chat error:', error);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubmit(e);
    setTimeout(() => setIsLoading(false), 500); // Prevent rapid clicking
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-50 p-4 bg-gaming-cyber text-gaming-dark rounded-full shadow-lg hover:shadow-xl transition-shadow"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-full max-w-md h-[70vh] z-50"
          >
            <Card className="h-full flex flex-col border-gaming-cyber bg-gaming-dark/80 backdrop-blur-sm shadow-xl">
              <CardHeader className="p-4 border-b border-gaming-cyber/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-gaming-cyber" />
                    <CardTitle className="text-white">Buddy Bot</CardTitle>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      Online
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleChat}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="mx-auto bg-gaming-dark/50 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                          <Sparkles className="w-8 h-8 text-gaming-cyber" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">Hello! I'm Buddy Bot</h3>
                        <p className="text-gaming-cyber/80">
                          Ask me about products, orders, compatibility, or anything else!
                        </p>
                      </div>
                    ) : (
                      messages.map((msg, index) => (
                        <motion.div
                          key={`${msg.id}-${index}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            'flex items-start gap-3',
                            msg.role === 'user' ? 'justify-end' : 'justify-start'
                          )}
                        >
                          {msg.role === 'assistant' && (
                            <Avatar className="w-8 h-8 border border-gaming-cyber">
                              <AvatarImage src="/buddy-bot-avatar.png" alt="Buddy Bot" />
                              <AvatarFallback className="bg-gaming-cyber text-gaming-dark">
                                <Bot className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div
                            className={cn(
                              'max-w-[80%] p-3 rounded-lg',
                              msg.role === 'user'
                                ? 'bg-primary text-primary-foreground rounded-tr-none'
                                : 'bg-gaming-dark border border-gaming-cyber/30 text-white rounded-tl-none'
                            )}
                          >
                            <p className="whitespace-pre-wrap">{msg.content}</p>
                          </div>
                          
                          {msg.role === 'user' && (
                            <Avatar className="w-8 h-8 border border-primary">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <User className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </motion.div>
                      ))
                    )}
                    
                    {(isLoading || isGenerating) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-3"
                      >
                        <Avatar className="w-8 h-8 border border-gaming-cyber">
                          <AvatarFallback className="bg-gaming-cyber text-gaming-dark">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gaming-dark border border-gaming-cyber/30 text-white rounded-lg rounded-tl-none p-3">
                          <div className="flex space-x-2">
                            <div className="w-2 h-2 bg-gaming-cyber rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gaming-cyber rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gaming-cyber rounded-full animate-bounce delay-150"></div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <form onSubmit={onSubmit} className="p-4 border-t border-gaming-cyber/30">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask me anything about products, orders, or compatibility..."
                      className="bg-gaming-dark/50 border-gaming-cyber/30 text-white placeholder:text-gaming-cyber/50"
                      disabled={isLoading || isGenerating}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || isGenerating || !input.trim()}
                      className="bg-gaming-cyber text-gaming-dark hover:bg-gaming-cyber/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;