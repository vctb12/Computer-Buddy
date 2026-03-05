import { describe, expect, it } from 'vitest';
import { applyPromo, calculateTotal, calculateVat } from '@/lib/pricing';

describe('pricing', () => {
  it('applies buddy15 only above minimum', () => {
    expect(applyPromo('BUDDY15', 400).discount).toBe(0);
    expect(applyPromo('BUDDY15', 500).discount).toBe(75);
  });

  it('waives VAT above 5000 after discount', () => {
    expect(calculateVat(5001)).toBe(0);
    expect(calculateVat(5000)).toBe(250);
  });

  it('calculates totals', () => {
    const t = calculateTotal([{ id: 1, price_aed: 1000, quantity: 2 }], 'BUDDY15');
    expect(t.subtotal).toBe(2000);
    expect(t.discount).toBe(300);
    expect(t.vatAmount).toBe(85);
    expect(t.total).toBe(1785);
  });
});
