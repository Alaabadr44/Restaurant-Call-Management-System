import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MenuImageViewerProps {
  menuImage: string;
  restaurantName: string;
}

export function MenuImageViewer({ menuImage, restaurantName }: MenuImageViewerProps) {
  const { t } = useLanguage();
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  return (
    <div className="space-y-4">
      {/* Zoom Controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <span className="w-1.5 h-6 bg-primary rounded-full" />
          {t('menu')}
        </h3>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.5}
            className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          
          <span className="text-sm font-medium text-muted-foreground min-w-[4rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          
          <button
            onClick={handleZoomIn}
            disabled={scale >= 2.5}
            className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 transition-all active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Menu Image Container */}
      <div className="relative overflow-auto rounded-2xl bg-secondary/30 border border-border touch-scroll hide-scrollbar">
        <div 
          className="min-h-[400px] flex items-center justify-center p-4"
          style={{ cursor: scale > 1 ? 'grab' : 'default' }}
        >
          <img
            src={menuImage}
            alt={`${restaurantName} menu`}
            className="max-w-full rounded-xl shadow-2xl transition-transform duration-300 ease-out"
            style={{ 
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
            draggable={false}
          />
        </div>
      </div>

      {/* Touch hint */}
      <p className="text-center text-sm text-muted-foreground">
        {t('menu')} • {restaurantName}
      </p>
    </div>
  );
}
