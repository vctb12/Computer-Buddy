export default async (req: Request) => {
  const token = req.headers.get('x-admin-token');
  if (!process.env.ADMIN_TOKEN) return new Response(JSON.stringify({ enabled: false }), { status: 200 });
  return new Response(JSON.stringify({ ok: token === process.env.ADMIN_TOKEN }), { status: token === process.env.ADMIN_TOKEN ? 200 : 401 });
};
