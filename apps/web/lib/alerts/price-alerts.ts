export interface PriceAlert { slug: string; target: number; }
export const isAlertTriggered = (price: number, target: number) => price <= target;
