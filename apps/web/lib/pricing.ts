export interface CartLine { id: number; price_aed: number; quantity: number; }

export function applyPromo(code: string | undefined, subtotal: number) {
  if (!code) return { discount: 0, message: 'No promo applied.' };
  if (code.toUpperCase() === 'BUDDY15' && subtotal >= 500) {
    return { discount: Number((subtotal * 0.15).toFixed(2)), message: 'BUDDY15 applied (15% off).' };
  }
  return { discount: 0, message: 'Promo invalid or minimum AED 500 not reached.' };
}

export function calculateVat(amountAfterDiscount: number) {
  if (amountAfterDiscount > 5000) return 0;
  return Number((amountAfterDiscount * 0.05).toFixed(2));
}

export function calculateTotal(items: CartLine[], promoCode?: string) {
  const subtotal = Number(items.reduce((sum, i) => sum + i.price_aed * i.quantity, 0).toFixed(2));
  const promo = applyPromo(promoCode, subtotal);
  const amountAfterDiscount = Number(Math.max(0, subtotal - promo.discount).toFixed(2));
  const vatAmount = calculateVat(amountAfterDiscount);
  const total = Number((amountAfterDiscount + vatAmount).toFixed(2));
  return {
    subtotal,
    discount: promo.discount,
    vatAmount,
    total,
    message: vatAmount === 0 ? `${promo.message} VAT waived for orders above AED 5,000.` : promo.message,
  };
}
