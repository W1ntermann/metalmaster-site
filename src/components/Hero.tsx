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
        <div className="max-w-4xl">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium">
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-laser bg-clip-text text-transparent">
              Лазерні технології
            </span>
            <br />
            для вашого бізнесу
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">Повний спектр послуг з обробки металу: 
лазерна різка, згинання, лазерне зварювання та фарбування. Довговічне покриття, понад 200 кольорів RAL, екологічно чисті матеріали.</p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="hero" size="lg" onClick={scrollToContact} className="group">
              Замовити прорахунок
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToServices}>
              Наші послуги
            </Button>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
              <Zap className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center gap-3 p-4 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
              <Zap className="h-8 w-8 text-primary animate-laser-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;