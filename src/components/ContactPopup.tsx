import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, X, Phone, User, HelpCircle } from "lucide-react";

const ContactPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    question: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Перевіряємо чи користувач вже заповнював форму
    const hasSubmitted = localStorage.getItem('contactFormSubmitted');
    const lastShown = localStorage.getItem('popupLastShown');
    const now = Date.now();
    
    if (hasSubmitted) {
      setIsSubmitted(true);
      return;
    }

    // Якщо popup показувався менше ніж 10 хвилин тому, не показувати
    if (lastShown && (now - parseInt(lastShown)) < 600000) { // 10 хвилин
      return;
    }

    let hasShown = false;
    let timeoutId: number;
    
    const handleScroll = () => {
      if (hasShown || isSubmitted || isOpen) return;
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 40) { // Збільшив поріг до 40%
        setIsOpen(true);
        hasShown = true;
        localStorage.setItem('popupLastShown', now.toString());
      }
    };

    // Показати popup через 30 секунд (збільшив час)
    timeoutId = setTimeout(() => {
      if (!hasShown && !isSubmitted && !isOpen) {
        setIsOpen(true);
        hasShown = true;
        localStorage.setItem('popupLastShown', now.toString());
      }
    }, 30000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSubmitted, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Тут можна додати логіку відправки форми
    console.log('Form submitted:', formData);
    
    // Симуляція успішної відправки
    setIsSubmitted(true);
    
    // Зберігаємо в localStorage, що форма була заповнена
    localStorage.setItem('contactFormSubmitted', 'true');
    localStorage.setItem('contactFormData', JSON.stringify(formData));
    
    // Показати повідомлення про успіх на 3 секунди
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      // Зберігаємо час закриття popup
      localStorage.setItem('popupLastShown', Date.now().toString());
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto bg-card border-border shadow-glow">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-laser rounded-full flex items-center justify-center">
            <HelpCircle className="h-8 w-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Виникли питання?
          </DialogTitle>
          <p className="text-muted-foreground">
            Залишіть заявку і наш менеджер зв'яжеться з вами протягом 15 хвилин
          </p>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Ваше ім'я *
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Введіть ваше ім'я"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10 bg-background border-border focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground font-medium">
                Номер телефону *
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+380 (XX) XXX-XX-XX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10 bg-background border-border focus:ring-primary"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="question" className="text-foreground font-medium">
                Ваше питання
              </Label>
              <Textarea
                id="question"
                placeholder="Опишіть що вас цікавить..."
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                className="bg-background border-border focus:ring-primary min-h-[100px] resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button 
                type="submit" 
                variant="hero" 
                className="flex-1"
                disabled={!formData.name || !formData.phone}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Надіслати
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleClose(false)}
                className="px-4"
                aria-label="Закрити форму"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Натискаючи "Надіслати", ви погоджуєтесь з обробкою персональних даних
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4 py-8">
            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              Дякуємо за заявку!
            </h3>
            <p className="text-muted-foreground">
              Наш менеджер зв'яжеться з вами найближчим часом
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
