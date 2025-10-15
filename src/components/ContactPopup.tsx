import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, X, Phone, User, HelpCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useContactPopup } from "@/contexts/ContactPopupContext";

// URL вашого Google Apps Script Web App
const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

const ContactPopup = () => {
  const { isOpen, closePopup } = useContactPopup();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    question: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      if (hasShown || isSubmitted || internalIsOpen || isOpen) return;
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 40) { // Збільшив поріг до 40%
        setInternalIsOpen(true);
        hasShown = true;
        localStorage.setItem('popupLastShown', now.toString());
      }
    };

    // Показати popup через 30 секунд (збільшив час)
    timeoutId = setTimeout(() => {
      if (!hasShown && !isSubmitted && !internalIsOpen && !isOpen) {
        setInternalIsOpen(true);
        hasShown = true;
        localStorage.setItem('popupLastShown', now.toString());
      }
    }, 30000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isSubmitted, internalIsOpen, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Підготовка даних для відправки
      const dataToSend = {
        name: formData.name,
        phone: formData.phone,
        question: formData.question || "Питання не вказано",
        timestamp: new Date().toLocaleString('uk-UA', { 
          timeZone: 'Europe/Kiev',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: window.location.pathname
      };

      // ✅ ТЕСТУВАННЯ: Виводимо дані в консоль
      console.log('📋 Дані форми для відправки:', dataToSend);
      console.log('🔗 Google Script URL:', GOOGLE_SCRIPT_URL);

      // Перевірка чи налаштований URL
      if (GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_URL_HERE") {
        console.warn('⚠️ УВАГА: Google Script URL не налаштований!');
        console.log('✅ Форма працює! Дані готові до відправки:', dataToSend);
        
        // Для тестування показуємо успіх навіть без реального URL
        setIsSubmitted(true);
        localStorage.setItem('contactFormSubmitted', 'true');
        localStorage.setItem('contactFormData', JSON.stringify(formData));
        
        toast({
          title: "✅ Тест успішний!",
          description: "Дані готові. Налаштуйте Google Script URL для реальної відправки.",
        });
        
        setTimeout(() => {
          setInternalIsOpen(false);
          closePopup();
        }, 3000);
        
        return;
      }

      // Відправка даних у Google Таблицю
      console.log('📤 Відправка даних...');
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Важливо для Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      // З mode: 'no-cors' ми не можемо перевірити відповідь,
      // тому вважаємо що все ок, якщо не було помилки
      console.log('✅ Дані успішно відправлено в Google Таблицю!');
      
      setIsSubmitted(true);
      
      // Зберігаємо в localStorage, що форма була заповнена
      localStorage.setItem('contactFormSubmitted', 'true');
      localStorage.setItem('contactFormData', JSON.stringify(formData));
      
      toast({
        title: "Успішно відправлено!",
        description: "Наш менеджер зв'яжеться з вами найближчим часом.",
      });
      
      // Закрити popup через 3 секунди
      setTimeout(() => {
        setInternalIsOpen(false);
        closePopup();
      }, 3000);
      
    } catch (error) {
      console.error('❌ Помилка відправки форми:', error);
      console.error('Деталі помилки:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      
      toast({
        variant: "destructive",
        title: "Помилка відправки",
        description: "Спробуйте ще раз або зателефонуйте нам безпосередньо.",
      });
    } finally {
      setIsLoading(false);
    }
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
      setInternalIsOpen(false);
      closePopup();
    } else {
      setInternalIsOpen(true);
    }
  };

  // Відкриваємо popup якщо контекст каже відкрити або внутрішній стан
  const shouldBeOpen = isOpen || internalIsOpen;

  return (
    <Dialog open={shouldBeOpen} onOpenChange={handleClose}>
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
                disabled={!formData.name || !formData.phone || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Відправка...
                  </>
                ) : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Надіслати
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => handleClose(false)}
                className="px-4"
                aria-label="Закрити форму"
                disabled={isLoading}
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
