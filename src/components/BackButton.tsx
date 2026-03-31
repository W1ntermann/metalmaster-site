import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  targetId?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ targetId = 'services' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById(targetId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative z-10 container mx-auto px-4 pt-24 pb-2 md:pt-28">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Повернутись назад до послуг"
        className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-background/90 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          <ArrowLeft className="h-4 w-4" />
        </span>
        <span>Назад до послуг</span>
      </button>
    </div>
  );
};

export default BackButton;