/**
 * preferenceStorage.ts  - AsyncStorage service for user preferences
 */

import { DEFAULT_PREFERENCES, PREFERENCES_STORAGE_KEY, UserPreferences } from '@/constants/misc';
import { getJSONObject, removeItem, setJSONObject } from '@/utils/asyncStorage';

export const preferencesStorage = {
  /**
   * Get user preferences from AsyncStorage
   * Returns default preferences if none exist
   */
  async get(): Promise<UserPreferences> {
    try {
      const stored = await getJSONObject<UserPreferences>(PREFERENCES_STORAGE_KEY);
      if (!stored) {
        return DEFAULT_PREFERENCES;
      }
      return stored;
    } catch (error) {
      console.error('Error reading preferences:', error);
      return DEFAULT_PREFERENCES;
    }
  },

  /**
   * Save user preferences to AsyncStorage
   */
  async set(preferences: UserPreferences): Promise<void> {
    try {
      await setJSONObject(PREFERENCES_STORAGE_KEY, preferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw error;
    }
  },

  /**
   * Update a single preference field
   */
  async update(updates: Partial<UserPreferences>): Promise<UserPreferences> {
    try {
      const current = await this.get();
      const updated = { ...current, ...updates };
      await this.set(updated);
      return updated;
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  },

  /**
   * Reset preferences to defaults
   */
  async reset(): Promise<void> {
    try {
      await removeItem(PREFERENCES_STORAGE_KEY);
    } catch (error) {
      console.error('Error resetting preferences:', error);
      throw error;
    }
  },
};