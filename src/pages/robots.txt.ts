import type { APIRoute } from 'astro';
export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Set site in astro.config.mjs');
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site).toString()}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
