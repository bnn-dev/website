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

1. **Create a markdown file** in `writings/` folder:
   ```bash
   writings/my-new-post.md
   ```

2. **Add metadata to `writings/writings.json`:**
   ```json
   {
     "slug": "my-new-post",
     "title": "My New Post",
     "date": "February 1, 2026",
     "readTime": "5 min read",
     "excerpt": "Brief description...",
     "tags": ["Tag1", "Tag2"]
   }
   ```
