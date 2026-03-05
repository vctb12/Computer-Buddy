import { HeroSection } from '@/app/marketing/sections/hero';
import { TrustSection } from '@/app/marketing/sections/trust';
import { CategoriesSection } from '@/app/marketing/sections/categories';
import { FeaturedSection } from '@/app/marketing/sections/featured';
import { DealSection } from '@/app/marketing/sections/deal';
import { WhySection } from '@/app/marketing/sections/why';
import { ReviewsSection } from '@/app/marketing/sections/reviews';
import { NewsletterSection } from '@/app/marketing/sections/newsletter';
import { FaqctaSection } from '@/app/marketing/sections/faqcta';
import { FinalctaSection } from '@/app/marketing/sections/finalcta';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <CategoriesSection />
      <FeaturedSection />
      <DealSection />
      <WhySection />
      <ReviewsSection />
      <NewsletterSection />
      <FaqctaSection />
      <FinalctaSection />
    </>
  );
}
