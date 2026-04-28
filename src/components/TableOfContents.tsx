'use client';

import { useLayoutEffect, useState } from 'react';
import type { Heading } from '../lib/headings';

interface TableOfContentsProps {
    headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>(headings[0]?.id ?? '');

    useLayoutEffect(() => {
        if (headings.length === 0) return;

        function update() {
            const offset = 120;
            const scrollY = window.scrollY;
            const viewport = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (scrollY + viewport >= docHeight - 40) {
                setActiveId(headings[headings.length - 1].id);
                return;
            }

            let current = headings[0].id;
            for (const h of headings) {
                const el = document.getElementById(h.id);
                if (!el) continue;
                if (el.getBoundingClientRect().top <= offset) {
                    current = h.id;
                } else {
                    break;
                }
            }
            setActiveId(current);
        }

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className="toc" aria-label="Table of contents">
            {headings.map(h => (
                <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`toc-bar toc-level-${h.level}${activeId === h.id ? ' toc-bar-active' : ''}`}
                >
                    <span className="toc-bar-label">{h.text}</span>
                </a>
            ))}
        </nav>
    );
}
