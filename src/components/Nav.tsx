'use client';

import { useRouter } from 'waku';
import type { ReactNode, MouseEvent } from 'react';

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
type Routes = ArgumentTypes<ReturnType<typeof useRouter>['push']>[0];

interface NavLinkProps {
    to: Routes;
    className?: string;
    children: ReactNode;
}

function NavLink({ to, className, children }: NavLinkProps) {
    const router = useRouter();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (document.startViewTransition) {
            document.startViewTransition(() => {
                router.push(to);
            });
            return;
        }

        router.push(to);
    };

    return (
        <a href={to} onClick={handleClick} className={className}>
            {children}
        </a>
    );
}

export function PageNav() {
    const router = useRouter();
    const path = router.path;

    const isHome = path === '/';
    const isBlogPost = path.startsWith('/blog/') && path !== '/blog';

    return (
        <>
            {/* Show Home link on blog pages */}
            {!isHome && (
                <NavLink to="/" className="left-link">
                    ← Home
                </NavLink>
            )}

            {/* Show Blog link below Home link on blog post pages */}
            {isBlogPost && (
                <NavLink to="/blog" className="left-link-slug">
                    ← Blog
                </NavLink>
            )}

            {/* Show Blog link on home page */}
            {isHome && (
                <NavLink to="/blog" className="right-link">
                    Blog →
                </NavLink>
            )}
        </>
    );
}
