import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";

const ContactPopup = () => {
  const { isOpen, closePopup } = useContactPopup();
  const navigate = useNavigate();
  const isManualRedirectRef = useRef(false);

  useEffect(() => {
    // Якщо контекст намагається відкрити попап, перенаправляємо на сторінку контакту
    if (isOpen) {
      isManualRedirectRef.current = true; // Позначаємо, що це ручне перенаправлення
      closePopup();
      navigate('/contact?source=popup-redirect');
    }
  }, [isOpen, closePopup, navigate]);

  useEffect(() => {
    // Перевіряємо коли востаннє показувався popup
    const lastShown = localStorage.getItem('popupLastShown');
    const now = Date.now();

    // Якщо popup показувався менше ніж 30 хвилин тому, не показувати автоматично
    if (lastShown && (now - parseInt(lastShown)) < 1800000) { // 30 хвилин
      return;
    }

    let hasShown = false;
    let timeoutId: number;
    
    const handleScroll = () => {
      // Не показуємо автоматичний popup якщо користувач вже перейшов вручну
      if (hasShown || isManualRedirectRef.current) return;
      
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 40) { // При прокрутці більше 40%
        hasShown = true;
        localStorage.setItem('popupLastShown', now.toString());
        navigate('/contact?source=auto-scroll');
      }
    };

    // Автоматичне перенаправлення через 45 секунд
    timeoutId = setTimeout(() => {
      // Не показуємо автоматичний popup якщо користувач вже перейшов вручну
      if (!hasShown && !isManualRedirectRef.current) {
        hasShown = true;
        localStorage.setItem('popupLastShown', now.toString());
        navigate('/contact?source=auto-timer');
      }
    }, 45000);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigate]);

  // Компонент не рендерить нічого
  return null;
};

export default ContactPopup;