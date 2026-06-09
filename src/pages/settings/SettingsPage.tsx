import PageTitle from '@/components/common/PageTitle';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import GeneralSettings from '@/features/settings/components/GeneralSettings';
import DomainSettings from '@/features/settings/components/DomainSettings';
import { useSettings } from '@/features/settings/hooks/useSettings';

const SettingsPage = () => {
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
        title="Settings" 
        description="Manage your platform settings and configuration."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GeneralSettings settings={settings} />
        <DomainSettings settings={settings} />
      </div>
    </div>
  );
};

export default SettingsPage;