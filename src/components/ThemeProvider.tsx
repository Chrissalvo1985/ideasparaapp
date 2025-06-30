import React, { useEffect } from 'react';
import { useAppStore } from '../stores/appStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { isDarkMode } = useAppStore();

  useEffect(() => {
    // Aplicar/remover clase dark del documento
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }
    

  }, [isDarkMode]);

  return <>{children}</>;
};

export default ThemeProvider; 