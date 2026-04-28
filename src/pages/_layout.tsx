import '../styles.css';

const particles = [
  { left: '8%', bottom: '15%', duration: '9s', delay: '0s' },
  { left: '15%', bottom: '40%', duration: '11s', delay: '0.4s' },
  { left: '22%', bottom: '8%', duration: '13s', delay: '0.8s' },
  { left: '30%', bottom: '55%', duration: '10s', delay: '0.2s' },
  { left: '38%', bottom: '20%', duration: '14s', delay: '1.1s' },
  { left: '45%', bottom: '70%', duration: '12s', delay: '0.5s' },
  { left: '52%', bottom: '5%', duration: '15s', delay: '0.9s' },
  { left: '60%', bottom: '35%', duration: '11s', delay: '1.4s' },
  { left: '68%', bottom: '60%', duration: '13s', delay: '0.6s' },
  { left: '75%', bottom: '15%', duration: '16s', delay: '1.2s' },
  { left: '82%', bottom: '45%', duration: '10s', delay: '0.3s' },
  { left: '88%', bottom: '25%', duration: '14s', delay: '1.6s' },
  { left: '94%', bottom: '65%', duration: '12s', delay: '0.7s' },
  { left: '4%', bottom: '70%', duration: '15s', delay: '1.0s' },
];

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link
        rel="preload"
        href="/fonts/jetbrains-mono-latin.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <div className="bg-layer">
        <div className="bg-grid" />
      </div>
      <div className="bg-vignette" />
      <div className="bg-grain" />
      <div className="bg-scanlines" />
      <div className="bg-particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{ left: p.left, bottom: p.bottom, animationDuration: p.duration, animationDelay: p.delay }}
          />
        ))}
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
