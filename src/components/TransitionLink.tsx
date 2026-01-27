'use client';

import { useRouter } from 'waku';
import type { ReactNode, MouseEvent, CSSProperties } from 'react';

interface TransitionLinkProps {
    to: string;
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
    preserveSearch?: boolean;
}

export function TransitionLink({ to, className, style, children, preserveSearch = false }: TransitionLinkProps) {
    const router = useRouter();

    const getFullPath = () => {
        if (!preserveSearch || typeof window === 'undefined') {
            return to;
        }
        const search = window.location.search;
        return search ? `${to}${search}` : to;
    };

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const fullPath = getFullPath();

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                router.push(fullPath as any);
            });
        } else {
            router.push(fullPath as any);
        }
    };

    return (
        <a href={to} onClick={handleClick} className={className} style={style}>
            {children}
        </a>
    );
}
