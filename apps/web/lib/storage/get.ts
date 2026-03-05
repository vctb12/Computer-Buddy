import { safeJsonParse } from './safe-json';

export const storageGet = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  return safeJsonParse<T>(window.localStorage.getItem(key), fallback);
};
