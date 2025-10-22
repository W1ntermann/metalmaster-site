import { useEffect } from 'react';
import { updatePageSEO, SEOData } from '@/utils/seo';

interface SEOHeadProps {
  seoData: SEOData;
}

const SEOHead = ({ seoData }: SEOHeadProps) => {
  useEffect(() => {
    updatePageSEO(seoData);
  }, [seoData]);

  return null; // Цей компонент не рендерить нічого видимого
};

export default SEOHead;
