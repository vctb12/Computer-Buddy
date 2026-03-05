export const getDeliveryEstimate = (emirate: string) => {
  if (emirate === 'Dubai') return 'Same day';
  if (emirate === 'Abu Dhabi' || emirate === 'Sharjah') return 'Next day';
  return '1-2 days';
};
