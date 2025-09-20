import { useState } from 'react';
import { Languages, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { useLanguage, type Language } from '../contexts/LanguageContext';

const languageOptions = [
  { code: 'fr' as Language, name: 'french', flag: '🇫🇷' },
  { code: 'en' as Language, name: 'english', flag: '🇺🇸' },
  { code: 'es' as Language, name: 'spanish', flag: '🇪🇸' },
  { code: 'de' as Language, name: 'german', flag: '🇩🇪' },
  { code: 'it' as Language, name: 'italian', flag: '🇮🇹' },
];

interface LanguageSelectorProps {
  variant?: 'welcome' | 'dashboard';
}

export default function LanguageSelector({ variant = 'welcome' }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  if (variant === 'welcome') {
    return (
      <div className="absolute top-4 right-4">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 h-10 px-3"
            >
              <Languages className="w-4 h-4 mr-2" />
              <span className="text-sm">{currentLanguage?.flag}</span>
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-48 bg-white/95 backdrop-blur-md border-white/20"
          >
            {languageOptions.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`cursor-pointer ${
                  lang.code === language 
                    ? 'bg-amber-50 text-amber-700' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <span className="mr-3">{lang.flag}</span>
                <span>{t(lang.name)}</span>
                {lang.code === language && (
                  <span className="ml-auto text-amber-600">✓</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2"
        >
          <Languages className="w-4 h-4 mr-1" />
          <span className="text-xs">{currentLanguage?.flag}</span>
          <ChevronDown className="w-3 h-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languageOptions.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`cursor-pointer text-sm ${
              lang.code === language 
                ? 'bg-amber-50 text-amber-700' 
                : 'hover:bg-slate-100'
            }`}
          >
            <span className="mr-2">{lang.flag}</span>
            <span>{t(lang.name)}</span>
            {lang.code === language && (
              <span className="ml-auto text-amber-600 text-xs">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}