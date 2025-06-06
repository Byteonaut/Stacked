import { theme } from '@/app/styles/theme';
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon';
import { CoreText } from '@/components/core/CoreText';
import { FlickeringGrid } from '@/components/core/FlickeringGrid';
import React from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface DownloadTabCardProps {
  title: string;
  state: 'default' | 'loading' | 'finished';
  description?: string;
}

export const DownloadTabCard: React.FC<DownloadTabCardProps> = ({
  title,
  state,
  description,
}) => {
  if (state === 'default' || state === 'finished') {
    return (
      <View style={styles.container}>
        <View style={styles.textWrapper}>
        <CoreText type="body" size="medium" color={state === 'finished' ? 'accent' : 'strongWhite'}>
          {title}
        </CoreText>
        {description && state === 'finished' && (
          <CoreText type="mono" size="small" color="subdued">
            {description}
          </CoreText>
        )}
        </View>
        <View style={[styles.checkWrapper, {
          backgroundColor: state === 'finished' ? theme.colors.bgAlpha.subtle : 'transparent',
        }]} >
          {state === 'finished' && (
            <CheckMarkIcon width={24} height={24} />
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlickeringGrid
        width={SCREEN_WIDTH}
        height={80}
        squareSize={6}
        gridGap={4}
        color={'#B5FF4D'}
        maxOpacity={0.2}
        flickerChance={0.05}
        style={styles.grid}
      />
      <View style={styles.content}>
        <CoreText type="body" size="medium" color="strongWhite">
          {title}
        </CoreText>
        <View style={[styles.checkWrapper]} >
          <ActivityIndicator size="small" color={theme.colors.content.strongWhite} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    backgroundColor: theme.colors.bg.foreground,
    padding: 24,
    borderRadius: 6,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    zIndex: 1,
  },
  checkWrapper: {
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  grid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textWrapper: {

  }
});