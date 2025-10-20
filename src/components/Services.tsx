import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Zap, Palette, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import laserRazorImage from "@/assets/for-laser-cutting-three.jpg";
import spreadPaintImage from "@/assets/powder.jpg";

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      icon: Zap,
      title: "Лазерна різка",
      description: "Високоточна різка металу товщиною до 20 мм. Мінімальні деформації, ідеальна якість кромки.",
      features: ["Точність ±0.1 мм", "Інженерна підтримка", "Різні типи металу", "Серійне виробництво"],
      image: laserRazorImage,
      detailedInfo: {
        overview:
          "Наша лазерна різка забезпечує найвищу точність обробки металевих деталей. Використовуємо волоконні лазери потужністю до 12 кВт для швидкої та якісної обробки.",
        capabilities: [
          "Товщина металу: до 20 мм (сталь), до 15 мм (нержавіюча сталь), до 10 мм (алюміній)",
          "Розмір листа: до 3000x1500 мм",
          "Точність позиціонування: ±0.05 мм",
          "Швидкість різки: до 40 м/хв (залежно від товщини)"
        ],
        materials: ["Конструкційна сталь", "Нержавіюча сталь", "Алюміній та його сплави", "Латунь", "Мідь"],
        applications: ["Деталі машинобудування", "Архітектурні елементи", "Рекламні конструкції", "Декоративні вироби"],
        pricing: "від 50 грн/м.п."
      }
    },
    {
      icon: Palette,
      title: "Порошкове фарбування",
      description: "Стійке покриття з широкою палітрою кольорів та фактур.",
      features: ["200+ кольорів RAL", "Різні фактури", "Корозійна стійкість", "Екологічність"],
      image: spreadPaintImage,
      detailedInfo: {
        overview:
          "Порошкове фарбування забезпечує довговічне і красиве покриття виробів. Використовуємо італійське обладнання та сертифіковані порошкові фарби.",
        capabilities: [
          "Розмір камери: 6x3x2.5 м",
          "Максимальна вага виробу: до 500 кг",
          "Товщина покриття: 60-120 мкм",
          "Температура полімеризації: 180-200°C"
        ],
        materials: ["Більше 200 кольорів RAL", "Структурні покриття", "Металік ефекти", "Антик фактури"],
        applications: ["Фасадні системи", "Меблеві конструкції", "Огорожі та ворота", "Садово-паркові форми"],
        pricing: "від 120 грн/м²"
      }
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Наші <span className="bg-gradient-laser bg-clip-text text-transparent">послуги</span>
          </h2>
          <p className="text-white text-xl text-muted-foreground max-w-3xl mx-auto">
            Повний цикл обробки металу на сучасному європейському обладнанні
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="overflow-hidden bg-card border-border shadow-card hover:shadow-metal transition-all duration-300 group flex flex-col"
              >
                {service.image && (
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500 filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
                    <p className="text-white mb-6 leading-relaxed">{service.description}</p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link to={service.title === "Лазерна різка" ? "/laser-cutting" : "/powder-coating"}>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full group-hover:shadow-glow transition-all duration-300 mt-auto"
                    >
                      <span className="mr-2">Детальніше</span>
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Модалка з деталями */}
      {selectedService !== null && (
        <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-laser rounded-lg flex items-center justify-center">
                  {React.createElement(services[selectedService].icon, {
                    className: "h-8 w-8 text-primary-foreground"
                  })}
                </div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  {services[selectedService].title}
                </DialogTitle>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Опис послуги</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {services[selectedService].detailedInfo.overview}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Технічні можливості
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {services[selectedService].detailedInfo.capabilities.map((capability, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-3 bg-muted/30 rounded-lg">
                      <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-foreground text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Матеріали</h3>
                  <div className="space-y-2">
                    {services[selectedService].detailedInfo.materials.map((material, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-foreground">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Застосування</h3>
                  <div className="space-y-2">
                    {services[selectedService].detailedInfo.applications.map((application, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-foreground">{application}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-metal p-6 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Вартість послуги</h3>
                    <p className="text-muted-foreground">Орієнтовна вартість залежно від складності</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {services[selectedService].detailedInfo.pricing}
                    </div>
                    <p className="text-sm text-muted-foreground">за одиницю</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="hero"
                  className="flex-1"
                  onClick={() => {
                    setSelectedService(null);
                    const element = document.getElementById("contact");
                    element?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Замовити розрахунок
                </Button>
                <Button variant="outline" onClick={() => setSelectedService(null)}>
                  Закрити
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Services;
