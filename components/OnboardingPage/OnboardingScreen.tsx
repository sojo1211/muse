import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AnimatedRibbon from './AnimatedRibbon';
import { styles } from './Onboarding.styles';

export default function OnboardingScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.contentWrapper}>
          {/* 🎀 리본: 우상단→좌하단 방향으로 그려지는 애니메이션 */}
          <AnimatedRibbon style={styles.ribbon} />

          {/* 🔷 로고: 정중앙 (Safe Area를 제외한 영역의 0,0) */}
          <View style={styles.logoGroup}>
            <Image
              source={require('../../assets/images/LOGO.png')}
              style={styles.mainLogo}
              resizeMode="contain"
            />
          </View>
        </View>
      </SafeAreaView>
  );
}