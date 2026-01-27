import type { PageProps } from 'waku/router';
import { TransitionLink } from '../../components/TransitionLink';
import { PageNav } from '../../components/PageNav';
import { MarkdownContent } from '../../components/MarkdownContent';
import { getPostBySlug, getAllSlugs } from '../../lib/posts';

export default async function BlogPostPage({ slug }: PageProps<'/blog/[slug]'>) {
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <>
                <PageNav>
                    <TransitionLink to="/" className="page-nav-link">← Home</TransitionLink>
                    <TransitionLink to="/blog" className="page-nav-link" preserveSearch>← Blog</TransitionLink>
                </PageNav>
                <main className="main">
                    <h1>Post not found</h1>
                </main>
            </>
        );
    }

    return (
        <>
            <PageNav>
                <TransitionLink to="/" className="page-nav-link">← Home</TransitionLink>
                <TransitionLink to="/blog" className="page-nav-link" preserveSearch>← Blog</TransitionLink>
            </PageNav>
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
