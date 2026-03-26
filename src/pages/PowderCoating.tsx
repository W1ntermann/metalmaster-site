import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Palette, CheckCircle, Phone, Settings, ArrowLeft, X, ZoomIn,
  FileText, Upload, Ruler, Layers, Grid3x3, Shield, Award,
  User, Mail, MessageSquare, Clock, AlertCircle, Check,
  Thermometer, Wind, Gauge, Droplets, Zap, Truck
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactPopup } from "@/contexts/ContactPopupContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactPopup from "@/components/ContactPopup";
import SEOHead from "@/components/SEOHead";
import BackButton from "@/components/BackButton";
import { useToast } from "@/hooks/use-toast";
import { seoPages } from "@/utils/seo";
import { persistAttribution, readTrackingParams } from "@/utils/attribution";
import spreadPaintImage from "@/assets/for-paint-first.jpg";
import backgroundImage from "@/assets/bg-for-powder.jpg";
import { makeWebhookService } from "@/services/makeWebhook";

// URL Google Apps Script для відправки файлів
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwyBYVfh9EpY49WF3ROqQQs88RoWjvCUhWckOZ6GKn87x8eJLiAU2QmpxKN1gt4nS9YcQ/exec";

// Імпорт картинок для кольорів
import glossyImage from "@/assets/glance.png";
import matteImage from "@/assets/mat.png";
import shargenImage from "@/assets/Shargen.png";
import texturedImage from "@/assets/Structure.png";

// Імпорт картинок для каталогу RAL
import ralCatalog1 from "@/assets/ral/1.1.jpg";
import ralCatalog2 from "@/assets/ral/2.jpg";
import ralCatalog3 from "@/assets/ral/3.jpg";
import ralCatalog4 from "@/assets/ral/4.jpg";
import ralCatalog5 from "@/assets/ral/5.jpg";
import ralCatalog6 from "@/assets/ral/6.jpg";

// Імпорт нових картинок для обладнання
import qualityControlImage from "@/assets/quality.jpg";
import polymerizationOvenImage from "@/assets/polymer.jpg";
import zincImage from "@/assets/grunt.jpg";
import thermoplastImage from "@/assets/thermoplast.jpg";

// Імпорт зображень для галереї робіт
import work1 from "@/assets/for-paint1.jpg";
import work2 from "@/assets/for-paint2.jpg";
import work3 from "@/assets/for-paint3.jpg";
import work4 from "@/assets/for-paint4.jpg";
import work5 from "@/assets/for-paint5.jpg";
import work6 from "@/assets/for-paint6.jpg";

// Типи для форми
interface FormData {
  name: string;
  phone: string;
  email: string;
  productType: string;
  dimensions: string;
  material: string;
  color: string;
  finish: string;
  quantity: string;
  description: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  description?: string;
}

