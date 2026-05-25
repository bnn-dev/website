#!/usr/bin/env bun

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const BASE_URL = 'https://bnn.dev';
const WRITINGS_DIR = 'writings';
const OUTPUT_PATH = 'public/sitemap.xml';

interface Post {
  slug: string;
  date: string;
  lastmod: string;
}

function extractFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return {};

  const yaml = match[1];
  const result: Record<string, string> = {};

  for (const line of yaml.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;

    const [, key, rawValue] = kv;
    let value = rawValue.trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

function toISODate(dateStr: string): string {
  const d = new Date(dateStr + ' 12:00:00 UTC');
  if (isNaN(d.getTime())) {
    console.warn(`  ⚠️  Could not parse date "${dateStr}", using today's date`);
    return new Date().toISOString().split('T')[0];
  }
  return d.toISOString().split('T')[0];
}

async function getPosts(): Promise<Post[]> {
  const entries = await readdir(WRITINGS_DIR, { withFileTypes: true });
  const mdFiles = entries
    .filter((e) => e.isFile() && extname(e.name) === '.md')
    .map((e) => e.name);

  const posts: Post[] = [];

  for (const file of mdFiles) {
    const fullPath = join(WRITINGS_DIR, file);
    const content = await readFile(fullPath, 'utf-8');
    const fm = extractFrontmatter(content);

    const slug = file.replace(/\.md$/, '');
    const rawDate = fm.date || '';

    posts.push({
      slug,
      date: rawDate,
      lastmod: toISODate(rawDate),
    });
  }

  posts.sort((a, b) => b.lastmod.localeCompare(a.lastmod));

  return posts;
}

function buildSitemap(posts: Post[]): string {
  const today = new Date().toISOString().split('T')[0];
  const newestPostDate = posts.length > 0 ? posts[0].lastmod : today;

  const urls = [
    {
      loc: `${BASE_URL}/`,
      lastmod: '2026-05-01',
      changefreq: 'monthly',
      priority: '1.0',
    },
    {
      loc: `${BASE_URL}/blog`,
      lastmod: newestPostDate,
      changefreq: 'weekly',
      priority: '0.8',
    },
    ...posts.map((post) => ({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: post.lastmod,
      changefreq: 'yearly',
      priority: '0.7',
    })),
  ];

  const urlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

async function main() {
  console.log('📍 Generating sitemap from writings/...');

  const posts = await getPosts();
  const xml = buildSitemap(posts);

  await writeFile(OUTPUT_PATH, xml, 'utf-8');

  console.log(`✅ Sitemap written to ${OUTPUT_PATH}`);
  console.log(`   - ${posts.length} blog post(s) included`);
  console.log(`   - Static pages: / and /blog`);
}

main().catch((err) => {
  console.error('Failed to generate sitemap:', err);
  process.exit(1);
});
