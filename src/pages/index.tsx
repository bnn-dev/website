import { Link } from 'waku';
import { OrthodoxCross } from '../components/OrthodoxCross';
import { GitHubIcon, XIcon } from '../components/icons';
import { SEO } from '../components/SEO';
import { BASE_URL } from '../lib/seo';

const links = [
  { name: 'github', url: 'https://github.com/0xr3ngar', Icon: GitHubIcon },
  { name: 'x', url: 'https://x.com/0xr3ngar', Icon: XIcon },
];

export default async function HomePage() {
    return (
        <>
            <SEO
                title="Bogdan Nikolov"
                description="Personal website and blog of Bogdan Nikolov. Writing on software, security, faith, and the examined life."
                url={BASE_URL}
                ogType="website"
            />

            <div className="home-container">
                <Link to="/blog" className="right-link">blog →</Link>
                <div className="home-content">
                    <OrthodoxCross className="cross" />
                    <h1 className="name">Bogdan Nikolov</h1>
                <nav className="links">
                    {links.map(({ name, url, Icon }) => (
                        <a key={name} href={url} className="link" target="_blank" rel="noopener noreferrer" aria-label={name}>
                            <Icon className="link-icon" />
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
