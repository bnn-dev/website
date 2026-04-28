import type { PageProps } from 'waku/router';
import { Link } from 'waku';
import { PageNav } from '../../components/PageNav';
import { MarkdownContent } from '../../components/MarkdownContent';
import { TableOfContents } from '../../components/TableOfContents';
import { getPostBySlug, getAllSlugs } from '../../lib/posts';
import { extractHeadings } from '../../lib/headings';

export default async function BlogPostPage({ slug }: PageProps<'/blog/[slug]'>) {
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <>
                <PageNav>
                    <Link to="/" className="page-nav-link">← Home</Link>
                    <Link to="/blog" className="page-nav-link">← Blog</Link>
                </PageNav>
                <main className="main">
                    <h1>Post not found</h1>
                </main>
            </>
        );
    }

    const headings = extractHeadings(post.content);

    return (
        <>
            <PageNav>
                <Link to="/" className="page-nav-link">← Home</Link>
                <Link to="/blog" className="page-nav-link">← Blog</Link>
            </PageNav>
            <TableOfContents headings={headings} />
            <main className="main">
                <article className="post-header">
                    <h1 className="post-view-title">{post.title}</h1>
                    <div className="post-meta">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </article>

                <MarkdownContent content={post.content} />
            </main>
        </>
    );
}

export const getConfig = async () => {
    const staticPaths = getAllSlugs();

    return {
        render: 'static',
        staticPaths,
    } as const;
};
