import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import LandingLayout from '@/components/layout/LandingLayout';
import NotasSection from '@/components/sections/NotasSection';
import CTA from '@/components/sections/CTA';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
    return (
        <LandingLayout>
            <Hero />
            <Stats />
            <NotasSection />
            <CTA />
            <Contact />
        </LandingLayout>
    );
}