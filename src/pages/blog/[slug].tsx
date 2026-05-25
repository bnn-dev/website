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
                <title>Post not found | bnn.dev</title>
                <meta name="description" content="The requested post could not be found." />
                <link rel="canonical" href="https://bnn.dev/blog" />

                <PageNav>
                    <Link to="/" className="page-nav-link">← home</Link>
                    <Link to="/blog" className="page-nav-link">← blog</Link>
                </PageNav>
                <main className="main">
                    <h1>Post not found</h1>
                </main>
            </>
        );
    }

    const headings = extractHeadings(post.content);

    const postDateISO = new Date(post.date).toISOString();

    return (
        <>
            {/* Dynamic SEO for this post */}
            <title>{post.title} | bnn.dev</title>
            <meta name="description" content={post.excerpt} />
            <link rel="canonical" href={`https://bnn.dev/blog/${slug}`} />

            {/* Open Graph Article */}
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.excerpt} />
            <meta property="og:type" content="article" />
            <meta property="og:url" content={`https://bnn.dev/blog/${slug}`} />
            <meta property="og:article:published_time" content={postDateISO} />
            {post.tags.map((tag) => (
                <meta key={tag} property="og:article:tag" content={tag} />
            ))}

            {/* Twitter */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:description" content={post.excerpt} />

            <PageNav>
                <Link to="/" className="page-nav-link">← home</Link>
                <Link to="/blog" className="page-nav-link">← blog</Link>
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
