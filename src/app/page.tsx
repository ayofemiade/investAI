import { HeroSection } from '@/components/sections/HeroSection';
import { AIvsTraditionalSection } from '@/components/sections/AIvsTraditionalSection';
import { OrbitalEcosystemSection } from '@/components/sections/OrbitalEcosystemSection';
import { TrustVaultSection } from '@/components/sections/TrustVaultSection';
import { EngineSection } from '@/components/sections/EngineSection';
import { SimulatorSection } from '@/components/sections/SimulatorSection';
import { CTASection } from '@/components/sections/CTASection';

export default function Home() {
  return (
    <div className="relative bg-[#08090d] overflow-hidden">
      {/* Section 1: Why trust AI with my capital? */}
      <HeroSection />

      {/* Section 2: Why AI instead of traditional investing? */}
      <AIvsTraditionalSection />

      {/* Section 3: Why InvestAI instead of everyone else? */}
      <OrbitalEcosystemSection />

      {/* Section 4: Can I actually trust these people & infrastructure? */}
      <TrustVaultSection />

      {/* Section 5: What happens behind the scenes? */}
      <EngineSection />

      {/* Section 6: What results can I expect? */}
      <SimulatorSection />

      {/* Section 7: Why should I join today? */}
      <CTASection />
    </div>
  );
}
