import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { KioskHeader } from '@/components/kiosk/KioskHeader';
import { RestaurantCard } from '@/components/kiosk/RestaurantCard';
import { mockRestaurants, Restaurant } from '@/data/mockData';
import { RestaurantDetail } from './RestaurantDetail';

export default function KioskHome() {
  const { isRTL } = useLanguage();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  if (selectedRestaurant) {
    return (
      <RestaurantDetail
        restaurant={selectedRestaurant}
        onBack={() => setSelectedRestaurant(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background kiosk-mode">
      <KioskHeader />
      
      <main className="p-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {mockRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <RestaurantCard
                restaurant={restaurant}
                onClick={() => setSelectedRestaurant(restaurant)}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
