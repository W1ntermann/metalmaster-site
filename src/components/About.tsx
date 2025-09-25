import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Users, Settings, Award, Target, Lightbulb } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "Досвідчена команда",
      description: "Понад 10 років досвіду в обробці металу та роботі з промисловим обладнанням"
    },
    {
      icon: Settings,
      title: "Сучасне обладнання",
      description: "Найновіше лазерне обладнання європейських виробників з програмним управлінням"
    },
    {
      icon: Award,
      title: "Контроль якості",
      description: "Багаторівневий контроль якості на кожному етапі виробництва"
    },
    {
      icon: Target,
      title: "Індивідуальний підхід",
      description: "Розробляємо оптимальні рішення для кожного проекту з урахуванням специфіки"
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Про <span className="bg-gradient-laser bg-clip-text text-transparent">нашу компанію</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Армада Індастрі — це провідна компанія в сфері обробки металу в Одесі, 
            яка спеціалізується на високоточних лазерних технологіях
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Company Story */}
          <div className="space-y-6">
            <Card className="p-8 bg-card border-border shadow-card">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-laser rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Наша місія</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Забезпечувати українських виробників найкращими технологіями обробки металу, 
                    поєднуючи європейську якість з конкурентними цінами та індивідуальним підходом.
                  </p>
                </div>
              </div>
            </Card>

            <div className="bg-gradient-metal p-8 rounded-lg border border-border">
              <h4 className="text-xl font-semibold text-foreground mb-4">Чому ми?</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-foreground">Власне сучасне виробництво з повним циклом обробки</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-foreground">Екологічно чисті технології та матеріали</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-foreground">Гнучкі умови співпраці для бізнес-клієнтів</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <span className="text-foreground">Технічна підтримка на всіх етапах проекту</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Key Features Grid */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-glow transition-all duration-300 group">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-laser-pulse">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Stats */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                Наші досягнення
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-sm text-muted-foreground">Проектів виконано</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">10+</div>
                  <div className="text-sm text-muted-foreground">Років досвіду</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">Кольорів RAL</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">24г</div>
                  <div className="text-sm text-muted-foreground">Мін. час виконання</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-metal border-border shadow-metal">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Готові розпочати співпracю?
                </h3>
                <p className="text-muted-foreground">
                  Розкажіть нам про ваш проект — підберемо оптимальне рішення
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button variant="hero" onClick={scrollToContact} className="group">
                  <Zap className="h-4 w-4 mr-2 group-hover:animate-laser-pulse" />
                  Обговорити проект
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
