import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { themes } from '../styles/settings';
import { ThemeProvider as StyledCmpThemeProvider} from 'styled-components';

export const ThemeContext = React.createContext<ThemeProviderProps>({
  setTheme: () => { console.warn('initialize'); },
  currentTheme: 'light',
});
type CurrentTheme = 'dark' | 'light';
type SetTheme =  (theme: CurrentTheme) => void;
export type ThemeProviderProps = {
	setTheme: SetTheme
  currentTheme: CurrentTheme;
};

export const ThemeProvider: React.FC = ({ children }) => {
  const [currentTheme, setColorMode] = useState<CurrentTheme>('light');
  const [theme, mapThemeObject] = useState(themes['light']);
  useEffect(() => {
    const savedTheme = Cookies.get('eat_theme');
    if (savedTheme) {
      setTheme(savedTheme as CurrentTheme);
    }
  }, []);

  const setTheme: SetTheme = theme => {
    if (Object.keys(themes).includes(theme)) {
      setColorMode(theme);
      mapThemeObject(themes[theme]);
      Cookies.set('eat_theme', theme);
    } else {
      setColorMode('light');
      mapThemeObject(themes['light']);
    }
  };
  return (
    <ThemeContext.Provider
      value={{ currentTheme, setTheme }}
    >
      <StyledCmpThemeProvider theme={theme}>
        {children}
      </StyledCmpThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeProviderProps => {
  const { currentTheme, setTheme } = React.useContext(ThemeContext);
  return { currentTheme, setTheme };
};