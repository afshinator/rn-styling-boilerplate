/**
 * Example Settings Screen
 * Shows how to use the preferences system
 */

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, StyleSheet } from 'react-native';

import { BorderRadius, Spacing } from '@/constants/theme';

import { LightDarkMode } from '@/constants/misc';
import { usePreferences, useUpdatePreferences } from '@/hooks/use-preference';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function SettingsScreen() {
  const { data: preferences, isLoading } = usePreferences();
  const updatePreferences = useUpdatePreferences();
  const borderSelectedColor = useThemeColor({}, 'border');

  if (isLoading || !preferences) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading preferences...</ThemedText>
      </ThemedView>
    );
  }

  const themeOptions: LightDarkMode[] = ['system', 'light', 'dark'];

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="large" style={styles.title}>
        Settings
      </ThemedText>

      {/* Theme Selection */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Appearance</ThemedText>
        <ThemedText variant="secondary" type="small" style={styles.sectionDescription}>
          Choose your preferred theme
        </ThemedText>

        <ThemedView style={styles.optionsContainer}>
          {themeOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => updatePreferences.mutate({ lightDarkMode: option })}
              style={styles.pressable}
            >
              <ThemedView
                shadow="sm"
                style={[
                  styles.option,
                  preferences.lightDarkMode === option && {
                    borderColor: borderSelectedColor,
                  },
                ]}
              >
                <ThemedText
                  type="bodySemibold"
                  variant={preferences.lightDarkMode === option ? 'default' : 'secondary'}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Font Scale */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Font Size</ThemedText>
        <ThemedText variant="secondary" type="small" style={styles.sectionDescription}>
          Current scale: {preferences.fontScale.toFixed(1)}x
        </ThemedText>

        <ThemedView style={styles.optionsContainer}>
          {[0.8, 0.9, 1.0, 1.1, 1.2, 1.3].map((scale) => (
            <Pressable
              key={scale}
              onPress={() => updatePreferences.mutate({ fontScale: scale })}
              style={styles.pressable}
            >
              <ThemedView
                shadow="sm"
                style={[
                  styles.option,
                  preferences.fontScale === scale && {
                    borderColor: borderSelectedColor,
                  },
                ]}
              >
                <ThemedText
                  type="bodySemibold"
                  variant={preferences.fontScale === scale ? 'default' : 'secondary'}
                >
                  {scale === 1.0 ? 'Default' : `${scale.toFixed(1)}x`}
                </ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>
      </ThemedView>

      {/* Preview */}
      <ThemedView variant="secondary" style={styles.preview}>
        <ThemedText type="caption" variant="secondary">
          PREVIEW
        </ThemedText>
        <ThemedText type="title">Title Text</ThemedText>
        <ThemedText type="body">This is body text to preview your settings.</ThemedText>
        <ThemedText type="small" variant="secondary">
          Small secondary text
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
  title: {
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionDescription: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  optionsContainer: {
    gap: Spacing.sm,
  },
  pressable: {
    width: '100%',
  },
  option: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  preview: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    marginTop: Spacing.lg,
  },
});