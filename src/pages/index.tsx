import { Link } from 'waku';
import { OrthodoxCross } from '../components/OrthodoxCross';

const links = [
  { name: 'gh', url: 'https://github.com/0xr3ngar' },
  { name: 'x', url: 'https://x.com/0xr3ngar' },
  { name: 'li', url: 'https://www.linkedin.com/in/bogdan-nikolov/' },
];

export default async function HomePage() {
    return (
        <>
            {/* Page-specific SEO */}
            <title>Bogdan Nikolov | Software, Faith &amp; Writing</title>
            <meta
                name="description"
                content="Personal website and blog of Bogdan Nikolov. Writing on software, security, faith, and the examined life."
            />
            <meta
                property="og:title"
                content="Bogdan Nikolov | Software, Faith &amp; Writing"
            />
            <meta
                property="og:description"
                content="Personal website and blog of Bogdan Nikolov. Writing on software, security, faith, and the examined life."
            />
            <meta property="og:url" content="https://bnn.dev/" />
            <link rel="canonical" href="https://bnn.dev/" />

            <div className="home-container">
                <Link to="/blog" className="right-link">blog →</Link>
                <div className="home-content">
                    <OrthodoxCross className="cross" />
                    <h1 className="name">Bogdan Nikolov</h1>
                <nav className="links">
                    {links.map((l) => (
                        <a key={l.name} href={l.url} className="link" target="_blank" rel="noopener noreferrer">
                            {l.name}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
        </>
    );
}

export const getConfig = async () => {
    return {
        render: 'static',
    } as const;
};
