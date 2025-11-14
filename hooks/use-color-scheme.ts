import { UserPreferences } from '@/constants/misc';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * Enhanced color scheme hook that respects user preferences
 * 
 * This hook returns the effective color scheme based on:
 * 1. User's preference (if set to 'light' or 'dark')
 * 2. System preference (if user preference is 'system')
 * 3. Fallback to 'light' during hydration
 */
export function useColorScheme() {
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
  const preferences = queryClient.getQueryData<UserPreferences>(['user-preferences']);

  // If preferences haven't loaded yet, use system preference
  if (!preferences) {
    return systemColorScheme ?? 'light';
  }

  // If user preference is 'system', use system preference
  if (preferences.lightDarkMode === 'system') {
    return systemColorScheme ?? 'light';
  }

  // Otherwise use user's explicit preference
  return preferences.lightDarkMode;
}