import { Nav } from "./components/landing/Nav";
import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { LanguagesSection } from "./components/landing/LanguagesSection";
import { ProvidersSection } from "./components/landing/ProvidersSection";
import { CodeExamples } from "./components/landing/CodeExamples";
import { CTASection } from "./components/landing/CTASection";
import { Footer } from "./components/landing/Footer";

export default function Home() {
  return (
    <div className="max-w-full mx-auto">
      <Nav />
      <Hero />
      <HowItWorks />
      <LanguagesSection />
      <ProvidersSection />
      <CodeExamples />
      <CTASection />
      <Footer />
    </div>
  );
}
