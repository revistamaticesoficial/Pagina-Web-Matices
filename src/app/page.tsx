import { HeroHome } from '@/components/screens/landing/Hero';
import { Stats } from '@/components/sections/Stats';
import LandingLayout from '@/components/layout/LandingLayout';
import ComerciosSection from '@/components/sections/ComerciosSection';
import ArticulosSection from '@/components/sections/ArticulosSection';
import CTA from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';
import { AnnouncementProvider } from '@/components/AnnouncementProvider';

export default function Home() {
    return (
        <LandingLayout>
            <HeroHome />
            <Stats />
            <ComerciosSection />
            <CTA />
            <ArticulosSection />
            <Contact />
            
            {/* Popup de anuncios */}
            <AnnouncementProvider />
        </LandingLayout>
    );
}