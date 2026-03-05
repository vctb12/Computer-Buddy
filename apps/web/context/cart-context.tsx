'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price_aed: number;
}

interface CartState {
  items: CartItem[];
  savedItems: CartItem[];
  promoCode: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { productId: string; quantity: number; price_aed: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SAVE_FOR_LATER'; payload: { productId: string } }
  | { type: 'MOVE_TO_CART'; payload: { productId: string } }
  | { type: 'APPLY_PROMO'; payload: { code: string } };

const initialState: CartState = {
  items: [],
  savedItems: [],
  promoCode: null,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: `${action.payload.productId}-${Date.now()}`,
            productId: action.payload.productId,
            quantity: action.payload.quantity,
            price_aed: action.payload.price_aed,
          },
        ],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload.productId),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [], promoCode: null };
    case 'SAVE_FOR_LATER': {
      const itemToSave = state.items.find(item => item.productId === action.payload.productId);
      if (itemToSave) {
        return {
          ...state,
          items: state.items.filter(item => item.productId !== action.payload.productId),
          savedItems: [...state.savedItems, itemToSave],
        };
      }
      return state;
    }
    case 'MOVE_TO_CART': {
      const itemToMove = state.savedItems.find(item => item.productId === action.payload.productId);
      if (itemToMove) {
        return {
          ...state,
          savedItems: state.savedItems.filter(item => item.productId !== action.payload.productId),
          items: [...state.items, itemToMove],
        };
      }
      return state;
    }
    case 'APPLY_PROMO':
      return {
        ...state,
        promoCode: action.payload.code,
      };
    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  React.useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        // Validate the structure before applying
        if (Array.isArray(parsed.items) && Array.isArray(parsed.savedItems)) {
          // Dispatch actions to restore state
          dispatch({ type: 'CLEAR_CART' });
          parsed.items.forEach((item: CartItem) => {
            dispatch({
              type: 'ADD_ITEM',
              payload: { productId: item.productId, quantity: item.quantity, price_aed: item.price_aed }
            });
          });
          parsed.savedItems.forEach((item: CartItem) => {
            // Need to save items again to move them to savedItems
            dispatch({ type: 'SAVE_FOR_LATER', payload: { productId: item.productId } });
          });
          if (parsed.promoCode) {
            dispatch({ type: 'APPLY_PROMO', payload: { code: parsed.promoCode } });
          }
        }
      } catch (e) {
        console.error('Failed to parse cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever state changes
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}