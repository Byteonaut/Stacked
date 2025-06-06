import { theme } from '@/app/styles/theme';
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon';
import { CoreText } from '@/components/core/CoreText';
import { FlickeringGrid } from '@/components/core/FlickeringGrid';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SubCardItem } from './SubCardItem';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type SubCardState = 'default' | 'loading' | 'finished';
type MainCardState = 'default' | 'loading' | 'finished';

interface SubCard {
  title: string;
  description?: string;
}

interface ComplexLoadingCardProps {
  title: string;
  description?: string;
  state: MainCardState;
  subCardData: SubCard[];
  onComplete?: () => void;
}

export const ComplexLoadingCard: React.FC<ComplexLoadingCardProps> = ({
  title,
  state,
  description,
  subCardData,
  onComplete,
}) => {
  const [subCardStates, setSubCardStates] = useState<SubCardState[]>(
    subCardData.map(() => 'default')
  );
  const [subCardLoadingTimes, setSubCardLoadingTimes] = useState<(number | undefined)[]>(
    subCardData.map(() => undefined)
  );

  useEffect(() => {
    if (state !== 'loading') return;

    let timeoutIds: NodeJS.Timeout[] = [];
    
    const processNextSubCard = (currentIndex: number) => {
      if (currentIndex >= subCardData.length) {
        onComplete?.();
        return;
      }
      
      const startTime = Date.now();
      
      setSubCardStates(prev => {
        const newStates = [...prev];
        newStates[currentIndex] = 'loading';
        return newStates;
      });
      
      setSubCardLoadingTimes(prev => {
        const newTimes = [...prev];
        newTimes[currentIndex] = startTime;
        return newTimes;
      });
      
      const timeoutId = setTimeout(() => {
        setSubCardStates(prev => {
          const newStates = [...prev];
          newStates[currentIndex] = 'finished';
          return newStates;
        });
        
        setSubCardLoadingTimes(prev => {
          const newTimes = [...prev];
          newTimes[currentIndex] = undefined;
          return newTimes;
        });
        processNextSubCard(currentIndex + 1);
      }, 3000);
      
      timeoutIds.push(timeoutId);
    };
    
    setSubCardStates(subCardData.map(() => 'default'));
    setSubCardLoadingTimes(subCardData.map(() => undefined));
    
    processNextSubCard(0);
    
    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [state, onComplete, subCardData.length]);

  if (state === 'default') {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.textWrapper}>
          <CoreText type="body" size="medium" color="strongWhite">
            {title}
          </CoreText>
        </View>
        <View style={styles.checkWrapper} />
      </View>
    );
  }

  if (state === 'finished') {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.textWrapper}>
          <CoreText type="body" size="medium" color="accent">
            {title}
          </CoreText>
          {description && (
            <CoreText type="mono" size="small" color="subdued">
              {description}
            </CoreText>
          )}
        </View>
        <View style={[styles.checkWrapper, {
          backgroundColor: theme.colors.bgAlpha.subtle,
        }]}>
          <CheckMarkIcon width={24} height={24} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.complexContainer}>
      <FlickeringGrid
        width={SCREEN_WIDTH}
        height={SCREEN_HEIGHT}
        squareSize={6}
        gridGap={4}
        color={'#B5FF4D'}
        maxOpacity={0.2}
        flickerChance={0.05}
        style={styles.grid}
      />
      <View style={styles.complexContent}>
        <CoreText type="body" size="large" color="strongWhite" style={styles.mainTitle}>
          {title}
        </CoreText>
        
        <View style={styles.subCardsContainer}>
          {subCardData.map((subCard, index) => (
            <SubCardItem
              key={index}
              title={subCard.title}
              state={subCardStates[index]}
              loadingStartTime={subCardLoadingTimes[index]}
              loadingDuration={3000}
              isLast={index === subCardData.length - 1}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.bg.foreground,
    padding: 24,
    borderRadius: 6,
    minHeight: 80,
  },
  complexContainer: {
    backgroundColor: theme.colors.bg.foreground,
    borderRadius: 6,
    overflow: 'hidden',
    minHeight: 280,
  },
  complexContent: {
    padding: 24,
    zIndex: 1,
    flex: 1,
  },
  mainTitle: {
    marginBottom: 20,
  },
  subCardsContainer: {
    backgroundColor: '#262626',
    borderRadius: 6,
    paddingHorizontal: 12,
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
    flex: 1,
  },
});