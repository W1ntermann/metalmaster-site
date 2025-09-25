import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Advantages from "@/components/Advantages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <Contact />
      <Advantages />
      <About />
      <Footer />
    </main>
  );
};

export default Index;
