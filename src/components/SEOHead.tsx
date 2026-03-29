import { Helmet } from "react-helmet-async";
import { SEOData } from "@/utils/seo";

interface SEOHeadProps {
  seoData: SEOData;
}

const SEOHead = ({ seoData }: SEOHeadProps) => {
  const ensureCanonicalUrl = (url: string): string => {
    if (!url) return 'https://www.armind.com.ua/';
    // Already fully-qualified with www — return as-is
    if (url.startsWith('https://www.armind.com.ua')) return url;
    // Relative path — prepend base
    if (url.startsWith('/')) return `https://www.armind.com.ua${url}`;
    // Non-www https — add www
    if (url.startsWith('https://armind.com.ua')) return url.replace('https://armind.com.ua', 'https://www.armind.com.ua');
    // Bare domain
    return 'https://www.armind.com.ua/';
  };

  const canonicalUrl = ensureCanonicalUrl(seoData.canonical);
  const ogImageUrl = seoData.ogImage 
    ? ensureCanonicalUrl(seoData.ogImage)
    : 'https://www.armind.com.ua/og-image.png';
  
  const ogTitle = seoData.ogTitle || seoData.title;
  const ogDescription = seoData.ogDescription || seoData.description;
  const robotsContent = seoData.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const isHomePage = canonicalUrl === 'https://www.armind.com.ua/';

  return (
    <Helmet>
      {/* Основні мета-теги */}
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      
      {/* Keywords */}
      {seoData.keywords && (
        <meta name="keywords" content={seoData.keywords} />
      )}
      
      {/* КРИТИЧНО: Канонічний тег для Google */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph мета-теги */}
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Армада Індастрі" />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:locale" content="uk_UA" />
      <meta property="og:image:alt" content={ogTitle} />
      
      {/* Robots мета-теги */}
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="bingbot" content={robotsContent} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Viewport та charset */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Армада Індастрі",
          "url": "https://www.armind.com.ua/"
        })}
      </script>
      
      {/* Structured Data - Organization (тільки для головної сторінки) */}
      {isHomePage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Армада Індастрі",
            "alternateName": "Армінд",
            "url": "https://www.armind.com.ua/",
            "logo": "https://www.armind.com.ua/logo.png",
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

      {/* Structured Data - BreadcrumbList (для всіх сторінок крім головної) */}
      {!isHomePage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Головна",
                "item": "https://www.armind.com.ua/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": ogTitle,
                "item": canonicalUrl
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;