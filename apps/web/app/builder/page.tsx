'use client';

import { useMemo, useState } from 'react';
import { products } from '@/data/products';
import { checkCpuMoboSocket, checkFormFactor, checkPsuWattage, checkRamType } from '@/lib/pc-builder';
import { useCart } from '@/context/cart-context';

export default function BuilderPage() {
  const { dispatch } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>({});

  const pick = (k: string) => products.find((p) => p.slug === selected[k]);
  const cpu = pick('cpu');
  const mobo = pick('mobo');
  const ram = pick('ram');
  const gpu = pick('gpu');
  const pcCase = pick('case');
  const psu = pick('psu');

  const compat = useMemo(
    () => ({
      socket: checkCpuMoboSocket(cpu, mobo),
      ram: checkRamType(mobo, ram),
      form: checkFormFactor(mobo, pcCase),
      psu: checkPsuWattage({ cpu, gpu, psu }),
    }),
    [cpu, mobo, ram, pcCase, gpu, psu]
  );

  const part = (label: string, key: string, list = products) => (
    <label>
      {label}
      <select value={selected[key] ?? ''} onChange={(e) => setSelected((s) => ({ ...s, [key]: e.target.value }))}>
        <option value="">Select</option>
        {list.map((p) => (
          <option key={p.id} value={p.slug}>{p.title}</option>
        ))}
      </select>
    </label>
  );

  const chosen = [cpu, mobo, ram, gpu, pcCase, psu].filter(Boolean) as typeof products;
  const total = chosen.reduce((s, p) => s + p.price_aed, 0);

  return (
    <section className="section">
      <h1>PC Builder</h1>
      <div className="card">
        {part('CPU', 'cpu', products.filter((p) => p.category === 'cpu'))}
        {part('MOBO', 'mobo', products.filter((p) => p.category === 'mobo'))}
        {part('RAM', 'ram', products.filter((p) => p.category === 'ram'))}
        {part('GPU', 'gpu', products.filter((p) => p.category === 'gpu'))}
        {part('Case', 'case', products.filter((p) => p.category === 'case'))}
        {part('PSU', 'psu', products.filter((p) => p.category === 'psu'))}
      </div>
      <div className="card">
        <h2>Compatibility</h2>
        <p>CPU/MOBO: {String(compat.socket)}</p>
        <p>RAM: {String(compat.ram)}</p>
        <p>Form factor: {String(compat.form)}</p>
        <p>PSU headroom: {String(compat.psu)}</p>
        <p>Total AED {total}</p>
        <button className="button primary" onClick={() => chosen.forEach((p) => dispatch({ type: 'ADD_ITEM', product: p }))}>
          Add build to cart
        </button>
      </div>
    </section>
  );
}
