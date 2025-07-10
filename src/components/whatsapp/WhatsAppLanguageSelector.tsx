import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Check } from 'lucide-react';

interface LanguageSelectorProps {
  onLanguageSelect: (language: string) => void;
  currentLanguage?: string;
}

const WhatsAppLanguageSelector: React.FC<LanguageSelectorProps> = ({
  onLanguageSelect,
  currentLanguage = 'en'
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦' },
    { code: 'zu', name: 'isiZulu', nativeName: 'isiZulu', flag: '🇿🇦' },
    { code: 'xh', name: 'isiXhosa', nativeName: 'isiXhosa', flag: '🇿🇦' },
    { code: 'st', name: 'Sesotho', nativeName: 'Sesotho', flag: '🇿🇦' }
  ];

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
    onLanguageSelect(langCode);
  };

  const translations = {
    en: {
      title: 'Choose Your Language',
      subtitle: 'Select your preferred language for the shopping experience',
      continue: 'Continue'
    },
    af: {
      title: 'Kies Jou Taal',
      subtitle: 'Kies jou voorkeur taal vir die inkopie-ervaring',
      continue: 'Gaan Voort'
    },
    zu: {
      title: 'Khetha Ulimi Lwakho',
      subtitle: 'Khetha ulimi lwakho olukhethiwe lolokushopa',
      continue: 'Qhubeka'
    },
    xh: {
      title: 'Khetha Ulwimi Lwakho',
      subtitle: 'Khetha ulwimi lwakho olukhethiwe lwemfuno yokuthenga',
      continue: 'Qhubeka'
    },
    st: {
      title: 'Kgetha Puo Ya Hao',
      subtitle: 'Kgetha puo ya hao ye o e ratang bakeng sa maitemogelo a go reka',
      continue: 'Tswela Pele'
    }
  };

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Globe className="w-6 h-6 text-green-600" />
          {t.title}
        </CardTitle>
        <p className="text-sm text-gray-600">{t.subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {languages.map((language) => (
            <Button
              key={language.code}
              variant={selectedLanguage === language.code ? "default" : "outline"}
              className={`w-full justify-between h-auto p-4 ${
                selectedLanguage === language.code 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{language.flag}</span>
                <div className="text-left">
                  <div className="font-medium">{language.name}</div>
                  <div className="text-sm opacity-75">{language.nativeName}</div>
                </div>
              </div>
              {selectedLanguage === language.code && (
                <Check className="w-5 h-5" />
              )}
            </Button>
          ))}
        </div>

        <Button 
          onClick={() => onLanguageSelect(selectedLanguage)}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {t.continue}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WhatsAppLanguageSelector;