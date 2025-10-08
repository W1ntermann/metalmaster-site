import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Palette, CheckCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import spreadPaintImage from "@/assets/spread-paint.jpg";

const PowderCoating = () => {
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
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Стійке покриття з широкою палітрою кольорів та фактур. Використовуємо італійське 
                обладнання та сертифіковані порошкові фарби для довговічного результату.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="group">
                  <Phone className="h-5 w-5 mr-2" />
                  Замовити розрахунок
                </Button>
                <Button variant="outline" size="lg">
                  Каталог кольорів RAL
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={spreadPaintImage} 
                alt="Порошкове фарбування металу"
                className="w-full h-auto rounded-lg shadow-metal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Технічні можливості
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">6×3×2.5 м</div>
              <div className="text-foreground font-medium mb-1">Розмір камери</div>
              <div className="text-sm text-muted-foreground">Максимальні габарити</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">до 500 кг</div>
              <div className="text-foreground font-medium mb-1">Вага виробу</div>
              <div className="text-sm text-muted-foreground">Максимальна вага</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">60-120 мкм</div>
              <div className="text-foreground font-medium mb-1">Товщина покриття</div>
              <div className="text-sm text-muted-foreground">Регульована товщина</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">200+ RAL</div>
              <div className="text-foreground font-medium mb-1">Кольори</div>
              <div className="text-sm text-muted-foreground">Широка палітра</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Color Options */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Варіанти покриття
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-laser rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-foreground mb-2">Глянцеві</h3>
              <p className="text-sm text-muted-foreground">Високий блиск, легке очищення</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-metal rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-foreground mb-2">Матові</h3>
              <p className="text-sm text-muted-foreground">Елегантний вигляд, приховує дефекти</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-foreground mb-2">Металік</h3>
              <p className="text-sm text-muted-foreground">Металевий блиск, преміум вигляд</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold text-foreground mb-2">Структурні</h3>
              <p className="text-sm text-muted-foreground">Рельєфна поверхня, антик ефекти</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20">
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

      {/* Pricing */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Вартість послуг</h2>
            <Card className="p-8 bg-gradient-metal border-border">
              <div className="text-4xl font-bold text-primary mb-4">від 120 грн/м²</div>
              <p className="text-muted-foreground mb-6">
                Вартість залежить від складності підготовки поверхні, кольору та типу покриття
              </p>
              <Button variant="hero" size="lg" className="w-full">
                Отримати точний розрахунок
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PowderCoating;
