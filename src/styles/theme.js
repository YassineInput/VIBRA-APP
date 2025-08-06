import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Futuristic black/white theme
    primary: '#FFFFFF', // Pure white
    primaryContainer: '#000000',
    secondary: '#FFFFFF', // White accent
    secondaryContainer: '#000000',
    surface: '#000000', // Pure black background
    surfaceVariant: '#111111', // Slightly lighter black
    background: '#000000', // Main black background
    error: '#FF4444', // Bright red for analytics
    success: '#00FF88', // Bright green for analytics
    warning: '#FFAA00', // Orange for analytics
    info: '#FFFFFF', // White for info
    onPrimary: '#000000', // Black text on white
    onSecondary: '#000000',
    onSurface: '#FFFFFF', // White text on black
    onBackground: '#FFFFFF',
    outline: '#333333', // Dark gray borders
  },
  roundness: 8,
};

export const customColors = {
  // Futuristic gradients
  primaryGradient: ['#FFFFFF', '#CCCCCC'],
  secondaryGradient: ['#000000', '#111111'],
  successGradient: ['#00FF88', '#00CC66'],
  warningGradient: ['#FFAA00', '#FF8800'],
  errorGradient: ['#FF4444', '#CC0000'],
  
  // Futuristic grays
  gray50: '#FFFFFF',
  gray100: '#F0F0F0',
  gray200: '#E0E0E0',
  gray300: '#CCCCCC',
  gray400: '#999999',
  gray500: '#666666',
  gray600: '#444444',
  gray700: '#333333',
  gray800: '#222222',
  gray900: '#111111',
  
  // Futuristic specific colors
  darkBackground: '#000000',
  darkSurface: '#111111',
  darkCard: '#111111',
  darkBorder: '#333333',
  
  // Analytics colors only (green/red)
  accentBlue: '#FFFFFF', // White for UI elements
  accentGreen: '#00FF88', // Bright green for analytics
  accentOrange: '#FFAA00', // Orange for analytics
  accentRed: '#FF4444', // Bright red for analytics
  accentPurple: '#FFFFFF', // White for UI
  accentPink: '#FFFFFF', // White for UI
  accentYellow: '#FFAA00', // Orange for analytics
  
  // Status colors (using green/red only for analytics)
  statusNew: '#FFFFFF', // White for UI
  statusQualified: '#00FF88', // Green for analytics
  statusHot: '#FF4444', // Red for analytics
  statusWarm: '#FFAA00', // Orange for analytics
  statusCold: '#999999', // Gray for analytics
  statusConverted: '#00FF88', // Green for analytics
  
  // Card and surface colors
  cardBackground: '#111111',
  cardShadow: 'rgba(0, 0, 0, 0.5)',
  glassBackground: 'rgba(0, 0, 0, 0.8)',
  
  // Sidebar colors
  sidebarBackground: '#000000',
  sidebarActive: '#FFFFFF',
  sidebarInactive: '#666666',
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 12,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};