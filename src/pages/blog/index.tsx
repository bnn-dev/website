import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { TransitionLink } from '../../components/TransitionLink';
import { BlogList } from '../../components/BlogList';
import { parseFrontmatter, type PostFrontmatter } from '../../lib/frontmatter';

interface Post extends PostFrontmatter {
    slug: string;
}

export default async function BlogPage() {
    const writingsDir = join(process.cwd(), 'writings');

    const files = readdirSync(writingsDir).filter(file => file.endsWith('.md'));

    const posts: Post[] = files.map(file => {
        const slug = file.replace('.md', '');
        const filePath = join(writingsDir, file);
        const content = readFileSync(filePath, 'utf-8');
        const { frontmatter } = parseFrontmatter(content);

        return {
            slug,
            ...frontmatter
        };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <>
            <TransitionLink to="/" className="left-link">← Home</TransitionLink>
            <main className="main">
            <div className="blog-header">
                <h1 className="blog-title">Blog</h1>
                <p className="blog-subtitle">Thoughts on software, security, and life</p>
            </div>

            <BlogList posts={posts} />
        </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        render: 'static',
    } as const;
};
