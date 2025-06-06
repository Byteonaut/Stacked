import { theme } from '@/app/styles/theme';
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon';
import { CoreText } from '@/components/core/CoreText';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

type SubCardState = 'default' | 'loading' | 'finished';

interface SubCardItemProps {
  title: string;
  state: SubCardState;
  loadingStartTime?: number;
  loadingDuration?: number;
  isLast?: boolean;
}

export const SubCardItem: React.FC<SubCardItemProps> = ({ 
  title, 
  state,
  loadingStartTime,
  loadingDuration = 3000,
  isLast = false
}) => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (state !== 'loading' || !loadingStartTime) {
      return;
    }

    const updateProgress = () => {
      const now = Date.now();
      const elapsed = now - loadingStartTime;
      
      const rawProgress = (elapsed / loadingDuration) * 100;
      
      const progressPercent = Math.min(Math.max(rawProgress, 0), 100);
      const remainingTime = Math.max(Math.ceil((loadingDuration - elapsed) / 1000), 0);
      
      setProgress(Math.floor(progressPercent));
      setTimeLeft(remainingTime);
    };

    updateProgress();

    const interval = setInterval(updateProgress, 50);

    return () => clearInterval(interval);
  }, [state, loadingStartTime, loadingDuration]);

  const getProgressText = () => {
    if (state === 'loading') {
      return `${progress}% • ${timeLeft}s left`;
    }
    return '';
  };

  return (
    <View style={[
      styles.subCard,
      isLast && styles.lastSubCard
    ]}>
      <View style={styles.subCardContent}>
        <CoreText 
          type="body" 
          size="medium" 
          color={state === 'finished' ? 'accent' : 'strongWhite'}
        >
          {title}
        </CoreText>
        {state === 'loading' && (
          <CoreText type="mono" size="small" color="subdued" style={styles.progressText}>
            {getProgressText()}
          </CoreText>
        )}
      </View>
      
      <View style={styles.subCardIndicator}>
        {state === 'loading' && (
          <ActivityIndicator size="small" color={theme.colors.content.strongWhite} />
        )}
        {state === 'finished' && (
          <CheckMarkIcon width={20} height={20} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.bgAlpha.subtle,
  },
  lastSubCard: {
    borderBottomWidth: 0,
  },
  subCardContent: {
    flex: 1,
  },
  subCardIndicator: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    marginTop: 4,
  },
});