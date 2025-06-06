import { theme } from '@/app/styles/theme';
import EnvelopeIcon from '@/assets/icons/EnvelopeIcon';
import LockIcon from '@/assets/icons/LockIcon';
import { CoreButton } from '@/components/core/CoreButton';
import { CoreInput } from '@/components/core/CoreInput';
import { CoreText } from '@/components/core/CoreText';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailTabProps {
  onSuccess?: (data: EmailFormData) => void;
}

export const EmailTab: React.FC<EmailTabProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<EmailFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<EmailFormData>>({});

  const validateForm = () => {
    try {
      const validatedData = emailSchema.parse(formData);
      setErrors({});
      onSuccess?.(validatedData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Partial<EmailFormData> = {};
        error.errors.forEach((err: z.ZodIssue) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as keyof EmailFormData] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <CoreInput
          placeholder="Email"
          value={formData.email}
          setValue={(value) => setFormData({ ...formData, email: value })}
          icon={EnvelopeIcon}
          keyboardType="email-address"
          autoComplete="email"
        />
        {errors.email && (
          <CoreText type="body" size="small" color="subdued" style={styles.errorText}>
            {errors.email}
          </CoreText>
        )}

        <View style={styles.spacer} />

        <CoreInput
          placeholder="Password"
          value={formData.password}
          setValue={(value) => setFormData({ ...formData, password: value })}
          icon={LockIcon}
          secureTextEntry
          autoComplete="password"
        />
        {errors.password && (
          <CoreText type="body" size="small" color="subdued" style={styles.errorText}>
            {errors.password}
          </CoreText>
        )}

        <View style={styles.spacer} />
        <CoreButton
          title="Continue"
          onPress={validateForm}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
  },
  spacer: {
    height: 16,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
    color: theme.colors.error.content,
  },
});
