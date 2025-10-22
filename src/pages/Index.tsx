import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowToOrder from "@/components/HowToOrder";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import SEOHead from "@/components/SEOHead";
import { seoPages } from "@/utils/seo";

const Index = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <SEOHead seoData={seoPages.home} />
      <Header />
      <Hero />
      <Services />
      <Advantages />
      <HowToOrder />
      <Contact />
      <About />
      <FAQ />
      <Footer />
      <ContactPopup />
    </main>
  );
};

export default Index;
