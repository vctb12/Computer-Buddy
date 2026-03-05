'use client';
import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { products } from '@/data/products';
import { checkCpuMoboSocket, checkFormFactor, checkPsuWattage, checkRamType } from '@/lib/pc-builder';
import { useCart } from '@/context/cart-context';

export function BuilderClient() {
  const params = useSearchParams(); const router=useRouter(); const pathname=usePathname(); const {dispatch}=useCart();
  const get = (k:string)=>products.find((p)=>p.slug===params.get(k));
  const cpu=get('cpu'); const mobo=get('mobo'); const ram=get('ram'); const gpu=get('gpu'); const pcCase=get('case'); const psu=get('psu');
  const compat = useMemo(()=>({ socket: checkCpuMoboSocket(cpu,mobo), ram: checkRamType(mobo,ram), form: checkFormFactor(mobo,pcCase), psu: checkPsuWattage({cpu,gpu,psu}) }),[cpu,mobo,ram,pcCase,gpu,psu]);
  const set=(k:string,v:string)=>{const q=new URLSearchParams(params.toString()); q.set(k,v); router.replace(`${pathname}?${q}`)};
  const part=(label:string,key:string,list=products)=> <label>{label}<select value={params.get(key)??''} onChange={e=>set(key,e.target.value)}><option value="">Select</option>{list.map((p)=><option key={p.id} value={p.slug}>{p.title}</option>)}</select></label>;
  const selected=[cpu,mobo,ram,gpu,pcCase,psu].filter(Boolean) as typeof products;
  const total=selected.reduce((s,p)=>s+p.price_aed,0);
  return <section className="section"><h1>PC Builder</h1><div className="card">{part('CPU','cpu',products.filter(p=>p.category==='cpu'))}{part('MOBO','mobo',products.filter(p=>p.category==='mobo'))}{part('RAM','ram',products.filter(p=>p.category==='ram'))}{part('GPU','gpu',products.filter(p=>p.category==='gpu'))}{part('Case','case',products.filter(p=>p.category==='case'))}{part('PSU','psu',products.filter(p=>p.category==='psu'))}</div><div className="card"><h2>Compatibility</h2><p>CPU/MOBO: {String(compat.socket)}</p><p>RAM: {String(compat.ram)}</p><p>Form factor: {String(compat.form)}</p><p>PSU headroom: {String(compat.psu)}</p><p>Total AED {total}</p><button className="button primary" onClick={()=>selected.forEach((p)=>dispatch({type:'ADD_ITEM',product:p}))}>Add build to cart</button></div></section>;
}
