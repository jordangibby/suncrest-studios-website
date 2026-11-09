// Server-side passcode gate. Proposals live in Cloudflare KV (binding: PORTAL),
// never in the public repo. KV key = "proposal:<passcode>", value = proposal HTML.
const COOKIE = 'sc_portal';

function pageHeaders(extra = {}) {
  return { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Robots-Tag': 'noindex, nofollow', ...extra };
}

async function lookup(env, code) {
  if (!code || code.length < 6 || code.length > 128) return null;
  return env.PORTAL.get('proposal:' + code);
}

export async function onRequestPost({ request, env }) {
  let code = '';
  try { code = String((await request.json()).code || '').trim(); } catch (_) {}
  await new Promise(r => setTimeout(r, 400)); // slow down guessing
  const html = await lookup(env, code);
  if (!html) return new Response('Invalid', { status: 401 });
  return new Response('OK', { status: 200, headers: {
    'Set-Cookie': `${COOKIE}=${encodeURIComponent(code)}; Path=/api/portal; HttpOnly; Secure; SameSite=Strict; Max-Age=28800` } });
}

export async function onRequestGet({ request, env }) {
  const m = (request.headers.get('Cookie') || '').match(new RegExp(COOKIE + '=([^;]+)'));
  const html = m ? await lookup(env, decodeURIComponent(m[1])) : null;
  if (!html) return Response.redirect(new URL('/portal/', request.url), 302);
  return new Response(html, { headers: pageHeaders() });
}
