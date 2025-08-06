import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    primaryContainer: '#E3F2FD',
    secondary: '#1976D2',
    secondaryContainer: '#BBDEFB',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#FAFAFA',
    error: '#F44336',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#212121',
    onBackground: '#212121',
    outline: '#E0E0E0',
  },
  roundness: 8,
};

export const customColors = {
  cardBackground: '#FFFFFF',
  lightBlue: '#E3F2FD',
  darkBlue: '#1565C0',
  success: '#4CAF50',
  warning: '#FF9800',
  info: '#2196F3',
  lightGray: '#F5F5F5',
  mediumGray: '#9E9E9E',
  darkGray: '#424242',
};