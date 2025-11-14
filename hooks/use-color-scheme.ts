import { PREFERENCES_QUERY_KEY, ResolvedColorScheme, UserPreferences } from '@/constants/misc';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Enhanced color scheme hook that respects user preferences
 * Returns the resolved color scheme ('light' or 'dark')
 */
export function useColorScheme(): ResolvedColorScheme {
  const [hasHydrated, setHasHydrated] = useState(false);
  const systemColorScheme = useRNColorScheme();
  
  let queryClient;
  try {
    queryClient = useQueryClient();
  } catch {
    queryClient = null;
  }

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // During SSR/initial render, return light mode
  if (!hasHydrated) {
    return 'light';
  }

  // If QueryClient isn't available yet, use system preference
  if (!queryClient) {
    return systemColorScheme ?? 'light';
  }

  const preferences = queryClient.getQueryData<UserPreferences>(PREFERENCES_QUERY_KEY);

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