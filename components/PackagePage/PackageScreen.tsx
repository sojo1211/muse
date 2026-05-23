import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AndroidBottomFill from '../common/AndroidBottomFill';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

// ── 데이터 ────────────────────────────────────────────────────

const OCCASION_TABS = ['전체', '기념일', '프로포즈', '생일', '첫 데이트'];

const PACKAGE_DATA = [
  {
    id: 1,
    title: '오페라의 유령\n로맨틱 이브닝',
    desc: '블루스퀘어 마스터카드홀',
    includes: ['🎭 공연 티켓', '🌹 꽃다발', '🍽 레스토랑'],
    tags: ['기념일', '프로포즈'],
    price: '298,000',
    badge: 'BEST',
    badgeColor: '#C9A96E',
  },
  {
    id: 2,
    title: '레미제라블\n스페셜 나잇',
    desc: '샤롯데씨어터',
    includes: ['🎭 공연 티켓', '💐 꽃바구니', '🍷 와인 디너'],
    tags: ['기념일', '생일'],
    price: '245,000',
    badge: 'NEW',
    badgeColor: '#57677D',
  },
  {
    id: 3,
    title: '위키드\n프로포즈 패키지',
    desc: '예술의전당 오페라극장',
    includes: ['🎭 공연 티켓', '💍 이벤트 세팅', '🌹 장미 100송이', '🍽 레스토랑'],
    tags: ['프로포즈'],
    price: '498,000',
    badge: 'HOT',
    badgeColor: '#E05C5C',
  },
  {
    id: 4,
    title: '맘마미아\n생일 서프라이즈',
    desc: '디큐브아트센터',
    includes: ['🎭 공연 티켓', '🎂 케이크', '🌸 꽃다발'],
    tags: ['생일', '첫 데이트'],
    price: '178,000',
    badge: '',
    badgeColor: '',
  },
];

const HOW_DATA = [
  { step: '01', icon: '🎁', title: '패키지 선택', desc: '원하는 공연과\n이벤트 구성 선택' },
  { step: '02', icon: '📅', title: '날짜 예약', desc: '공연 날짜에 맞춰\n레스토랑·꽃 일정 확정' },
  { step: '03', icon: '✨', title: '당일 이벤트', desc: '모든 것이 준비된\n완벽한 하루' },
];

