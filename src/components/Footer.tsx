import { Zap, Phone, Mail, MapPin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-8 w-8 text-primary animate-laser-pulse" />
              <span className="text-xl font-bold text-foreground">Армінд</span>
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Армада Індастрі - професійна обробка металу в Одесі. Лазерні технології 
              для промисловості з гарантією якості та екологічно чистими матеріалами.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+380934236139" className="hover:text-primary transition-colors font-medium">
                  +380 (93) 423-61-39
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:armindind@gmail.com" 
                  className="hover:text-primary transition-colors font-medium"
                >
                  armindind@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Instagram className="h-4 w-4" />
                <a 
                  href="https://instagram.com/armind.od" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors font-medium"
                >
                  @armind.od
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>вул. Миколи Боровського, 28, м. Одеса, 65041</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Послуги</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/laser-cutting" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Лазерна різка металу
                </Link>
              </li>
              <li>
                <Link 
                  to="/powder-coating" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Порошкове фарбування
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Режим роботи</h4>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Понеділок - П'ятниця:</span>
                <span className="text-foreground font-medium">8:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Субота:</span>
                <span className="text-foreground font-medium">9:00 - 14:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Неділя:</span>
                <span className="text-muted-foreground">Вихідний</span>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-4">Соцмережі</h4>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/armind.od" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-laser rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/armind_od" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-laser rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform"
                aria-label="Telegram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.78 5.42-.9 6.8-.06.67-.36.89-.89.56-2.45-1.83-3.57-2.98-5.79-4.78-.54-.45-.92-.68-.88-1.07.03-.31.46-.48.9-.35 1.38.45 3.8 1.58 5.1 2.31.5.28.86.27 1.33-.09.77-.59 1.93-1.78 2.78-2.68.26-.26.51-.24.51-.16.02.07-.17.38-.45.69z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Армада Індастрі. Всі права захищені. | Професійна обробка металу в Одесі
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;