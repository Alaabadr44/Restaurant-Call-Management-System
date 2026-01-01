import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import { Utensils } from 'lucide-react';

interface KioskHeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function KioskHeader({ showBackButton, onBack, title }: KioskHeaderProps) {
  const { t, isRTL } = useLanguage();

  return (
    <header className="glass-panel sticky top-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="touch-button bg-secondary hover:bg-secondary/80 flex items-center gap-2"
            >
              <span className={`text-lg ${isRTL ? 'rotate-180' : ''}`}>←</span>
              <span className="hidden sm:inline">{t('backToRestaurants')}</span>
            </button>
          )}
          
          {!showBackButton && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <Utensils className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {title || t('selectRestaurant')}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {t('touchToOrder')}
                </p>
              </div>
            </div>
          )}

          {showBackButton && title && (
            <h1 className="text-xl font-bold text-foreground">
              {title}
            </h1>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
