export default async (req: Request) => {
  try {
    const body = await req.json();
    const provider = process.env.EMAIL_PROVIDER || 'demo';
    if (!process.env.RESEND_API_KEY && !process.env.SENDGRID_API_KEY) {
      return new Response(JSON.stringify({ ok: true, mode: 'demo', order: body?.id ?? null }), { status: 200 });
    }
    return new Response(JSON.stringify({ ok: true, mode: provider }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 400 });
  }
};
