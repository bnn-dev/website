import '../styles.css';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
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
      {children}
    </>
  );
}

export const getConfig = async () => {
  return {
    render: 'static',
  } as const;
};
