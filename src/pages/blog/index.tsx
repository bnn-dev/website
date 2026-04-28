import { Link } from 'waku';
import { PageNav } from '../../components/PageNav';
import { OrthodoxCross } from '../../components/OrthodoxCross';
import { getAllPosts } from '../../lib/posts';

function fmt(date: string) {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).toUpperCase();
}

export default async function BlogPage() {
    const posts = getAllPosts();

    return (
        <>
            <PageNav>
                <Link to="/" className="page-nav-link">← home</Link>
            </PageNav>
            <main className="writings">
                <header className="writings-masthead">
                    <h1 className="writings-title">blog</h1>
                    <p className="writings-tagline">thoughts on software, security, and life.</p>
                </header>

                <ol className="writings-list">
                    {posts.map((post, i) => (
                        <li key={post.slug}>
                            <Link to={`/blog/${post.slug}`} className="entry">
                                <div className="entry-header">
                                    <span className="entry-number">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="entry-date">{fmt(post.date)}</span>
                                </div>
                                <h2 className="entry-title">{post.title}</h2>
                                <p className="entry-excerpt">{post.excerpt}</p>
                                <p className="entry-tags">{post.tags.join(' · ')}</p>
                            </Link>
                        </li>
                    ))}
                </ol>

                <div className="writings-colophon" aria-hidden="true">
                    <OrthodoxCross className="writings-cross" />
                </div>
            </main>
        </>
    );
}

export const getConfig = async () => {
    return {
        render: 'static',
    } as const;
};
