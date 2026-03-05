import { STORE_CONFIG } from '@/store.config';

export const getDeliveryFee = (emirate: keyof typeof STORE_CONFIG.delivery.emirates, subtotal: number) => {
  if (subtotal >= STORE_CONFIG.delivery.freeThresholdAed) return 0;
  return STORE_CONFIG.delivery.emirates[emirate] ?? 25;
};
