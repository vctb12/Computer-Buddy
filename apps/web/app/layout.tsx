import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SkipLink } from '@/components/skip-link';
import { WhatsAppButton } from '@/components/whatsapp-button';

export const metadata: Metadata = {
  title: 'Computer Buddy UAE | Premium Gaming Storefront',
  description: 'Premium UAE gaming hardware store with AED pricing, COD, PC Builder, and fast emirates delivery.',
  openGraph: { locale: 'en_AE', title: 'Computer Buddy UAE', description: 'Premium UAE gaming storefront.' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SkipLink />
        <Providers>
          <Header />
          <main id="main" className="container page-shell">{children}</main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
