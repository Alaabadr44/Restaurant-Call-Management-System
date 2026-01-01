export interface Restaurant {
  id: string;
  nameEn: string;
  nameAr: string;
  logo: string;
  coverImage: string;
  menuImage: string;
  descriptionEn: string;
  descriptionAr: string;
  addressEn: string;
  addressAr: string;
  phone: string;
  hoursEn: string;
  hoursAr: string;
  status: 'available' | 'busy';
  // API additional fields
  email?: string;
  password?: string;
  contactPhone?: string;
  sipExtension?: string;
}

// Menu images imported from assets
import menuAlbaik from '@/assets/menu-albaik.jpg';
import menuHerfy from '@/assets/menu-herfy.jpg';
import menuKudu from '@/assets/menu-kudu.jpg';
import menuShawarmer from '@/assets/menu-shawarmer.jpg';

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    nameEn: 'Al Baik',
    nameAr: 'البيك',
    logo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=800&h=400&fit=crop',
    menuImage: menuAlbaik,
    descriptionEn: 'Famous Saudi Arabian fast food chain known for delicious fried chicken',
    descriptionAr: 'سلسلة مطاعم سعودية شهيرة للوجبات السريعة معروفة بالدجاج المقلي اللذيذ',
    addressEn: 'King Fahd Road, Riyadh',
    addressAr: 'طريق الملك فهد، الرياض',
    phone: '+966 11 123 4567',
    hoursEn: '10:00 AM - 12:00 AM',
    hoursAr: '١٠:٠٠ صباحاً - ١٢:٠٠ منتصف الليل',
    status: 'available',
  },
  {
    id: '2',
    nameEn: 'Herfy',
    nameAr: 'هرفي',
    logo: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&h=400&fit=crop',
    menuImage: menuHerfy,
    descriptionEn: 'Leading Saudi fast food restaurant serving burgers and sandwiches',
    descriptionAr: 'مطعم سعودي رائد للوجبات السريعة يقدم البرغر والساندويتشات',
    addressEn: 'Olaya Street, Riyadh',
    addressAr: 'شارع العليا، الرياض',
    phone: '+966 11 234 5678',
    hoursEn: '11:00 AM - 11:00 PM',
    hoursAr: '١١:٠٠ صباحاً - ١١:٠٠ مساءً',
    status: 'available',
  },
  {
    id: '3',
    nameEn: 'Kudu',
    nameAr: 'كودو',
    logo: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&h=400&fit=crop',
    menuImage: menuKudu,
    descriptionEn: 'Saudi coffee and sandwich chain with fresh bakery items',
    descriptionAr: 'سلسلة قهوة وساندويتشات سعودية مع مخبوزات طازجة',
    addressEn: 'Tahlia Street, Riyadh',
    addressAr: 'شارع التحلية، الرياض',
    phone: '+966 11 345 6789',
    hoursEn: '6:00 AM - 11:00 PM',
    hoursAr: '٦:٠٠ صباحاً - ١١:٠٠ مساءً',
    status: 'busy',
  },
  {
    id: '4',
    nameEn: 'Shawarmer',
    nameAr: 'شاورمر',
    logo: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?w=800&h=400&fit=crop',
    menuImage: menuShawarmer,
    descriptionEn: 'Premium shawarma and Middle Eastern cuisine',
    descriptionAr: 'شاورما فاخرة ومأكولات شرق أوسطية',
    addressEn: 'Prince Sultan Road, Jeddah',
    addressAr: 'طريق الأمير سلطان، جدة',
    phone: '+966 12 456 7890',
    hoursEn: '12:00 PM - 2:00 AM',
    hoursAr: '١٢:٠٠ ظهراً - ٢:٠٠ صباحاً',
    status: 'available',
  },
];

export interface Screen {
  id: string;
  name: string;
  assignedRestaurants: string[]; // Restaurant IDs in order
  gridConfig: {
    rows: number;
    columns: number;
  };
  showLanguage: 'en' | 'ar' | 'both';
}

export const mockScreens: Screen[] = [
  {
    id: '1',
    name: 'Main Hall',
    assignedRestaurants: ['1', '2', '3', '4'],
    gridConfig: { rows: 2, columns: 2 },
    showLanguage: 'both',
  },
];
