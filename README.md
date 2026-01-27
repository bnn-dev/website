# Bogdan Nikolov Portfolio

Built with **Waku** (React framework) and deployed to **Cloudflare Workers**.

## Project Structure

```
pers-website/
├── src/
│   ├── pages/
│   │   ├── _layout.tsx          # Root layout
│   │   ├── index.tsx            # Home page
│   │   ├── blog/
│   │   │   ├── index.tsx        # Blog list
│   │   │   └── [slug].tsx       # Individual post pages
│   │   └── _slices/             # (optional) Reusable slices
│   ├── waku.server.ts           # Cloudflare adapter config
│   └── styles.css               # Global styles
├── writings/                    # Markdown blog posts
│   ├── writings.json            # Post metadata
│   ├── getting-started-with-oscp.md
│   ├── building-minimalist-uis.md
│   └── rust-vs-go.md
├── public/
│   └── _headers                 # Cloudflare headers config
├── package.json
├── tsconfig.json
├── wrangler.jsonc               # Cloudflare Workers config
└── README.md
```

## Features

- ✅ **React 19** with Server Components
- ✅ **View Transitions API** for smooth page transitions
- ✅ **Markdown blog** with dynamic routing
- ✅ **Static Site Generation** (SSG) for Cloudflare
- ✅ **No code duplication** - single layout, dynamic posts
- ✅ **Shareable URLs** - each post has its own page

## Development

Install dependencies:
```bash
bun install
```

Start dev server:
```bash
bun run dev
```

## Deployment to Cloudflare

1. **Build for Cloudflare:**
   ```bash
   bun run build
   ```

2. **Test locally with Wrangler:**
   ```bash
   bun run cf-dev
   ```

3. **Deploy to Cloudflare:**
   ```bash
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

3. **Push to GitHub** - Cloudflare will auto-deploy!

## How It Works

### Dynamic Routing
- Blog posts use Waku's file-based routing: `[slug].tsx`
- Each post gets its own URL: `/blog/getting-started-with-oscp`
- Posts are generated at build time (SSG) for fast loading

### Markdown Rendering
- Markdown files are read server-side
- `marked` library converts markdown to HTML
- Server Components render the content

### View Transitions
- Native browser View Transitions API
- Smooth animations between pages
- No JavaScript framework needed for transitions

### Cloudflare Deployment
- Static assets served from Cloudflare's edge
- No server functions needed (pure SSG)
- Fast global CDN delivery

## Tech Stack

- **Framework:** Waku (React 19)
- **Styling:** CSS
- **Markdown:** marked
- **Deployment:** Cloudflare Workers
- **Package Manager:** Bun

## Links

- Home: `/`
- Blog: `/blog`
- Individual posts: `/blog/[slug]`

---

Built with ❤️ and ☦
