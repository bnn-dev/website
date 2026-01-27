import { TransitionLink } from '../../components/TransitionLink';
import { PageNav } from '../../components/PageNav';
import { BlogList } from '../../components/BlogList';
import { getAllPosts } from '../../lib/posts';

export default async function BlogPage() {
    const posts = getAllPosts();

    return (
        <>
            <PageNav>
                <TransitionLink to="/" className="page-nav-link">← Home</TransitionLink>
            </PageNav>
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
