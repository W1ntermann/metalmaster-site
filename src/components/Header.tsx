import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Phone, 
  Menu, 
  MessageCircle, 
  Phone as PhoneIcon, 
  Send, 
  Instagram,
  X
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "@/components/ui/navigation-menu";

// Константи для кращої підтримуваності
const CONTACT_PHONE = "+380673527350";
const CONTACT_PHONE_FORMATTED = "+380 67 352 7350";
const INSTAGRAM_URL = "https://www.instagram.com/armind_industry/";
const WHATSAPP_URL = `https://wa.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}`;
const TELEGRAM_URL = `https://t.me/${CONTACT_PHONE.replace(/[^0-9]/g, '')}`;
const VIBER_URL = `viber://chat?number=${CONTACT_PHONE.replace(/[^0-9]/g, '')}`;

const servicesList = [
  { 
    title: "Лазерна різка", 
    url: "/laser-cutting",
    description: "Прецизійна різка металів будь-якої складності",
    icon: "⚡"
  },
  { 
    title: "Порошкове фарбування", 
    url: "/powder-coating",
    description: "Довговічне покриття для металевих виробів",
    icon: "🎨"
  },
  { 
    title: "Зварювання", 
    url: "/metal-welding",
    description: "Професійні зварювальні роботи",
    icon: "🔧"
  },
  { 
    title: "Згинання", 
    url: "/precise-bending",
    description: "Точне згинання металу за специфікаціями",
    icon: "📐"
  },
  { 
    title: "Комплексне виробництво", 
    url: "/complex-manufacturing",
    description: "Повний цикл виробництва металовиробів",
    icon: "🏭"
  }
];

// Компонент соціальних іконок для перевикористання
const SocialIcons = ({ className = "", size = "h-4 w-4" }: { className?: string; size?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <a 
      href={INSTAGRAM_URL}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200 hover:shadow-lg"
      aria-label="Instagram сторінка"
    >
      <Instagram className={size} />
    </a>
    <a 
      href={WHATSAPP_URL}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200 hover:shadow-lg"
      aria-label="WhatsApp"
    >
      <MessageCircle className={size} />
    </a>
    <a 
      href={VIBER_URL}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200 hover:shadow-lg"
      aria-label="Viber"
    >
      <PhoneIcon className={size} />
    </a>
    <a 
      href={TELEGRAM_URL}
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-200 hover:shadow-lg"
      aria-label="Telegram"
    >
      <Send className={size} />
    </a>
  </div>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Відстеження скролу для зміни стилю хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закриття мобільного меню при зміні маршруту
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const handleContactClick = () => {
    navigate('/contact', { state: { contactSource: 'header' } });
    setIsOpen(false);
  };

  const handleServiceClick = (url: string) => {
    navigate(url);
    setIsOpen(false);
  };

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-background/80 backdrop-blur-sm border-b border-border/50'
        }
      `}
      role="banner"
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Ліво: телефон + кнопка прорахунку */}
          <div className="hidden lg:flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <a
                href={`tel:${CONTACT_PHONE}`}
                className="text-foreground hover:text-primary transition-colors font-medium"
                aria-label="Подзвонити"
              >
                {CONTACT_PHONE_FORMATTED}
              </a>
            </div>
            <Button
              variant="hero"
              size="default"
              onClick={handleContactClick}
              aria-label="Замовити прорахунок"
              className="shadow-lg hover:shadow-xl transition-shadow"
            >
              Прорахунок
            </Button>
          </div>

          {/* Центр: навігація */}
          <nav 
            className="hidden lg:flex items-center justify-center gap-1" 
            role="navigation" 
            aria-label="Головна навігація"
          >
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-foreground hover:text-primary transition-colors data-[state=open]:text-primary"
                    aria-label="Переглянути послуги"
                    onClick={() => scrollToSection('services')}
                  >
                    Послуги
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-1 p-2">
                      {servicesList.map((service) => (
                        <NavigationMenuLink key={service.url} asChild>
                          <Link
                            to={service.url}
                            className="block px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                            onClick={() => setIsOpen(false)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{service.icon}</span>
                              <div>
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {service.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {service.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <button 
              onClick={() => scrollToSection('about')}
              className="px-3 py-2 text-foreground hover:text-primary transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Перейти до секції про нас"
            >
              Про нас
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-3 py-2 text-foreground hover:text-primary transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Перейти до секції контактів"
            >
              Контакти
            </button>
          </nav>

          {/* Право: соцмережі */}
          <div className="hidden lg:flex items-center justify-end gap-4 flex-1">
            <SocialIcons />
          </div>

          {/* Мобільне меню */}
          <div className="lg:hidden flex items-center gap-2">
            <a 
              href={`tel:${CONTACT_PHONE}`}
              className="p-2 hover:bg-muted rounded-full transition-colors"
              aria-label="Подзвонити"
            >
              <Phone className="h-5 w-5" />
            </a>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-muted"
                  aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[85vw] sm:w-[400px] p-0"
                aria-label="Мобільне меню"
              >
                <div className="flex flex-col h-full">
                  {/* Навігація */}
                  <nav 
                    className="flex-1 overflow-y-auto py-6 px-6" 
                    role="navigation" 
                    aria-label="Мобільна навігація"
                  >
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          Послуги
                        </div>
                        {servicesList.map((service) => (
                          <button
                            key={service.url}
                            onClick={() => handleServiceClick(service.url)}
                            className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{service.icon}</span>
                              <div>
                                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                                  {service.title}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {service.description}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="h-px bg-border my-4" />
                      
                      <button 
                        onClick={() => scrollToSection('about')}
                        className="w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-muted transition-colors rounded-lg"
                      >
                        Про нас
                      </button>
                      
                      <button 
                        onClick={() => scrollToSection('contact')}
                        className="w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-muted transition-colors rounded-lg"
                      >
                        Контакти
                      </button>
                    </div>
                  </nav>
                  
                  {/* Нижня частина меню */}
                  <div className="p-6 border-t border-border space-y-4">
                    <div className="space-y-3">
                      <a 
                        href={`tel:${CONTACT_PHONE}`}
                        className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="h-5 w-5" />
                        <span className="font-medium">{CONTACT_PHONE_FORMATTED}</span>
                      </a>
                      
                      <SocialIcons className="justify-start" />
                    </div>
                    
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={handleContactClick}
                    >
                      Отримати прорахунок
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;