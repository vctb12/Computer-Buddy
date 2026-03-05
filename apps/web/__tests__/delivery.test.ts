import { describe, it, expect } from 'vitest';
import { getDeliveryFee } from '@/lib/delivery/fees';

describe('delivery fees', () => {
  it('waives shipping above threshold', () => expect(getDeliveryFee('Dubai', 2000)).toBe(0));
  it('applies fee below threshold', () => expect(getDeliveryFee('Dubai', 100)).toBe(15));
});
