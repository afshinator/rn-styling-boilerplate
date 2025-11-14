/**
 * Enhanced theme system with comprehensive colors, typography, and spacing
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    textSecondary: '#687076',
    background: '#fff',
    backgroundSecondary: '#f5f5f5',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    link: '#0a7ea4',
    error: '#dc2626',
    success: '#16a34a',
    warning: '#ea580c',
    border: '#e5e7eb',
  },
  dark: {
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#151718',
    backgroundSecondary: '#1f2324',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    link: '#60a5fa',
    error: '#ef4444',
    success: '#22c55e',
    warning: '#fb923c',
    border: '#374151',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

export const Typography = {
  // Extra large text
  xlarge: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: 'bold' as const,
  },
  // Large text (main titles)
  large: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold' as const,
  },
  // Title text
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold' as const,
  },
  // Subtitle
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const,
  },
  // Default body text
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal' as const,
  },
  // Body semibold
  bodySemibold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  // Small text
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'normal' as const,
  },
  // Extra small text
  xsmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'normal' as const,
  },
  // Caption text
  caption: {
    fontSize: 11,
    lineHeight: 14,
    fontWeight: 'normal' as const,
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

// Type for theme preference (to be used when implementing user preference)
export type ThemePreference = 'light' | 'dark' | 'system';

// This will be used later when you implement AsyncStorage + TanStack Query
export const THEME_STORAGE_KEY = '@app_theme_preference';