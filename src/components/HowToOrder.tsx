import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, FileText, Settings, Truck, CheckCircle, ArrowRight } from "lucide-react";
import howToOrderImage from "@/assets/how-to-order.jpg";

const HowToOrder = () => {
  const steps = [
    {
      number: "01",
      icon: Phone,
      title: "Зв'яжіться з нами",
      description: "Телефонуйте або залишайте заявку на сайті. Наш менеджер зв'яжеться з вами протягом 15 хвилин",
      details: ["Безкоштовна консультація", "Технічні поради", "Попередній розрахунок"]
    },
    {
      number: "02", 
      icon: FileText,
      title: "Надішліть креслення",
      description: "Відправте технічну документацію або ескізи. Ми працюємо з будь-якими форматами файлів",
      details: ["DWG, DXF, PDF формати", "Фото з розмірами", "Усні описи проекту"]
    },
    {
      number: "03",
      icon: Settings,
      title: "Отримайте розрахунок",
      description: "Протягом 2-4 годин ви отримаєте детальний розрахунок вартості та термінів виконання",
      details: ["Точна вартість", "Терміни виготовлення", "Технічні рекомендації"]
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Підтвердіть замовлення",
      description: "Після узгодження всіх деталей підписуємо договір і приступаємо до виконання робіт",
      details: ["Офіційний договір", "Гарантія якості", "Фіксовані терміни"]
    },
    {
      number: "05",
      icon: Truck,
      title: "Отримайте готовий виріб",
      description: "Доставляємо готову продукцію або ви можете забрати її самостійно з нашого виробництва",
      details: ["Доставка по Одесі", "Самовивіз з заводу", "Контроль якості"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-to-order" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Як <span className="bg-gradient-laser bg-clip-text text-transparent">замовити</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Простий та зрозумілий процес замовлення від ідеї до готового виробу. 
            Ми супроводжуємо вас на кожному етапі
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Process Steps */}
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 bg-card border-border shadow-card hover:shadow-glow transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center group-hover:animate-laser-pulse">
                          <Icon className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold">
                          {step.number}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <div className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <span className="text-sm text-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-metal">
              <img 
                src={howToOrderImage} 
                alt="Процес замовлення металообробки"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-glow">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">24 години</div>
                <div className="text-sm text-muted-foreground">Мінімальний час</div>
              </div>
            </div>
            
            <div className="absolute -top-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-glow">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">15 хв</div>
                <div className="text-sm text-muted-foreground">Час відповіді</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="inline-block p-8 bg-gradient-metal border-border shadow-metal max-w-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-primary-foreground animate-laser-pulse" />
                </div>
              </div>
              <div className="text-left flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Готові розпочати співпрацю?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Зв'яжіться з нами прямо зараз і отримайте безкоштовну консультацію та розрахунок вартості
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="hero" onClick={scrollToContact} className="group">
                    Замовити розрахунок
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('tel:+380488888888', '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Зателефонувати
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center bg-primary/5 border-primary/20">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Будь-які формати</h4>
            <p className="text-sm text-muted-foreground">
              Приймаємо креслення в DWG, DXF, PDF або навіть фото з розмірами
            </p>
          </Card>
          
          <Card className="p-6 text-center bg-primary/5 border-primary/20">
            <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Гарантія якості</h4>
            <p className="text-sm text-muted-foreground">
              Контроль якості на всіх етапах виробництва та гарантія на готові вироби
            </p>
          </Card>
          
          <Card className="p-6 text-center bg-primary/5 border-primary/20">
            <Truck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-foreground mb-2">Зручна доставка</h4>
            <p className="text-sm text-muted-foreground">
              Доставляємо по Одесі та області або самовивіз з нашого виробництва
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HowToOrder;