const PowderCoating = () => {
  const ralCatalogRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  useContactPopup();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Стан форми
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    productType: '',
    dimensions: '',
    material: '',
    color: '',
    finish: '',
    quantity: '',
    description: '',
    file: null
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  // Галерея робіт
  const galleryImages = [
    { id: 1, img: work1},
    { id: 2, img: work2},
    { id: 3, img: work3},
    { id: 4, img: work4},
    { id: 5, img: work5 },
    { id: 6, img: work6 }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Закриття модального вікна при натисканні Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedImage]);

  const scrollToRalCatalog = () => {
    ralCatalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const goBackToServices = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('services');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Валідація форми - обов'язкові: ім'я, телефон, опис
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    // Ім'я - обов'язкове
    if (!formData.name.trim()) {
      newErrors.name = "Вкажіть ваше ім'я";
    } else if (formData.name.length < 2) {
      newErrors.name = "Ім'я має містити хоча б 2 символи";
    }
    
    // Телефон - обов'язковий
    if (!formData.phone.trim()) {
      newErrors.phone = "Вкажіть телефон для зв'язку";
    } else if (formData.phone.replace(/[^\d+]/g, '').length < 9) {
      newErrors.phone = "Введіть коректний номер телефону";
    }
    
    // Email - опціональний, але якщо вказаний, перевіряємо формат
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    
    // Опис замовлення - обов'язковий
    if (!formData.description.trim()) {
      newErrors.description = "Опишіть ваше замовлення";
    } else if (formData.description.length < 10) {
      newErrors.description = "Опис має містити мінімум 10 символів для точного розрахунку";
    }
    
    setErrors(newErrors);
    return newErrors;
  };

  // Обробка зміни полів
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Обробка файлу
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('Файл занадто великий. Максимальний розмір 10MB');
        return;
      }
      
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
      
      setFormData(prev => ({ ...prev, file }));
    }
  };

  const removeFile = () => {
    setFormData(prev => ({ ...prev, file: null }));
    setUploadProgress(0);
  };

  // Drag & Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert('Файл занадто великий. Максимальний розмір 10MB');
        return;
      }
      setFormData(prev => ({ ...prev, file }));
    }
  };

  // Відправка форми - така ж структура як у ContactForm
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      const firstError = Object.keys(validationErrors)[0];
      const element = document.querySelector(`[name="${firstError}"]`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign } = readTrackingParams(new URLSearchParams(window.location.search));

      const dataToSend = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email || '',
        question: formData.description,
        description: formData.description,
        service_type: 'powder_coating',
        timestamp: new Date().toLocaleString('uk-UA', { 
          timeZone: 'Europe/Kiev',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: 'powder_coating',
        page_url: window.location.href,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        productType: formData.productType || 'Не вказано',
        dimensions: formData.dimensions || 'Не вказано',
        material: formData.material || 'Не вказано',
        color: formData.color || 'Не вказано',
        finish: formData.finish || 'Не вказано',
        quantity: formData.quantity || 'Не вказано'
      };

      const promises: Promise<unknown>[] = [];

      promises.push(
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify(dataToSend)
        }).catch(error => {
          console.error('Помилка відправки в Google Sheets:', error);
          return null;
        })
      );

      const makeData = {
        ...dataToSend,
        file: formData.file || undefined,
        file_name: formData.file?.name,
        file_size: formData.file?.size,
        file_type: formData.file?.type
      };

      promises.push(
        makeWebhookService.sendToMake(makeData).catch(error => {
          console.error('Помилка відправки в Make:', error);
          return { success: false, error: error.message };
        })
      );

      const results = await Promise.allSettled(promises);

      const makeResult = results[1];
      if (makeResult?.status === 'rejected') {
        throw makeResult.reason;
      }

      if (makeResult?.status === 'fulfilled' && makeResult.value && typeof makeResult.value === 'object' && 'success' in makeResult.value) {
        const makeResponse = makeResult.value as { success?: boolean; error?: string };
        if (!makeResponse.success) {
          console.warn('Make webhook помилка:', makeResponse.error);
          throw new Error(makeResponse.error || 'Помилка відправки в Make');
        }
      }

      setSubmitStatus('success');

      toast({
        title: "Успішно відправлено!",
        description: "Заявку на порошкове фарбування передано в обробку. Перенаправляємо на сторінку подяки...",
      });

      persistAttribution({ source: 'powder_coating', utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign });

      setTimeout(() => {
        navigate('/thanks');
      }, 1000);

    } catch (error) {
      console.error('Помилка відправки:', error);
      setSubmitStatus('error');

      toast({
        variant: "destructive",
        title: "Помилка відправки",
        description: "Спробуйте ще раз або зв'яжіться з нами по телефону.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Дані для кольорових варіантів
  const colorOptions = [
    {
      image: glossyImage,
      title: "Глянець",
      details: "Гладке покриття, що містить 85-100% блиску.",
      className: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      image: matteImage,
      title: "Мат",
      details: "Гладке покриття, що містить від 28 до 40% блиску. Глибокий мат до 10% блиску.",
      className: "bg-gradient-to-br from-gray-600 to-gray-800"
    },
    {
      image: shargenImage,
      title: "Шагрінь",
      details: "Текстурний тип поверхні. Зернистість (хвиля) буває дрібнішою, буває більшою. Ступінь блиску близько 50%.",
      className: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      image: texturedImage,
      title: "Структурні",
      details: "Дрібнозернистий шорсткий тип поверхні, схожий на наждаку. По мірі блиску наближений до глибокого мату.",
      className: "bg-gradient-to-br from-gray-400 to-gray-600"
    },
    {
      image: zincImage,
      title: "Грунт цинковмісний",
      details: "Антикорозійний грунт з вмістом цинку для захисту металу. Забезпечує катодний захист та підвищену адгезію.",
      className: "bg-gradient-to-br from-gray-700 to-blue-900"
    },
    {
      image: thermoplastImage,
      title: "Термопласт",
      details: "Пластичне покриття з полімерів, що плавиться при нагріванні. Висока стійкість до механічних пошкоджень.",
      className: "bg-gradient-to-br from-red-500 to-orange-700"
    }
  ];

  // Дані для каталогу RAL
  const ralCatalogs = [
    { image: ralCatalog1 },
    { image: ralCatalog2 },
    { image: ralCatalog3 },
    { image: ralCatalog4 },
    { image: ralCatalog5 },
    { image: ralCatalog6 }
  ];

  // Опції для випадаючих списків
  const materialOptions = [
    { value: 'steel', label: 'Сталь' },
    { value: 'stainless', label: 'Нержавійка' },
    { value: 'aluminum', label: 'Алюміній' },
    { value: 'cast_iron', label: 'Чавун' },
    { value: 'other', label: 'Інший' }
  ];

  const finishOptions = [
    { value: 'glossy', label: 'Глянець' },
    { value: 'matte', label: 'Мат' },
    { value: 'shagreen', label: 'Шагрінь' },
    { value: 'textured', label: 'Структурне' },
    { value: 'zinc', label: 'Цинковмісний грунт' },
    { value: 'thermoplastic', label: 'Термопласт' }
  ];

  const colorOptionsList = [
    { value: 'ral_1000', label: 'RAL 1000 (Зелений бежевий)' },
    { value: 'ral_1013', label: 'RAL 1013 (Перламутрово-білий)' },
    { value: 'ral_1015', label: 'RAL 1015 (Світла слонова кістка)' },
    { value: 'ral_2000', label: 'RAL 2000 (Жовто-оранжевий)' },
    { value: 'ral_3000', label: 'RAL 3000 (Вогненно-червоний)' },
    { value: 'ral_5005', label: 'RAL 5005 (Синій сигнальний)' },
    { value: 'ral_6005', label: 'RAL 6005 (Зелений мох)' },
    { value: 'ral_7004', label: 'RAL 7004 (Сірий сигнальний)' },
    { value: 'ral_8004', label: 'RAL 8004 (Мідно-коричневий)' },
    { value: 'ral_9005', label: 'RAL 9005 (Чорний)' },
    { value: 'other', label: 'Інший (вкажіть в описі)' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead seoData={seoPages.powderCoating} />
      <Header />
      
      <BackButton targetId="services" />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="bg-gradient-laser bg-clip-text text-transparent">Порошкове фарбування</span> металу
              </h1>
              <p className="text-white text-xl text-muted-foreground mb-8 leading-relaxed">
                Стійке покриття з широкою палітрою кольорів та фактур. Використовуємо італійське 
                обладнання та сертифіковані порошкові фарби для довговічного результату.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group"
                  onClick={scrollToForm}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Замовити фарбування
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={scrollToRalCatalog}
                >
                  Каталог кольорів RAL
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={spreadPaintImage} 
                alt="Порошкове фарбування металу"
                className="w-full h-auto rounded-lg shadow-2xl shadow-black/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications with Background Image */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Технічні можливості
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Ruler className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">6×1.2×2 м</div>
              <div className="text-white font-medium mb-1">Розмір камери</div>
              <div className="text-sm text-white/70">Максимальні габарити</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">ISO 9001</div>
              <div className="text-white font-medium mb-1">Система контролю якості</div>
              <div className="text-sm text-white/70">Європейські стандарти</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Layers className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">40-150 мкм</div>
              <div className="text-white font-medium mb-1">Товщина покриття</div>
              <div className="text-sm text-white/70">Регульована товщина</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Palette className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">300+</div>
              <div className="text-white font-medium mb-1">Кольори</div>
              <div className="text-sm text-white/70">Широка палітра RAL</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Color Options */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Варіанти покриття
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colorOptions.map((color, index) => (
              <Card key={index} className="overflow-hidden bg-white/10 backdrop-blur-sm border-white/20 group hover:scale-105 transition-transform duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={color.image} 
                    alt={color.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-white mb-2 text-lg">{color.title}</h3>
                  <p className="text-sm text-white/70">{color.details}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 relative">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Переваги порошкового фарбування
              </h3>
              <div className="space-y-4">
                {[
                  "Корозійна стійкість до 25 років",
                  "Екологічно чисті матеріали",
                  "Стійкість до ультрафіолету",
                  "Механічна міцність покриття",
                  "Широка температурна стійкість"
                ].map((advantage, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-white">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-primary" />
                Сфери застосування
              </h3>
              <div className="space-y-3">
                {[
                  "Фасадні системи та архітектура",
                  "Меблеві та інтер'єрні конструкції", 
                  "Огорожі, ворота та перила",
                  "Садово-паркові форми",
                  "Промислове обладнання"
                ].map((application, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-white">{application}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            ПРИКЛАДИ РОБІТ
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Приклади виробів, які ми фарбували порошковою фарбою
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((work) => (
              <Card key={work.id} className="overflow-hidden group cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={work.img} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* RAL Catalog Section */}
      <section ref={ralCatalogRef} className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Каталог кольорів RAL
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Широка палітра кольорів RAL для порошкового фарбування. 
              Виберіть ідеальний відтінок для вашого проекту.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ralCatalogs.map((catalog, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedImage(catalog.image)}
              >
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={catalog.image}
                    alt={`Каталог RAL ${index + 1}`}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                      <ZoomIn className="h-6 w-6 text-gray-800" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Order Form */}
      <section ref={formRef} className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Замовте порошкове фарбування
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Заповніть форму нижче. Ми проаналізуємо ваше замовлення і підготуємо 
              комерційну пропозицію протягом 30 хвилин
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-destructive">*</span> Обов'язкові поля: ім'я, телефон та опис замовлення
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 shadow-2xl border-primary/20 bg-gradient-to-br from-card to-background">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Контактні дані */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      Ваше ім'я <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg bg-background border ${
                          errors.name ? 'border-destructive' : 'border-border'
                        } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                        placeholder="Іван Петренко"
                      />
                      {errors.name && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        </div>
                      )}
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      Телефон <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full p-3 rounded-lg bg-background border ${
                          errors.phone ? 'border-destructive' : 'border-border'
                        } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                        placeholder="+380 (67) 123-45-67"
                      />
                      {errors.phone && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <AlertCircle className="h-5 w-5 text-destructive" />
                        </div>
                      )}
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Email (необов'язково)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full p-3 rounded-lg bg-background border ${
                        errors.email ? 'border-destructive' : 'border-border'
                      } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                      placeholder="ivan@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Параметри замовлення - всі необов'язкові */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Тип виробу (необов'язково)
                    </label>
                    <input
                      type="text"
                      name="productType"
                      value={formData.productType}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="Наприклад: металеві ворота, фасадні панелі..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Габарити (необов'язково)
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="2000x1000x50 мм"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Матеріал (необов'язково)
                    </label>
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Оберіть матеріал</option>
                      {materialOptions.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Тип покриття (необов'язково)
                    </label>
                    <select
                      name="finish"
                      value={formData.finish}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Оберіть тип</option>
                      {finishOptions.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Колір RAL (необов'язково)
                    </label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Оберіть колір</option>
                      {colorOptionsList.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Кількість (необов'язково)
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="10 шт"
                    />
                  </div>
                </div>

                {/* Опис замовлення - обов'язковий */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    Опис замовлення <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full p-3 rounded-lg bg-background border ${
                      errors.description ? 'border-destructive' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none`}
                    placeholder="Опишіть деталі, особливі вимоги до покриття, бажаний відтінок..."
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Мінімум 10 символів. Чим детальніший опис, тим точнішим буде розрахунок
                  </p>
                </div>

                {/* Завантаження файлу */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Upload className="h-4 w-4 text-primary" />
                    Креслення, фото або ескіз (необов'язково)
                  </label>
                  
                  {!formData.file ? (
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
                        dragActive 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50 hover:bg-primary/5'
                      }`}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".dwg,.dxf,.cdw,.pdf,.jpg,.jpeg,.png,.step,.stp"
                        onChange={handleFileChange}
                      />
                      <div className="text-center">
                        <div className="h-10 w-10 text-muted-foreground mx-auto mb-3">
                          <Upload className="h-10 w-10" />
                        </div>
                        <p className="text-sm text-foreground mb-1">
                          <span className="text-primary">Натисніть для завантаження</span> або перетягніть файл
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Підтримуються: DWG, DXF, PDF, JPG, PNG, STEP (макс. 10 MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {formData.file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 hover:bg-destructive/10 rounded-full transition-colors"
                        >
                          <X className="h-5 w-5 text-destructive" />
                        </button>
                      </div>
                      
                      {uploadProgress < 100 && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Завантаження...</span>
                            <span className="text-primary">{uploadProgress}%</span>
                          </div>
                          <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {uploadProgress === 100 && (
                        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                          <Check className="h-3 w-3" />
                          <span>Файл завантажено успішно</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Статус відправки */}
                {submitStatus === 'error' && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center">
                      <X className="h-4 w-4 text-destructive" />
                    </div>
                    <div>
                      <p className="text-destructive font-medium">
                        Помилка відправки
                      </p>
                      <p className="text-sm text-destructive/70">
                        Спробуйте пізніше або зв'яжіться з нами по телефону
                      </p>
                    </div>
                  </div>
                )}

                {/* Кнопка відправки */}
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full relative overflow-hidden group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary animate-shimmer" />
                      <span className="relative flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Відправка...
                      </span>
                    </>
                  ) : (
                    <>
                      <Palette className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Отримати розрахунок вартості
                    </>
                  )}
                </Button>

                {/* Додаткова інформація */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Відповідь протягом 30 хвилин</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Ваші дані захищені</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Безкоштовний розрахунок</span>
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <ContactPopup />
      
      {/* Modal для перегляду зображень RAL каталогу */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={selectedImage}
              alt="RAL каталог у повному розмірі"
              className="w-full h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PowderCoating;