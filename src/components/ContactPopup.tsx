import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";

const ContactPopup = () => {
  const { isOpen, closePopup } = useContactPopup();
  const navigate = useNavigate();

  useEffect(() => {
    // Якщо контекст намагається відкрити попап, перенаправляємо на сторінку контакту
    if (isOpen) {
      closePopup();
      navigate('/contact', { state: { contactSource: 'popup-redirect' } });
    }
  }, [isOpen, closePopup, navigate]);



  // Компонент не рендерить нічого
  return null;
};

export default ContactPopup;