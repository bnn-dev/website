'use client';

import type { ReactNode } from 'react';

interface PageNavProps {
    children: ReactNode;
}

export function PageNav({ children }: PageNavProps) {
    return (
        <nav className="page-nav" view-transiton-name="page-nav">
            {children}
        </nav>
    );
}
