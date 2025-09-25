import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, RotateCcw, Zap as Welding, Palette } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Zap,
      title: "Лазерна різка",
      description: "Високоточна різка металу товщиною до 25 мм. Мінімальні деформації, ідеальна якість кромки.",
      features: ["Точність ±0.1 мм", "Без деформацій", "Різні типи металу", "Серійне виробництво"]
    },
    {
      icon: RotateCcw,
      title: "Згинання металу",
      description: "Гнуття листового металу на сучасному обладнанні з програмним управлінням.",
      features: ["До 10 мм товщини", "Складні геометрії", "Повторюваність", "Швидке налаштування"]
    },
    {
      icon: Welding,
      title: "Лазерне зварювання",
      description: "Безконтактне зварювання з мінімальною зоною термічного впливу.",
      features: ["Висока якість шва", "Без деформацій", "Автоматизація", "Різні матеріали"]
    },
    {
      icon: Palette,
      title: "Порошкове фарбування",
      description: "Стійке покриття з широкою палітрою кольорів та фактур.",
      features: ["200+ кольорів RAL", "Різні фактури", "Корозійна стійкість", "Екологічність"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Наші <span className="bg-gradient-laser bg-clip-text text-transparent">послуги</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Повний цикл обробки металу на сучасному європейському обладнанні 
            з гарантією якості та дотриманням термінів
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="p-8 bg-card border-border shadow-card hover:shadow-metal transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-laser rounded-lg flex items-center justify-center group-hover:animate-laser-pulse">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Детальніше
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;