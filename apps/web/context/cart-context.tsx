'use client';
import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Product } from '@/data/products';
import { calculateTotal } from '@/lib/pricing';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import { storageGet } from '@/lib/storage/get';
import { storageSet } from '@/lib/storage/set';
import { migrateStorage } from '@/lib/storage/migrate';

type Line = { product: Product; quantity: number };
type State = { items: Line[]; saved: Line[]; promoCode?: string };
type Action =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; id: number }
  | { type: 'UPDATE_QUANTITY'; id: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SAVE_FOR_LATER'; id: number }
  | { type: 'MOVE_TO_CART'; id: number }
  | { type: 'APPLY_PROMO'; code: string };

const CartContext = createContext<null | {
  state: State;
  dispatch: React.Dispatch<Action>;
  totals: ReturnType<typeof calculateTotal>;
  count: number;
}>(null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const found = state.items.find((i) => i.product.id === action.product.id);
      if (found) return { ...state, items: state.items.map((i) => i.product.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i) };
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case 'REMOVE_ITEM': return { ...state, items: state.items.filter((i) => i.product.id !== action.id) };
    case 'UPDATE_QUANTITY': return { ...state, items: state.items.map((i) => i.product.id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i) };
    case 'CLEAR_CART': return { ...state, items: [] };
    case 'SAVE_FOR_LATER': {
      const line = state.items.find((i) => i.product.id === action.id);
      if (!line) return state;
      return { ...state, items: state.items.filter((i) => i.product.id !== action.id), saved: [...state.saved, line] };
    }
    case 'MOVE_TO_CART': {
      const line = state.saved.find((i) => i.product.id === action.id);
      if (!line) return state;
      return { ...state, saved: state.saved.filter((i) => i.product.id !== action.id), items: [...state.items, line] };
    }
    case 'APPLY_PROMO': return { ...state, promoCode: action.code };
    default: return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], saved: [], promoCode: undefined });

  useEffect(() => {
    migrateStorage();
    const parsed = storageGet<State>(STORAGE_KEYS.CART, { items: [], saved: [], promoCode: undefined });
    parsed.items.forEach((x) => dispatch({ type: 'ADD_ITEM', product: x.product }));
  }, []);

  useEffect(() => {
    storageSet(STORAGE_KEYS.CART, state);
  }, [state]);

  const totals = useMemo(
    () => calculateTotal(state.items.map((i) => ({ id: i.product.id, price_aed: i.product.price_aed, quantity: i.quantity })), state.promoCode),
    [state.items, state.promoCode]
  );
  const count = state.items.reduce((sum, i) => sum + i.quantity, 0);

  return <CartContext.Provider value={{ state, dispatch, totals, count }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
