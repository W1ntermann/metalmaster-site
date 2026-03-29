import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = 'https://www.armind.com.ua';
const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/laser-cutting', changefreq: 'monthly', priority: '0.9' },
  { path: '/precise-bending', changefreq: 'monthly', priority: '0.9' },
  { path: '/metal-welding', changefreq: 'monthly', priority: '0.9' },
  { path: '/powder-coating', changefreq: 'monthly', priority: '0.9' },
  { path: '/complex-manufacturing', changefreq: 'monthly', priority: '0.9' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, '..', 'public');
const lastmod = new Date().toISOString().split('T')[0];

const sitemapEntries = routes.map(({ path: routePath, changefreq, priority }) => `  <url>\n    <loc>${new URL(routePath, `${siteUrl}/`).toString()}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(path.join(publicDir, 'robots.txt'), robots, 'utf8');

console.log('Generated robots.txt and sitemap.xml');