import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Zap, CheckCircle, Phone, Award, Shield, Wrench, 
  FileText, Upload, Grid3x3, Ruler, Layers, Repeat, 
  Truck, Clock, MessageSquare, User, Mail, AlertCircle,
  X, Check, Download, FileUp, Image, FileWarning
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
import laserImg from "@/assets/for-laser-cutting.jpg";
import backgroundImage from "@/assets/for-cutting-page.jpg";
import { makeWebhookService } from "@/services/makeWebhook";

// URL Google Apps Script для відправки файлів
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwyBYVfh9EpY49WF3ROqQQs88RoWjvCUhWckOZ6GKn87x8eJLiAU2QmpxKN1gt4nS9YcQ/exec";

// Приклади робіт
import work1 from "@/assets/for-cutting-1.jpg";
import work2 from "@/assets/for-cutting-2.jpg";
import work3 from "@/assets/for-cutting-3.jpg";
import work4 from "@/assets/for-cutting-4.jpg";
import work5 from "@/assets/for-cutting-5.jpg";
import work6 from "@/assets/for-cutting-6.jpg";

// Типи для форми
interface FormData {
  name: string;
  phone: string;
  email: string;
  material: string;
  thickness: string;
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

const LaserCutting = () => {
  useContactPopup();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Реф для форми
  const formRef = useRef<HTMLDivElement>(null);
  
  // Стан форми
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    material: '',
    thickness: '',
    quantity: '',
    description: '',
    file: null
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goBackToServices = () => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('services');
      element?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Валідація форми - обов'язкові: ім'я, телефон, опис
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Вкажіть ваше ім'я";
    } else if (formData.name.length < 2) {
      newErrors.name = "Ім'я має містити хоча б 2 символи";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Вкажіть телефон для зв'язку";
    } else if (formData.phone.replace(/[^\d+]/g, '').length < 9) {
      newErrors.phone = "Введіть коректний номер телефону";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Опишіть ваше замовлення";
    } else if (formData.description.length < 10) {
      newErrors.description = "Опис має містити мінімум 10 символів для точного розрахунку";
    }
    
    setErrors(newErrors);
    return newErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

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

