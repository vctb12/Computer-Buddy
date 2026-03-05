import { describe, it, expect } from 'vitest';
import { isAlertTriggered } from '@/lib/alerts/price-alerts';

describe('alerts', () => {
  it('triggers when price is below target', () => expect(isAlertTriggered(100, 120)).toBe(true));
  it('does not trigger when price is above target', () => expect(isAlertTriggered(130, 120)).toBe(false));
});
