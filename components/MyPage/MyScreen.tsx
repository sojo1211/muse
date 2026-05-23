import React from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

// ── 데이터 ────────────────────────────────────────────────────

const MENU_ITEMS = [
  '예매 내역',
  '취소 환불 내역',
  '푸시알림 설정',
  '뮤즈 파티 초대장 보관함',
  '뮤즈 디지털 티켓 보관함',
];

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function MyHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={ms.headerWrap}>
      <TouchableOpacity style={ms.backBtn} onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Image
          source={require('../../assets/images/Research/left.png')}
          style={ms.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={ms.headerTitle}>마이 페이지</Text>
    </View>
  );
}

function ProfileBanner() {
  return (
    <View style={ms.profileBanner} />
  );
}

function LoginButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={ms.loginBtn} onPress={onPress} activeOpacity={0.7}>
      <Text style={ms.loginTxt}>로그인하기</Text>
    </TouchableOpacity>
  );
}

function MenuList() {
  return (
    <View style={ms.menuWrap}>
      {MENU_ITEMS.map((item, i) => (
        <TouchableOpacity key={i} style={ms.menuRow} activeOpacity={0.7}>
          <Text style={ms.menuTxt}>{item}</Text>
          <View style={ms.divider} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── NAV_TABS ─────────────────────────────────────────────────

const NAV_TABS = [
  { label: '홈',    on: require('../../assets/images/Tabbar/homeon.png'),   off: require('../../assets/images/Tabbar/homeoff.png') },
  { label: '검색',  on: require('../../assets/images/Tabbar/research.png'), off: require('../../assets/images/Tabbar/research.png') },
  { label: '패키지', on: require('../../assets/images/Tabbar/ppon.png'),   off: require('../../assets/images/Tabbar/pp.png') },
  { label: '마이',   on: require('../../assets/images/Tabbar/myon.png'),   off: require('../../assets/images/Tabbar/myoff.png') },
];

function BottomNav({ active, onChange }: { active: number; onChange: (i: number) => void }) {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  const androidFillHeight = isAndroid ? Math.max(insets.bottom, s(20)) : 0;
  return (
    <View>
      <View style={[ms.navbar, { paddingBottom: isAndroid ? s(8) : insets.bottom || s(20) }]}>
        {NAV_TABS.map((n, i) => (
          <TouchableOpacity key={i} style={ms.navItem} onPress={() => onChange(i)}>
            <Image source={active === i ? n.on : n.off} style={ms.navIcon} resizeMode="contain" />
            <Text style={[ms.navLabel, active === i && ms.navLabelOn]}>{n.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isAndroid && <View style={[ms.androidBottomFill, { height: androidFillHeight }]} />}
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface MyScreenProps {
  onBack: () => void;
  onLoginPress: () => void;
  activeNav: number;
  onNavChange: (i: number) => void;
}

export default function MyScreen({ onBack, onLoginPress, activeNav, onNavChange }: MyScreenProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={ms.root} edges={['top', 'left', 'right']}>
        <MyHeader onBack={onBack} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          contentContainerStyle={ms.scrollContent}
        >
          <ProfileBanner />
          <LoginButton onPress={onLoginPress} />
          <MenuList />
        </ScrollView>
        <BottomNav active={activeNav} onChange={onNavChange} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const ms = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: s(52),
    paddingHorizontal: s(20),
  },
  backBtn: { position: 'absolute', left: s(20) },
  backIcon: { width: s(24), height: s(24) },
  headerTitle: {
    fontSize: s(17),
    fontWeight: '600',
    color: '#1E1E1E',
  },

  scrollContent: { paddingBottom: s(32) },

  profileBanner: {
    width: s(372),
    height: s(77),
    backgroundColor: '#D9D9D9',
    borderRadius: s(12),
    alignSelf: 'center',
    marginTop: s(16),
    marginBottom: s(20),
  },

  loginBtn: {
    width: s(372),
    height: s(47),
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: s(6),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(24),
  },
  loginTxt: {
    fontSize: s(14),
    fontWeight: '500',
    color: '#000',
  },

  menuWrap: { paddingHorizontal: s(28) },
  menuRow: { paddingVertical: s(16) },
  menuTxt: { fontSize: s(14), fontWeight: '500', color: '#000', marginBottom: s(16) },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#979797' },

  navbar: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#D9D9D9',
    backgroundColor: '#fff',
    paddingTop: s(10),
    paddingHorizontal: s(8),
  },
  navItem: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: s(4), paddingVertical: s(2) },
  navIcon: { width: s(26), height: s(26) },
  navLabel: { fontSize: s(10), color: '#888' },
  navLabelOn: { color: '#1E1E1E', fontWeight: '700' },
  androidBottomFill: { width: '100%', backgroundColor: '#000' },
});
