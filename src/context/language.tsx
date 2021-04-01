import React, { useEffect, useState } from 'react';
import pl from '../translations/pl';
import en from '../translations/en';
import Cookies from 'js-cookie';

export const TranslationContext = React.createContext<LanguageProviderProps>({
  setLanguage: () => { console.warn('initialize'); },
  currentLanguage: 'pl',
  translations: { ok: 'ok' },
  languages: {
    default: {
      translations: { ok: 'ok'},
      localName: 'default',
    },
  },
});
type SetLanguage =  (lang: string) => void;
export type LanguageProviderProps = {
	setLanguage: SetLanguage
	currentLanguage: string;
	translations: Translations;
	languages: Languages;
};

type Translations = { [key: string]: string };
interface Language {
	translations: Translations;
  localName: string;
}
interface Languages {
  [key: string]: Language;
}

export const LanguageProvider: React.FC = ({ children }) => {
  const [currentLanguage, setLang] = useState<string>('pl');
  const [ languages ] = useState<Languages>({
    pl: {
      translations: pl,
      localName: 'Polski',
    },
    en: {
      translations: en,
      localName: 'English',
    },
  });
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
  const { translations } = languages[currentLanguage];
  return (
    <TranslationContext.Provider
      value={{ translations, currentLanguage, setLanguage, languages }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useLanguage = (): LanguageProviderProps => {
  const { translations, currentLanguage, setLanguage, languages } = React.useContext(TranslationContext);
  return { translations, currentLanguage, setLanguage, languages };
};