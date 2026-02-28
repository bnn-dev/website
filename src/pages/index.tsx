import { Link } from 'waku';
import { OrthodoxCross } from '../components/OrthodoxCross';

export default async function HomePage() {
    return (
        <div className="home-container">
            <div className="bg-layer">
                <div className="bg-glow-center" />
                <div className="bg-glow-top" />
                <div className="bg-grid" />
            </div>
            <div className="bg-vignette" />
            <div className="bg-grain" />
            <div className="bg-scanlines" />
            <div className="bg-particles">
                <div className="particle" style={{ left: '15%', bottom: '10%', animationDuration: '8s', animationDelay: '0s' }} />
                <div className="particle" style={{ left: '30%', bottom: '30%', animationDuration: '10s', animationDelay: '1.5s' }} />
                <div className="particle" style={{ left: '45%', bottom: '50%', animationDuration: '12s', animationDelay: '3s' }} />
                <div className="particle" style={{ left: '60%', bottom: '10%', animationDuration: '14s', animationDelay: '4.5s' }} />
                <div className="particle" style={{ left: '75%', bottom: '30%', animationDuration: '16s', animationDelay: '6s' }} />
                <div className="particle" style={{ left: '90%', bottom: '50%', animationDuration: '18s', animationDelay: '7.5s' }} />
            </div>
            <Link to="/blog" className="right-link">Blog →</Link>
            <div className="home-content">
                <OrthodoxCross className="cross" />
                <h1 className="name">Bogdan Nikolov</h1>
                <div className="subtitle">
                    <span className="subtitle-left">SWE</span>
                    <span className="pipe">|</span>
                    <span className="subtitle-right">SecEng</span>
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
                <div className="projects">
                    <span className="projects-label">Projects</span>
                    <a href="https://sift.bnn.dev" className="project-link" target="_blank" rel="noopener noreferrer">
                        S<span className="project-accent">I</span>FT
                    </a>
                </div>
            </div>
        </div>
    );
}

export const getConfig = async () => {
    return {
        render: 'static',
    } as const;
};
