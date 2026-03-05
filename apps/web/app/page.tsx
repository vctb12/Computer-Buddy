'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Gamepad2, 
  Zap, 
  Shield, 
  Star, 
  ShoppingCart, 
  Search,
  Filter,
  Heart,
  Eye,
  TrendingUp,
  Gem,
  Headphones,
  Monitor,
  Cpu,
  Memory,
  HardDrive
} from 'lucide-react';


// Mock data for products
const mockProducts = [
  {
    name: 'Custom PC Builds',
    description: 'Choose performance targets and get pre-validated component combinations.',
  },
  {
    name: 'Gaming Upgrades',
    description: 'Find compatible GPUs, CPUs, RAM, and storage with clear generation guidance.',
  },
  {
    name: 'Creator & Streaming',
    description: 'Balanced setups for streaming, editing, and content production.',
  },
];

const trustSignals = [
  'Compatibility checks on every build path',
  'Human support from real PC specialists',
  'Accessible shopping flow designed for keyboard and screen-reader users',
  'Transparent delivery and warranty details',
];

const faqs = [
  {
    question: 'Why did I previously see a Netlify page-not-found screen?',
    answer:
      'The deployment pipeline has been aligned to publish the Next.js static export output folder directly, so root and published routes now resolve correctly.',
  },
  {
    question: 'How can I recover from a broken or old link?',
    answer:
      'Use the homepage navigation, or open our not-found page recovery links to return home or contact support.',
  },
  {
    question: 'Is this website usable without a mouse?',
    answer:
      'Yes. The site includes a skip link, visible keyboard focus, semantic landmarks, and clear heading structure.',
  },
];

export default function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header className="site-header" aria-label="Site header">
        <div className="container header-inner">
          <a className="logo" href="/" aria-label="Computer Buddy homepage">
            Computer Buddy
          </a>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#trust">Why us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <p className="eyebrow">Accessible by design</p>
            <h1 id="hero-title">Build, buy, and upgrade with confidence</h1>
            <p className="hero-copy">
              Computer Buddy helps gamers and creators choose reliable hardware with clear compatibility guidance,
              practical recommendations, and inclusive support.
            </p>
            <div className="hero-actions" role="group" aria-label="Primary actions">
              <a className="button primary" href="#solutions">Explore solutions</a>
              <a className="button secondary" href="#support">Contact support</a>
            </div>
          </div>
        </section>

        <section id="solutions" className="section" aria-labelledby="solutions-title">
          <div className="container">
            <h2 id="solutions-title">Featured solutions</h2>
            <ul className="card-grid" aria-label="Featured categories">
              {categories.map((category) => (
                <li key={category.name} className="card">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="trust" className="section muted" aria-labelledby="trust-title">
          <div className="container">
            <h2 id="trust-title">Why customers trust Computer Buddy</h2>
            <ul className="check-list">
              {trustSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="faq" className="section" aria-labelledby="faq-title">
          <div className="container">
            <h2 id="faq-title">Frequently asked questions</h2>
            <div className="faq-grid">
              {faqs.map((faq) => (
                <article key={faq.question} className="card">
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="support" className="section" aria-labelledby="support-title">
          <div className="container support-panel">
            <h2 id="support-title">Need help right now?</h2>
            <p>
              If you landed on an outdated URL, use our recovery options below. You can always return to the
              homepage or contact support directly.
            </p>
            <ul>
              <li><a href="/">Return to homepage</a></li>
              <li><a href="/404.html">Open the recovery page</a></li>
              <li><a href="mailto:support@computerbuddy.example">Email support</a></li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="site-footer" aria-label="Site footer">
        <div className="container">
          <p>© {new Date().getFullYear()} Computer Buddy. Accessible hardware guidance for every gamer.</p>
        </div>
      </footer>
    </>
  );
}
