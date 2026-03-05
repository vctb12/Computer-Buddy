import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Computer Buddy - Premium Gaming Hardware & PC Components UAE',
  description: 'Shop the latest gaming PCs, graphics cards, processors, and accessories in the UAE. Fast delivery, competitive prices, and expert support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background font-sans antialiased')}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}