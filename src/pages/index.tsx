import { TransitionLink } from '../components/TransitionLink';
import { OrthodoxCross } from '../components/OrthodoxCross';

export default async function HomePage() {
    return (
        <div className="home-container">
            <TransitionLink to="/blog" className="right-link">Blog →</TransitionLink>
            <div className="home-content">
                <OrthodoxCross className="cross" />
                <h1 className="name">Bogdan Nikolov</h1>
                <div className="subtitle">
                    <span className="subtitle-left">SWE</span>
                    <span className="pipe">|</span>
                    <span className="subtitle-right">CYENG</span>
                </div>
                <p className="quote">Simplicity is the ultimate sophistication</p>
                <nav className="links">
                    <a href="https://github.com/0xr3ngar" className="link link-left" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://x.com/0xr3ngar" className="link link-center" target="_blank" rel="noopener noreferrer">
                        X
                    </a>
                    <a href="https://www.linkedin.com/in/bogdan-nikolov/" className="link link-right" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
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
