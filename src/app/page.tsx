import { Hero } from '@/components/sections/Hero';
import { Stats } from '@/components/sections/Stats';
import LandingLayout from '@/components/layout/LandingLayout';

export default function Home() {
    return (
        <LandingLayout>
            <Hero />
            <Stats />
        </LandingLayout>
    );
}