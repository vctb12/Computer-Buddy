import { describe, expect, it } from 'vitest';
import { getProductBySlug } from '@/data/products';
import { checkCpuMoboSocket, checkFormFactor, checkPsuWattage, checkRamType } from '@/lib/pc-builder';

describe('pc builder compatibility', () => {
  const cpu = getProductBySlug('amd-ryzen-7800x3d');
  const mobo = getProductBySlug('msi-b650-tomahawk');
  const ram = getProductBySlug('corsair-ddr5-32');
  const pcCase = getProductBySlug('nzxt-h7-flow');
  const gpu = getProductBySlug('nvidia-rtx-4080-super');
  const psu = getProductBySlug('corsair-rm850e');

  it('matches cpu and mobo socket', () => expect(checkCpuMoboSocket(cpu, mobo)).toBe(true));
  it('matches memory type', () => expect(checkRamType(mobo, ram)).toBe(true));
  it('matches form factor', () => expect(checkFormFactor(mobo, pcCase)).toBe(true));
  it('checks psu wattage', () => expect(checkPsuWattage({ cpu, gpu, psu })).toBe(true));
});
