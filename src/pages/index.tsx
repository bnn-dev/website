import { Link } from 'waku';
import { OrthodoxCross } from '../components/OrthodoxCross';

const links = [
  { name: 'gh', url: 'https://github.com/0xr3ngar' },
  { name: 'x', url: 'https://x.com/0xr3ngar' },
  { name: 'li', url: 'https://www.linkedin.com/in/bogdan-nikolov/' },
];

export default async function HomePage() {
    return (
        <div className="home-container">
            <Link to="/blog" className="right-link">Blog →</Link>
            <div className="home-content">
                <OrthodoxCross className="cross" />
                <h1 className="name">Bogdan Nikolov</h1>
                <p className="quote">Simplicity is the ultimate sophistication</p>
                <nav className="links">
                    {links.map((l) => (
                        <a key={l.name} href={l.url} className="link" target="_blank" rel="noopener noreferrer">
                            {l.name}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}

export const getConfig = async () => {
    return {
        render: 'static',
    } as const;
};
