import { parseFrontmatter, type PostFrontmatter } from './frontmatter';

export interface Post extends PostFrontmatter {
    slug: string;
    content: string;
}

// Use Vite's import.meta.glob to import all markdown files at build time
// This works with Cloudflare Workers since it's resolved at build time
const markdownFiles = import.meta.glob('/writings/*.md', { 
    query: '?raw',
    import: 'default',
    eager: true 
}) as Record<string, string>;

export function getAllPosts(): Post[] {
    const posts: Post[] = [];
    
    for (const [path, content] of Object.entries(markdownFiles)) {
        const slug = path.replace('/writings/', '').replace('.md', '');
        const { frontmatter, body } = parseFrontmatter(content);
        
        posts.push({
            slug,
            content: body,
            ...frontmatter
        });
    }
    
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
    const posts = getAllPosts();
    return posts.find(post => post.slug === slug);
}

export function getAllSlugs(): string[] {
    return Object.keys(markdownFiles).map(path => 
        path.replace('/writings/', '').replace('.md', '')
    );
}
