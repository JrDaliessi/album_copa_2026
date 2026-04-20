import { Hero } from '@/features/landing/presentation/components/Hero';
import { GallerySection } from '@/features/landing/presentation/components/GallerySection';
import { BenefitsSection } from '@/features/landing/presentation/components/BenefitsSection';

import { Footer } from '@/features/landing/presentation/components/Footer';
import { FloatingCta } from '@/features/landing/presentation/components/FloatingCta';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090F]">
      <Hero />
      <GallerySection />
      <BenefitsSection />

      <Footer />
      <FloatingCta />
    </main>
  );
}
