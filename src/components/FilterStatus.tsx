'use client';

interface FilterStatusProps {
    count: number;
    onClear: () => void;
}

export function FilterStatus({ count, onClear }: FilterStatusProps) {
    return (
        <div className="filter-status">
            <span className="filter-count">
                {count} {count === 1 ? 'post' : 'posts'} found
            </span>
            <button type="button" className="clear-filters" onClick={onClear}>
                Clear filters
            </button>
        </div>
    );
}
