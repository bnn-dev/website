import type { PageProps } from 'waku/router';
import { TransitionLink } from '../../components/TransitionLink';
import { MarkdownContent } from '../../components/MarkdownContent';
import { getPostBySlug, getAllSlugs } from '../../lib/posts';

export default async function BlogPostPage({ slug }: PageProps<'/blog/[slug]'>) {
    const post = getPostBySlug(slug);

    if (!post) {
        return (
            <>
                <TransitionLink to="/" className="left-link">← Home</TransitionLink>
                <TransitionLink to="/blog" className="left-link-slug" preserveSearch>← Blog</TransitionLink>
                <main className="main">
                    <h1>Post not found</h1>
                </main>
            </>
        );
    }

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
