import { AboutMissionSection } from '@/components/sections/AboutMissionSection';
import { WhyChooseSection } from '@/components/sections/WhyChooseSection';
import { CTASection } from '@/components/sections/CTASection';

export const metadata = {
  title: 'About InvestAI — Mission, Core Values, & Leadership Team',
  description:
    'Learn about InvestAI\'s mission to democratize access to cutting-edge AI and crypto investment opportunities. Founded in 2020, managing over $2.5B in assets for 50,000+ investors.',
};

export default function AboutPage() {
  return (
    <div className="pt-20 bg-[#08090d]">
      <AboutMissionSection />
      <WhyChooseSection />
      <CTASection />
    </div>
  );
}
