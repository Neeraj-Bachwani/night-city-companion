import './globals.css';


export const metadata = {
  title: 'Night City Companion',
  description: 'A cyberpunk dashboard interface for events, terminals, and more.',
  openGraph: {
    title: 'Night City Companion',
    description: 'A cyberpunk dashboard interface for events, terminals, and more.',
    images: [
      {
        url: 'https://night-city-companion.vercel.app/images/logo/Logo.png', 
        // width: 1200,
        // height: 630,
        alt: 'Night City Companion Logo',
      },
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <html>     
        <link rel="preload" href="/fonts/Clathax-Demo.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Rajdhani-Medium.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      <body className="min-h-screen bg-dark-primary text-neon-blue font-sans">
        {children}
      </body>
    </html>
  );
}