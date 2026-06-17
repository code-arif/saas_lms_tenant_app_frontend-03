import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Badge } from '@/components/ui/Badge';
import { Globe, CheckCircle, AlertCircle } from 'lucide-react';
import type { TenantSettings } from '../services/settingsService';
import { useSettings } from '../hooks/useSettings';

interface DomainSettingsProps {
  settings: TenantSettings;
}

const DomainSettings = ({ settings }: DomainSettingsProps) => {
  const { updateDomain, isUpdatingDomain } = useSettings();
  const [domain, setDomain] = useState(settings.domain || '');

  const handleSubmit = async () => {
    await updateDomain(domain);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Domain</CardTitle>
        <CardDescription>Connect your own domain to the platform</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              {settings.domain || 'No custom domain configured'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Your current subdomain: {settings.slug}.lms.platform.com
            </p>
          </div>
          {settings.domain_verified ? (
            <Badge variant="success" className="gap-1">
              <CheckCircle size={12} />
              Verified
            </Badge>
          ) : (
            <Badge variant="warning" className="gap-1">
              <AlertCircle size={12} />
              Pending
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="domain">Custom Domain</Label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              id="domain"
              placeholder="learn.yourdomain.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSubmit} disabled={isUpdatingDomain} className="sm:w-auto w-full">
              {isUpdatingDomain ? 'Saving...' : 'Save'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Point your CNAME record to: custom.lms.platform.com
          </p>
        </div>

        <div className="p-4 rounded-lg border bg-muted/30">
          <h4 className="text-sm font-medium mb-2">DNS Configuration</h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span>CNAME</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span>{domain || 'learn'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Value:</span>
              <span>custom.lms.platform.com</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DomainSettings;