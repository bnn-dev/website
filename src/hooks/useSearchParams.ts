'use client';

import { useSyncExternalStore } from 'react';

function getSnapshot() {
    return typeof window !== 'undefined' ? window.location.search : '';
}

function getServerSnapshot() {
    return '';
}

function subscribe(callback: () => void) {
    window.addEventListener('popstate', callback);
    return () => window.removeEventListener('popstate', callback);
}

export function useSearchParams() {
    const searchString = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const params = new URLSearchParams(searchString);

    const setParams = (newParams: URLSearchParams) => {
        const newUrl = newParams.toString()
            ? `${window.location.pathname}?${newParams.toString()}`
            : window.location.pathname;
        window.history.pushState({}, '', newUrl);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return { params, setParams };
}
