'use client';

import type { ReactNode } from 'react';

interface PageNavProps {
    children: ReactNode;
}

export function PageNav({ children }: PageNavProps) {
    return (
        <nav className="page-nav">
            {children}
        </nav>
    );
}
