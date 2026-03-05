export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  reading_time: string;
  cover_image: string;
  tags: string[];
}

const long = (title: string) => `${title}\n\n` + 'In the UAE gaming scene, performance and reliability matter as much as aesthetics. '.repeat(40);

export const blogPosts: BlogPost[] = [
  { id: 1, slug: 'best-gaming-setups-2026-aed-tiers', title: 'Best Gaming Setups in 2026 (AED Tiers)', excerpt: 'From AED 3,500 to AED 15,000, choose the right setup tier for your goals.', content: long('Best Gaming Setups in 2026 (AED Tiers)'), author: 'Computer Buddy Editorial', date: '2026-01-18', reading_time: '7 min read', cover_image: 'https://placehold.co/1200x600/0D0D18/00F0A0?text=Best+Gaming+Setups+2026', tags: ['gaming', 'uae', 'budget'] },
  { id: 2, slug: 'build-vs-buy-uae-guide', title: 'Build vs Buy in the UAE: Which Is Better?', excerpt: 'A practical UAE-first guide to prebuilt vs custom gaming PCs.', content: long('Build vs Buy in the UAE'), author: 'Aisha K.', date: '2026-02-02', reading_time: '6 min read', cover_image: 'https://placehold.co/1200x600/0D0D18/00F0A0?text=Build+vs+Buy+UAE', tags: ['build', 'prebuilt'] },
  { id: 3, slug: 'cooling-your-pc-in-gulf-summer', title: 'Keeping Your PC Cool in Gulf Summer', excerpt: 'Cooling strategies for UAE ambient temperatures and dust conditions.', content: long('Keeping Your PC Cool in Gulf Summer'), author: 'Omar R.', date: '2026-02-20', reading_time: '8 min read', cover_image: 'https://placehold.co/1200x600/0D0D18/00F0A0?text=Gulf+Summer+PC+Cooling', tags: ['cooling', 'maintenance'] },
  { id: 4, slug: 'top-accessories-for-competitive-gamers', title: 'Top Accessories for Competitive Gamers', excerpt: 'Mice, keyboards, headsets, and monitors that improve consistency.', content: long('Top Accessories for Competitive Gamers'), author: 'Computer Buddy Pro Team', date: '2026-03-01', reading_time: '5 min read', cover_image: 'https://placehold.co/1200x600/0D0D18/00F0A0?text=Top+Accessories', tags: ['esports', 'accessories'] },
];
