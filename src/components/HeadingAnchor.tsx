'use client';

import { CopyLink } from '../icons/CopyLink';

interface HeadingAnchorProps {
    id: string;
}

export function HeadingAnchor({ id }: HeadingAnchorProps) {
    const onClick = () => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard.writeText(url);
        history.replaceState(null, '', `#${id}`);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <button
            type="button"
            className="heading-anchor"
            onClick={onClick}
            aria-label="Copy link to section"
        >
            <CopyLink />
        </button>
    );
}
