import { ResolvedColorScheme, UserPreferences } from '@/constants/misc';
import { usePreferences } from '@/hooks/use-preference';
import { useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';

/**
 * Resolves the color scheme based on user preferences and system settings
 * @param preferences - User preferences from AsyncStorage
 * @param systemColorScheme - System color scheme from the OS
 * @param hasHydrated - Whether the component has hydrated (for SSR)
 * @returns The resolved color scheme ('light' or 'dark')
 */
export function resolveColorScheme(
  preferences: UserPreferences | undefined,
  systemColorScheme: ColorSchemeName,
  hasHydrated: boolean
): ResolvedColorScheme {
  // During SSR/initial render, return light mode
  if (!hasHydrated) {
    return 'light';
  }

  // If preferences haven't loaded yet, use system preference
  if (!preferences) {
    return systemColorScheme ?? 'light';
  }

  // Resolve 'system' to actual system color scheme
  if (preferences.lightDarkMode === 'system') {
    return systemColorScheme ?? 'light';
  }

  // Return explicit user preference
  return preferences.lightDarkMode;
}

/**
 * Hook that provides hydration state and system color scheme
 * This is the shared logic for both web and native
 */
export function useColorSchemeBase(requiresHydration: boolean) {
  const [hasHydrated, setHasHydrated] = useState(!requiresHydration);
  const { data: preferences } = usePreferences();

  useEffect(() => {
    if (requiresHydration) {
      setHasHydrated(true);
    }
  }, [requiresHydration]);

  return {
    preferences,
    hasHydrated,
  };
}