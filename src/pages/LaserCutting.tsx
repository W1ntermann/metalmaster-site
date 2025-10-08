import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Zap, CheckCircle, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import laserRazorImage from "@/assets/laser-razor.png";

const LaserCutting = () => {
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
              <Zap className="h-6 w-6 text-primary animate-laser-pulse" />
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
                <span className="bg-gradient-laser bg-clip-text text-transparent">Лазерна різка</span> металу
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Високоточна лазерна різка металу товщиною до 25 мм з мінімальними деформаціями 
                та ідеальною якістю кромки. Використовуємо волоконні лазери потужністю до 12 кВт.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="group">
                  <Phone className="h-5 w-5 mr-2" />
                  Замовити розрахунок
                </Button>
                <Button variant="outline" size="lg">
                  Завантажити прайс
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={laserRazorImage} 
                alt="Лазерна різка металу"
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
            Технічні характеристики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">±0.05 мм</div>
              <div className="text-foreground font-medium mb-1">Точність позиціонування</div>
              <div className="text-sm text-muted-foreground">Найвища точність різки</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">до 25 мм</div>
              <div className="text-foreground font-medium mb-1">Товщина сталі</div>
              <div className="text-sm text-muted-foreground">Максимальна товщина</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">3000×1500</div>
              <div className="text-foreground font-medium mb-1">Розмір листа (мм)</div>
              <div className="text-sm text-muted-foreground">Максимальні габарити</div>
            </Card>
            <Card className="p-6 text-center bg-gradient-metal border-border">
              <div className="text-2xl font-bold text-primary mb-2">40 м/хв</div>
              <div className="text-foreground font-medium mb-1">Швидкість різки</div>
              <div className="text-sm text-muted-foreground">Залежно від товщини</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Materials & Applications */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Матеріали для обробки
              </h3>
              <div className="space-y-3">
                {["Конструкційна сталь", "Нержавіюча сталь", "Алюміній та його сплави", "Латунь", "Мідь"].map((material, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-foreground">{material}</span>
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
                {["Деталі машинобудування", "Архітектурні елементи", "Рекламні конструкції", "Декоративні вироби", "Промислове обладнання"].map((application, idx) => (
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Вартість послуг</h2>
            <Card className="p-8 bg-gradient-metal border-border">
              <div className="text-4xl font-bold text-primary mb-4">від 50 грн/м.п.</div>
              <p className="text-muted-foreground mb-6">
                Остаточна вартість залежить від товщини металу, складності контуру та обсягу замовлення
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

export default LaserCutting;
