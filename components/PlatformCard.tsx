import { theme } from '@/app/styles/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CoreText } from './core/CoreText';

import CheckMarkIcon from '@/assets/icons/CheckMarkIcon';
import PlusIcon from '@/assets/icons/PlusIcon';

export interface Platform {
    title: string;
    icon: React.ComponentType<any>;
    description?: string;
}

interface PlatformCardProps {
  platform: Platform;
  onPress: () => void;
  selected: boolean;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  onPress,
  selected,
}) => {
  const Icon = platform.icon;
  return (
    <View style={styles.container}>
        <Icon width={32} height={32} />
        <View style={styles.textContainer}>
            <CoreText type="body" size="medium" color='strongWhite'>
                {platform.title}
            </CoreText>
            {platform.description && (
                <CoreText type="body" size="xSmall" color="subdued">
                    {platform.description}
                </CoreText>
            )}
        </View>
        <TouchableOpacity
        style={styles.buttonIcon}
         onPress={onPress}
         >
            {selected ? <CheckMarkIcon width={24} height={24} /> : <PlusIcon width={24} height={24} />}
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.bg.foreground,
    padding: 24,
    borderRadius: 6,
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  textContainer: {
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxHeight: 31,
  },
  buttonIcon: {
    width: 28,
    height: 28,
    backgroundColor: theme.colors.bgAlpha.subtle,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  }
});
