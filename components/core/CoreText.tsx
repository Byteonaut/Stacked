import { useFonts } from 'expo-font';
import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { theme } from '../../app/styles/theme';

type FontType = 'heading' | 'label' | 'body' | 'mono';
type FontSize = 'large' | 'medium' | 'small' | 'xSmall';
type TextColor = keyof typeof theme.colors.content;

interface CoreTextProps extends TextProps {
  type?: FontType;
  size?: FontSize;
  color?: TextColor;
  children: React.ReactNode;
}

export const CoreText: React.FC<CoreTextProps> = ({
  type = 'body',
  size = 'medium',
  color = 'normal',
  style,
  children,
  ...props
}) => {
  const [fontsLoaded] = useFonts({
    'TacticSans': require('../../assets/fonts/TacticSans-Med.ttf'),
    'VolksansTest': require('../../assets/fonts/volksansTest-Normal.ttf'),
  });

  const fontStyle = theme.font[type];
  const fontSize = fontStyle[size];

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Text
      style={[
        styles.base,
        {
          fontSize: fontSize.fontSize,
          lineHeight: fontSize.lineHeight,
          color: theme.colors.content[color],
          fontFamily: type === 'heading' ? 'TacticSans' : 'VolksansTest',
          fontWeight: fontStyle.fontWeight,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
