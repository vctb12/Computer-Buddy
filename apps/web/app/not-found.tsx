'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MonitorX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <div className="mx-auto flex items-center justify-center">
          <MonitorX className="text-red-500 h-16 w-16" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">404</h1>
          <p className="text-xl text-gray-300">Page Not Found</p>
        </div>
        <p className="text-gray-400">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button
          asChild
          variant="secondary"
          className="mx-auto flex items-center gap-2"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}