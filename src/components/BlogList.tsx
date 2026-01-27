'use client';

import { useSearchParams } from '../hooks/useSearchParams';
import { SearchInput } from './SearchInput';
import { TagFilters } from './TagFilters';
import { FilterStatus } from './FilterStatus';
import { PostCard } from './PostCard';
import type { PostFrontmatter } from '../lib/frontmatter';

interface Post extends PostFrontmatter {
    slug: string;
}

interface BlogListProps {
    posts: Post[];
}

function getAllTags(posts: Post[]): string[] {
    const tags = new Set<string>();
    for (const post of posts) {
        for (const tag of post.tags) {
            tags.add(tag);
        }
    }
    return Array.from(tags).sort();
}

function filterPosts(posts: Post[], searchQuery: string, selectedTags: string[]): Post[] {
    return posts.filter(post => {
        if (searchQuery) {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = post.title.toLowerCase().includes(searchLower) 
                || post.excerpt.toLowerCase().includes(searchLower);
            if (!matchesSearch) return false;
        }

        if (selectedTags.length > 0) {
            const hasAnyTag = selectedTags.some(tag => post.tags.includes(tag));
            if (!hasAnyTag) return false;
        }

        return true;
    });
}

export function BlogList({ posts }: BlogListProps) {
    const { params, setParams } = useSearchParams();

    const searchQuery = params.get('q') ?? '';
    const tagsParam = params.get('tags');
    const selectedTags = tagsParam ? tagsParam.split(',').filter(Boolean) : [];

    const allTags = getAllTags(posts);
    const filteredPosts = filterPosts(posts, searchQuery, selectedTags);
    const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0;

    const updateSearchQuery = (query: string) => {
        const newParams = new URLSearchParams(params);
        if (query) {
            newParams.set('q', query);
        } else {
            newParams.delete('q');
        }
        setParams(newParams);
    };

    const toggleTag = (tag: string) => {
        const newParams = new URLSearchParams(params);
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];

        if (newTags.length > 0) {
            newParams.set('tags', newTags.join(','));
        } else {
            newParams.delete('tags');
        }
        setParams(newParams);
    };

    const clearFilters = () => {
        setParams(new URLSearchParams());
    };

    return (
        <>
            <div className="blog-filters">
                <SearchInput value={searchQuery} onChange={updateSearchQuery} />
                <TagFilters allTags={allTags} selectedTags={selectedTags} onToggle={toggleTag} />
                {hasActiveFilters && <FilterStatus count={filteredPosts.length} onClear={clearFilters} />}
            </div>

            <div className="blog-list">
                {filteredPosts.length === 0 ? (
                    <div className="no-results">
                        <p>No posts match your filters.</p>
                    </div>
                ) : (
                    filteredPosts.map(post => <PostCard key={post.slug} post={post} />)
                )}
            </div>
        </>
    );
}
