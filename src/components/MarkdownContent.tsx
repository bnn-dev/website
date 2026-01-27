'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface MarkdownContentProps {
    content: string;
}

const customTheme: { [key: string]: React.CSSProperties } = {
    'code[class*="language-"]': {
        color: '#d4d4d8',
        fontFamily: "'Monaco', 'Menlo', monospace",
        fontSize: '0.9em',
        lineHeight: '1.7',
        textShadow: 'none',
    },
    'pre[class*="language-"]': {
        color: '#d4d4d8',
        fontFamily: "'Monaco', 'Menlo', monospace",
        fontSize: '0.9em',
        lineHeight: '1.7',
        textShadow: 'none',
        background: 'transparent',
        padding: '0',
        margin: '0',
        overflow: 'auto',
    },
    comment: { color: '#888' },
    prolog: { color: '#555' },
    doctype: { color: '#555' },
    cdata: { color: '#555' },
    punctuation: { color: '#888' },
    namespace: { opacity: 0.7 },
    property: { color: '#c41e3a' },
    tag: { color: '#c41e3a' },
    boolean: { color: '#c41e3a' },
    number: { color: '#c41e3a' },
    constant: { color: '#c41e3a' },
    symbol: { color: '#c41e3a' },
    deleted: { color: '#c41e3a' },
    selector: { color: '#f5f5f5' },
    'attr-name': { color: '#888' },
    string: { color: '#888' },
    char: { color: '#888' },
    builtin: { color: '#f5f5f5' },
    inserted: { color: '#f5f5f5' },
    operator: { color: '#888' },
    entity: { color: '#c41e3a', cursor: 'help' },
    url: { color: '#888' },
    '.language-css .token.string': { color: '#888' },
    '.style .token.string': { color: '#888' },
    atrule: { color: '#c41e3a' },
    'attr-value': { color: '#888' },
    keyword: { color: '#c41e3a' },
    function: { color: '#f5f5f5' },
    'class-name': { color: '#f5f5f5' },
    regex: { color: '#c41e3a' },
    important: { color: '#c41e3a', fontWeight: 'bold' },
    variable: { color: '#d4d4d8' },
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
};

export function MarkdownContent({ content }: MarkdownContentProps) {
    return (
        <div className="markdown-content">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    code({ className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className ?? '');
                        const codeString = String(children).replace(/\n$/, '');

                        if (!match) {
                            return <code className={className} {...props}>{children}</code>;
                        }

                        return (
                            <div className="code-block">
                                <SyntaxHighlighter
                                    style={customTheme}
                                    language={match[1]}
                                    PreTag="div"
                                    customStyle={{
                                        background: 'transparent',
                                        padding: '0',
                                        margin: '0',
                                    }}
                                >
                                    {codeString}
                                </SyntaxHighlighter>
                            </div>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
