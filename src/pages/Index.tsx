import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GlobeSection from "@/components/GlobeSection";
import SolutionSection from "@/components/SolutionSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <GlobeSection />
      <SolutionSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
