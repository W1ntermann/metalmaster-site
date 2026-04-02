import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback, useRef, useEffect, useState } from "react";
import heroVideo from "@/assets/hero-main.mp4";
import logoImage from "@/assets/hero-logo.png";

interface FeatureItem {
  text: string;
  key: string;
}

const FEATURES: FeatureItem[] = [
  { text: "від 1 деталі", key: "min-quantity" },
  { text: "партії", key: "batches" },
  { text: "повний цикл виробництва", key: "full-cycle" },
  { text: "власне обладнання", key: "own-equipment" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToServices = useCallback(() => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleContactClick = useCallback(() => {
    navigate('/contact', { state: { contactSource: 'hero' } });
  }, [navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (video.readyState >= 2) {
        setIsVideoLoaded(true);
      } else {
        const handleCanPlay = () => setIsVideoLoaded(true);
        video.addEventListener('canplay', handleCanPlay);
        return () => video.removeEventListener('canplay', handleCanPlay);
      }
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50 backdrop-blur-[1px]" />
        
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-background/90 animate-pulse" />
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 md:pt-20 lg:pt-24">

        {/* Зміна пропорцій: логотип займає 65% ширини, текст 35% */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-6 lg:gap-8 items-center">
          
          {/* Title Card - ЗМЕНШЕНИЙ текстовий блок */}
          <div className="flex flex-col justify-center rounded-2xl border border-border/30 bg-background/20 backdrop-blur-sm p-5 sm:p-6 animate-fade-in-up animation-delay-200">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold text-foreground mb-3 leading-tight">
              <span className="bg-gradient-laser bg-clip-text text-transparent">
                Виготовлення металевих деталей
              </span>
              <br />
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-semibold">
                та виробів під замовлення
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              Лазерна різка, згинання, зварювання та порошкове фарбування.
              Працюємо з виробництвом, будівельними компаніями та інженерними проєктами.
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {FEATURES.map((feature) => (
                <div
                  key={feature.key}
                  className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/10 rounded-full"
                >
                  <Check className="h-3 w-3 text-laser flex-shrink-0" />
                  <span className="text-xs text-muted-foreground font-medium">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="hero"
                size="default"
                onClick={handleContactClick}
                className="group text-xs py-4 px-5 w-full sm:w-auto transition-all duration-300 hover:scale-105"
                aria-label="Замовити прорахунок вартості"
              >
                Замовити прорахунок
                <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={scrollToServices}
                className="text-xs py-4 px-5 w-full sm:w-auto backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all duration-300"
                aria-label="Переглянути наші послуги"
              >
                Наші послуги
              </Button>
            </div>
          </div>

          {/* Logo Card - ГІГАНТСЬКИЙ логотип */}
          <div className="flex items-center justify-center rounded-2xl border border-border/30 bg-background/20 backdrop-blur-sm p-4">
            <div className="relative w-full flex justify-center items-center">
              <img
                src={logoImage}
                alt="ARMIND - Виробництво металевих деталей"
                className="
                  w-full 
                  max-w-[600px] 
                  sm:max-w-[700px] 
                  md:max-w-[850px] 
                  lg:max-w-[1000px] 
                  xl:max-w-[1100px]
                  2xl:max-w-[1200px]
                  h-auto
                  object-contain 
                  drop-shadow-2xl 
                  transition-all 
                  duration-500 
                  hover:scale-[1.02]
                  hover:drop-shadow-3xl
                "
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;