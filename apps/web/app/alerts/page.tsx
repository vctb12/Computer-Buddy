'use client';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import { storageGet } from '@/lib/storage/get';
import { storageSet } from '@/lib/storage/set';
import { getProductBySlug } from '@/data/products';
import { isAlertTriggered, type PriceAlert } from '@/lib/alerts/price-alerts';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  useEffect(() => setAlerts(storageGet<PriceAlert[]>(STORAGE_KEYS.ALERTS, [])), []);
  const clear = () => { setAlerts([]); storageSet(STORAGE_KEYS.ALERTS, []); };

  return (
    <section className="section">
      <h1>Price Drop Alerts</h1>
      <button className="button" onClick={clear}>Clear</button>
      <div className="card-grid">
        {alerts.map((a) => {
          const p = getProductBySlug(a.slug);
          if (!p) return null;
          return <article key={a.slug} className="card"><h2>{p.title}</h2><p>Target AED {a.target}</p><p>Status: {isAlertTriggered(p.price_aed, a.target) ? 'Triggered' : 'Watching'}</p></article>;
        })}
      </div>
    </section>
  );
}
