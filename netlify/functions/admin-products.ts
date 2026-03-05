export default async () => {
  if (!process.env.ADMIN_TOKEN) return new Response(JSON.stringify({ enabled: false, message: 'Admin backend disabled' }), { status: 200 });
  return new Response(JSON.stringify({ enabled: true, message: 'Future product admin endpoint scaffold' }), { status: 200 });
};
