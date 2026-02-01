import { Dimensions, StyleSheet } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// =========================
// 📐 Figma 기준 (iPhone 14/15)
// =========================
const FIGMA_WIDTH = 393;
const FIGMA_HEIGHT = 852;

// =========================
// 📏 Scale 함수
// =========================
export const scale = (size: number) =>
  (SCREEN_WIDTH / FIGMA_WIDTH) * size;

export const verticalScale = (size: number) =>
  (SCREEN_HEIGHT / FIGMA_HEIGHT) * size;

// =========================
// 📱 레이아웃 상수
// =========================
const isTablet = SCREEN_WIDTH >= 768;
export const MAX_CONTENT_WIDTH = 430;

export const NY_IMAGE_WIDTH = scale(150);
export const NY_IMAGE_HEIGHT = scale(348);

// =========================
// 🎨 Styles
// =========================
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  contentWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: MAX_CONTENT_WIDTH,
    alignItems: 'center',
    position: 'relative',
  },

  // =========================
  // 🔷 로고 그룹
  // =========================
  logoGroup: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.305,
    alignSelf: 'center',
    width: Math.min(scale(198.33), 240),
    height: Math.min(scale(155.75), 190),
  },

  // =========================
  // 🚩 국기
  // =========================
  flagIcon: {
    position: 'absolute',
    left: '50%',
    top: 0,
    marginLeft: scale(100) - scale(198.33) / 2,
    width: Math.min(scale(77.33), 90),
    height: Math.min(scale(77.33), 90),
    resizeMode: 'contain',
    transform: [{ rotate: '20.56deg' }],
    zIndex: 2,
  },

  // =========================
  // 🏷 메인 로고
  // =========================
  mainLogo: {
    marginTop: verticalScale(64),
    width: Math.min(scale(180), 220),
    height: Math.min(verticalScale(92), 110),
    resizeMode: 'contain',
  },

  // =========================
// =========================
  // 🎀 리본 (반응형 보정)
  // =========================
  ribbon: {
    position: 'absolute',
    
    // 1. 세로 위치: Figma 기준 verticalScale 사용
    top: verticalScale(130), 
    
    // 2. 가로 위치: 절대값(left) 대신 중앙 정렬 로직 사용
    // 아이패드/안드로이드 모든 기종에서 중앙을 유지합니다.
    alignSelf: 'center', 
    
    // 만약 중앙에서 약간 옆으로 비껴나야 한다면 
    // marginLeft: scale(偏移값)을 추가해 미세조정 하세요.
    
    // 3. 크기 반응형
    width: scale(505),
    height: scale(401),
    
    resizeMode: 'contain',
    zIndex: 3,
  },

  // =========================
  // 🗽 랜드마크 이미지
  // =========================
  bottomImage: {
    width: NY_IMAGE_WIDTH,
    height: NY_IMAGE_HEIGHT,
    maxWidth: 200,
    maxHeight: 450,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
  },

  // =========================
  // 🌊 마스크 영역
  // =========================
  bottomImageMask: {
    position: 'absolute',
    left: isTablet ? -((SCREEN_WIDTH - MAX_CONTENT_WIDTH) / 2) : 0,
    bottom: 0,
    width: NY_IMAGE_WIDTH,
    overflow: 'hidden',
  },
});
