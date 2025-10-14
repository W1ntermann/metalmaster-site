import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Zap, CheckCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import laserRazorImage from "@/assets/for-laser-cutting-three.jpg";
import backgroundImage from "@/assets/for-cutting-page.jpg"; // Додай свою картинку для фону

const LaserCutting = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Фонова картинка для всього сайту */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Затемнення для кращої читабельності тексту */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Контент поверх фону */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <ArrowLeft className="h-5 w-5" />
                Повернутися на головну
              </Link>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary animate-laser-pulse" />
                <span className="text-lg font-bold text-white">Армінд</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  <span className="bg-gradient-laser bg-clip-text text-transparent">Лазерна різка</span> металу
                </h1>
                <p className="text-white/90 text-xl mb-8 leading-relaxed">
                  Високоточна лазерна різка металу товщиною до 20 мм з мінімальними деформаціями 
                  та ідеальною якістю кромки. Використовуємо волоконні лазери потужністю до 12 кВт.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="group"
                    onClick={() => window.open('tel:+380934236139', '_self')}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Дізнатися вартість
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => {
                      const pricingSection = document.getElementById('pricing');
                      pricingSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Переглянути ціни
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={laserRazorImage} 
                  alt="Лазерна різка металу"
                  className="w-full h-auto rounded-lg shadow-2xl shadow-black/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Технічні характеристики
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-2xl font-bold text-primary mb-2">±0.03 мм</div>
                <div className="text-white font-medium mb-1">Точність позиціонування</div>
                <div className="text-sm text-white/70">Найвища точність різки</div>
              </Card>
              <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-2xl font-bold text-primary mb-2">до 20 мм</div>
                <div className="text-white font-medium mb-1">Товщина сталі</div>
                <div className="text-sm text-white/70">Максимальна товщина</div>
              </Card>
              <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-2xl font-bold text-primary mb-2">3000×1500</div>
                <div className="text-white font-medium mb-1">Розмір листа (мм)</div>
                <div className="text-sm text-white/70">Максимальні габарити</div>
              </Card>
              <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-2xl font-bold text-primary mb-2">40 м/хв</div>
                <div className="text-white font-medium mb-1">Швидкість різки</div>
                <div className="text-sm text-white/70">Залежно від товщини</div>
              </Card>
            </div>
          </div>
        </section>

        {/* Equipment Section */}
        <section className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              Наше обладнання для лазерної різки
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* MT-L3015F */}
              <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
                <div className="relative h-48 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <p className="text-white font-medium">Лазерна різка</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    MT-L3015F
                  </h3>
                  <p className="text-white/80 mb-4">
                    Високопродуктивний лазерний комплекс для точної різки металу з мінімальними деформаціями.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Потужність:</span>
                      <span className="text-white font-medium">6 кВт</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Робоча зона:</span>
                      <span className="text-white font-medium">3000×1500 мм</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Макс. товщина:</span>
                      <span className="text-white font-medium">20 мм</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Особливості:
                    </h4>
                    <div className="space-y-1">
                      {["Волоконний лазер", "Автоматична заміна сопел", "Система контролю якості"].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* IPG Laser Welding */}
              <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
                <div className="relative h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <p className="text-white font-medium">Лазерне зварювання</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3">
                    IPG YLS-2000
                  </h3>
                  <p className="text-white/80 mb-4">
                    Сучасна система лазерного зварювання для високоякісних з'єднань тонкостінних конструкцій.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Потужність:</span>
                      <span className="text-white font-medium">2 кВт</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Робоча зона:</span>
                      <span className="text-white font-medium">1000×800 мм</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-white/70">Макс. товщина:</span>
                      <span className="text-white font-medium">6 мм</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-white flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Особливості:
                    </h4>
                    <div className="space-y-1">
                      {["Безконтактне зварювання", "Мінімальна ЗТВ", "Програмне управління"].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                          <span className="text-white/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Materials & Applications */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Матеріали для обробки
                </h3>
                <div className="space-y-3">
                  {["Конструкційна сталь", "Нержавіюча сталь", "Алюміній та його сплави", "Латунь", "Мідь"].map((material, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-white">{material}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                  Сфери застосування
                </h3>
                <div className="space-y-3">
                  {["Деталі машинобудування", "Архітектурні елементи", "Рекламні конструкції", "Декоративні вироби", "Промислове обладнання"].map((application, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-white">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Вартість послуг</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pricing Card */}
                <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-4">від 50 грн/м.п.</div>
                    <p className="text-white/80">
                      Остаточна вартість залежить від товщини металу, складності контуру та обсягу замовлення
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      variant="hero" 
                      size="lg" 
                      className="w-full"
                      onClick={() => window.open('tel:+380934236139', '_self')}
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Порахувати вартість
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => window.open('mailto:armindind@gmail.com?subject=Запит прайс-листу', '_self')}
                    >
                      Надіслати запит
                    </Button>
                  </div>
                </Card>

                {/* Quick Calculator */}
                <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
                  <h3 className="text-xl font-bold text-white mb-6 text-center">
                    Швидкий розрахунок
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-white/70 block mb-2">Товщина (мм)</label>
                        <div className="text-lg font-semibold text-white p-2 bg-white/10 rounded">1-25</div>
                      </div>
                      <div>
                        <label className="text-sm text-white/70 block mb-2">Матеріал</label>
                        <div className="text-lg font-semibold text-white p-2 bg-white/10 rounded">Сталь</div>
                      </div>
                    </div>
                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white/70">Базова ціна:</span>
                        <span className="text-lg font-bold text-primary">50-150 грн/м.п.</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                        onClick={() => window.open('tel:+380934236139', '_self')}
                      >
                        Детальний розрахунок
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LaserCutting;