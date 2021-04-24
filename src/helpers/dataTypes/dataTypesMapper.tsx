import * as React from 'react';
import Tln from '../../components/languageProvider/Tln';
import Starters from './dataTypes/Starters';
import Hour from './dataTypes/Hour';
import Date from './dataTypes/Date';

type dataType = 'text' | 'number' | 'hour' | 'date' | 'starters';
type dateMapperParams = { type: dataType, value: string | number | string[] | number[]}

class dataTypesMapper {
  private generate = (
    params: dateMapperParams): JSX.Element => {
    const { type, value } = params;
    switch (type) {
      case 'starters':
        return <Starters value={value as string[]} />;
      case 'text':
      case 'number':
        return <span>{value}</span>;
      case 'hour':
        return <Hour value={value as number} />;
      case 'date':
        return <Date value={value as number} />;
      default:
        return <Tln id='WRONG_DATA_TYPE' />;
    }
  }
  public generateContent = (data: any[], columns: SingleColumn[]): any[] => {
    return data.map(item => {
      const modifiedItem = { ...item };
      Object.entries(modifiedItem).forEach(([key, value]) => {
        if (value !== null) {
          columns.forEach(col => {
            if (col.dataIndex === key) {
              modifiedItem[key] = this.generate({ type: col.type, value: value as dataType });
            }
          });
        }
      });
      return modifiedItem;
    });
  }
}

export default new dataTypesMapper();