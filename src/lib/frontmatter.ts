export interface PostFrontmatter {
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
    tags: string[];
}

export interface ParsedPost extends PostFrontmatter {
    slug: string;
    content: string;
}

const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
const KEY_VALUE_REGEX = /^(\w+):\s*(.*)$/;
const REMOVE_QUOTES_REGEX = /^["'](.*)["']$/;
const ARRAY_BRACKETS_REGEX = /^\[\s*|\s*\]$/g;


function parseTags(value: string) {
    const content = value.replace(ARRAY_BRACKETS_REGEX, '');
    const tags = content.split(',');

    return tags.map(tag => tag.trim().replace(REMOVE_QUOTES_REGEX, '$1')).filter(Boolean);
}

function parseYaml(yaml: string) {
    const lines = yaml.split('\n');
    const result: Partial<PostFrontmatter> = {};

    for (const line of lines) {
        const keyValueMatch = line.match(KEY_VALUE_REGEX);
        if (!keyValueMatch) continue;

        const [, key, rawValue] = keyValueMatch;
        const value = rawValue.trim();

        switch (key) {
            case 'tags':
                result.tags = parseTags(value);
                break;
            case 'title':
            case 'date':
            case 'readTime':
            case 'excerpt':
                result[key] = value.replace(REMOVE_QUOTES_REGEX, '$1');
                break;
        }
    }

    return {
        title: result.title ?? '',
        date: result.date ?? '',
        readTime: result.readTime ?? '',
        excerpt: result.excerpt ?? '',
        tags: result.tags ?? []
    };
}

export function parseFrontmatter(content: string) {
    const match = content.match(FRONTMATTER_REGEX); if (!match) {
        throw new Error('Invalid frontmatter format');
    }

    const frontmatterYaml = match[1];
    const body = match[2];
    const frontmatter = parseYaml(frontmatterYaml);

    return { frontmatter, body };
}