const NAV_TABS = [
  { label: '홈',    on: require('../../assets/images/Tabbar/homeon.png'),   off: require('../../assets/images/Tabbar/homeoff.png') },
  { label: '검색',  on: require('../../assets/images/Tabbar/research.png'), off: require('../../assets/images/Tabbar/research.png') },
  { label: '패키지', on: require('../../assets/images/Tabbar/ppon.png'),    off: require('../../assets/images/Tabbar/pp.png') },
  { label: '마이',  on: require('../../assets/images/Tabbar/myon.png'),     off: require('../../assets/images/Tabbar/myoff.png') },
];

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function Header() {
  return (
    <View style={pk.header}>
      <Image
        source={require('../../assets/images/Home/LOGO_black.png')}
        style={[pk.headerLogo, { tintColor: '#FFB3B3' }]}
        resizeMode="contain"
      />
      <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Image
          source={require('../../assets/images/Home/shoppingcart.png')}
          style={pk.cartIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

function HeroBanner() {
  return (
    <View style={pk.heroBanner}>
      <View style={pk.heroTextWrap}>
        <Text style={pk.heroSub}>특별한 날을 완성하는</Text>
        <Text style={pk.heroTitle}>{'뮤즈 데이트\n패키지'}</Text>
        <Text style={pk.heroDesc}>{'공연 · 꽃다발 · 레스토랑\n한 번의 예약으로 완벽하게'}</Text>
        <TouchableOpacity style={pk.heroBtn} activeOpacity={0.85}>
          <Text style={pk.heroBtnTxt}>패키지 둘러보기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function OccasionTabs({ active, onPress }: { active: number; onPress: (i: number) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}
      style={{ marginBottom: s(24) }}
      contentContainerStyle={{ gap: s(8), paddingHorizontal: s(20) }}
    >
      {OCCASION_TABS.map((tab, i) => (
        <TouchableOpacity
          key={i}
          style={[pk.occasionTab, active === i && pk.occasionTabOn]}
          onPress={() => onPress(i)}
        >
          <Text style={[pk.occasionTabTxt, active === i && pk.occasionTabTxtOn]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function HowItWorks() {
  const stepAnims = useRef(HOW_DATA.map(() => new Animated.Value(0))).current;
  const lineAnims = useRef(HOW_DATA.slice(0, -1).map(() => new Animated.Value(0))).current;
  const pulseAnims = useRef(HOW_DATA.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    // 스텝 순차 등장
    Animated.stagger(220, stepAnims.map(anim =>
      Animated.spring(anim, { toValue: 1, tension: 65, friction: 8, useNativeDriver: true })
    )).start();

    // 연결선 페이드인
    lineAnims.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: 1, duration: 280, delay: 320 + i * 220, useNativeDriver: true,
      }).start();
    });

    // 아이콘 펄스 루프
    pulseAnims.forEach((anim, i) => {
      Animated.sequence([
        Animated.delay(600 + i * 350),
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, { toValue: 1.2, duration: 550, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 1, duration: 550, useNativeDriver: true }),
            Animated.delay(1800),
          ])
        ),
      ]).start();
    });
  }, []);

  return (
    <View style={pk.howSection}>
      <Text style={pk.howTitle}>이렇게 진행돼요</Text>
      <View style={pk.howRow}>
        {HOW_DATA.map((item, i) => {
          const opacity = stepAnims[i].interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
          const translateY = stepAnims[i].interpolate({ inputRange: [0, 1], outputRange: [s(18), 0] });
          const scale = stepAnims[i].interpolate({ inputRange: [0, 0.6, 1], outputRange: [0.75, 1.05, 1] });

          return (
            <React.Fragment key={i}>
              <Animated.View style={[pk.howItem, { opacity, transform: [{ translateY }, { scale }] }]}>
                <Animated.View style={[pk.howIconWrap, { transform: [{ scale: pulseAnims[i] }] }]}>
                  <Text style={pk.howIcon}>{item.icon}</Text>
                </Animated.View>
                <Text style={pk.howStep}>{item.step}</Text>
                <Text style={pk.howItemTitle}>{item.title}</Text>
                <Text style={pk.howItemDesc}>{item.desc}</Text>
              </Animated.View>
              {i < HOW_DATA.length - 1 && (
                <Animated.View style={[pk.howArrow, { opacity: lineAnims[i] }]} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

function PackageCard({ item }: { item: typeof PACKAGE_DATA[0] }) {
  return (
    <TouchableOpacity style={pk.card} activeOpacity={0.9}>
      {/* 이미지 영역 */}
      <View style={pk.cardImg}>
        {item.badge !== '' && (
          <View style={[pk.badge, { backgroundColor: item.badgeColor }]}>
            <Text style={pk.badgeTxt}>{item.badge}</Text>
          </View>
        )}
        {/* 포함 태그 오버레이 */}
        <View style={pk.includesOverlay}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
            contentContainerStyle={{ gap: s(4) }}
          >
            {item.includes.map((inc, i) => (
              <View key={i} style={pk.includeChip}>
                <Text style={pk.includeChipTxt}>{inc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* 텍스트 영역 */}
      <View style={pk.cardBody}>
        <View style={pk.cardTagRow}>
          {item.tags.map((tag, i) => (
            <View key={i} style={pk.cardTag}>
              <Text style={pk.cardTagTxt}>{tag}</Text>
            </View>
          ))}
        </View>
        <Text style={pk.cardTitle}>{item.title}</Text>
        <Text style={pk.cardVenue}>{item.desc}</Text>
        <View style={pk.cardBottom}>
          <Text style={pk.cardPriceLabel}>1인 기준</Text>
          <Text style={pk.cardPrice}>₩ {item.price}~</Text>
          <TouchableOpacity style={pk.bookBtn} activeOpacity={0.85}>
            <Text style={pk.bookBtnTxt}>예약하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function PackageList({ activeTab }: { activeTab: number }) {
  const filtered = activeTab === 0
    ? PACKAGE_DATA
    : PACKAGE_DATA.filter(p => p.tags.includes(OCCASION_TABS[activeTab]));

  return (
    <View style={{ paddingHorizontal: s(20), gap: s(20) }}>
      {filtered.map(item => <PackageCard key={item.id} item={item} />)}
    </View>
  );
}

function BottomNav({ active, onChange }: { active: number; onChange: (i: number) => void }) {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  return (
    <View>
      <View style={[pk.navbar, { paddingBottom: isAndroid ? s(8) : insets.bottom || s(20) }]}>
        {NAV_TABS.map((n, i) => (
          <TouchableOpacity key={i} style={pk.navItem} onPress={() => onChange(i)}>
            <Image source={active === i ? n.on : n.off} style={pk.navIcon} resizeMode="contain" />
            <Text style={[pk.navLabel, active === i && pk.navLabelOn]}>{n.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <AndroidBottomFill />
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface PackageScreenProps {
  activeNav: number;
  onNavChange: (i: number) => void;
}

export default function PackageScreen({ activeNav, onNavChange }: PackageScreenProps) {
  const [occasionTab, setOccasionTab] = useState(0);

  return (
    <SafeAreaView style={pk.root} edges={['top', 'left', 'right']}>
        <Header />
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          contentContainerStyle={{ paddingBottom: s(40) }}
        >
          <HeroBanner />
          <HowItWorks />
          <OccasionTabs active={occasionTab} onPress={setOccasionTab} />
          <PackageList activeTab={occasionTab} />
        </ScrollView>
        <BottomNav active={activeNav} onChange={onNavChange} />
      </SafeAreaView>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const pk = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(20),
    paddingTop: s(8),
    paddingBottom: s(10),
  },
  headerLogo: { width: s(68), height: s(28) },
  cartIcon: { width: s(24), height: s(24) },

  // 히어로 배너
  heroBanner: {
    height: s(220),
    backgroundColor: '#F9EEF2',
    marginHorizontal: s(13),
    borderRadius: s(16),
    marginBottom: s(28),
    justifyContent: 'flex-end',
    padding: s(24),
    overflow: 'hidden',
  },
  heroTextWrap: { gap: s(6) },
  heroSub: { fontSize: s(12), fontWeight: '500', color: '#C9A96E', letterSpacing: 0.5 },
  heroTitle: { fontSize: s(26), fontWeight: '800', color: '#1E1E1E', lineHeight: s(34) },
  heroDesc: { fontSize: s(13), fontWeight: '400', color: '#979797', lineHeight: s(20) },
  heroBtn: {
    marginTop: s(8),
    alignSelf: 'flex-start',
    backgroundColor: '#57677D',
    borderRadius: s(20),
    paddingHorizontal: s(16),
    paddingVertical: s(8),
  },
  heroBtnTxt: { fontSize: s(13), fontWeight: '600', color: '#fff' },

  // 이용방법
  howSection: {
    marginHorizontal: s(20),
    marginBottom: s(28),
    backgroundColor: '#F9F9F9',
    borderRadius: s(16),
    padding: s(20),
  },
  howTitle: { fontSize: s(14), fontWeight: '700', color: '#1E1E1E', marginBottom: s(16) },
  howRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  howItem: { flex: 1, alignItems: 'center', gap: s(4), position: 'relative' },
  howIconWrap: { width: s(44), height: s(44), borderRadius: s(22), backgroundColor: '#FDF0F4', alignItems: 'center', justifyContent: 'center' },
  howIcon: { fontSize: s(22) },
  howStep: { fontSize: s(10), fontWeight: '700', color: '#C9A96E' },
  howItemTitle: { fontSize: s(12), fontWeight: '700', color: '#1E1E1E', textAlign: 'center' },
  howItemDesc: { fontSize: s(10), fontWeight: '400', color: '#979797', textAlign: 'center', lineHeight: s(14) },
  howArrow: {
    position: 'absolute',
    top: s(12),
    right: -s(8),
    width: s(16),
    height: 1,
    backgroundColor: '#D9D9D9',
  },

  // 탭
  occasionTab: {
    paddingHorizontal: s(16),
    paddingVertical: s(7),
    borderRadius: s(20),
    backgroundColor: '#F4F4F4',
  },
  occasionTabOn: { backgroundColor: '#57677D' },
  occasionTabTxt: { fontSize: s(13), fontWeight: '500', color: '#979797' },
  occasionTabTxtOn: { color: '#fff', fontWeight: '600' },

  // 패키지 카드
  card: {
    borderRadius: s(16),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardImg: {
    width: '100%',
    height: s(180),
    backgroundColor: '#E8E0EC',
    justifyContent: 'flex-end',
  },
  badge: {
    position: 'absolute',
    top: s(12),
    left: s(12),
    borderRadius: s(4),
    paddingHorizontal: s(8),
    paddingVertical: s(3),
  },
  badgeTxt: { fontSize: s(11), fontWeight: '700', color: '#fff' },
  includesOverlay: {
    backgroundColor: 'rgba(0,0,0,0.32)',
    paddingHorizontal: s(12),
    paddingVertical: s(10),
  },
  includeChip: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: s(20),
    paddingHorizontal: s(10),
    paddingVertical: s(4),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  includeChipTxt: { fontSize: s(11), fontWeight: '600', color: '#fff' },

  cardBody: { padding: s(16), gap: s(6) },
  cardTagRow: { flexDirection: 'row', gap: s(6) },
  cardTag: {
    backgroundColor: '#FDF0F4',
    borderRadius: s(4),
    paddingHorizontal: s(8),
    paddingVertical: s(2),
  },
  cardTagTxt: { fontSize: s(11), fontWeight: '600', color: '#C9607A' },
  cardTitle: { fontSize: s(17), fontWeight: '700', color: '#1E1E1E', lineHeight: s(24) },
  cardVenue: { fontSize: s(12), fontWeight: '400', color: '#979797' },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(8),
    gap: s(6),
  },
  cardPriceLabel: { fontSize: s(11), color: '#979797', fontWeight: '400' },
  cardPrice: { flex: 1, fontSize: s(16), fontWeight: '800', color: '#57677D' },
  bookBtn: {
    backgroundColor: '#57677D',
    borderRadius: s(20),
    paddingHorizontal: s(18),
    paddingVertical: s(8),
  },
  bookBtnTxt: { fontSize: s(13), fontWeight: '600', color: '#fff' },

  // 하단 탭
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
  navLabel: { fontSize: s(10), color: '#888', fontWeight: '500' },
  navLabelOn: { color: '#1E1E1E', fontWeight: '700' },
  androidFill: { width: '100%', backgroundColor: '#000' },
});
