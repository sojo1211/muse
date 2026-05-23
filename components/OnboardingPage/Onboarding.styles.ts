import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 📱 반응형 기준점 (iPhone 14/15 기준)
const DESIGN_WIDTH = 393;

/**
 * 📏 제한 없는 반응형 사이즈 계산
 * 기기 너비(SCREEN_WIDTH)가 커지는 만큼 요소도 100% 비례해서 커집니다.
 * 아이패드에서도 폰 화면의 비율을 그대로 유지합니다.
 */
const getResponsiveSize = (size: number) => {
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  return size * scale; 
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentWrapper: {
    flex: 1, 
    justifyContent: 'center', // 세로 중앙
    alignItems: 'center',     // 가로 중앙
    position: 'relative',
  },

  // 🔷 로고 그룹: 이제 리본과 똑같이 제한 없이 커집니다.
  logoGroup: {
    position: 'absolute', 
    zIndex: 10,
    width: getResponsiveSize(198.33),
    height: getResponsiveSize(155.75),
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainLogo: {
    width: '100%',
    height: '100%',
  },

  // 🎀 리본: 화면 너비 비율에 맞춰 끝까지 확장됩니다.
  ribbon: {
    position: 'absolute',
    zIndex: 1,
    width: getResponsiveSize(505),
    height: getResponsiveSize(401),
  },
});