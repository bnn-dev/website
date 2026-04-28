export interface Heading {
    id: string;
    text: string;
    level: number;
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
}

export function extractHeadings(markdown: string): Heading[] {
    const headings: Heading[] = [];
    const lines = markdown.split('\n');
    let inCodeBlock = false;

    for (const line of lines) {
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) continue;

        const match = line.match(/^(#{1,3})\s+(.+?)\s*#*\s*$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = slugify(text);
            headings.push({ id, text, level });
        }
    }

    return headings.filter(h => h.level === 2 || h.level === 3);
}
