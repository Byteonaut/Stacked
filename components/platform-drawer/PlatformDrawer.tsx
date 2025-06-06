// Alternative PlatformDrawer.tsx with pixel-based snap points
import { theme } from '@/app/styles/theme';
import CrossIcon from '@/assets/icons/CrossIcon';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useMemo, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CoreText } from '../core/CoreText';
import { Platform } from '../PlatformCard';
import { CodeTab } from './tabs/CodeTab';
import { DownloadTab } from './tabs/DownloadTab/DownloadTab';
import { EmailTab } from './tabs/EmailTab';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type CurrentStep = 'email' | 'code' | 'downloading';

interface PlatformDrawerProps {
  platform: Platform | null;
  visible: boolean;
  onClose: () => void;
}

export const PlatformDrawer: React.FC<PlatformDrawerProps> = ({
  platform,
  visible,
  onClose,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentStep, setCurrentStep] = useState<CurrentStep>('email');

  const snapPoints = useMemo(() => {
    const ninetyPercent = Math.floor(SCREEN_HEIGHT * 0.9);
    return [ninetyPercent];
  }, []);

  const handleSheetChanges = (index: number) => {
    if (index === -1) {
      onClose();
    }
  };

  if (!platform) return null;

  const Icon = platform.icon;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.handleIndicator}
      animateOnMount={false}
      keyboardBehavior="interactive"
    >
      <BottomSheetView style={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon width={20} height={20} />
            <CoreText type='label' size='large' color="loud">
              {currentStep === 'downloading' ? 'Downloading data' : `Connecting ${platform.title}`}
            </CoreText>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <CrossIcon width={16} height={16} />
          </TouchableOpacity>
        </View>

        {/* Content area */}
        <View style={styles.content}>
          {currentStep === 'email' && <EmailTab onSuccess={() => setCurrentStep('code')} />}
          {currentStep === 'code' && <CodeTab onSuccess={() => setCurrentStep('downloading')} />}
          {currentStep === 'downloading' && <DownloadTab onSuccess={() => {
            setCurrentStep('email');
            onClose();
          }} />}
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: theme.colors.bg.main,
  },
  handleIndicator: {
    backgroundColor: theme.colors.bgAlpha.subtle,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.bgAlpha.subtle,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  closeButton: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 16,
    marginBottom: 'auto',
  },
  descriptionContainer: {
    padding: 12,
    backgroundColor: theme.colors.bgAlpha.subtle,
    borderRadius: 8,
  },
});