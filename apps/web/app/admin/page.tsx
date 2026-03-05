'use client';
import { useState } from 'react';
import { products } from '@/data/products';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import { storageSet } from '@/lib/storage/set';
import { storageGet } from '@/lib/storage/get';

export default function AdminDemoPage() {
  const [snapshot, setSnapshot] = useState('');
  return (
    <section className="section">
      <h1>Admin Demo</h1>
      <p>Local-only product snapshot tools.</p>
      <button className="button" onClick={() => setSnapshot(JSON.stringify(products.slice(0, 30), null, 2))}>Generate snapshot</button>
      <textarea value={snapshot} onChange={(e) => setSnapshot(e.target.value)} rows={10} />
      <button className="button" onClick={() => storageSet(STORAGE_KEYS.ADMIN_PRODUCTS, snapshot)}>Save Snapshot</button>
      <button className="button" onClick={() => setSnapshot(String(storageGet(STORAGE_KEYS.ADMIN_PRODUCTS, '')))}>Load Snapshot</button>
    </section>
  );
}
