import { useState, useEffect } from 'react';

const themes = {
  light: {
    text: 'hsl(222 14% 8%)',
    background: 'hsl(220 33% 97%)',
    primary: 'hsl(222 55% 52%)',
    secondary: 'hsl(220 24% 74%)',
    accent: 'hsl(222 71% 64%)',
  },
  dark: {
    text: 'hsl(84 65% 92%)',
    background: 'hsl(180 4% 3%)',
    primary: 'hsl(83 41% 71%)',
    secondary: 'hsl(221 41% 30%)',
    accent: 'hsl(287 33% 54%)',
  },
  forest: {
    text: 'hsl(83 100% 93%)',
    background: 'hsl(105 87% 7%)',
    primary: 'hsl(83 100% 75%)',
    secondary: 'hsl(141 97% 34%)',
    accent: 'hsl(141 93% 58%)',
  },
  volcano: {
    text: 'hsl(330 100% 95%)',
    background: 'hsl(330 100% 5%)',
    primary: 'hsl(330 100% 71%)',
    secondary: 'hsl(347 100% 34%)',
    accent: 'hsl(354 100% 53%)',
  },
};

const useCustomTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme] ? savedTheme : 'light';
  });

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const applyTheme = (themeName) => {
    const theme = themes[themeName];
    document.documentElement.style.setProperty('--text', theme.text);
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--accent', theme.accent);
    document.documentElement.setAttribute('data-theme', themeName);
  };

  const changeTheme = (newTheme) => {
    if (themes[newTheme]) {
      setCurrentTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    }
  };

  return { currentTheme, changeTheme, themes };
};

export default useCustomTheme;