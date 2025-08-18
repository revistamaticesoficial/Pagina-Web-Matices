import { Hero } from '@/components/sections/Hero';
import { FeaturedArticles } from '@/components/sections/FeaturedArticles';
import { BusinessDirectory } from '@/components/sections/BusinessDirectory';
import { Newsletter } from '@/components/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedArticles />
      <BusinessDirectory />
      <Newsletter />
    </>
  );
}
