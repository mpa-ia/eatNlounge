import React from 'react';
import { useTheme } from '../../context/theme';
import { Switch } from 'antd';

const ThemeSwitcher: React.FunctionComponent = () => {
  const { setTheme, currentTheme } = useTheme();
  const switchTheme = (isLightMode: boolean): void => {
    isLightMode ? setTheme('light') : setTheme('dark');
  };
  return (
    <Switch
      checkedChildren="Light mode"
      unCheckedChildren="Dark mode"
      defaultChecked={currentTheme === 'light'} onChange={switchTheme} />
  );
};

export default ThemeSwitcher;
