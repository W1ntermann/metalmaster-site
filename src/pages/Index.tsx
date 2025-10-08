import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import HowToOrder from "@/components/HowToOrder";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";

const Index = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Clients />
      <HowToOrder />
      <Contact />
      <Advantages />
      <About />
      <Footer />
      <ContactPopup />
    </main>
  );
};

export default Index;
