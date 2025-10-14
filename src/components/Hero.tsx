import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-industrial.jpg";
const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Промислова обробка металу з лазерним різанням" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-laser bg-clip-text text-transparent">
              Послуги обробки металу 
            </span>
            <br />
            в Одесі
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">Повний спектр послуг з обробки металу: 
лазерна різка, згинання, лазерне зварювання та фарбування. Довговічне покриття, понад 200 кольорів RAL, екологічно чисті матеріали.</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <Button variant="hero" size="lg" onClick={scrollToContact} className="group">
              Замовити прорахунок
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToServices}>
              Наші послуги
            </Button>
          </div>

          {/* Key Features */}
        </div>
      </div>
    </section>;
};
export default Hero;