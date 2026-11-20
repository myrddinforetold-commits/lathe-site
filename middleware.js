// lathesports.com shares this project with latheintelligence.com. Send its home page,
// robots.txt and sitemap to the Lathe Sports files before static files are served.
export const config = { matcher: ['/', '/robots.txt', '/sitemap.xml'] };
const MAP = { '/': '/sports', '/robots.txt': '/sports-robots.txt', '/sitemap.xml': '/sports-sitemap.xml' };
export default function middleware(request) {
  const host = (request.headers.get('host') || '').toLowerCase();
  if (!/(^|\.)lathesports\.com$/.test(host)) return;
  const url = new URL(request.url);
  const to = MAP[url.pathname];
  if (!to) return;
  url.pathname = to;
  return new Response(null, { headers: { 'x-middleware-rewrite': url.toString() } });
}
