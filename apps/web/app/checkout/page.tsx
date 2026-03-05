'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { STORE_CONFIG } from '@/store.config';
import { getDeliveryFee } from '@/lib/delivery/fees';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [emirate, setEmirate] = useState<keyof typeof STORE_CONFIG.delivery.emirates>('Dubai');
  const { state, dispatch, totals } = useCart();
  const router = useRouter();
  const shipping = getDeliveryFee(emirate, totals.subtotal);

  return (
    <section className="section">
      <h1>Checkout</h1>
      <p>Step {step} of 4</p>
      <label htmlFor="emirate">Emirate</label>
      <select id="emirate" value={emirate} onChange={(e)=>setEmirate(e.target.value as keyof typeof STORE_CONFIG.delivery.emirates)}>
        {Object.keys(STORE_CONFIG.delivery.emirates).map((x)=><option key={x} value={x}>{x}</option>)}
      </select>
      <p>Shipping AED {shipping}</p>
      <p>Order total AED {totals.total + shipping}</p>
      <button onClick={()=>setStep((s)=>Math.max(1,s-1))}>Back</button>
      <button onClick={()=>setStep((s)=>Math.min(4,s+1))}>Next</button>
      {step===4?<form onSubmit={async (e)=>{e.preventDefault(); const id=`CB-${Date.now()}-${Math.floor(Math.random()*9000+1000)}`; const order={id,items:state.items,emirate,shipping}; localStorage.setItem('cb-last-order',JSON.stringify(order)); await fetch('/.netlify/functions/send-order-confirmation',{method:'POST',body:JSON.stringify(order)}).catch(()=>null); dispatch({type:'CLEAR_CART'}); router.push(`/order-success/?id=${id}`);}}><label htmlFor="phone">Phone (+971...)</label><input id="phone" pattern="^\+971[0-9]{8,9}$" required /><label htmlFor="email">Email</label><input id="email" type="email" required /><p>Payment: COD enabled</p>{STORE_CONFIG.checkout.cardCheckoutUrl?<a className="button secondary" href={STORE_CONFIG.checkout.cardCheckoutUrl} target="_blank" rel="noreferrer">{STORE_CONFIG.checkout.cardCheckoutLabel}</a>:<p>Card payments coming soon.</p>}<button className="button primary" type="submit">Place order</button></form>:null}
    </section>
  );
}
