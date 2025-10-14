import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Palette, CheckCircle, Phone, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import spreadPaintImage from "@/assets/for-painting-two.jpg";
import backgroundImage from "@/assets/for powder paint.jpg";

const PowderCoating = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Повернутися на головну
            </Link>
            <div className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground">Армінд</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="bg-gradient-laser bg-clip-text text-transparent">Порошкове фарбування</span> металу
              </h1>
              <p className="text-white text-xl text-muted-foreground mb-8 leading-relaxed">
                Стійке покриття з широкою палітрою кольорів та фактур. Використовуємо італійське 
                обладнання та сертифіковані порошкові фарби для довговічного результату.
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
                  onClick={() => window.open('mailto:armindind@gmail.com?subject=Каталог кольорів RAL', '_self')}
                >
                  Каталог кольорів RAL
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={spreadPaintImage} 
                alt="Порошкове фарбування металу"
                className="w-full h-auto rounded-lg shadow-2xl shadow-black/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications with Background Image */}
      <section className="py-20 relative">
        {/* Фонова картинка тільки для цього блоку */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Технічні можливості
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="text-2xl font-bold text-primary mb-2">6×1.2×2 м</div>
              <div className="text-white font-medium mb-1">Розмір камери</div>
              <div className="text-sm text-white/70">Максимальні габарити</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="text-2xl font-bold text-primary mb-2">Норм</div>
              <div className="text-white font-medium mb-1">Якість покриття</div>
              <div className="text-sm text-white/70">Європейські стандарти</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="text-2xl font-bold text-primary mb-2">40-150 мкм</div>
              <div className="text-white font-medium mb-1">Товщина покриття</div>
              <div className="text-sm text-white/70">Регульована товщина</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="text-2xl font-bold text-primary mb-2">300+</div>
              <div className="text-white font-medium mb-1">Кольори</div>
              <div className="text-sm text-white/70">Широка палітра RAL</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Equipment Section with Background Image */}
      <section className="py-20 relative">
        {/* Фонова картинка тільки для цього блоку */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Обладнання для порошкового фарбування
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Конвекційна піч полімерізації */}
            <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
              <div className="relative h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center mx-auto mb-3">
                    <Palette className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <p className="text-white font-medium">Полімеризація</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Конвекційна піч полімерізації
                </h3>
                <p className="text-white/80 mb-4">
                  Сучасна конвекційна піч для якісної полімеризації порошкового покриття з рівномірним прогрівом.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Потужність:</span>
                    <span className="text-white font-medium">80 кВт</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Робоча зона:</span>
                    <span className="text-white font-medium">6000×1200×2000 мм</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Товщина покриття:</span>
                    <span className="text-white font-medium">40-150 мкм</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1">
                    <Settings className="h-4 w-4 text-primary" />
                    Особливості:
                  </h4>
                  <div className="space-y-1">
                    {["Електростатичне обладнання Gema", "Контроль товщини покриття", "Рівномірна полімеризація"].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Контроль якості */}
            <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
              <div className="relative h-48 bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <p className="text-white font-medium">Контроль якості</p>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Контроль якості ISO
                </h3>
                <p className="text-white/80 mb-4">
                  Кваліфікований технолог проводить перевірку якості покриття згідно міжнародних ISO стандартів.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Стандарти:</span>
                    <span className="text-white font-medium">ISO</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Контроль товщини:</span>
                    <span className="text-white font-medium">Так</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-white/70">Технолог:</span>
                    <span className="text-white font-medium">Кваліфікований</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1">
                    <Settings className="h-4 w-4 text-primary" />
                    Особливості:
                  </h4>
                  <div className="space-y-1">
                    {["Перевірка товщини покриття", "Контроль адгезії", "Візуальна інспекція"].map((feature, idx) => (
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

      {/* Color Options with Background Image */}
      <section className="py-20 relative">
        {/* Фонова картинка тільки для цього блоку */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Варіанти покриття
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="w-16 h-16 bg-gradient-laser rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Глянцеві</h3>
              <p className="text-sm text-white/70">Високий блиск, легке очищення</p>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="w-16 h-16 bg-gradient-metal rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Матові</h3>
              <p className="text-sm text-white/70">Елегантний вигляд, приховує дефекти</p>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Металік</h3>
              <p className="text-sm text-white/70">Металевий блиск, преміум вигляд</p>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-white mb-2">Шагрінь</h3>
              <p className="text-sm text-white/70">Текстурована поверхня, стійка до подряпин</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Applications - стандартний фон */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Переваги порошкового фарбування
              </h3>
              <div className="space-y-4">
                {[
                  "Корозійна стійкість до 25 років",
                  "Екологічно чисті матеріали",
                  "Стійкість до ультрафіолету",
                  "Механічна міцність покриття",
                  "Широка температурна стійкість"
                ].map((advantage, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Сфери застосування
              </h3>
              <div className="space-y-3">
                {[
                  "Фасадні системи та архітектура",
                  "Меблеві та інтер'єрні конструкції", 
                  "Огорожі, ворота та перила",
                  "Садово-паркові форми",
                  "Промислове обладнання"
                ].map((application, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">{application}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing - стандартний фон */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Вартість послуг</h2>
            
            {/* Pricing by Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-metal border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">1-50 м²</div>
                  <div className="text-3xl font-bold text-primary mb-2">420-450 грн/м²</div>
                  <p className="text-xs text-muted-foreground">Невеликі партії</p>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-metal border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">50-100 м²</div>
                  <div className="text-3xl font-bold text-primary mb-2">380-400 грн/м²</div>
                  <p className="text-xs text-muted-foreground">Середні партії</p>
                </div>
              </Card>
              <Card className="p-6 bg-gradient-metal border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Св. 100 м²</div>
                  <div className="text-3xl font-bold text-primary mb-2">Договірна</div>
                  <p className="text-xs text-muted-foreground">Великі партії</p>
                </div>
              </Card>
            </div>

            {/* Pricing by Linear Meters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">1-100 пог. м</div>
                  <div className="text-3xl font-bold text-primary mb-2">70 грн/пог.м</div>
                  <p className="text-xs text-muted-foreground">Профільні вироби</p>
                </div>
              </Card>
              <Card className="p-6 bg-card border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">100-150 пог. м</div>
                  <div className="text-3xl font-bold text-primary mb-2">60 грн/пог.м</div>
                  <p className="text-xs text-muted-foreground">Профільні вироби</p>
                </div>
              </Card>
            </div>

            {/* Price Factors */}
            <Card className="p-6 bg-card border-border mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
                Ціна залежить від:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Конфігурації виробів</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Габаритів виробів</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Типу фарби та кольору</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Об'єму замовлення</span>
                </div>
              </div>
            </Card>

            {/* CTA Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full"
                onClick={() => window.open('mailto:armindind@gmail.com?subject=Каталог кольорів RAL', '_self')}
              >
                Каталог кольорів RAL
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PowderCoating;