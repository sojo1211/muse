import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

// ── 데이터 ────────────────────────────────────────────────────

const CATEGORY_CHIPS = [
  '#이번주 뭐하지?',
  '#가족과 함께',
  '#연인과 함께',
  '#나만의 뮤즈로 떠나는 여행',
  '#너의 뮤즈는?',
];

const HOT_DATA = [
  { rank: 1,  title: '가면 무도회',          change: 'NEW' },
  { rank: 2,  title: '고양이의 보은',         change: '▲3' },
  { rank: 3,  title: '뮤지컬<비틀쥬스>',      change: '▼2' },
  { rank: 4,  title: '쿠푸왕의 피리미드',      change: '—' },
  { rank: 5,  title: '오페라의 유령',          change: '▲1' },
  { rank: 6,  title: '레미제라블',            change: '▼1' },
  { rank: 7,  title: '맘마미아',             change: 'NEW' },
  { rank: 8,  title: '위키드',              change: '▲2' },
  { rank: 9,  title: '시카고',              change: '▼3' },
  { rank: 10, title: '캣츠',               change: '—' },
];

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function SearchHeader({ onBack }: { onBack: () => void }) {
  return (
    <View style={ss.headerRow}>
      <TouchableOpacity onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Image
          source={require('../../assets/images/Research/left.png')}
          style={ss.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={ss.searchBox}>
        <Image
          source={require('../../assets/images/Home/research.png')}
          style={ss.searchIcon}
          resizeMode="contain"
        />
        <TextInput
          style={ss.searchInput}
          placeholder="일상의 순간을 예술로 채우다, 뮤즈"
          placeholderTextColor="#BDB3B3"
          autoFocus
        />
      </View>
    </View>
  );
}

function RecommendCategories() {
  return (
    <View style={ss.section}>
      <Text style={ss.sectionTitle}>추천 카테고리</Text>
      <View style={ss.chipWrap}>
        {CATEGORY_CHIPS.map((chip, i) => (
          <TouchableOpacity key={i} style={ss.chip}>
            <Text style={ss.chipTxt}>{chip}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function ChangeIndicator({ value }: { value: string }) {
  if (value === 'NEW') {
    return <Text style={ss.changeNew}>NEW</Text>;
  }
  if (value.startsWith('▲')) {
    return <Text style={ss.changeUp}>{value}</Text>;
  }
  if (value.startsWith('▼')) {
    return <Text style={ss.changeDown}>{value}</Text>;
  }
  return <Text style={ss.changeSame}>{value}</Text>;
}

function HotRankItem({ item }: { item: typeof HOT_DATA[0] }) {
  const isTop3 = item.rank <= 3;
  return (
    <View style={ss.rankRow}>
      <View style={ss.thumbnail} />
      <Text style={[ss.rankNum, !isTop3 && ss.rankNumGray]}>{item.rank}</Text>
      <Text style={ss.rankTitle} numberOfLines={1}>{item.title}</Text>
      <ChangeIndicator value={item.change} />
    </View>
  );
}

function HotRankingSection() {
  return (
    <View style={ss.section}>
      <View style={ss.hotTitleRow}>
        <Text style={ss.sectionTitle}>실시간 HOT!</Text>
        <Text style={ss.timestamp}>2026.02.23 15:30 기준</Text>
      </View>
      {HOT_DATA.map((item) => (
        <HotRankItem key={item.rank} item={item} />
      ))}
    </View>
  );
}

// ── NAV_TABS (BottomNav 공유용) ───────────────────────────────

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
      <View style={[ss.navbar, { paddingBottom: isAndroid ? s(8) : insets.bottom || s(20) }]}>
        {NAV_TABS.map((n, i) => (
          <TouchableOpacity key={i} style={ss.navItem} onPress={() => onChange(i)}>
            <Image source={active === i ? n.on : n.off} style={ss.navIcon} resizeMode="contain" />
            <Text style={[ss.navLabel, active === i && ss.navLabelOn]}>{n.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {isAndroid && <View style={[ss.androidBottomFill, { height: androidFillHeight }]} />}
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface SearchScreenProps {
  onBack: () => void;
  activeNav: number;
  onNavChange: (i: number) => void;
}

export default function SearchScreen({ onBack, activeNav, onNavChange }: SearchScreenProps) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={ss.root} edges={['top', 'left', 'right']}>
        <SearchHeader onBack={onBack} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
        >
          <RecommendCategories />
          <HotRankingSection />
        </ScrollView>
        <BottomNav active={activeNav} onChange={onNavChange} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const ss = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingHorizontal: s(13),
    paddingVertical: s(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E5E5',
  },
  backIcon: { width: s(22), height: s(22) },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    backgroundColor: '#D9D9D9',
    borderRadius: s(12),
    paddingHorizontal: s(14),
    height: s(39),
  },
  searchIcon: { width: s(18), height: s(18) },
  searchInput: {
    flex: 1,
    fontSize: s(13),
    color: '#222',
    paddingVertical: 0,
  },

  section: { paddingHorizontal: s(20), paddingTop: s(24) },
  sectionTitle: { fontSize: s(20), fontWeight: '700', color: '#000', marginBottom: s(14) },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: s(8) },
  chip: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: s(20),
    paddingHorizontal: s(14),
    paddingVertical: s(7),
  },
  chipTxt: { fontSize: s(13), color: '#333' },

  hotTitleRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: s(14) },
  timestamp: { fontSize: s(11), color: '#B2A3A3', marginBottom: s(2) },

  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    paddingVertical: s(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F0F0F0',
  },
  thumbnail: {
    width: s(40),
    height: s(40),
    backgroundColor: '#D9D9D9',
    borderRadius: s(6),
  },
  rankNum: { width: s(20), fontSize: s(15), fontWeight: '700', color: '#000', textAlign: 'center' },
  rankNumGray: { color: '#B2A3A3' },
  rankTitle: { flex: 1, fontSize: s(14), color: '#1E1E1E' },

  changeNew: { fontSize: s(11), color: '#FF4B4B', fontWeight: '700', minWidth: s(28), textAlign: 'right' },
  changeUp:  { fontSize: s(11), color: '#FF4B4B', minWidth: s(28), textAlign: 'right' },
  changeDown:{ fontSize: s(11), color: '#4B8BFF', minWidth: s(28), textAlign: 'right' },
  changeSame:{ fontSize: s(11), color: '#B2A3A3', minWidth: s(28), textAlign: 'right' },

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
