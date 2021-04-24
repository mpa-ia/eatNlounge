import React from 'react';
import { Checkbox } from 'antd';
import Tln from '../../../../components/languageProvider/Tln';
import { settings } from '../../../../settings';

interface Props {
  value: Array<string>;
}

export default function ArrayString({ value }: Props): JSX.Element {
  return (
    <ul>
      {settings.starters.map(item =>
        <li key={item}>
          <Checkbox checked={value.includes(item)}>
            <Tln id={`BOOKINGS_STARTER_${item.toUpperCase()}`} />
          </Checkbox>
        </li>)}
    </ul>
  );
}
