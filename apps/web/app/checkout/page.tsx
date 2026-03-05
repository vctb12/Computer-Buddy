'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/cart-context';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const { state, dispatch } = useCart();
  const router = useRouter();
  return <section className="section"><h1>Checkout</h1><p>Step {step} of 4</p><button onClick={()=>setStep((s)=>Math.max(1,s-1))}>Back</button><button onClick={()=>setStep((s)=>Math.min(4,s+1))}>Next</button>{step===4?<form onSubmit={(e)=>{e.preventDefault(); const id=`CB-${Date.now()}-${Math.floor(Math.random()*9000+1000)}`; localStorage.setItem('cb-last-order',JSON.stringify({id,items:state.items})); dispatch({type:'CLEAR_CART'}); router.push(`/order-success/?id=${id}`);}}><label htmlFor="phone">Phone (+971...)</label><input id="phone" pattern="^\+971[0-9]{8,9}$" required /><label htmlFor="email">Email</label><input id="email" type="email" required /><p>Payment: COD enabled · Card coming soon</p><button className="button primary" type="submit">Place order</button></form>:null}</section>;
}
