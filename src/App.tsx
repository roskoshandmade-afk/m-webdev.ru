import {useEffect, useRef, useState} from 'react';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {LeadCaptureSection} from './components/LeadCaptureSection';
import {NicheDemos} from './components/NicheDemos';
import {NichePreviewModal} from './components/NichePreviewModal';
import {PriceCalculator} from './components/PriceCalculator';
import {ProcessAndProof} from './components/ProcessAndProof';
import type {AddonId, NicheDemoCard, ProjectTypeId} from './data/studioData';
import {
  DEFAULT_CALCULATOR_STATE,
  loadCalculatorState,
  saveCalculatorState,
  type CalculatorState,
} from './utils/briefFormatter';

export default function App() {
  const [calcState, setCalcState] = useState<CalculatorState>(() => loadCalculatorState());
  const [activePreviewDemo, setActivePreviewDemo] = useState<NicheDemoCard | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    saveCalculatorState(calcState);
  }, [calcState]);

  const scrollToSection = (sectionId: string, focusNameInput = false) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    if (focusNameInput) {
      window.setTimeout(() => {
        nameInputRef.current?.focus({preventScroll: true});
      }, 450);
    }
  };

  const handleSelectProjectType = (projectTypeId: ProjectTypeId) => {
    setCalcState((prev) => ({...prev, projectTypeId}));
  };

  const handleToggleAddon = (addonId: AddonId) => {
    setCalcState((prev) => {
      const exists = prev.addonIds.includes(addonId);
      const nextAddons = exists
        ? prev.addonIds.filter((id) => id !== addonId)
        : [...prev.addonIds, addonId];
      return {...prev, addonIds: nextAddons};
    });
  };

  const handleClearNiche = () => {
    setCalcState((prev) => ({...prev, selectedNicheId: null}));
  };

  const handleResetCalculator = () => {
    setCalcState(DEFAULT_CALCULATOR_STATE);
  };

  const handleApplyDemoToCalculator = (demo: NicheDemoCard) => {
    setCalcState({
      projectTypeId: demo.recommendedProjectType,
      addonIds: demo.recommendedAddons,
      selectedNicheId: demo.id,
    });
    setActivePreviewDemo(null);
    scrollToSection('calculator');
  };

  return (
    <div className="min-h-screen bg-[#18181B] text-[#FAFAFA] flex flex-col">
      <Header onRequestPrototype={() => scrollToSection('lead-form', true)} />

      <main className="flex-1">
        <HeroSection
          onRequestPrototype={() => scrollToSection('lead-form', true)}
          onJumpToCalculator={() => scrollToSection('calculator')}
        />

        <PriceCalculator
          state={calcState}
          onSelectProjectType={handleSelectProjectType}
          onToggleAddon={handleToggleAddon}
          onClearNiche={handleClearNiche}
          onReset={handleResetCalculator}
          onProceedToLead={() => scrollToSection('lead-form', true)}
        />

        <NicheDemos
          selectedNicheId={calcState.selectedNicheId}
          onOpenPreview={(demo) => setActivePreviewDemo(demo)}
          onApplyDemoToCalculator={handleApplyDemoToCalculator}
        />

        <ProcessAndProof />

        <LeadCaptureSection calcState={calcState} nameInputRef={nameInputRef} />
      </main>

      <Footer />

      <NichePreviewModal
        demo={activePreviewDemo}
        onClose={() => setActivePreviewDemo(null)}
        onUseTemplate={handleApplyDemoToCalculator}
      />
    </div>
  );
}
