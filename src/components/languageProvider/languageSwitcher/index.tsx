import React from 'react';
import { useLanguage } from '../../../context/language';
import { Button } from 'antd';
import { Switcher } from './LanguageSwitcher.style';
const LanguageSwitcher: React.FunctionComponent =
  ()=> {
    const { currentLanguage, setLanguage, languages } = useLanguage();
    return (
      <Switcher
      >
        {
          Object.keys(languages).map(lang => lang === currentLanguage ? null :
            <li
              key={lang}
            >
              <Button
                type="text"
                onClick={setLanguage.bind(null, lang)}
              >
                {languages[lang].localName}
              </Button>
            </li>,
          )
        }
      </Switcher>
    );
  };

export default LanguageSwitcher;
