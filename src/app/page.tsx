import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import LandingLayout from '@/components/layout/LandingLayout';
import NotasSection from '@/components/sections/NotasSection';

export default function Home() {
    return (
        <LandingLayout>
            <Hero />
            <Stats />
            <NotasSection />
        </LandingLayout>
    );
}