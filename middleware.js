// lathesports.com and bitcomp.network share this project with latheintelligence.com. Send each
// domain's home page, robots.txt and sitemap to its own files before static files are served.
export const config = { matcher: ['/', '/robots.txt', '/sitemap.xml'] };
const SITES = [
  [/(^|\.)lathesports\.com$/, { '/': '/sports', '/robots.txt': '/sports-robots.txt', '/sitemap.xml': '/sports-sitemap.xml' }],
  [/(^|\.)bitcomp\.network$/, { '/': '/bitcomp', '/robots.txt': '/bitcomp-robots.txt', '/sitemap.xml': '/bitcomp-sitemap.xml' }],
];
export default function middleware(request) {
  const host = (request.headers.get('host') || '').toLowerCase();
  const site = SITES.find(([re]) => re.test(host));
  if (!site) return;
  const url = new URL(request.url);
  const to = site[1][url.pathname];
  if (!to) return;
  url.pathname = to;
  return new Response(null, { headers: { 'x-middleware-rewrite': url.toString() } });
}
