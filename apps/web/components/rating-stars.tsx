export function RatingStars({ rating }: { rating: number }) {
  return <p aria-label={`Rating ${rating} out of 5`}>{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</p>;
}
