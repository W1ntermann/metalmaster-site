import { Phone, Mail, MapPin, Instagram, MessageCircle, Phone as PhoneIcon, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/hero-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-5 mb-5">
              <img src={logoImage} alt="Логотип Армінд" className="h-28 w-28 object-contain" />
              <div className="flex flex-col">
                <span className="text-5xl font-bold text-foreground tracking-wider leading-tight">ARMIND</span>
                <span className="text-[11px] text-muted-foreground tracking-wide uppercase mt-1">металообробка повного циклу</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-5 leading-relaxed text-base">
              Armada Industry - це повний цикл обробки металу. Виробництво, інженерний підхід, відповідальність за результат. Від проєктування до порошкового фарбування - все в одному виробництві
            </p>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href="tel:+380934236139" className="hover:text-primary transition-colors text-base">
                  +380 67 352 7350
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a 
                  href="mailto:armindind@gmail.com" 
                  className="hover:text-primary transition-colors text-base"
                >
                  armindind@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <Instagram className="h-4 w-4" />
                <a 
                  href="https://www.instagram.com/armind_industry/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors text-base"
                >
                  @armind_industry
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-base">вул. Миколи Боровського, 28, м. Одеса, 65041</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Послуги</h4>
            <ul className="space-y-2.5">
              <li>
                <Link 
                  to="/laser-cutting" 
                  className="text-muted-foreground hover:text-primary transition-colors text-base"
                >
                  Лазерна різка металу
                </Link>
              </li>
              <li>
                <Link 
                  to="/powder-coating" 
                  className="text-muted-foreground hover:text-primary transition-colors text-base"
                >
                  Порошкове фарбування
                </Link>
              </li>
              <li>
                <Link 
                  to="/metal-welding" 
                  className="text-muted-foreground hover:text-primary transition-colors text-base"
                >
                  Зварювання
                </Link>
              </li>
              <li>
                <Link 
                  to="/precise-bending" 
                  className="text-muted-foreground hover:text-primary transition-colors text-base"
                >
                  Згинання
                </Link>
              </li>
              <li>
                <Link 
                  to="/complex-manufacturing" 
                  className="text-muted-foreground hover:text-primary transition-colors text-base"
                >
                  Комплексне виробництво
                </Link>
              </li>
              <li>
                <Link 
                  to="/for-customers" 
                  className="text-muted-foreground hover:text-primary transition-colors text-base"
                >
                  Для Замовників
                </Link>
              </li>

            </ul>
          </div>

          {/* Working Hours & Social */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Режим роботи</h4>
            <div className="space-y-2.5 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-base">Понеділок - П'ятниця:</span>
                <span className="text-foreground font-medium text-base">8:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-base">Субота:</span>
                <span className="text-muted-foreground font-medium text-base">Вихідний</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-base">Неділя:</span>
                <span className="text-muted-foreground font-medium text-base">Вихідний</span>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-4">Соцмережі</h4>
            <div className="flex gap-3.5">
              <a 
                href="https://www.instagram.com/armind_industry/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-laser rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/380673527350" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-laser rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="viber://chat?number=380673527350" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-laser rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Viber"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/+380673527350" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-laser rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                aria-label="Telegram"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Армада Індастрі. Всі права захищені. | Професійна обробка металу в Одесі
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;