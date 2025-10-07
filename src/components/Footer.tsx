import { Zap, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
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
                <a href="tel:+380488888888" className="hover:text-primary transition-colors font-medium">
                  +380 (48) 888-88-88
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@armind.od.ua</span>
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
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Лазерна різка металу</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Згинання листового металу</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Лазерне зварювання</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Порошкове фарбування</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Режим роботи</h4>
            <div className="space-y-2">
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