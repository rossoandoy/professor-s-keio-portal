import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ResearchSection from "@/components/ResearchSection";
import PublicationsSection from "@/components/PublicationsSection";
import CareerSection from "@/components/CareerSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ResearchSection />
      <PublicationsSection />
      <CareerSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
