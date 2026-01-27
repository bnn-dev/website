import { Link } from 'waku';
import type { PostFrontmatter } from '../lib/frontmatter';

interface Post extends PostFrontmatter {
    slug: string;
}

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link to={`/blog/${post.slug}`} className="blog-post-card">
            <div className="post-date">{post.date}</div>
            <h2 className="post-title">{post.title}</h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-tags">
                {post.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>
        </Link>
    );
}
