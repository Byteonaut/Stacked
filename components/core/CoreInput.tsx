
import { theme } from '@/app/styles/theme';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface CoreInputProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  icon?: React.ComponentType<{ width?: number; height?: number; color?: string }>;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
}

export const CoreInput: React.FC<CoreInputProps> = ({
  placeholder,
  value,
  setValue,
  icon: Icon,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoComplete = 'off',
  ...props
}) => {
  return (
    <View style={styles.container}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon width={20} height={20} color={theme.colors.content.subdued} />
        </View>
      )}
      <TextInput
        style={[styles.input, Icon && styles.inputWithIcon]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.content.subdued}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        selectionColor={theme.colors.brand.bg}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    left: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
  input: {
    backgroundColor: theme.colors.bg.foreground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: theme.colors.content.subdued,
    fontFamily: 'System',
    minHeight: 56,
  },
  inputWithIcon: {
    paddingLeft: 48,
  },
});