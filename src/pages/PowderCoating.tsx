import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Phone, Settings, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import spreadPaintImage from "@/assets/powder.jpg";
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

// Нові картинки
import qualityControlImage from "@/assets/quality.jpg";
import polymerizationOvenImage from "@/assets/polymer.jpg";
import zincImage from "@/assets/grunt.jpg";
import thermoplastImage from "@/assets/thermoplast.jpg";

const PowderCoating = () => {
  const ralCatalogRef = useRef(null);
  const { openPopup } = useContactPopup();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToRalCatalog = () => {
    ralCatalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const colorOptions = [
    {
      image: glossyImage,
      title: "Глянець",
      details: "Гладке покриття, що містить 85-100% блиску.",
    },
    {
      image: matteImage,
      title: "Мат",
      details:
        "Гладке покриття, що містить від 28 до 40% блиску. Глибокий мат до 10%.",
    },
    {
      image: shargenImage,
      title: "Шагрінь",
      details:
        "Текстурний тип поверхні. Зернистість може бути різною. Ступінь блиску близько 50%.",
    },
    {
      image: texturedImage,
      title: "Структурні",
      details:
        "Дрібнозернистий шорсткий тип поверхні, схожий на наждак. Близький до глибокого мату.",
    },
    {
      image: zincImage,
      title: "Грунт цинковмісний",
      details:
        "Антикорозійний грунт із вмістом цинку для захисту металу. Підвищує адгезію.",
    },
    {
      image: thermoplastImage,
      title: "Термопласт",
      details:
        "Пластичне покриття з полімерів, що плавиться при нагріванні. Стійке до подряпин.",
    },
  ];

  const ralCatalogs = [
    { image: ralCatalog1 },
    { image: ralCatalog2 },
    { image: ralCatalog3 },
    { image: ralCatalog4 },
    { image: ralCatalog5 },
    { image: ralCatalog6 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-20 pb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-laser text-primary-foreground font-semibold rounded-lg shadow-glow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <ArrowLeft className="h-5 w-5" />
          Повернутись назад
        </button>
      </div>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              <span className="bg-gradient-laser bg-clip-text text-transparent">
                Порошкове фарбування
              </span>{" "}
              металу
            </h1>
            <p className="text-white text-xl mb-8 leading-relaxed">
              Використовуємо італійське обладнання та сертифіковані фарби для
              довговічного результату.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" onClick={openPopup}>
                <Phone className="h-5 w-5 mr-2" />
                Дізнатися вартість
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToRalCatalog}>
                Каталог RAL
              </Button>
            </div>
          </div>
          <img
            src={spreadPaintImage}
            alt="Порошкове фарбування металу"
            className="w-full h-auto rounded-lg shadow-2xl shadow-black/50"
          />
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Технічні можливості
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ["6×1.2×2 м", "Розмір камери", "Максимальні габарити"],
              ["ISO 9001", "Система контролю якості", "Міжнародні стандарти"],
              ["40-150 мкм", "Товщина покриття", "Регульована товщина"],
              ["300+", "Кольори", "Широка палітра RAL"],
            ].map(([title, subtitle, desc], idx) => (
              <Card
                key={idx}
                className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20"
              >
                <div className="text-2xl font-bold text-primary mb-2">
                  {title}
                </div>
                <div className="text-white font-medium mb-1">{subtitle}</div>
                <div className="text-sm text-white/70">{desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Color Options */}
      <section className="py-20 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Варіанти покриття
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorOptions.map((color, index) => (
              <Card
                key={index}
                onClick={() => setSelectedImage(color.image)}
                className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 group hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={color.image}
                    alt={color.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-white mb-2 text-lg">
                    {color.title}
                  </h3>
                  <p className="text-sm text-white/70">{color.details}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RAL Catalog */}
      <section
        ref={ralCatalogRef}
        className="py-20 bg-gradient-to-b from-background to-muted/20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Каталог кольорів RAL
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Виберіть ідеальний відтінок для вашого проекту.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ralCatalogs.map((catalog, index) => (
              <Card
                key={index}
                onClick={() => setSelectedImage(catalog.image)}
                className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
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
            <Button variant="hero" size="lg" onClick={openPopup}>
              <Phone className="h-6 w-6 mr-3" />
              Порахувати вартість
            </Button>
          </div>
        </div>
      </section>

      {/* Modal Image Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Перегляд зображення"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}

      <Footer />
      <ContactPopup />
    </div>
  );
};

export default PowderCoating;
