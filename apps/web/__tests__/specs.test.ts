import { describe, it, expect } from 'vitest';
import { parseConnectorCount, parseMm, parseWatts } from '@/lib/specs/parse';

describe('spec parsers', () => {
  it('parses watts', () => expect(parseWatts('850W')).toBe(850));
  it('parses mm', () => expect(parseMm('360 mm')).toBe(360));
  it('parses connector count', () => expect(parseConnectorCount('2x8pin')).toBe(2));
});
