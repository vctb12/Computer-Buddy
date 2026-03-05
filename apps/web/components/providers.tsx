'use client';

import { ThemeProvider } from '@/providers/theme-provider';
import { CartProvider } from '@/context/cart-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  );
}