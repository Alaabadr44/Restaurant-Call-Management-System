import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { KioskHeader } from '@/components/kiosk/KioskHeader';
import { MenuImageViewer } from '@/components/kiosk/MenuImageViewer';
import { CallButton } from '@/components/kiosk/CallButton';
import { RestaurantInfo } from '@/components/kiosk/RestaurantInfo';
import { Restaurant } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UtensilsCrossed, Info } from 'lucide-react';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
}

export function RestaurantDetail({ restaurant, onBack }: RestaurantDetailProps) {
  const { language, t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('menu');

  const name = language === 'ar' ? restaurant.nameAr : restaurant.nameEn;
  const description = language === 'ar' ? restaurant.descriptionAr : restaurant.descriptionEn;

  return (
    <div className="min-h-screen bg-background kiosk-mode">
      <KioskHeader showBackButton onBack={onBack} title={name} />

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={restaurant.coverImage}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Restaurant Logo & Info */}
        <div className={`absolute bottom-6 ${isRTL ? 'right-6' : 'left-6'} flex items-end gap-4`}>
          <div className="w-24 h-24 rounded-2xl border-4 border-card overflow-hidden bg-card shadow-xl">
            <img
              src={restaurant.logo}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pb-2">
            <h2 className="text-2xl font-bold text-foreground">{name}</h2>
            <p className="text-muted-foreground max-w-md">{description}</p>
            <div className="mt-2">
              <span
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  restaurant.status === 'available'
                    ? 'status-available'
                    : 'status-busy'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                {restaurant.status === 'available' ? t('available') : t('busy')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full bg-secondary p-1 rounded-xl mb-6">
                <TabsTrigger
                  value="menu"
                  className="flex-1 py-3 text-base rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <UtensilsCrossed className="w-5 h-5 mr-2" />
                  {t('menu')}
                </TabsTrigger>
                <TabsTrigger
                  value="info"
                  className="flex-1 py-3 text-base rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Info className="w-5 h-5 mr-2" />
                  {t('restaurantInfo')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="menu" className="mt-0">
                <MenuImageViewer 
                  menuImage={restaurant.menuImage} 
                  restaurantName={name} 
                />
              </TabsContent>

              <TabsContent value="info" className="mt-0">
                <RestaurantInfo restaurant={restaurant} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Call Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-primary rounded-full" />
                {t('callRestaurant')}
              </h3>
              
              <CallButton
                restaurantName={name}
                status={restaurant.status}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
