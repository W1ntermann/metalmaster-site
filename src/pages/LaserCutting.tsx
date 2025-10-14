import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Zap, CheckCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import laserBackground from "@/assets/for-cutting-page.jpg";

const LaserCutting = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div 
      className="min-h-screen relative bg-slate-900"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(30, 41, 59, 0.90)), url(${laserBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Header */}
      <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700/50 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <ArrowLeft className="h-5 w-5" />
              Повернутися на головну
            </Link>
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-blue-400 animate-pulse" />
              <span className="text-lg font-bold text-white">Армінд</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Лазерна різка</span> металу
              </h1>
              <p className="text-slate-300 text-xl mb-8 leading-relaxed">
                Високоточна лазерна різка металу товщиною до 20 мм з мінімальними деформаціями 
                та ідеальною якістю кромки. Використовуємо волоконні лазери потужністю до 12 кВт.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="group bg-blue-600 hover:bg-blue-700 text-white border-blue-500 shadow-lg shadow-blue-500/25"
                  onClick={() => window.open('tel:+380934236139', '_self')}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Замовити розрахунок
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-slate-600 text-white hover:bg-slate-700/50 hover:border-slate-500"
                  onClick={() => window.open('mailto:armindind@gmail.com?subject=Запит прайс-листу', '_self')}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Завантажити прайс
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Швидкий старт</h3>
                  <p className="text-slate-300">Розрахунок вартості за 15 хвилин</p>
                </div>
                <div className="space-y-3">
                  {[
                    "Безкоштовна консультація",
                    "Точний розрахунок онлайн",
                    "Відправка КМД креслень"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Технічні характеристики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: "±0.03 мм", title: "Точність позиціонування", desc: "Найвища точність різки" },
              { value: "до 20 мм", title: "Товщина сталі", desc: "Максимальна товщина" },
              { value: "3000×1500", title: "Розмір листа (мм)", desc: "Максимальні габарити" },
              { value: "40 м/хв", title: "Швидкість різки", desc: "Залежно від товщини" }
            ].map((spec, index) => (
              <Card 
                key={index}
                className="p-6 text-center bg-slate-800/60 backdrop-blur-md border-slate-700/50 hover:bg-slate-700/60 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-2xl font-bold text-blue-400 mb-2">{spec.value}</div>
                <div className="text-white font-medium mb-1">{spec.title}</div>
                <div className="text-sm text-slate-400">{spec.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Наше обладнання
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* MT-L3015F */}
            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700/50 hover:bg-slate-700/60 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">MT-L3015F</h3>
                    <p className="text-slate-400">Лазерна різка</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Високопродуктивний лазерний комплекс для точної різки металу з мінімальними деформаціями.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Потужність:", value: "6 кВт" },
                    { label: "Робоча зона:", value: "3000×1500 мм" },
                    { label: "Макс. товщина:", value: "20 мм" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    Особливості:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Волоконний лазер", "Автоматична заміна сопел", "Система контролю якості"].map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 border border-slate-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* IPG Laser Welding */}
            <Card className="bg-slate-800/60 backdrop-blur-md border-slate-700/50 hover:bg-slate-700/60 transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">IPG YLS-2000</h3>
                    <p className="text-slate-400">Лазерне зварювання</p>
                  </div>
                </div>
                <p className="text-slate-300 mb-6">
                  Сучасна система лазерного зварювання для високоякісних з'єднань тонкостінних конструкцій.
                </p>
                <div className="space-y-3 mb-6">
                  {[
                    { label: "Потужність:", value: "2 кВт" },
                    { label: "Робоча зона:", value: "1000×800 мм" },
                    { label: "Макс. товщина:", value: "6 мм" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2 mb-3">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    Особливості:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Безконтактне зварювання", "Мінімальна ЗТВ", "Програмне управління"].map((feature, idx) => (
                      <span key={idx} className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 border border-slate-600">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Materials & Applications */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-400" />
                Матеріали для обробки
              </h3>
              <div className="space-y-3">
                {["Конструкційна сталь", "Нержавіюча сталь", "Алюміній та його сплави", "Латунь", "Мідь"].map((material, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 hover:bg-slate-700/60 transition-colors">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white">{material}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-blue-400" />
                Сфери застосування
              </h3>
              <div className="space-y-3">
                {["Деталі машинобудування", "Архітектурні елементи", "Рекламні конструкції", "Декоративні вироби", "Промислове обладнання"].map((application, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 hover:bg-slate-700/60 transition-colors">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-white">{application}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Вартість послуг</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pricing Card */}
              <Card className="p-8 bg-slate-800/60 backdrop-blur-md border-slate-700/50">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-blue-400 mb-4">від 50 грн/м.п.</div>
                  <p className="text-slate-400">
                    Остаточна вартість залежить від товщини металу, складності контуру та обсягу замовлення
                  </p>
                </div>
                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                    onClick={() => window.open('tel:+380934236139', '_self')}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Порахувати вартість
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full border-slate-600 text-white hover:bg-slate-700/50"
                    onClick={() => window.open('mailto:armindind@gmail.com?subject=Запит прайс-листу', '_self')}
                  >
                    <Mail className="h-5 w-5 mr-2" />
                    Завантажити прайс-лист
                  </Button>
                </div>
              </Card>

              {/* Quick Calculator */}
              <Card className="p-8 bg-slate-800/60 backdrop-blur-md border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  Швидкий розрахунок
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Товщина (мм)</label>
                      <div className="text-lg font-semibold text-white p-2 bg-slate-700/50 rounded border border-slate-600">1-25</div>
                    </div>
                    <div>
                      <label className="text-sm text-slate-400 block mb-2">Матеріал</label>
                      <div className="text-lg font-semibold text-white p-2 bg-slate-700/50 rounded border border-slate-600">Сталь</div>
                    </div>
                  </div>
                  <div className="border-t border-slate-700 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-400">Базова ціна:</span>
                      <span className="text-lg font-bold text-blue-400">50-150 грн/м.п.</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-slate-600 text-white hover:bg-slate-700/50"
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
  );
};

export default LaserCutting;