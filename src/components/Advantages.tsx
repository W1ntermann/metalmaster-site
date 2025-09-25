import { Card } from "@/components/ui/card";
import { Shield, Clock, Palette, Zap, DollarSign, Award } from "lucide-react";

const Advantages = () => {
  const advantages = [
    {
      icon: Shield,
      title: "Стійкість покриття",
      description: "Захист від корозії, ультрафіолету та механічних пошкоджень на роки",
      highlight: "До 25 років"
    },
    {
      icon: DollarSign,
      title: "Економія коштів",
      description: "Довговічне покриття без потреби в частих ремонтах чи перефарбовуванні",
      highlight: "До 70% економії"
    },
    {
      icon: Palette,
      title: "Естетика + бренд",
      description: "Понад 200 кольорів RAL і різні фактури: глянець, мат, шорсткість, металік",
      highlight: "200+ кольорів"
    },
    {
      icon: Zap,
      title: "Гнучкість виробництва",
      description: "Фарбуємо як одиничні вироби, так і серійні партії будь-якого обсягу",
      highlight: "Від 1 штуки"
    },
    {
      icon: Clock,
      title: "Швидкість виконання",
      description: "Експрес-обробка металу від 24 годин залежно від складності та обсягів",
      highlight: "Від 24 годин"
    },
    {
      icon: Award,
      title: "Гарантія якості",
      description: "Контроль на всіх етапах виробництва, екологічно чисті матеріали",
      highlight: "100% контроль"
    }
  ];

  return (
    <section id="advantages" className="py-20 bg-gradient-metal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Чому обирають <span className="bg-gradient-laser bg-clip-text text-transparent">нас</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ми працюємо з найсучаснішим обладнанням та матеріалами, 
            гарантуючи найвищу якість і надійність для вашого бізнесу
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-glow transition-all duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center mb-4 group-hover:animate-laser-pulse">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <div className="text-2xl font-bold text-primary mb-2">
                    {advantage.highlight}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {advantage.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 p-6 bg-primary/10 border border-primary/20 rounded-2xl">
            <Zap className="h-8 w-8 text-primary animate-laser-pulse" />
            <div className="text-left">
              <div className="text-lg font-semibold text-foreground">
                Готові до співпраці?
              </div>
              <div className="text-muted-foreground">
                Зв'яжіться з нами для консультації та розрахунку вартості
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;