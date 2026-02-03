import React from 'react';
import { Image, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './Onboarding.styles';

export default function OnboardingScreen() {
  return (
    <SafeAreaProvider>
      {/* edges={['bottom']}를 주어 상단 영역(상태바)은 제외하고 그 아래부터 레이아웃 시작 */}
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" />
        
        <View style={styles.contentWrapper}>
          {/* 🎀 리본: 배경 (로고와 같은 중앙축 공유) */}
          <Image
            source={require('../../assets/images/Onboarding/ribbon.png')}
            style={styles.ribbon}
            resizeMode="contain"
          />

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
    </SafeAreaProvider>
  );
}