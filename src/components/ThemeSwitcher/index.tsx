import React from 'react';
import { useTheme } from '../../context/theme';
import { Switch } from 'antd';
import Icon from '@ant-design/icons';
import MoonSvg from '../../../public/icons/moon.svg';
import SunSvg from '../../../public/icons/sun.svg';


const ThemeSwitcher: React.FunctionComponent = () => {
  const { setTheme, currentTheme } = useTheme();
  const switchTheme = (isLightMode: boolean): void => {
    isLightMode ? setTheme('light') : setTheme('dark');
  };
  return (
    <Switch
      unCheckedChildren={<Icon component={SunSvg} />}
      checkedChildren={<Icon component={MoonSvg} />}
      defaultChecked={currentTheme === 'light'}
      onChange={switchTheme}
    />
  );
};

export default ThemeSwitcher;
