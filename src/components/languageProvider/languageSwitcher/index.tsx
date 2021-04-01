import React from 'react';
import { useLanguage } from '../../../context/language';
import { Button } from 'antd';
const LanguageSwitcher: React.FunctionComponent =
  ()=> {
    const { currentLanguage, setLanguage, languages } = useLanguage();
    return (
      <ul
      >
        {
          Object.keys(languages).map(lang => (
            <li
              className={lang === currentLanguage ? 'active' : ''}
              key={lang}
            ><Button
                onClick={setLanguage.bind(null, lang)}
              >
                {languages[lang].localName}
              </Button>
            </li>
          ))
        }
      </ul>
    );
  };

export default LanguageSwitcher;
