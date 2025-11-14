import { ResolvedColorScheme } from '@/constants/misc';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { resolveColorScheme, useColorSchemeBase } from './use-color-scheme-shared';
 

/**
 * Native version: No SSR, so no hydration needed
 * Enhanced to respect user preferences from AsyncStorage
 * Returns the resolved color scheme ('light' or 'dark')
 */
export function useColorScheme(): ResolvedColorScheme {
  const systemColorScheme = useRNColorScheme();
  const { preferences, hasHydrated } = useColorSchemeBase(false); // Native doesn't need hydration

  return resolveColorScheme(preferences, systemColorScheme, hasHydrated);
}