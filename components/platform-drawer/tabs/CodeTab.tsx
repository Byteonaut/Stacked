import { theme } from '@/app/styles/theme';
import { CoreText } from '@/components/core/CoreText';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

interface CodeTabProps {
  onSuccess: () => void;
  codeLength?: number;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

export const CodeTab: React.FC<CodeTabProps> = ({
  onSuccess,
  codeLength = 6,
  placeholder = 'Enter a 6-digit code sent to email@address.com',
  error,
  disabled = false,
}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: codeLength });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleChangeText = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, '');
    setValue(numbersOnly);
    if (numbersOnly.length === codeLength) {
      onSuccess();
    }
  };

  const renderCell = ({ index, symbol, isFocused }: any) => {
    const hasValue = !!symbol;
    const showCursor = isFocused && !hasValue;
    
    return (
      <View
        key={index}
        style={[
          styles.cell,
          isFocused && styles.focusedCell,
          hasValue && styles.filledCell,
          error && styles.errorCell,
          disabled && styles.disabledCell,
        ]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        <CoreText type="label" size="large" color="strongWhite" style={{
          fontSize: 40,
          lineHeight: 60,
        }}>
          {symbol || (showCursor ? <Cursor /> : null)}
        </CoreText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={handleChangeText}
        cellCount={codeLength}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        renderCell={renderCell}
        editable={!disabled}
      />
      
      {placeholder && (
        <Text style={[styles.placeholder, error && styles.placeholderError]}>
          {error || placeholder}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  codeFieldRoot: {
    marginBottom: 16,
  },
  cell: {
    width: 50,
    height: 80,
    backgroundColor: '#FFFFFF1A',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  focusedCell: {
    borderColor: theme.colors.brand.content,
  },
  filledCell: {
    borderColor: theme.colors.borderAlpha.normal,
  },
  errorCell: {
    borderColor: theme.colors.error.content,
    backgroundColor: theme.colors.error.bg,
  },
  disabledCell: {
    backgroundColor: theme.colors.bgAlpha.subtle,
    opacity: 0.6,
  },
  placeholder: {
    fontSize: 14,
    color: theme.colors.content.subdued,
    textAlign: 'center',
    marginTop: 8,
  },
  placeholderError: {
    color: theme.colors.error.content,
  },
});