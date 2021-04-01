import React from 'react';
import { useLanguage } from '../../../context/language';

type TlnProps = { id: string; };
const Tln: React.FC<TlnProps> = ({ id }) => {
  const { translations } = useLanguage();
  return (
    // <TranslationContext.Consumer>
    <>
      {translations[id] ? translations[id] : id}
    </>
				
  // </TranslationContext.Consumer>
  );
};

export default React.memo(Tln);
