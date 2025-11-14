// constants/misc.ts

export type LightDarkMode = 'system' | 'light' | 'dark';

export interface UserPreferences {
  fontScale: number;
  lightDarkMode: LightDarkMode;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  fontScale: 1.0,
  lightDarkMode: 'dark',
};

export const PREFERENCES_STORAGE_KEY = 'Settings';