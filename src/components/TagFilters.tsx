'use client';

import { useState } from 'react';

const PRIMARY_TAGS = [
    'Christianity',
    'Programming', 
    'Cybersecurity',
    'Life',
    'Philosophy',
    'Technology',
    'Gym',
];

interface TagFiltersProps {
    allTags: string[];
    selectedTags: string[];
    onToggle: (tag: string) => void;
}

function TagButton({ tag, isSelected, onToggle }: { tag: string; isSelected: boolean; onToggle: (tag: string) => void }) {
    return (
        <button
            type="button"
            onClick={() => onToggle(tag)}
            className={`filter-tag ${isSelected ? 'active' : ''}`}
        >
            {tag}
        </button>
    );
}

export function TagFilters({ allTags, selectedTags, onToggle }: TagFiltersProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const otherTags = allTags.filter(tag => !PRIMARY_TAGS.includes(tag));
    const hasOtherTags = otherTags.length > 0;
    const selectedOtherCount = otherTags.filter(tag => selectedTags.includes(tag)).length;

    return (
        <div className="filter-tags">
            {PRIMARY_TAGS.map(tag => (
                <TagButton
                    key={tag}
                    tag={tag}
                    isSelected={selectedTags.includes(tag)}
                    onToggle={onToggle}
                />
            ))}

            {hasOtherTags && (
                <div className="tag-dropdown-wrapper">
                    <button
                        type="button"
                        className={`filter-tag tag-dropdown-trigger ${selectedOtherCount > 0 ? 'active' : ''}`}
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        More {selectedOtherCount > 0 && `(${selectedOtherCount})`} {dropdownOpen ? '▲' : '▼'}
                    </button>

                    {dropdownOpen && (
                        <div className="tag-dropdown">
                            {otherTags.map(tag => (
                                <button
                                    type="button"
                                    key={tag}
                                    onClick={() => onToggle(tag)}
                                    className={`tag-dropdown-item ${selectedTags.includes(tag) ? 'active' : ''}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
