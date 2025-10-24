// SEO утиліти для динамічного управління meta тегами
export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export const updatePageSEO = (seoData: SEOData) => {
  // Перевіряємо чи є параметри в URL, які не повинні індексуватися
  const urlParams = new URLSearchParams(window.location.search);
  const hasBlockedParams = urlParams.has('q') || urlParams.has('utm_source') || 
                          urlParams.has('utm_medium') || urlParams.has('utm_campaign') ||
                          urlParams.has('fbclid') || urlParams.has('gclid');
  
  // Якщо є заборонені параметри, додаємо noindex
  if (hasBlockedParams) {
    const robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    }
  }

  // Оновлюємо title
  document.title = seoData.title;

  // Функція для оновлення або створення meta тегу
  const updateMetaTag = (name: string, content: string, property?: boolean) => {
    const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (property) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Оновлюємо основні meta теги
  updateMetaTag('description', seoData.description);
  updateMetaTag('keywords', seoData.keywords);

  // Оновлюємо Open Graph теги
  updateMetaTag('og:title', seoData.ogTitle || seoData.title, true);
  updateMetaTag('og:description', seoData.ogDescription || seoData.description, true);
  updateMetaTag('og:url', window.location.href, true);
  
  if (seoData.ogImage) {
    updateMetaTag('og:image', seoData.ogImage, true);
  }

  // Оновлюємо Twitter Card теги
  updateMetaTag('twitter:title', seoData.ogTitle || seoData.title, true);
  updateMetaTag('twitter:description', seoData.ogDescription || seoData.description, true);
  
  if (seoData.ogImage) {
    updateMetaTag('twitter:image', seoData.ogImage, true);
  }

  // Оновлюємо canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  // Використовуємо поточний URL без параметрів як canonical, якщо не вказано інше
  const canonicalUrl = seoData.canonicalUrl || window.location.origin + window.location.pathname;
  canonical.setAttribute('href', canonicalUrl);

  // Додаємо структуровані дані
  if (seoData.structuredData) {
    // Видаляємо попередні структуровані дані сторінки (якщо є)
    const existingScript = document.querySelector('script[data-page-structured-data]');
    if (existingScript) {
      existingScript.remove();
    }

    // Додаємо нові структуровані дані
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-page-structured-data', 'true');
    script.textContent = JSON.stringify(seoData.structuredData);
    document.head.appendChild(script);
  }
};

