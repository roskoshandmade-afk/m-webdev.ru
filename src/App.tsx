import {useEffect, useRef, useState} from 'react';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {LeadCaptureSection} from './components/LeadCaptureSection';
import {ProcessAndProof} from './components/ProcessAndProof';
import {ServicesAndCalculator} from './components/ServicesAndCalculator';
import type {AddonId, ServiceOption} from './data/studioData';
import {
  DEFAULT_CALCULATOR_STATE,
  loadCalculatorState,
  saveCalculatorState,
  type CalculatorState,
} from './utils/briefFormatter';

export default function App() {
  const [calcState, setCalcState] = useState<CalculatorState>(() => loadCalculatorState());
  const contactInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    saveCalculatorState(calcState);
  }, [calcState]);

  const scrollToSection = (sectionId: string, focusContactInput = false) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
    if (focusContactInput) {
      window.setTimeout(() => {
        contactInputRef.current?.focus({preventScroll: true});
      }, 450);
    }
  };

  const handleSelectService = (service: ServiceOption) => {
    setCalcState((prev) => {
      if (service.kind === 'primary') {
        const nextAddons =
          service.alsoAddAddonId && !prev.addonIds.includes(service.alsoAddAddonId)
            ? [...prev.addonIds, service.alsoAddAddonId]
            : prev.addonIds;
        return {
          primaryServiceId: service.id,
          addonIds: nextAddons,
        };
      }

      if (!service.addonId) {
        return prev;
      }

      const exists = prev.addonIds.includes(service.addonId);
      const nextAddons = exists
        ? prev.addonIds.filter((id) => id !== service.addonId)
        : [...prev.addonIds, service.addonId];

      return {
        ...prev,
        addonIds: nextAddons,
      };
    });
  };

  const handleToggleAddon = (addonId: AddonId) => {
    setCalcState((prev) => {
      const exists = prev.addonIds.includes(addonId);
      const nextAddons = exists
        ? prev.addonIds.filter((id) => id !== addonId)
        : [...prev.addonIds, addonId];
      return {
        ...prev,
        addonIds: nextAddons,
      };
    });
  };

  const handleResetCalculator = () => {
    setCalcState(DEFAULT_CALCULATOR_STATE);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A] flex flex-col">
      <Header onRequestPrototype={() => scrollToSection('lead-form', true)} />

      <main className="flex-1">
        <HeroSection
          onRequestPrototype={() => scrollToSection('lead-form', true)}
          onJumpToCalculator={() => scrollToSection('calculator')}
        />

        <ServicesAndCalculator
          calcState={calcState}
          onSelectService={handleSelectService}
          onToggleAddon={handleToggleAddon}
          onReset={handleResetCalculator}
          onProceedToLead={() => scrollToSection('lead-form', true)}
        />

        <ProcessAndProof />

        <LeadCaptureSection calcState={calcState} nameInputRef={contactInputRef} />
      </main>

      <Footer />
    </div>
  );
}
