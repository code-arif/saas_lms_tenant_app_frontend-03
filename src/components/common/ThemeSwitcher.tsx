import { useState, useEffect, useCallback } from 'react';
import { Palette, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AnimatePresence, motion } from 'framer-motion';

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

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(getStoredTheme);

  const applyTheme = useCallback((themeId: string) => {
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
    applyTheme(getStoredTheme());
  }, [applyTheme]);

  const handleSelect = (themeId: string) => {
    applyTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-3">
      {/* Theme palette — collapses/expands */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex items-center gap-2 rounded-xl border bg-card p-2.5 shadow-lg"
          >
            {themes.map((theme) => {
              const isActive = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelect(theme.id)}
                  title={theme.label}
                  aria-label={`Switch to ${theme.label} theme`}
                  className={cn(
                    'relative h-8 w-8 rounded-full transition-all duration-200',
                    'hover:scale-110 hover:shadow-md',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isActive && 'scale-110 ring-2 ring-offset-2 ring-card'
                  )}
                  style={{
                    backgroundColor: theme.color,
                  }}
                >
                  {isActive && (
                    <Check
                      size={14}
                      className="absolute inset-0 m-auto text-white drop-shadow-sm"
                      strokeWidth={3}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close theme switcher' : 'Open theme switcher'}
        className={cn(
          'h-11 w-11 rounded-full',
          'flex items-center justify-center',
          'bg-primary text-primary-foreground',
          'shadow-lg shadow-primary/25',
          'hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'active:scale-95',
          'transition-all duration-200'
        )}
      >
        <Palette size={20} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
