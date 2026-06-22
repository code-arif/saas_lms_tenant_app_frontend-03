import { useState, useEffect, useCallback } from 'react';
import { Palette, Check, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/utils/cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';

interface Theme {
  id: string;
  label: string;
  color: string;
  ring: string;
}

const themes: Theme[] = [
  { id: 'slate', label: 'Slate', color: '#1e293b', ring: '#1e293b' },
  { id: 'emerald', label: 'Emerald', color: '#10b981', ring: '#10b981' },
  { id: 'amber', label: 'Amber', color: '#f59e0b', ring: '#f59e0b' },
  { id: 'rose', label: 'Rose', color: '#e11d48', ring: '#e11d48' },
  { id: 'violet', label: 'Violet', color: '#7c3aed', ring: '#7c3aed' },
  { id: 'cyan', label: 'Cyan', color: '#06b6d4', ring: '#06b6d4' },
  { id: 'neutral', label: 'Neutral', color: '#6b7280', ring: '#6b7280' },
];

const STORAGE_KEY = 'color-theme';

const getStoredTheme = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'slate';
  } catch {
    return 'slate';
  }
};

const setStoredTheme = (themeId: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, themeId);
  } catch {
    // localStorage unavailable
  }
};

type Mode = 'light' | 'dark' | 'system';

const MODE_OPTIONS: { mode: Mode; icon: typeof Sun; label: string }[] = [
  { mode: 'light', icon: Sun, label: 'Light' },
  { mode: 'dark', icon: Moon, label: 'Dark' },
  { mode: 'system', icon: Monitor, label: 'System' },
];

const ThemeSwitcher = () => {
  const [activeTheme, setActiveTheme] = useState(getStoredTheme);
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const applyColorTheme = useCallback((themeId: string) => {
    const html = document.documentElement;
    // Remove all theme classes
    themes.forEach((t) => html.classList.remove(`theme-${t.id}`));
    // Apply the selected theme (slate is the default, no class needed)
    if (themeId !== 'slate') {
      html.classList.add(`theme-${themeId}`);
    }
    setStoredTheme(themeId);
    setActiveTheme(themeId);
  }, []);

  useEffect(() => {
    // Apply the stored theme on mount
    applyColorTheme(getStoredTheme());
  }, [applyColorTheme]);

  const handleColorSelect = (themeId: string) => {
    applyColorTheme(themeId);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Theme settings"
        >
          <Palette size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[260px] p-2"
      >
        {/* Mode selection */}
        <div className="flex gap-1 rounded-lg bg-muted p-1">
          {MODE_OPTIONS.map(({ mode, icon: Icon, label }) => {
            const isActive = theme === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  setTheme(mode);
                }}
                className={cn(
                  'flex flex-1 items-center justify-center gap-1 rounded-md px-2 py-1.5 text-xs font-medium transition-all',
                  isActive
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label={`${label} mode`}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <DropdownMenuSeparator className="my-2" />

        {/* Color theme palette */}
        <div className="space-y-1.5">
          <p className="px-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Accent Color
          </p>
          <div className="flex flex-wrap gap-1.5">
            {themes.map((t) => {
              const isActive = activeTheme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleColorSelect(t.id)}
                  title={t.label}
                  aria-label={`Switch to ${t.label} theme`}
                  className={cn(
                    'relative h-7 w-7 rounded-full transition-all duration-200',
                    'hover:scale-110 hover:shadow-md',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isActive && 'scale-110 ring-2 ring-offset-2 ring-card'
                  )}
                  style={{ backgroundColor: t.color }}
                >
                  {isActive && (
                    <Check
                      size={12}
                      className="absolute inset-0 m-auto text-white drop-shadow-sm"
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Current theme label */}
          <p className="px-1 text-[10px] text-muted-foreground">
            {themes.find((t) => t.id === activeTheme)?.label ?? 'Slate'} · {resolvedTheme === 'dark' ? 'Dark' : 'Light'}
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitcher;
