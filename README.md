# bnn.dev

Personal website where I share ideas, findings, and things I'm working on.

Built with [Waku](https://waku.gg/) and deployed to Cloudflare Workers.

## Development

```bash
bun install
bun run dev
```

## Deploy

```bash
bun run build
bun run cf-deploy
```

## Adding New Blog Posts

1. **Create a markdown file** in the `writings/` folder with frontmatter:
   ```markdown
   ---
   title: "My New Post"
   date: "February 1, 2026"
   readTime: "5 min read"
   excerpt: "Brief description..."
   tags: ["Tag1", "Tag2"]
   ---

   Your content here...
   ```

2. **Sitemap is generated automatically** — just run the build:
   ```bash
   bun run build
   ```
   (or `bun run generate-sitemap` to update only the sitemap)

   The script scans all `.md` files in `writings/` and updates `public/sitemap.xml`.
