import { PREFERENCES_QUERY_KEY, ResolvedColorScheme, UserPreferences } from '@/constants/misc';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 * Enhanced to also respect user preferences from AsyncStorage
 * Returns the resolved color scheme ('light' or 'dark')
 */
export function useColorScheme(): ResolvedColorScheme {
  const [hasHydrated, setHasHydrated] = useState(false);
  const systemColorScheme = useRNColorScheme();
  
  // Try to get query client, but handle the case where it might not exist yet
  let queryClient;
  try {
    queryClient = useQueryClient();
  } catch {
    // QueryClient not available yet (before provider is set up)
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

  // Get preferences from cache (doesn't trigger a fetch)
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