'use client';

import { useRouter } from 'waku';
import type { ReactNode, MouseEvent, CSSProperties } from 'react';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

type Routes = ArgumentTypes<ReturnType<typeof useRouter>['push']>[0];

interface TransitionLinkProps {
    to: Routes;
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

        const fullPath = getFullPath() as Routes;

        if (!document.startViewTransition) {
            router.push(fullPath);
            return;
        }

        document.startViewTransition(() => {
            router.push(fullPath);
        });
    };

    const href = preserveSearch && typeof window !== 'undefined' 
        ? getFullPath() 
        : to;

    return (
        <a href={href} onClick={handleClick} className={className} style={style}>
            {children}
        </a>
    );
}
