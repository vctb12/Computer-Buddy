import { describe, it, expect } from 'vitest';
import { encodeBuild, decodeBuild } from '@/lib/builder/share';

describe('builder share', () => {
  it('encodes and decodes build state', () => {
    const raw = encodeBuild({ cpu: 'x', gpu: 'y' });
    expect(decodeBuild(raw)).toEqual({ cpu: 'x', gpu: 'y' });
  });
});
