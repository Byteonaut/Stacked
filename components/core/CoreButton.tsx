import { theme } from '@/app/styles/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { CoreText } from './CoreText';

interface CoreButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}

export const CoreButton: React.FC<CoreButtonProps> = ({
  title,
  onPress,
  backgroundColor = theme.colors.brand.content,
  textColor = theme.colors.content,
  disabled = false,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: disabled ? theme.colors.bgAlpha.subtle : backgroundColor },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <CoreText
        type="label"
        size="medium"
        color={disabled ? 'subdued' : 'black'}
        style={styles.text}
      >
        {title}
      </CoreText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 16,
    minHeight: 56,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
});