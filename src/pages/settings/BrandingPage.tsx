import PageTitle from '@/components/common/PageTitle';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import BrandingForm from '@/features/settings/components/BrandingForm';
import { useSettings } from '@/features/settings/hooks/useSettings';

const BrandingPage = () => {
  const { settings, isLoading } = useSettings();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageTitle 
        title="Branding" 
        description="Customize your platform's appearance and branding."
      />

      <BrandingForm settings={settings} />
    </div>
  );
};

export default BrandingPage;