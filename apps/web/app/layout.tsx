import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Buddy | Accessible PC Builds & Gaming Hardware',
  description:
    'Computer Buddy helps gamers and creators shop accessible, compatible PC hardware with clear guidance and human support.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
