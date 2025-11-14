import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BorderRadius, Spacing } from '@/constants/theme';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

/**
 * Example usage of the enhanced theme system
 */
export default function ExampleScreen() {
  return (
    <ThemedView style={styles.container}>
      {/* Typography sizes */}
      <ThemedText type="xlarge">Extra Large Title</ThemedText>
      <ThemedText type="large">Large Title</ThemedText>
      <ThemedText type="title">Title</ThemedText>
      <ThemedText type="subtitle">Subtitle</ThemedText>
      <ThemedText type="body">Body text (default)</ThemedText>
      <ThemedText type="bodySemibold">Body Semibold</ThemedText>
      <ThemedText type="small">Small text</ThemedText>
      <ThemedText type="xsmall">Extra small text</ThemedText>
      <ThemedText type="caption">Caption text</ThemedText>

      {/* Color variants */}
      <ThemedText variant="default">Default text color</ThemedText>
      <ThemedText variant="secondary">Secondary text color</ThemedText>
      <Link href="/example"><ThemedText variant="link">Link text color</ThemedText></Link>
      <ThemedText variant="error">Error message</ThemedText>
      <ThemedText variant="success">Success message</ThemedText>
      <ThemedText variant="warning">Warning message</ThemedText>

      {/* Combining type and variant */}
      <ThemedText type="title" variant="error">
        Error Title
      </ThemedText>
      <ThemedText type="small" variant="secondary">
        Small secondary text
      </ThemedText>

      {/* Secondary background */}
      <ThemedView variant="secondary" style={styles.card}>
        <ThemedText type="subtitle">Card Title</ThemedText>
        <ThemedText variant="secondary">
          This is a card with secondary background
        </ThemedText>
      </ThemedView>

      {/* Using spacing constants */}
      <ThemedView style={styles.spacedContainer}>
        <ThemedText>Using theme spacing constants</ThemedText>
      </ThemedView>

      {/* Manual color override (when needed) */}
      <ThemedText 
        lightColor="#ff0000" 
        darkColor="#ff6666"
      >
        Custom colored text
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
    gap: Spacing.md,
  },
  card: {
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  spacedContainer: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
});