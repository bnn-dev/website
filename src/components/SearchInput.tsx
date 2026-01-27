'use client';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
    return (
        <div className="search-wrapper">
            <input
                type="text"
                placeholder="Search posts..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="search-input"
            />
            {value && (
                <button
                    type="button"
                    className="search-clear"
                    onClick={() => onChange('')}
                    aria-label="Clear search"
                >
                    ×
                </button>
            )}
        </div>
    );
}
