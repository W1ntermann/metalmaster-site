import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-laser bg-clip-text text-transparent">Контакти</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Готові обговорити ваш проект? Зв'яжіться з нами будь-яким зручним способом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Телефон</h3>
                  <p className="text-2xl font-bold text-primary mb-1">+380 (48) 888-88-88</p>
                  <p className="text-muted-foreground">Пн-Пт: 8:00-18:00, Сб: 9:00-14:00</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-xl font-semibold text-primary mb-1">info@armind.od.ua</p>
                  <p className="text-muted-foreground">Відповідаємо протягом 1 години</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Адреса</h3>
                  <p className="text-foreground font-medium mb-1">вул. Промислова, 25</p>
                  <p className="text-foreground font-medium mb-1">м. Одеса, 65000</p>
                  <p className="text-muted-foreground">Зручна транспортна розв'язка</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card border-border shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-laser rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Режим роботи</h3>
                  <div className="space-y-1">
                    <p className="text-foreground">Пн-Пт: <span className="font-medium">8:00 - 18:00</span></p>
                    <p className="text-foreground">Субота: <span className="font-medium">9:00 - 14:00</span></p>
                    <p className="text-muted-foreground">Неділя: вихідний</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-metal border-border shadow-metal">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6 animate-laser-pulse" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Безкоштовна консультація
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Наші фахівці допоможуть підібрати оптимальне рішення для вашого проекту, 
                  розрахують вартість та терміни виконання.
                </p>
                <div className="space-y-4">
                  <Button variant="hero" size="lg" className="w-full">
                    Замовити дзвінок
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Написати в Telegram
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Що ми обговоримо:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Технічні вимоги до виробу</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Обсяги та терміни виробництва</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Вартість послуг</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Варіанти співпраці</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;