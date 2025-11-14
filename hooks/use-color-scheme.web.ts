import { ResolvedColorScheme } from '@/constants/misc';
import { useColorScheme as useRNColorScheme } from 'react-native';
import { resolveColorScheme, useColorSchemeBase } from './use-color-scheme-shared';
 

/**
 * Web version: Supports static rendering with hydration
 * Enhanced to respect user preferences from AsyncStorage
 * Returns the resolved color scheme ('light' or 'dark')
 */
export function useColorScheme(): ResolvedColorScheme {
  const systemColorScheme = useRNColorScheme();
  const { preferences, hasHydrated } = useColorSchemeBase(true); // Web needs hydration

  return resolveColorScheme(preferences, systemColorScheme, hasHydrated);
}