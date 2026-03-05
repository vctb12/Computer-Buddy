export function PriceDisplay({ price, compareAt }: { price: number; compareAt?: number }) {
  const f = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 });
  return <p>{f.format(price)} {compareAt ? <span className="muted"> <s>{f.format(compareAt)}</s></span> : null}</p>;
}
