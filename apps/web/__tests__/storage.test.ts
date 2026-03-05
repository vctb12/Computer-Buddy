import { describe, it, expect } from 'vitest';
import { safeJsonParse } from '@/lib/storage/safe-json';

describe('storage safe parse', () => {
  it('returns fallback on invalid JSON', () => expect(safeJsonParse('{bad', { ok: true })).toEqual({ ok: true }));
  it('returns parsed object', () => expect(safeJsonParse('{"x":1}', { x: 0 })).toEqual({ x: 1 }));
});
