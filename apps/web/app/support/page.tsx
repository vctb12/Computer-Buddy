'use client';
import { useState } from 'react';
import { NoticeRegion } from '@/components/notice-region';

export default function SupportPage() {
  const [msg, setMsg] = useState('');
  return <section className="section"><h1>Support</h1><div className="card-grid"><article className="card"><h2>WhatsApp</h2><p>+971 50 000 0000</p></article><article className="card"><h2>Phone</h2><p>+971 4 000 0000</p></article><article className="card"><h2>Email</h2><p>support@computerbuddy.ae</p></article></div><p>Sun–Thu 10:00–22:00, Fri–Sat 14:00–23:00</p><form onSubmit={(e)=>{e.preventDefault(); localStorage.setItem('cb-support','sent'); setMsg('Support request saved in demo mode.');}}><label htmlFor="email">Email</label><input id="email" required type="email"/><label htmlFor="details">Details</label><textarea id="details" required/><button className="button primary" type="submit">Send</button></form><NoticeRegion text={msg} /></section>;
}
