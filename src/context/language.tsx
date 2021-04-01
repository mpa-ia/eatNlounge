import React, { useEffect, useState } from 'react';
import pl from '../translations/pl';
import en from '../translations/en';
import Cookies from 'js-cookie';

export const TranslationContext = React.createContext<LanguageProviderProps>({
  setLanguage: () => { console.warn('initialize'); },
  language: 'pl',
  translations: { ok: 'ok' },
});
type SetLanguage =  (lang: string) => void;
export type LanguageProviderProps = {
	setLanguage: SetLanguage
	language: string;
	translations: Translations;
};

type Translations = { [key: string]: string };
interface Language {
	translations: Translations;
  localName: string;
}
interface Languages {
  [key: string]: Language;
}

const languages: Languages = {
  pl: {
    translations: pl,
    localName: 'Polski',
  },
  en: {
    translations: en,
    localName: 'English',
  },
};

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLang] = useState<string>('pl');
  useEffect(() => {
    const savedLang = Cookies.get('eat_lang');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const setLanguage: SetLanguage = language => {
    if (Object.keys(languages).includes(language)) {
      setLang(language);
    } else {
      setLang('pl');
    }
  };
  const { translations } = languages[language];
  return (
    <TranslationContext.Provider
      value={{ translations, language, setLanguage }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useLanguage = (): LanguageProviderProps => {
  const { translations, language, setLanguage } = React.useContext(TranslationContext);
  return { translations, language, setLanguage };
};