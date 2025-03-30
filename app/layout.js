import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Night City Companion',
  description: 'A cyberpunk dashboard interface for events, terminals, and more.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <title>Night City Companion</title>
        <meta name="description" content="A cyberpunk dashboard interface for events, terminals, and more." /> 
        <meta property="og:title" content="Night City Companion" />  
        <meta property="og:description" content="A cyberpunk dashboard interface for events, terminals, and more." />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
