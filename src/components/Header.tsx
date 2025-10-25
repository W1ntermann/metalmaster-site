import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Zap, Phone, Menu, MessageCircle, Phone as PhoneIcon, Send, Instagram } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const scrollToSection = (sectionId: string) => {
    // Якщо ми не на головній сторінці, спочатку переходимо на неї
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false); // Close mobile menu after navigation
  };

  return (
    <>
      {/* Skip to main content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Перейти до основного контенту
      </a>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side - Contact and CTA */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <a href="tel:+380934236139" className="hover:text-primary transition-colors font-medium">
              +380 (93) 423-61-39
            </a>
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Відкрити меню">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-8" role="navigation" aria-label="Мобільна навігація">
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="text-left text-lg text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    Послуги
                  </button>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-left text-lg text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    Про нас
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-left text-lg text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-muted"
                  >
                    Контакти
                  </button>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Phone className="h-4 w-4" />
                      <a href="tel:+380934236139" className="hover:text-primary transition-colors font-medium">
                        +380 (93) 423-61-39
                      </a>
                    </div>
                    
                    {/* Mobile Social Media Icons */}
                    <div className="flex items-center gap-2 mb-4">
                      <a 
                        href="https://www.instagram.com/armind_industry/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://wa.me/380934236139" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="WhatsApp"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <a 
                        href="viber://chat?number=380934236139" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="Viber"
                      >
                        <PhoneIcon className="h-4 w-4" />
                      </a>
                      <a 
                        href="https://t.me/+380934236139" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                        aria-label="Telegram"
                      >
                        <Send className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <Button 
                      variant="hero" 
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        navigate('/contact?source=header-mobile');
                      }}
                    >
                      Прорахунок
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <Button 
            variant="hero" 
            size="sm"
            onClick={() => navigate('/contact?source=header-desktop')}
            aria-label="Замовити безкоштовну консультацію"
            className="hidden md:inline-flex"
          >
            Прорахунок
          </Button>
        </div>

        {/* Social Media Icons */}
        <div className="hidden lg:flex items-center gap-2">
          <a 
            href="https://www.instagram.com/armind_industry/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a 
            href="https://wa.me/380934236139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <a 
            href="viber://chat?number=380934236139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="Viber"
          >
            <PhoneIcon className="h-4 w-4" />
          </a>
          <a 
            href="https://t.me/+380934236139" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
            aria-label="Telegram"
          >
            <Send className="h-4 w-4" />
          </a>
        </div>
        
        {/* Center - Navigation */}
        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Головна навігація">
          <button 
            onClick={() => scrollToSection('services')}
            className="text-foreground hover:text-primary transition-colors focus:outline-none rounded-sm px-2 py-1"
            aria-label="Перейти до секції послуг"
          >
            Послуги
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-primary transition-colors focus:outline-none rounded-sm px-2 py-1"
            aria-label="Перейти до секції про нас"
          >
            Про нас
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-primary transition-colors focus:outline-none rounded-sm px-2 py-1"
            aria-label="Перейти до секції контактів"
          >
            Контакти
          </button>
        </nav>

        {/* Right side - Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Zap className="h-8 w-8 text-primary animate-laser-pulse" />
          </div>
          <span className="text-xl font-bold text-foreground">Армінд</span>
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;