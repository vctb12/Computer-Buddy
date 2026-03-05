import { STORAGE_KEYS } from './keys';

export const migrateStorage = () => {
  if (typeof window === 'undefined') return;
  const legacy = window.localStorage.getItem('cb-cart');
  if (legacy && !window.localStorage.getItem(STORAGE_KEYS.CART)) {
    window.localStorage.setItem(STORAGE_KEYS.CART, legacy);
  }
};
