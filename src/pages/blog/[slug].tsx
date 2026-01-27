import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import type { PageProps } from 'waku/router';
import { TransitionLink } from '../../components/TransitionLink';
import { MarkdownContent } from '../../components/MarkdownContent';
import { parseFrontmatter, type PostFrontmatter } from '../../lib/frontmatter';

export default async function BlogPostPage({ slug }: PageProps<'/blog/[slug]'>) {
    const mdPath = join(process.cwd(), 'writings', `${slug}.md`);
    const markdown = readFileSync(mdPath, 'utf-8');

    const { frontmatter, body } = parseFrontmatter(markdown);
    const post: PostFrontmatter = frontmatter;

    return (
        <>
            <TransitionLink to="/" className="left-link">← Home</TransitionLink>
            <TransitionLink to="/blog" className="left-link-slug" preserveSearch>← Blog</TransitionLink>
            <main className="main">
                <article className="post-header">
                    <h1 className="post-view-title">{post.title}</h1>
                    <div className="post-meta">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </article>

                <MarkdownContent content={body} />
            </main>
        </>
    );
}

export const getConfig = async () => {
    const writingsDir = join(process.cwd(), 'writings');
    const files = readdirSync(writingsDir).filter(file => file.endsWith('.md'));

    return {
        render: 'static',
        staticPaths: files.map(file => file.replace('.md', '')),
    } as const;
};
