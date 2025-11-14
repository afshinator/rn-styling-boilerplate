import { Text, type TextProps } from 'react-native';

import { Typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 
    | 'xlarge'
    | 'large' 
    | 'title'
    | 'subtitle'
    | 'body'
    | 'bodySemibold'
    | 'small'
    | 'xsmall'
    | 'caption';
  variant?: 'default' | 'secondary' | 'link' | 'error' | 'success' | 'warning';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'body',
  variant = 'default',
  ...rest
}: ThemedTextProps) {
  // Determine color based on variant
  let colorKey: 'text' | 'textSecondary' | 'link' | 'error' | 'success' | 'warning' = 'text';
  
  switch (variant) {
    case 'secondary':
      colorKey = 'textSecondary';
      break;
    case 'link':
      colorKey = 'link';
      break;
    case 'error':
      colorKey = 'error';
      break;
    case 'success':
      colorKey = 'success';
      break;
    case 'warning':
      colorKey = 'warning';
      break;
    default:
      colorKey = 'text';
  }

  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorKey);

  // Get typography styles
  const typographyStyle = Typography[type];

  return (
    <Text
      style={[
        { color },
        typographyStyle,
        style,
      ]}
      {...rest}
    />
  );
}