  // Відправка форми
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
        service_type: 'laser_cutting',
        timestamp: new Date().toLocaleString('uk-UA', { 
          timeZone: 'Europe/Kiev',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        }),
        source: 'laser_cutting',
        page_url: window.location.href,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        material: formData.material || 'Не вказано',
        thickness: formData.thickness || 'Не вказано',
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
        description: "Заявку на лазерну різку передано в обробку. Перенаправляємо на сторінку подяки...",
      });

      persistAttribution({ source: 'laser_cutting', utm_source: utmSource, utm_medium: utmMedium, utm_campaign: utmCampaign });

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

  const works = [
    { id: 1, img: work1},
    { id: 2, img: work2 },
    { id: 3, img: work3},
    { id: 4, img: work4},
    { id: 5, img: work5},
    { id: 6, img: work6},
  ];

  const materials = [
    { value: 'steel', label: 'Сталь' },
    { value: 'stainless', label: 'Нержавійка' },
    { value: 'aluminum', label: 'Алюміній' },
    { value: 'brass', label: 'Латунь' },
    { value: 'copper', label: 'Мідь' },
  ];

  const thicknesses = [
    { value: '0.5', label: '0.5 мм' },
    { value: '1', label: '1 мм' },
    { value: '1.5', label: '1.5 мм' },
    { value: '2', label: '2 мм' },
    { value: '3', label: '3 мм' },
    { value: '4', label: '4 мм' },
    { value: '5', label: '5 мм' },
    { value: '6', label: '6 мм' },
    { value: '8', label: '8 мм' },
    { value: '10', label: '10 мм' },
    { value: '12', label: '12 мм' },
    { value: '15', label: '15 мм' },
    { value: '20', label: '20 мм' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead seoData={seoPages.laserCutting} />
      <Header />
      
      <BackButton targetId="services" />

      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                <span className="bg-gradient-laser bg-clip-text text-transparent">Лазерна різка</span> металу
              </h1>
              <div className="space-y-4 mb-8">
                <p className="text-white text-lg text-muted-foreground">
                  Виконуємо лазерну різку сталі, нержавійки та алюмінію за кресленнями 
                  клієнта або допомагаємо підготувати їх з нуля.
                </p>
                <p className="text-white text-lg text-muted-foreground">
                  Отримуєте деталі з високою точністю, чистим краєм різу та готовністю 
                  до подальшої обробки або фарбування.
                </p>
                <p className="text-white text-lg text-muted-foreground">
                  Підходить для виробництва конструкцій, корпусних елементів, 
                  декоративних деталей та серійних виробів.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="group"
                  onClick={scrollToForm}
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Дізнатися вартість
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={laserImg} 
                alt="Лазерна різка металу"
                className="w-full h-auto rounded-lg shadow-2xl shadow-black/50"
              />
            </div>
          </div>
        </div>
      </section>

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
            Технічні характеристики
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Ruler className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">±0.03 мм</div>
              <div className="text-white font-medium mb-1">Точність позиціювання</div>
              <div className="text-sm text-white/70">Найвища точність різки</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Layers className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">до 20 мм</div>
              <div className="text-white font-medium mb-1">Товщина сталі</div>
              <div className="text-sm text-white/70">Максимальна товщина</div>
            </Card>
            <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20">
              <Grid3x3 className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary mb-2">3000×1500</div>
              <div className="text-white font-medium mb-1">Розмір листа мм</div>
              <div className="text-sm text-white/70">Максимальний габарит</div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex flex-col items-center text-center">
                <Repeat className="h-8 w-8 text-primary mb-3" />
                <div className="text-xl font-bold text-white mb-1">Мінімальна партія</div>
                <div className="text-2xl font-bold text-primary">від 1 деталі</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

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
                <Zap className="h-6 w-6 text-primary" />
                Переваги лазерної різки
              </h3>
              <div className="space-y-3">
                {[
                  "Висока точність ±0.03 мм",
                  "Мінімальна зона термічного впливу",
                  "Чиста кромка без обробки",
                  "Автоматизація процесу",
                  "Екологічність"
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
                <Award className="h-6 w-6 text-primary" />
                Чому клієнти працюють з нами
              </h3>
              <div className="space-y-3">
                {[
                  "Власне виробництво",
                  "Точне обладнання",
                  "Працюємо з малими і великими партіями",
                  "Допомагаємо з підготовкою креслень",
                  "Можлива повна обробка: різка + фарбування"
                ].map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-white">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            ПРИКЛАДИ РОБІТ
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Приклади деталей, виготовлених методом лазерної різки
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((work) => (
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

      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
            Сфери застосування
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Машинобудування</h3>
              <p className="text-muted-foreground text-sm">Деталі механізмів, кріплення, шасі</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Архітектура</h3>
              <p className="text-muted-foreground text-sm">Фасадні елементи, перила, декор</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Реклама</h3>
              <p className="text-muted-foreground text-sm">Об'ємні літери, вивіски, стенди</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Меблі</h3>
              <p className="text-muted-foreground text-sm">Металеві каркаси, фурнітура, декор</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Автомобілі</h3>
              <p className="text-muted-foreground text-sm">Кузовні деталі, кріплення, аксесуари</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-laser rounded-full mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Енергетика</h3>
              <p className="text-muted-foreground text-sm">Кріплення, шасі, теплообмінники</p>
            </Card>
          </div>
        </div>
      </section>

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
            ЧАСТІ ПИТАННЯ
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Яка мінімальна партія?</h3>
              <p className="text-white/80">Ми можемо виконати замовлення навіть від 1 деталі. Це зручно для прототипів або тестових партій.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Чи можна замовити без креслень?</h3>
              <p className="text-white/80">Так. Ви можете надіслати ескіз, фото або опис деталі — наші інженери допоможуть підготувати креслення.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Скільки коштує лазерна різка?</h3>
              <p className="text-white/80">Ціна залежить від матеріалу, товщини металу, складності деталі та обсягу партії. Ми розраховуємо вартість після отримання файлу або опису.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-lg font-bold text-white mb-2">Які терміни виробництва?</h3>
              <p className="text-white/80">Зазвичай від 1 до 5 робочих днів залежно від складності та обсягу замовлення.</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 md:col-span-2">
              <h3 className="text-lg font-bold text-white mb-2">Чи можна одразу замовити фарбування?</h3>
              <p className="text-white/80">Так. Після різки ми можемо виконати порошкове фарбування деталей.</p>
            </Card>
          </div>
        </div>
      </section>

      <section 
        ref={formRef}
        className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Отримайте розрахунок вартості
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
                      {materials.map(m => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      Товщина (необов'язково)
                    </label>
                    <select
                      name="thickness"
                      value={formData.thickness}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Оберіть товщину</option>
                      {thicknesses.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

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
                      placeholder="100 шт"
                    />
                  </div>
                </div>

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
                    placeholder="Опишіть деталі, розміри, вимоги до точності..."
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <FileUp className="h-4 w-4 text-primary" />
                    Креслення або ескіз (необов'язково)
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
                        accept=".dwg,.dxf,.cdw,.pdf,.jpg,.jpeg,.png,.step,.stp,.iges,.igs"
                        onChange={handleFileChange}
                      />
                      <div className="text-center">
                        <Image className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-foreground mb-1">
                          <span className="text-primary">Натисніть для завантаження</span> або перетягніть файл
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Підтримуються: DWG, DXF, CDW, PDF, STEP, STP, IGES, JPG, PNG (макс. 10 MB)
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
                      <FileText className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                      Отримати розрахунок
                    </>
                  )}
                </Button>

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
    </div>
  );
};

export default LaserCutting;