import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import type { TenantSettings } from '../services/settingsService';
import { useSettings } from '../hooks/useSettings';

interface BrandingFormProps {
  settings: TenantSettings;
}

const BrandingForm = ({ settings }: BrandingFormProps) => {
  const { updateBranding, isUpdatingBranding } = useSettings();
  const [primaryColor, setPrimaryColor] = useState(settings.primary_color || '#6366f1');
  const [secondaryColor, setSecondaryColor] = useState(settings.secondary_color || '#8b5cf6');
  const [logo, setLogo] = useState<File | null>(null);
  const [favicon, setFavicon] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(settings.logo || null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(settings.favicon || null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFavicon(file);
      const reader = new FileReader();
      reader.onloadend = () => setFaviconPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('primary_color', primaryColor);
    formData.append('secondary_color', secondaryColor);
    if (logo) formData.append('logo', logo);
    if (favicon) formData.append('favicon', favicon);
    await updateBranding(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding</CardTitle>
        <CardDescription>Customize your platform's appearance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Logo</Label>
            <div className="relative">
              {logoPreview ? (
                <div className="relative w-full h-32 border rounded-lg overflow-hidden">
                  <img src={logoPreview} alt="Logo" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setLogo(null);
                      setLogoPreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                </label>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Favicon</Label>
            <div className="relative">
              {faviconPreview ? (
                <div className="relative w-full h-32 border rounded-lg overflow-hidden">
                  <img src={faviconPreview} alt="Favicon" className="w-full h-full object-contain" />
                  <button
                    type="button"
                    onClick={() => {
                      setFavicon(null);
                      setFaviconPreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Upload favicon</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFaviconChange} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Primary Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-10 w-10 rounded-md border cursor-pointer"
              />
              <Input
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#6366f1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Secondary Color</Label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="h-10 w-10 rounded-md border cursor-pointer"
              />
              <Input
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                placeholder="#8b5cf6"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: primaryColor + '10',
              borderColor: primaryColor + '30'
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: primaryColor }}
              >
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="h-10 w-10 object-contain" />
                ) : (
                  <span className="text-white font-bold text-xl">L</span>
                )}
              </div>
              <div>
                <h3 className="font-bold" style={{ color: primaryColor }}>
                  {settings.name || 'Your Brand'}
                </h3>
                <p className="text-sm text-muted-foreground">Powered by LMS Platform</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div 
                className="px-4 py-2 rounded-md text-white text-sm font-medium"
                style={{ backgroundColor: primaryColor }}
              >
                Primary Button
              </div>
              <div 
                className="px-4 py-2 rounded-md text-sm font-medium border"
                style={{ 
                  borderColor: secondaryColor,
                  color: secondaryColor
                }}
              >
                Secondary Button
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} disabled={isUpdatingBranding}>
          {isUpdatingBranding ? 'Saving...' : 'Save Branding'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BrandingForm;