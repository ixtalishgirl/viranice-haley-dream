import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Settings } from 'lucide-react';

const themes = [
  { id: 'default', label: 'Default' },
  { id: 'dark', label: 'Dark' },
  { id: 'horror', label: 'Horror' },
  { id: 'nightmare', label: 'Nightmare' },
];

const applyTheme = (id: string) => {
  const root = document.documentElement;
  // Remove known theme classes
  root.classList.remove('dark', 'theme-horror', 'theme-nightmare');
  if (id === 'dark') root.classList.add('dark');
  if (id === 'horror') root.classList.add('theme-horror');
  if (id === 'nightmare') root.classList.add('theme-nightmare');
};

const ThemeSettings: React.FC = () => {
  const [current, setCurrent] = useState<string>(() => localStorage.getItem('theme') || 'default');

  useEffect(() => {
    applyTheme(current);
  }, []);

  const handleSelect = (id: string) => {
    setCurrent(id);
    applyTheme(id);
    localStorage.setItem('theme', id);
  };

  return (
    <div className="fixed top-6 right-6 z-40">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="btn-sakura rounded-full p-3" aria-label="Theme settings">
            <Settings className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="glass-card p-2">
          {themes.map(t => (
            <DropdownMenuItem key={t.id} onClick={() => handleSelect(t.id)} className="cursor-pointer">
              <span className={current === t.id ? 'font-semibold' : ''}>{t.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ThemeSettings;
