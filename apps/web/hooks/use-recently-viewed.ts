'use client';
import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import { storageGet } from '@/lib/storage/get';
import { storageSet } from '@/lib/storage/set';

export const useRecentlyViewed = () => {
  const [slugs, setSlugs] = useState<string[]>([]);
  useEffect(() => setSlugs(storageGet<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, [])), []);
  const add = (slug: string) => {
    const next = [slug, ...slugs.filter((s) => s !== slug)].slice(0, 20);
    setSlugs(next);
    storageSet(STORAGE_KEYS.RECENTLY_VIEWED, next);
  };
  return { slugs, add };
};
