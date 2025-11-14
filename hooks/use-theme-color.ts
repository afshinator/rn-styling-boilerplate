import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// This hook will eventually support user preference override
// When you implement AsyncStorage + TanStack Query, you'll modify this to:
// 1. Check user preference from your query
// 2. Fall back to system if preference is 'system'
// 3. Use the user's explicit choice if 'light' or 'dark'

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // TODO: Replace with user preference when available
  // const userPreference = useThemePreference(); // from TanStack Query
  // const theme = userPreference === 'system' ? systemTheme : userPreference;
  
  const systemTheme = useColorScheme() ?? 'light';
  const theme = systemTheme;

  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}