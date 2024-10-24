// src/hooks/useTheme.js
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider'; // Adjust the import path as necessary

export const useTheme = () => {
  return useContext(ThemeContext);
};
