import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import BackToTop from '@/components/common/BackToTop';
import ThemeSwitcher from '@/components/common/ThemeSwitcher';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Outlet />
      <Toaster position="top-right" richColors />
      <ThemeSwitcher />
      <BackToTop />
    </div>
  );
};

export default RootLayout;