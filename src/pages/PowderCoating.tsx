import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, CheckCircle, Phone, Settings, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import spreadPaintImage from "@/assets/for-painting-two.jpg";
import backgroundImage from "@/assets/for powder paint.jpg";

// Імпорт картинок для кольорів
import glossyImage from "@/assets/glance.png";
import matteImage from "@/assets/mat.png";
import shargenImage from "@/assets/Shargen.png";
import texturedImage from "@/assets/Structure.png";

// Імпорт картинок для каталогу RAL
import ralCatalog1 from "@/assets/ral/1.1.jpg";
import ralCatalog2 from "@/assets/ral/2.jpg";
import ralCatalog3 from "@/assets/ral/3.jpg";
import ralCatalog4 from "@/assets/ral/4.jpg";
import ralCatalog5 from "@/assets/ral/5.jpg";
import ralCatalog6 from "@/assets/ral/6.jpg";

// Імпорт нових картинок для обладнання
import qualityControlImage from "@/assets/quality.jpg";
import polymerizationOvenImage from "@/assets/polymer.jpg";
import zincImage from "@/assets/grunt.jpg";
import thermoplastImage from "@/assets/thermoplast.jpg";

const PowderCoating = () => {
  const ralCatalogRef = useRef(null);
  const { openPopup } = useContactPopup();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToRalCatalog = () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    ralCatalogRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    
    // Дозволяємо новий скрол після завершення
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Дані для кольорових варіантів
  const colorOptions = [
    {
      image: glossyImage,
      title: "Глянець",
      details: "Гладке покриття, що містить 85-100% блиску.",
      className: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      image: matteImage,
      title: "Мат",
      details: "Гладке покриття, що містить від 28 до 40% блиску. Глибокий мат до 10% блиску.",
      className: "bg-gradient-to-br from-gray-600 to-gray-800"
    },
    {
      image: shargenImage,
      title: "Шагрінь",
      details: "Текстурний тип поверхні. Зернистість буває дрібнішою або більшою. Ступінь блиску близько 50%.",
      className: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      image: texturedImage,
      title: "Структурні",
      details: "Дрібнозернистий шорсткий тип поверхні, схожий на наждак. По мірі блиску наближений до глибокого мату.",
      className: "bg-gradient-to-br from-gray-400 to-gray-600"
    },
    {
      image: zincImage,
      title: "Грунт цинковмісний",
      details: "Антикорозійний грунт з вмістом цинку для захисту металу. Забезпечує катодний захист та підвищену адгезію.",
      className: "bg-gradient-to-br from-gray-700 to-blue-900"
    },
    {
      image: thermoplastImage,
      title: "Термопласт",
      details: "Пластичне покриття з полімерів, що плавиться при нагріванні. Висока стійкість до механічних пошкоджень.",
      className: "bg-gradient-to-br from-red-500 to-orange-700"
    }
  ];

  // Дані для каталогу RAL
  const ralCatalogs = [
    { image: ralCatalog1 },
    { image: ralCatalog2 },
    { image: ralCatalog3 },
    { image: ralCatalog4 },
    { image: ralCatalog5 },
    { image: ralCatalog6 }
  ];

  // Технічні характеристики
  const specifications = [
    {
      value: "6×1.2×2 м",
      title: "Розмір камери",
      description: "Максимальні габарити"
    },
    {
      value: "Норм",
      title: "Якість покриття",
      description: "Європейські стандарти"
    },
    {
      value: "40-150 мкм",
      title: "Товщина покриття",
      description: "Регульована товщина"
    },
    {
      value: "300+",
      title: "Кольори",
      description: "Широка палітра RAL"
    }
  ];

  // Переваги
  const advantages = [
    "Корозійна стійкість до 25 років",
    "Екологічно чисті матеріали",
    "Стійкість до ультрафіолету",
    "Механічна міцність покриття",
    "Широка температурна стійкість"
  ];

  // Сфери застосування
  const applications = [
    "Фасадні системи та архітектура",
    "Меблеві та інтер'єрні конструкції", 
    "Огорожі, ворота та перила",
    "Садово-паркові форми",
    "Промислове обладнання"
  ];

  // Особливості обладнання
  const equipmentFeatures = {
    oven: [
      "Електростатичне обладнання Gema",
      "Контроль товщини покриття",
      "Рівномірна полімеризація"
    ],
    quality: [
      "Перевірка товщини покриття",
      "Контроль адгезії",
      "Візуальна інспекція"
    ]
  };

  // Компонент для секцій з фоном
  const SectionWithBackground = ({ children, className = "" }) => (
    <section className={`relative ${className}`}>
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
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                <span className="bg-gradient-laser bg-clip-text text-transparent">
                  Порошкове фарбування
                </span>{" "}
                металу
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Стійке покриття з широкою палітрою кольорів та фактур. Використовуємо італійське 
                обладнання та сертифіковані порошкові фарби для довговічного результату.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group flex items-center gap-2"
                  onClick={openPopup}
                >
                  <Phone className="h-5 w-5" />
                  Дізнатися вартість
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="flex items-center gap-2"
                  onClick={scrollToRalCatalog}
                  disabled={isScrolling}
                >
                  <Palette className="h-5 w-5" />
                  Каталог кольорів RAL
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={spreadPaintImage} 
                alt="Порошкове фарбування металу"
                className="w-full h-auto rounded-lg shadow-2xl shadow-black/50 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <SectionWithBackground className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Технічні можливості
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specifications.map((spec, index) => (
              <Card 
                key={index}
                className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  {spec.value}
                </div>
                <div className="text-white font-medium mb-1">
                  {spec.title}
                </div>
                <div className="text-sm text-white/70">
                  {spec.description}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </SectionWithBackground>

      {/* Equipment Section */}
      <SectionWithBackground className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Обладнання для порошкового фарбування
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Піч полімеризації */}
            <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl hover:shadow-3xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={polymerizationOvenImage} 
                  alt="Конвекційна піч полімерізації"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Конвекційна піч полімерізації
                </h3>
                <p className="text-white/80 mb-4">
                  Сучасна конвекційна піч для якісної полімеризації порошкового покриття з рівномірним прогрівом.
                </p>
                <div className="space-y-2 mb-4">
                  <SpecItem label="Потужність:" value="80 кВт" />
                  <SpecItem label="Робоча зона:" value="6000×1200×2000 мм" />
                  <SpecItem label="Товщина покриття:" value="40-150 мкм" />
                </div>
                <FeatureList 
                  title="Особливості:"
                  icon={<Settings className="h-4 w-4 text-primary" />}
                  features={equipmentFeatures.oven}
                />
              </div>
            </Card>

            {/* Контроль якості */}
            <Card className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl hover:shadow-3xl transition-all">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={qualityControlImage} 
                  alt="Контроль якості ISO"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3">
                  Контроль якості ISO
                </h3>
                <p className="text-white/80 mb-4">
                  Кваліфікований технолог проводить перевірку якості покриття згідно міжнародних ISO стандартів.
                </p>
                <div className="space-y-2 mb-4">
                  <SpecItem label="Стандарти:" value="ISO" />
                  <SpecItem label="Контроль товщини:" value="Так" />
                  <SpecItem label="Технолог:" value="Кваліфікований" />
                </div>
                <FeatureList 
                  title="Особливості:"
                  icon={<Settings className="h-4 w-4 text-primary" />}
                  features={equipmentFeatures.quality}
                />
              </div>
            </Card>
          </div>
        </div>
      </SectionWithBackground>

      {/* Color Options */}
      <SectionWithBackground className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Варіанти покриття
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorOptions.map((color, index) => (
              <Card 
                key={index}
                className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 group hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={color.image} 
                    alt={color.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-white mb-2 text-lg">
                    {color.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {color.details}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </SectionWithBackground>

      {/* Applications & Advantages */}
      <SectionWithBackground className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Переваги */}
            <div>
              <SectionTitle 
                icon={<CheckCircle className="h-6 w-6 text-primary" />}
                title="Переваги порошкового фарбування"
              />
              <div className="space-y-4">
                {advantages.map((advantage, idx) => (
                  <FeatureCard key={idx} icon={<CheckCircle className="h-5 w-5 text-primary" />}>
                    {advantage}
                  </FeatureCard>
                ))}
              </div>
            </div>

            {/* Сфери застосування */}
            <div>
              <SectionTitle 
                icon={<CheckCircle className="h-6 w-6 text-primary" />}
                title="Сфери застосування"
              />
              <div className="space-y-3">
                {applications.map((application, idx) => (
                  <FeatureCard 
                    key={idx} 
                    icon={<div className="w-2 h-2 bg-primary rounded-full" />}
                    compact
                  >
                    {application}
                  </FeatureCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWithBackground>

      {/* RAL Catalog Section */}
      <section 
        ref={ralCatalogRef}
        className="py-20 bg-gradient-to-b from-background to-muted/20 scroll-mt-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Каталог кольорів RAL
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Широка палітра кольорів RAL для порошкового фарбування. 
              Виберіть ідеальний відтінок для вашого проекту.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ralCatalogs.map((catalog, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={catalog.image}
                    alt={`Каталог RAL ${index + 1}`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="hero" 
              size="lg"
              className="min-w-64 px-8 py-6 text-lg flex items-center gap-2 mx-auto"
              onClick={openPopup}
            >
              <Phone className="h-6 w-6" />
              Порахувати вартість
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <ContactPopup />
    </div>
  );
};

// Допоміжні компоненти
const SpecItem = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-white/70">{label}</span>
    <span className="text-white font-medium">{value}</span>
  </div>
);

const FeatureList = ({ title, icon, features }) => (
  <div className="space-y-2">
    <h4 className="text-sm font-semibold text-white flex items-center gap-1">
      {icon}
      {title}
    </h4>
    <div className="space-y-1">
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2 text-xs">
          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
          <span className="text-white/70">{feature}</span>
        </div>
      ))}
    </div>
  </div>
);

const SectionTitle = ({ icon, title }) => (
  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
    {icon}
    {title}
  </h3>
);

const FeatureCard = ({ icon, children, compact = false }) => (
  <div className={`flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg ${
    compact ? 'p-3' : 'p-4'
  }`}>
    {icon}
    <span className="text-white">{children}</span>
  </div>
);

export default PowderCoating;