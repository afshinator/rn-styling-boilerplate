// settings.tsx

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BorderRadius, Spacing } from '@/constants/theme';

import { LightDarkMode } from '@/constants/misc';
import { usePreferences, useUpdatePreferences } from '@/hooks/use-preference';
import { useThemeColor } from '@/hooks/use-theme-color';

// Configuration constants
const FONT_SCALE_MIN = 0.5;
const FONT_SCALE_MAX = 1.4;
const FONT_SCALE_STEP = 0.1;
const CONTAINER_PADDING = 16;
const SLIDER_HEIGHT = 40;
const BUTTON_BORDER_WIDTH = 2;

export default function SettingsScreen() {
  const { data: preferences, isLoading } = usePreferences();
  const updatePreferences = useUpdatePreferences();
  const borderSelectedColor = useThemeColor({}, 'border');
  const sliderThumbColor = useThemeColor({}, 'tint');
  const sliderMinColor = useThemeColor({}, 'tint');
  const sliderMaxColor = useThemeColor({}, 'border');

  // Local state for slider value during drag
  const [tempFontScale, setTempFontScale] = useState<number | null>(null);

  if (isLoading || !preferences) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading preferences...</ThemedText>
      </ThemedView>
    );
  }

  const themeOptions: LightDarkMode[] = ['system', 'light', 'dark'] as const;
  const displayFontScale = tempFontScale ?? preferences.fontScale;

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
          Current size: {displayFontScale.toFixed(1)}x
        </ThemedText>

        <ThemedView style={styles.sliderContainer}>
          <ThemedText type="small" variant="secondary">{FONT_SCALE_MIN}×</ThemedText>
          <Slider
            style={styles.slider}
            minimumValue={FONT_SCALE_MIN}
            maximumValue={FONT_SCALE_MAX}
            step={FONT_SCALE_STEP}
            value={preferences.fontScale}
            onValueChange={(value) => setTempFontScale(Math.round(value / FONT_SCALE_STEP) * FONT_SCALE_STEP)}
            onSlidingComplete={(value) => {
              const rounded = Math.round(value / FONT_SCALE_STEP) * FONT_SCALE_STEP;
              setTempFontScale(null);
              updatePreferences.mutate({ fontScale: rounded });
            }}
            minimumTrackTintColor={sliderMinColor}
            maximumTrackTintColor={sliderMaxColor}
            thumbTintColor={sliderThumbColor}
          />
          <ThemedText type="small" variant="secondary">{FONT_SCALE_MAX}×</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Preview */}
      <ThemedView variant="secondary" style={styles.preview}>
        <ThemedText type="caption" variant="secondary">
          PREVIEW
        </ThemedText>
        <ThemedText type="title">
          Title Text
        </ThemedText>
        <ThemedText type="body">
          This is body text to preview your settings.
        </ThemedText>
        <ThemedText type="small" variant="secondary">
          Small secondary text
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: CONTAINER_PADDING,
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
    borderWidth: BUTTON_BORDER_WIDTH,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  slider: {
    flex: 1,
    height: SLIDER_HEIGHT,
  },
  preview: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
    // marginTop: Spacing.lg,
  },
});