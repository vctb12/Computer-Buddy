import { Suspense } from 'react';
import { BuilderClient } from './builder-client';

export default function BuilderPage() {
  return <Suspense fallback={<p>Loading builder...</p>}><BuilderClient /></Suspense>;
}
