import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SolutionSection from "@/components/SolutionSection";
import WhatWeBuildSection from "@/components/WhatWeBuildSection";
import DeliverySection from "@/components/DeliverySection";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SolutionSection />
      <WhatWeBuildSection />
      <DeliverySection />
      <DifferentiatorsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