// SEO дані для різних сторінок
export const seoPages = {
  home: {
    title: "Армада Індастрі (Армінд) - Лазерна обробка металу в Одесі | Різка, зварювання, фарбування",
    description: "Армада Індастрі - професійна лазерна обробка металу в Одесі: різка до 25мм, згинання, зварювання, порошкове фарбування. Від 24 годин, 200+ кольорів RAL, екологічні матеріали.",
    keywords: "лазерна різка Одеса, обробка металу Одеса, лазерне зварювання, порошкове фарбування, згинання металу, металообробка, RAL фарбування, Армада Індастрі, Армінд",
    ogTitle: "Армада Індастрі - Лазерна обробка металу в Одесі",
    ogDescription: "Професійні послуги лазерної обробки металу: різка, зварювання, фарбування. Сучасне обладнання, швидкі терміни, гарантія якості.",
    ogImage: "https://armind.com.ua/src/assets/hero-industrial.jpg",
    canonicalUrl: "https://armind.com.ua/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Армада Індастрі",
      "alternateName": "Армінд",
      "description": "Професійна лазерна обробка металу в Одесі: різка, згинання, зварювання та порошкове фарбування",
      "url": "https://armind.com.ua",
      "telephone": "+380934236139",
      "email": "info@armind.com.ua",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "вул. Миколи Боровського, 28",
        "addressLocality": "Одеса",
        "postalCode": "65041",
        "addressCountry": "UA"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "46.485387",
        "longitude": "30.664776"
      },
      "openingHours": [
        "Mo-Fr 08:00-18:00",
        "Sa 09:00-14:00"
      ],
      "serviceArea": {
        "@type": "Place",
        "name": "Одеса та область"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Послуги обробки металу",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Лазерна різка металу",
              "description": "Високоточна лазерна різка металу товщиною до 25 мм"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Згинання металу",
              "description": "Гнуття листового металу на сучасному обладнанні"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Лазерне зварювання",
              "description": "Безконтактне зварювання з мінімальною зоною термічного впливу"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Порошкове фарбування",
              "description": "Стійке покриття з широкою палітрою кольорів RAL"
            }
          }
        ]
      }
    }
  },

  laserCutting: {
    title: "Лазерна різка металу в Одесі - Армада Індастрі | Точність ±0.03мм, до 20мм товщини",
    description: "Професійна лазерна різка металу в Одесі: сталь до 20мм, алюміній, нержавійка. Точність ±0.03мм, швидкість до 40м/хв. Волоконні лазери 6кВт. Замовити онлайн.",
    keywords: "лазерна різка Одеса, різка металу лазером, лазерна різка сталі, різка алюмінію лазером, лазерна різка нержавійки, точна різка металу, волоконний лазер, MT-L3015F",
    ogTitle: "Лазерна різка металу в Одесі - Точність ±0.03мм",
    ogDescription: "Професійна лазерна різка металу: сталь до 20мм, точність ±0.03мм, швидкість до 40м/хв. Сучасне обладнання MT-L3015F з волоконним лазером 6кВт.",
    ogImage: "https://armind.com.ua/src/assets/for-laser-cutting-three.jpg",
    canonicalUrl: "https://armind.com.ua/laser-cutting",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Лазерна різка металу",
      "description": "Високоточна лазерна різка металу товщиною до 20 мм з мінімальними деформаціями та ідеальною якістю кромки",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Армада Індастрі",
        "telephone": "+380934236139",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Одеса",
          "addressCountry": "UA"
        }
      },
      "areaServed": "Одеса та область",
      "serviceType": "Лазерна різка металу",
      "offers": {
        "@type": "Offer",
        "description": "Лазерна різка металу з точністю ±0.03мм",
        "priceRange": "Від 50 грн/м.п."
      }
    }
  },

  powderCoating: {
    title: "Порошкове фарбування металу в Одесі - Армада Індастрі | 300+ кольорів RAL, ISO 9001",
    description: "Професійне порошкове фарбування металу в Одесі: 300+ кольорів RAL, камера 6×1.2×2м, товщина 40-150мкм. ISO 9001, італійське обладнання, екологічні матеріали.",
    keywords: "порошкове фарбування Одеса, фарбування металу порошком, RAL кольори фарбування, полімерне покриття металу, антикорозійне покриття, термопласт фарбування, грунт цинковмісний",
    ogTitle: "Порошкове фарбування металу - 300+ кольорів RAL",
    ogDescription: "Професійне порошкове фарбування: 300+ кольорів RAL, камера 6×1.2×2м, ISO 9001. Італійське обладнання, екологічні матеріали, стійкість до 25 років.",
    ogImage: "https://armind.com.ua/src/assets/powder.jpg",
    canonicalUrl: "https://armind.com.ua/powder-coating",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Порошкове фарбування металу",
      "description": "Стійке покриття з широкою палітрою кольорів та фактур з використанням італійського обладнання",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Армада Індастрі",
        "telephone": "+380934236139",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Одеса",
          "addressCountry": "UA"
        }
      },
      "areaServed": "Одеса та область",
      "serviceType": "Порошкове фарбування металу",
      "offers": {
        "@type": "Offer",
        "description": "Порошкове фарбування з гарантією якості ISO 9001",
        "priceRange": "Від 80 грн/м²"
      }
    }
  },

  contact: {
    title: "Контакти - Армада Індастрі | Лазерна обробка металу в Одесі | Замовити послуги",
    description: "Контакти Армада Індастрі в Одесі: +380 (93) 423-61-39, вул. Боровського 28. Замовити лазерну різку, зварювання, порошкове фарбування. Безкоштовна консультація.",
    keywords: "контакти Армада Індастрі, замовити лазерну різку Одеса, телефон металообробка, адреса лазерна різка Одеса, консультація металообробка",
    ogTitle: "Контакти Армада Індастрі - Замовити послуги",
    ogDescription: "Зв'яжіться з нами для замовлення послуг лазерної обробки металу. Безкоштовна консультація, швидкий розрахунок вартості.",
    canonicalUrl: "https://armind.com.ua/contact"
  },

  thanks: {
    title: "Дякуємо за заявку! - Армада Індастрі | Менеджер зв'яжеться протягом 15 хвилин",
    description: "Дякуємо за вашу заявку! Наш менеджер зв'яжеться з вами протягом 15 хвилин для обговорення деталей проекту та розрахунку вартості послуг.",
    keywords: "заявка відправлена, дякуємо за заявку, Армада Індастрі менеджер, консультація металообробка",
    canonicalUrl: "https://armind.com.ua/thanks"
  }
};
