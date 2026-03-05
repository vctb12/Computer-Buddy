'use client';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';

export default function CartPage() {
  const { state, dispatch, totals } = useCart();
  return <section className="section"><h1>Cart</h1>{state.items.length===0?<p>Your cart is empty.</p>:<ul>{state.items.map((i)=><li key={i.product.id} className="card"><p>{i.product.title}</p><p>AED {i.product.price_aed}</p><label>Qty <input type="number" value={i.quantity} min={1} onChange={(e)=>dispatch({type:'UPDATE_QUANTITY',id:i.product.id,quantity:Number(e.target.value)})}/></label><button onClick={()=>dispatch({type:'SAVE_FOR_LATER',id:i.product.id})}>Save for later</button><button onClick={()=>dispatch({type:'REMOVE_ITEM',id:i.product.id})}>Remove</button></li>)}</ul>}<div className="card"><label htmlFor="promo">Promo</label><input id="promo" onBlur={(e)=>dispatch({type:'APPLY_PROMO',code:e.target.value})} placeholder="BUDDY15"/><p>Subtotal AED {totals.subtotal}</p><p>Discount AED {totals.discount}</p><p>VAT AED {totals.vatAmount}</p><p>Total AED {totals.total}</p><p>{totals.message}</p>{state.items.length>0?<Link className="button primary" href="/checkout/">Checkout</Link>:null}</div></section>;
}
