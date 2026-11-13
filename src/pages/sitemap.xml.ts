import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error('Set site in astro.config.mjs');
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const pages = [
    '/',
    '/categories/ai/',
    '/categories/qa/',
    '/categories/automation/',
    '/categories/development/',
    '/categories/tech-news/',
    ...posts.map((post) => `/articles/${post.id}/`),
  ];
  const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `  <url><loc>${escapeXml(new URL(path, site).toString())}</loc></url>`).join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
