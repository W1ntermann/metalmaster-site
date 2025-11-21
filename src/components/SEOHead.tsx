// components/SEOHead.tsx
import { SEOData } from "@/utils/seo";

interface SEOHeadProps {
  seoData: SEOData;
}

const SEOHead = ({ seoData }: SEOHeadProps) => {
  // Функція для гарантованого HTTPS в URL
  const ensureHttpsUrl = (url: string): string => {
    if (!url) return '';
    
    // Якщо URL вже починається з https:// - повертаємо як є
    if (url.startsWith('https://')) {
      return url;
    }
    
    // Якщо URL починається з http:// - замінюємо на https://
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    
    // Якщо URL без протоколу - додаємо https://
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    
    // Для відносних шляхів - повертаємо повний HTTPS URL
    if (url.startsWith('/')) {
      return `https://armind.com.ua${url}`;
    }
    
    // Для інших випадків - додаємо https://
    return `https://${url}`;
  };

  // Обробка всіх URL
  const canonicalUrl = ensureHttpsUrl(seoData.canonical);
  const ogImageUrl = seoData.ogImage ? ensureHttpsUrl(seoData.ogImage) : '';
  const ogTitle = seoData.ogTitle || seoData.title;
  const ogDescription = seoData.ogDescription || seoData.description;

  return (
    <>
      {/* Основні мета-теги */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      
      {/* Keywords - додаємо тільки якщо вони є */}
      {seoData.keywords && (
        <meta name="keywords" content={seoData.keywords} />
      )}
      
      {/* Канонічний тег - ГАРАНТОВАНО HTTPS */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph мета-теги */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Армада Індастрі" />
      
      {/* OG Image - тільки якщо вказано */}
      {ogImageUrl && (
        <meta property="og:image" content={ogImageUrl} />
      )}
      
      {/* Додаткові мета-теги для кращої індексації */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Додаткові OG теги для кращого відображення в соцмережах */}
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:image:alt" content={ogTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {ogImageUrl && (
        <meta name="twitter:image" content={ogImageUrl} />
      )}
      
      {/* Structured Data для кращого SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Армада Індастрі",
          "url": "https://armind.com.ua/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://armind.com.ua/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
      
      {/* Додаткові структуровані дані для головної сторінки */}
      {seoData.canonical === 'https://armind.com.ua/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Армада Індастрі",
            "alternateName": "Армінд",
            "url": "https://armind.com.ua/",
            "logo": "https://armind.com.ua/logo.png",
            "description": "Професійна лазерна обробка металу в Одесі: різка, зварювання, фарбування",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "вул. Миколи Боровського, 28",
              "addressLocality": "Одеса",
              "addressCountry": "UA"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+380-93-423-61-39",
              "contactType": "customer service",
              "email": "armindind@gmail.com",
              "availableLanguage": ["Ukrainian", "Russian"]
            },
            "sameAs": []
          })}
        </script>
      )}
    </>
  );
};

export default SEOHead;