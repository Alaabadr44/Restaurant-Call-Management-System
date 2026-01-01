import { LanguageProvider } from '@/contexts/LanguageContext';
import KioskHome from './KioskHome';

const Index = () => {
  return (
    <LanguageProvider>
      <KioskHome />
    </LanguageProvider>
  );
};

export default Index;
