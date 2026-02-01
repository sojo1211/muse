import React, { useEffect, useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import { NY_IMAGE_HEIGHT, styles } from './Onboarding.styles';

export default function OnboardingScreen() {
  // 🎀 리본 애니메이션 (처음엔 안 보임)
  const ribbonOpacity = useRef(new Animated.Value(0)).current;

  // 🗽 NY 랜드마크 애니메이션 (처음엔 높이 0)
  const fillAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 순차적 실행: 리본 등장 -> 랜드마크 상승
    Animated.sequence([
      // 1️⃣ 리본 페이드인 (애니메이션 시작과 동시에 실행)
      Animated.timing(ribbonOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      // 2️⃣ 리본 등장 완료 후 즉시 랜드마크 상승
      Animated.timing(fillAnim, {
        toValue: NY_IMAGE_HEIGHT,
        duration: 1500,
        useNativeDriver: false, // 레이아웃 변경은 false
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        
        {/* 🔷 로고 그룹: 별도 애니메이션 없이 처음부터 고정 */}
        <View style={styles.logoGroup}>
          <Image
            source={require('../../assets/images/Onboarding/USA.png')}
            style={styles.flagIcon}
          />
          <Image
            source={require('../../assets/images/LOGO.png')}
            style={styles.mainLogo}
          />
        </View>

        {/* 🎀 리본: opacity 애니메이션 적용 */}
        <Animated.Image
          source={require('../../assets/images/Onboarding/ribbon.png')}
          style={[
            styles.ribbon,
            { opacity: ribbonOpacity },
          ]}
          resizeMode="contain"
        />

        {/* 🗽 NY 랜드마크: height(mask) 애니메이션 적용 */}
        <Animated.View
          style={[
            styles.bottomImageMask,
            { height: fillAnim },
          ]}
        >
          <Image
            source={require('../../assets/images/Onboarding/NY.png')}
            style={styles.bottomImage}
            resizeMode="contain"
          />
        </Animated.View>

      </View>
    </View>
  );
}