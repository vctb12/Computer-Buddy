import type { Product } from '@/data/products';

export const checkCpuMoboSocket = (cpu?: Product, mobo?: Product) => {
  if (!cpu || !mobo) return false;
  return cpu.specs.Socket === mobo.specs.Socket;
};

export const checkRamType = (mobo?: Product, ram?: Product) => {
  if (!mobo || !ram) return false;
  return mobo.specs['Memory Type'] === ram.specs.Type;
};

export const checkFormFactor = (mobo?: Product, pcCase?: Product) => {
  if (!mobo || !pcCase) return false;
  const supported = String(pcCase.specs['Supported Form Factor'] ?? '').split(',');
  return supported.includes(String(mobo.specs['Form Factor']));
};

export const checkPsuWattage = (parts: { cpu?: Product; gpu?: Product; psu?: Product }) => {
  if (!parts.cpu || !parts.gpu || !parts.psu) return false;
  const draw = Number(parts.cpu.specs.TDP ?? 0) + Number(parts.gpu.specs.TGP ?? 0) + 150;
  return Number(parts.psu.specs.Wattage ?? 0) >= draw;
};
