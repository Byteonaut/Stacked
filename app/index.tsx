import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Logo from '@/assets/icons/Logo';
import { CoreText } from '@/components/core/CoreText';
import { PlatformDrawer } from '@/components/platform-drawer/PlatformDrawer';
import { Platform, PlatformCard } from '@/components/PlatformCard';
import bgImage from '../assets/images/main-bg.png';

import CbsLogo from '@/assets/icons/platfroms/CbsLogo';
import EspnLogo from '@/assets/icons/platfroms/EspnLogo';
import NflLogo from '@/assets/icons/platfroms/NflLogo';
import SleeperLogo from '@/assets/icons/platfroms/SleeperLogo';
import YahooLogo from '@/assets/icons/platfroms/YahooLogo';
import React from 'react';

const PLATFORMS: Platform[] = [
    {
        title: 'Sleeper',
        icon: SleeperLogo,
    },
    {
        title: 'ESPN',
        icon: EspnLogo,
        description: '2FA required'
    },
    {
        title: 'Yahoo',
        icon: YahooLogo,
    },
    {
        title: "CBS",
        icon: CbsLogo,
    },
    {
        title: "NFL",
        icon: NflLogo,
    }
]

export default function HomeScreen() {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const handlePlatformPress = (platform: Platform) => {
        setSelectedPlatform(platform);
        setTimeout(() => {
            setDrawerVisible(true);
        }, 50);
    };

    const handleCloseDrawer = () => {
        setDrawerVisible(false);
        setSelectedPlatform(null)
    };

    return (
        <>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Image source={bgImage} style={styles.image} />
                    <View style={styles.overlay}>
                        <View style={styles.logoContainer}>
                            <Logo/>
                        </View>
                        <View style={styles.textContainer}>
                            <CoreText type="heading" size='medium' color="strongWhite">
                                Select platforms to connect to Stacked
                            </CoreText>
                            <CoreText type="body" size='medium' color="subdued">
                                Connect tools to manage your Leagues.
                                Add at least one now, you can always add more later.
                            </CoreText>
                        </View>
                        <ScrollView style={styles.platformsContainer}>
                            <View style={styles.platformsList}>
                                {PLATFORMS.map((platform) => (
                                    <PlatformCard 
                                        key={platform.title}
                                        platform={platform}
                                        selected={selectedPlatform?.title === platform.title}
                                        onPress={() => handlePlatformPress(platform)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>

            {/* Bottom Sheet Drawer */}
            <PlatformDrawer
                platform={selectedPlatform}
                visible={drawerVisible}
                onClose={handleCloseDrawer}
            />
        </>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        position: 'relative',
        paddingHorizontal: 20,
    },
    image: {
        position: 'absolute',
        height: '100%',
        resizeMode: 'contain',
        top: 0,
        right: 0,
    },
    overlay: {
        flex: 1,
    },
    logoContainer: {
        paddingVertical: 26,
    },
    textContainer: {
        paddingVertical: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
    },
    platformsContainer: {
        flex: 1,
    },
    platformsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        paddingBottom: 24,
    }
});