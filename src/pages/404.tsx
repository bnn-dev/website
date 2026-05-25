import { Link } from 'waku';

export default function NotFoundPage() {
    return (
        <div className="home-container">
            <div className="home-content" style={{ textAlign: 'center', maxWidth: '420px' }}>
                <div style={{
                    fontSize: '5rem',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    color: '#c41e3a',
                    marginBottom: '0.25rem',
                    lineHeight: 1
                }}>
                    404
                </div>

                <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#888',
                    marginBottom: '1.5rem'
                }}>
                    Page not found
                </div>

                <p style={{
                    color: '#cfcdc8',
                    marginBottom: '2rem',
                    lineHeight: 1.55
                }}>
                    The path you followed does not lead here.<br />
                    Perhaps it never existed, or it has already passed on.
                </p>

                <div style={{ display: 'flex', gap: '1.75rem', justifyContent: 'center' }}>
                    <Link to="/" className="link">home</Link>
                    <Link to="/blog" className="link">blog</Link>
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
