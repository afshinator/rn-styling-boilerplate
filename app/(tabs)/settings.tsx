// settings.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const themeOptions: LightDarkMode[] = ['system', 'light', 'dark'] as const;
  const fontScales = [0.8, 0.9, 1.0, 1.1, 1.2, 1.3];
  const currentFontIndex = fontScales.indexOf(preferences.fontScale);
  const canDecrease = currentFontIndex > 0;
  const canIncrease = currentFontIndex < fontScales.length - 1;

  const handleFontScaleChange = (delta: number) => {
    const newIndex = currentFontIndex + delta;
    if (newIndex >= 0 && newIndex < fontScales.length) {
      updatePreferences.mutate({ fontScale: fontScales[newIndex] });
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedText type="large" style={styles.title}>
        Settings
      </ThemedText>

      {/* Appearance */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Appearance</ThemedText>
        <ThemedText variant="secondary" type="small" style={styles.sectionDescription}>
          Choose your preferred theme
        </ThemedText>

        <View style={styles.buttonRow}>
          {themeOptions.map((option) => (
            <Pressable
              key={option}
              onPress={() => updatePreferences.mutate({ lightDarkMode: option })}
              style={styles.buttonPressable}
            >
              <ThemedView
                shadow="sm"
                style={[
                  styles.button,
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
        </View>
      </ThemedView>

      {/* Font Scale */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Font Size</ThemedText>
        <ThemedText variant="secondary" type="small" style={styles.sectionDescription}>
          Adjust text size for better readability
        </ThemedText>

        <View style={styles.fontScaleRow}>
          <Pressable
            onPress={() => handleFontScaleChange(-1)}
            disabled={!canDecrease}
            style={styles.fontScaleButton}
          >
            <ThemedView
              shadow="sm"
              style={[
                styles.button,
                styles.fontScaleButtonView,
                !canDecrease && styles.disabledButton,
              ]}
            >
              <ThemedText
                type="title"
                variant={canDecrease ? 'default' : 'secondary'}
              >
                −
              </ThemedText>
            </ThemedView>
          </Pressable>

          <ThemedView shadow="sm" style={[styles.button, styles.fontScaleValue]}>
            <ThemedText type="small" variant="secondary">
              Size
            </ThemedText>
            <ThemedText type="title">
              {preferences.fontScale.toFixed(1)}x
            </ThemedText>
          </ThemedView>

          <Pressable
            onPress={() => handleFontScaleChange(1)}
            disabled={!canIncrease}
            style={styles.fontScaleButton}
          >
            <ThemedView
              shadow="sm"
              style={[
                styles.button,
                styles.fontScaleButtonView,
                !canIncrease && styles.disabledButton,
              ]}
            >
              <ThemedText
                type="title"
                variant={canIncrease ? 'default' : 'secondary'}
              >
                +
              </ThemedText>
            </ThemedView>
          </Pressable>
        </View>
      </ThemedView>

      {/* Preview */}
      <ThemedView variant="secondary" style={styles.preview}>
        <ThemedText type="caption" variant="secondary">
          PREVIEW
        </ThemedText>
        <ThemedText type="title" style={{ fontSize: 24 * preferences.fontScale }}>
          Title Text
        </ThemedText>
        <ThemedText type="body" style={{ fontSize: 16 * preferences.fontScale }}>
          This is body text to preview your settings.
        </ThemedText>
        <ThemedText type="small" variant="secondary" style={{ fontSize: 14 * preferences.fontScale }}>
          Small secondary text
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: Spacing.lg,
  },
  section: {
    marginBottom: Spacing.xl,
    padding: Spacing.sm,
  },
  sectionDescription: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  buttonPressable: {
    flex: 1,
  },
  button: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontScaleRow: {
    flexDirection: 'row',
    // gap: Spacing.sm,
    // alignItems: 'stretch',
  },
  fontScaleButton: {
    flex: 1,
  },
  fontScaleButtonView: {
    height: 90,
  },
  fontScaleValue: {
    flex: 1.5,
    gap: Spacing.xs,
  },
  disabledButton: {
    opacity: 0.4,
  },
  preview: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    // marginTop: Spacing.lg,
  },
});