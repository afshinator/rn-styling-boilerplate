/**
 * TanStack Query hooks for user preferences
 */

import { UserPreferences } from '@/constants/misc';
import { preferencesStorage } from '@/utils/preferenceStorage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const PREFERENCES_QUERY_KEY = ['prefs'];

/**
 * Hook to get user preferences
 * Automatically hydrates from AsyncStorage on mount
 */
export function usePreferences() {
  return useQuery({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: preferencesStorage.get,
    staleTime: Infinity, // Preferences don't go stale
  });
}

/**
 * Hook to update user preferences
 * Usage: const updatePreferences = useUpdatePreferences();
 *        updatePreferences.mutate({ fontScale: 1.2 });
 */
export function useUpdatePreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<UserPreferences>) => 
      preferencesStorage.update(updates),
    onSuccess: (updatedPreferences) => {
      // Update the cache with new preferences
      queryClient.setQueryData(PREFERENCES_QUERY_KEY, () => updatedPreferences);
    },
  });
}

/**
 * Hook to reset preferences to defaults
 */
export function useResetPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: preferencesStorage.reset,
    onSuccess: () => {
      // Invalidate to trigger refetch with defaults
      queryClient.invalidateQueries({ queryKey: PREFERENCES_QUERY_KEY });
    },
  });
}