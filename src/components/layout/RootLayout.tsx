import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import BackToTop from '@/components/common/BackToTop';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <Outlet />
      <Toaster position="top-right" richColors />
      <BackToTop />
    </div>
  );
};

export default RootLayout;