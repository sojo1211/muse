import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchScreen from '../SearchPage/SearchScreen';
import MyScreen from '../MyPage/MyScreen';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

const CARD_W = (SW - s(24) * 2 - s(17)) / 2;
const CARD_H = CARD_W * (193 / 163);
const RANK_CARD_W = s(163);
const RANK_CARD_H = s(193);
const RANK_PAD = SW - RANK_CARD_W * 2 - s(17) * 2;
const MENU_W = (SW - s(15) * 2 - s(10) * 3) / 4;
const BANNER_COUNT = 10;
const BANNER_PAD = s(13);
const BANNER_PEEK = s(20);
const BANNER_GAP = s(10);
const BANNER_W = SW - BANNER_PAD * 2 - BANNER_PEEK;

// ── 데이터 ────────────────────────────────────────────────────

const RANK_TABS = ['뮤지컬', '연극', '클래식/무용', '전시/행사', '콘서트', '아동/가족'];
const DATE_TABS = ['뮤지컬', '연극', '클래식/무용', '전시/행사', '대학로 공연'];

const RANK_DATA = [
  { rank: 1, title: '가면 무도회', venue: '문화비축기지', date: '2025.3.27 ~ 2026.3.2' },
  { rank: 2, title: '고양이의 보은', venue: '파라다이스시티', date: '2025.3.27 ~ 2026.3.2' },
  { rank: 3, title: '뮤지컬<비틀쥬스>', venue: '세종대학교 대강당', date: '2025.4.01 ~ 2025.6.30' },
  { rank: 4, title: '쿠푸왕의 피리미드', venue: '코엑스아티움 우리은행홀', date: '2025.5.10 ~ 2025.8.31' },
  { rank: 5, title: '오페라의 유령', venue: '블루스퀘어 마스터카드홀', date: '2025.6.01 ~ 2025.9.30' },
  { rank: 6, title: '레미제라블', venue: '샤롯데씨어터', date: '2025.6.15 ~ 2025.10.31' },
  { rank: 7, title: '맘마미아', venue: '디큐브아트센터', date: '2025.7.01 ~ 2025.11.30' },
  { rank: 8, title: '위키드', venue: '예술의전당 오페라극장', date: '2025.7.20 ~ 2025.12.31' },
  { rank: 9, title: '시카고', venue: '충무아트센터 대극장', date: '2025.8.01 ~ 2026.1.31' },
  { rank: 10, title: '캣츠', venue: '세종문화회관 대극장', date: '2025.9.01 ~ 2026.2.28' },
];

const PARTY_DATA = [
  { title: '가면 무도회', venue: '문화비축기지' },
  { title: '고양이의 보은', venue: '파라다이스시티' },
  { title: '뮤지컬<비틀쥬스>', venue: '세종대학교 대강당' },
  { title: '쿠푸왕의 피리미드', venue: '코엑스아티움' },
];

const DATE_DATA = [
  { title: '가면 무도회', venue: '문화비축기지' },
  { title: '고양이의 보은', venue: '파라다이스시티' },
  { title: '뮤지컬<비틀쥬스>', venue: '세종대학교 대강당' },
  { title: '쿠푸왕의 피리미드', venue: '코엑스아티움' },
];

// ── 공통 UI ───────────────────────────────────────────────────

function GrayBox({ width, height, radius = 12, color = '#D9D9D9' }: {
  width: number; height: number; radius?: number; color?: string;
}) {
  return <View style={{ width, height, backgroundColor: color, borderRadius: s(radius) }} />;
}

function SectionTitle({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: s(14) }}>
      <Image
        source={require('../../assets/images/Home/LOGO_black.png')}
        style={{ width: s(46), height: s(19) }}
        resizeMode="contain"
      />
      <Text style={st.secTitleTxt}> {text}</Text>
    </View>
  );
}

function TabBar({ tabs, active, onPress, pad = 0 }: {
  tabs: string[]; active: number; onPress: (i: number) => void; pad?: number;
}) {
  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator={false}
      overScrollMode="never"
      bounces={false}
      style={{ width: SW, marginBottom: s(14) }}
      contentContainerStyle={{ gap: s(4), paddingLeft: pad, paddingRight: s(6) }}
    >
      {tabs.map((t, i) => (
        <TouchableOpacity key={i} style={[st.tab, active === i && st.tabOn]} onPress={() => onPress(i)}>
          <Text style={[st.tabTxt, active === i && st.tabTxtOn]}>{t}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function CardGrid({ data }: { data: { title: string; venue: string }[] }) {
  return (
    <View style={st.grid}>
      {data.map((item, i) => (
        <TouchableOpacity key={i} style={{ width: CARD_W, marginBottom: s(4) }}>
          <GrayBox width={CARD_W} height={CARD_H} />
          <Text style={st.cardTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={st.cardVenue} numberOfLines={1}>{item.venue}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

// ── 섹션 컴포넌트 ─────────────────────────────────────────────

function StickyHeader({ isScrolled, onSearchPress }: { isScrolled: boolean; onSearchPress: () => void }) {
  if (isScrolled) {
    return (
      <View style={st.stickyCompact}>
        <TouchableOpacity style={[st.searchBox, { flex: 1 }]} onPress={onSearchPress} activeOpacity={0.8}>
          <Image
            source={require('../../assets/images/Home/research.png')}
            style={st.searchIcon}
            resizeMode="contain"
          />
          <Text style={st.searchPlaceholder}>당신의 뮤즈를 만나세요</Text>
        </TouchableOpacity>
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Image
            source={require('../../assets/images/Home/shoppingcart.png')}
            style={st.cartIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <View style={st.header}>
        <Image
          source={require('../../assets/images/Home/LOGO_black.png')}
          style={[st.headerLogo, { tintColor: '#FFB3B3' }]}
          resizeMode="contain"
        />
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Image
            source={require('../../assets/images/Home/shoppingcart.png')}
            style={st.cartIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View style={st.searchWrap}>
        <TouchableOpacity style={st.searchBox} onPress={onSearchPress} activeOpacity={0.8}>
          <Image
            source={require('../../assets/images/Home/research.png')}
            style={st.searchIcon}
            resizeMode="contain"
          />
          <Text style={st.searchPlaceholder}>당신의 뮤즈를 만나세요</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

function TopBanner() {
  return (
    <View style={{ paddingHorizontal: s(13), marginBottom: s(14) }}>
      <GrayBox width={SW - s(26)} height={s(154)} />
    </View>
  );
}

function MenuGrid() {
  const MENU_LABELS = ['뮤즈 커뮤니티', '뮤즈 플레이스', '뮤즈 트립', '뮤즈 파티'];
  return (
    <View style={st.menuRow}>
      {MENU_LABELS.map((label, i) => (
        <TouchableOpacity key={i} style={st.menuItem}>
          <GrayBox width={MENU_W} height={MENU_W * (85 / 70)} />
          <Text style={st.menuLabel}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function BannerCarousel() {
  const [bannerIdx, setBannerIdx] = useState(1);
  return (
    <View style={{ marginBottom: s(24), height: s(154) }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={BANNER_W + BANNER_GAP}
        snapToAlignment="start"
        overScrollMode="never"
        bounces={false}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        contentContainerStyle={{ paddingLeft: BANNER_PAD, paddingRight: BANNER_PAD, gap: BANNER_GAP }}
        onScroll={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / (BANNER_W + BANNER_GAP)) + 1;
          setBannerIdx(Math.min(Math.max(idx, 1), BANNER_COUNT));
        }}
        scrollEventThrottle={16}
      >
        {Array.from({ length: BANNER_COUNT }).map((_, i) => (
          <GrayBox key={i} width={BANNER_W} height={s(154)} />
        ))}
      </ScrollView>
      <View style={st.ageBadge}>
        <Text style={st.ageBadgeTxt}>{bannerIdx} / {BANNER_COUNT}</Text>
      </View>
    </View>
  );
}

function RankingSection() {
  const [rankTab, setRankTab] = useState(0);
  return (
    <>
      <View style={{ paddingHorizontal: s(24), marginBottom: s(4) }}>
        <SectionTitle text="랭킹" />
      </View>
      <TabBar tabs={RANK_TABS} active={rankTab} onPress={setRankTab} pad={s(13)} />
      <ScrollView
        horizontal
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={RANK_CARD_W + s(17)}
        snapToAlignment="start"
        overScrollMode="never"
        bounces={false}
        contentContainerStyle={{ paddingLeft: RANK_PAD, paddingRight: RANK_PAD, gap: s(17) }}
        style={{ marginBottom: s(24) }}
      >
        {RANK_DATA.map((item, i) => (
          <TouchableOpacity key={i} style={{ width: RANK_CARD_W }}>
            <View style={{ borderRadius: s(12), overflow: 'hidden' }}>
              <GrayBox width={RANK_CARD_W} height={RANK_CARD_H} radius={0} />
              {[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]].map(([dx,dy],idx) => (
                <Text key={idx} style={[st.rankNum, { left: s(6) + dx * s(1.5), bottom: dy * s(1.5) }]}>
                  {item.rank}
                </Text>
              ))}
            </View>
            <Text style={st.cardTitle}>{item.title}</Text>
            <Text style={st.cardVenue}>{item.venue}</Text>
            <Text style={st.cardDate}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}

function PartySection() {
  return (
    <View style={st.section}>
      <SectionTitle text="파티 추천 콘텐츠" />
      <CardGrid data={PARTY_DATA} />
      <TouchableOpacity style={st.viewAllBtn}>
        <Text style={st.viewAllTxt}>뮤즈 파티 전체보기</Text>
      </TouchableOpacity>
    </View>
  );
}

function DateSection() {
  const [dateTab, setDateTab] = useState(0);
  return (
    <View style={st.section}>
      <SectionTitle text="데이트 코스" />
      <TabBar tabs={DATE_TABS} active={dateTab} onPress={setDateTab} />
      <CardGrid data={DATE_DATA} />
    </View>
  );
}

function Footer({ onScrollTop }: { onScrollTop: () => void }) {
  return (
    <View style={st.footer}>
      <View style={st.footerTopRow}>
        <Image
          source={require('../../assets/images/Home/LOGO_gray.png')}
          style={st.footerLogo}
          resizeMode="contain"
        />
        <TouchableOpacity style={st.bizRow}>
          <Text style={st.footerGrayTxt}>사업자 정보</Text>
          <Image
            source={require('../../assets/images/Home/DOWN.png')}
            style={{ width: s(12), height: s(12), marginLeft: s(4) }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {['법적 고지사항', '파트너 지원', '고객 지원'].map((link, i) => (
        <TouchableOpacity key={i} style={{ marginBottom: s(8) }}>
          <Text style={st.footerGrayTxt}>{link}</Text>
        </TouchableOpacity>
      ))}

      <Text style={[st.footerGrayTxt, { marginTop: s(14), marginBottom: s(4) }]}>
        @ AII RIGHTS RESERVED
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: s(8) }}>
        <Text style={st.footerGrayTxt}>개인정보처리방침</Text>
        <Text style={[st.footerGrayTxt, { marginHorizontal: s(4) }]}> · </Text>
        <Text style={st.footerGrayTxt}>이용약관</Text>
        <Text style={[st.footerGrayTxt, { marginHorizontal: s(4) }]}> · </Text>
        <Text style={st.footerGrayTxt}>결제대행위탁사</Text>
      </View>

      <Text style={st.footerSmall}>
        일부 상품의 경우 주식회사 000은 통신판매의 당사자가 아닌 통신판매중개자로써 상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시길 바랍니다.
      </Text>

      <View style={st.snsRow}>
        <View style={{ flexDirection: 'row', gap: s(12), alignItems: 'center' }}>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Home/inst.png')} style={st.snsIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Home/you.png')} style={st.snsIcon} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../assets/images/Home/x.png')} style={st.snsIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={st.scrollUpBtn} onPress={onScrollTop}>
          <Image
            source={require('../../assets/images/Home/DOWN.png')}
            style={{ width: s(16), height: s(16), transform: [{ rotate: '180deg' }] }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const NAV_TABS = [
  { label: '홈',   on: require('../../assets/images/Tabbar/homeon.png'),   off: require('../../assets/images/Tabbar/homeoff.png') },
  { label: '검색', on: require('../../assets/images/Tabbar/research.png'), off: require('../../assets/images/Tabbar/research.png') },
  { label: '패키지', on: require('../../assets/images/Tabbar/ppon.png'),   off: require('../../assets/images/Tabbar/pp.png') },
  { label: '마이',  on: require('../../assets/images/Tabbar/myon.png'),    off: require('../../assets/images/Tabbar/myoff.png') },
];

function BottomNav({ active, onChange }: { active: number; onChange: (i: number) => void }) {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';

  // 갤럭시: 시스템 네비게이션 바 높이만큼 검은 블록이 채워야 하는 높이
  const androidFillHeight = isAndroid ? Math.max(insets.bottom, s(20)) : 0;

  return (
    <View>
      {/* 탭 아이콘 행 — 흰 배경 */}
      <View style={[st.navbar, { paddingBottom: isAndroid ? s(8) : insets.bottom || s(20) }]}>
        {NAV_TABS.map((n, i) => (
          <TouchableOpacity key={i} style={st.navItem} onPress={() => onChange(i)}>
            <Image source={active === i ? n.on : n.off} style={st.navIcon} resizeMode="contain" />
            <Text style={[st.navLabel, active === i && st.navLabelOn]}>{n.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 갤럭시 전용: 홈버튼 영역을 덮는 검은 블록 */}
      {isAndroid && <View style={[st.androidBottomFill, { height: androidFillHeight }]} />}
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

export default function MainScreen() {
  const [activeNav, setActiveNav] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  // 검색 탭: SearchScreen으로 전환
  if (activeNav === 1) {
    return (
      <SearchScreen
        onBack={() => setActiveNav(0)}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />
    );
  }

  // 마이 탭: MyScreen으로 전환
  if (activeNav === 3) {
    return (
      <MyScreen
        onBack={() => setActiveNav(0)}
        activeNav={activeNav}
        onNavChange={setActiveNav}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={st.root} edges={['top', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* ── 상단 고정 헤더 ── */}
        <StickyHeader isScrolled={isScrolled} onSearchPress={() => setActiveNav(1)} />

        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          onScroll={(e) => setIsScrolled(e.nativeEvent.contentOffset.y > 10)}
          scrollEventThrottle={16}
        >
          {/* ↓ 섹션 넣다 뺄 때 이 줄만 추가/삭제 */}
          <TopBanner />
          <MenuGrid />
          <BannerCarousel />
          <RankingSection />
          <PartySection />
          <DateSection />
          <Footer onScrollTop={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} />
        </ScrollView>

        <BottomNav active={activeNav} onChange={setActiveNav} />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ── 스타일 ───────────────────────────────────────────────────
const st = StyleSheet.create({
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

  searchWrap: { paddingLeft: s(34), paddingRight: s(13), marginBottom: s(12), backgroundColor: '#fff' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    backgroundColor: '#D9D9D9',
    borderRadius: s(12),
    paddingHorizontal: s(14),
    height: s(39),
    width: s(340),
  },
  searchIcon: { width: s(18), height: s(18) },
  searchInput: {
    flex: 1,
    fontSize: s(13),
    color: '#222',
    fontFamily: 'Inter_400Regular',
    paddingVertical: 0,
  },

  menuRow: {
    flexDirection: 'row',
    paddingHorizontal: s(15),
    justifyContent: 'space-between',
    marginTop: s(14),
    marginBottom: s(6),
  },
  menuItem: { width: MENU_W, alignItems: 'center', gap: s(6) },
  menuLabel: {
    fontSize: s(10),
    color: '#222',
    fontFamily: 'Inter_500Medium',
    textAlign: 'center',
    width: MENU_W,
  },

  ageBadge: {
    position: 'absolute',
    right: SW - BANNER_PAD - BANNER_W + s(12),
    bottom: s(10),
    backgroundColor: '#000',
    borderRadius: s(12),
    paddingHorizontal: s(10),
    paddingVertical: s(3),
  },
  ageBadgeTxt: { color: '#fff', fontSize: s(10), fontFamily: 'Inter_500Medium' },

  section: { paddingHorizontal: s(24), marginBottom: s(24) },
  secTitleTxt: { fontSize: s(20), fontFamily: 'Inter_700Bold', color: '#000' },

  tab: {
    paddingHorizontal: s(11),
    paddingVertical: s(5),
    borderRadius: s(12),
    backgroundColor: '#E3E3E3',
  },
  tabOn: { backgroundColor: '#000' },
  tabTxt: { fontSize: s(10), color: '#000', fontFamily: 'Inter_500Medium' },
  tabTxtOn: { color: '#fff' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: s(17) },

  rankNum: {
    position: 'absolute',
    bottom: 0,
    width: s(80),
    fontSize: s(64),
    fontStyle: 'italic',
    fontFamily: 'Inter_900Black',
    color: '#fff',
    textAlign: 'left',
  },

  cardTitle: {
    fontSize: s(12),
    fontFamily: 'Inter_600SemiBold',
    color: '#000',
    marginTop: s(4),
    lineHeight: s(22),
    textAlign: 'left',
  },
  cardVenue: {
    fontSize: s(12),
    color: '#BDB3B3',
    fontFamily: 'Inter_600SemiBold',
    lineHeight: s(22),
    textAlign: 'left',
  },
  cardDate: {
    fontSize: s(12),
    color: '#BDB3B3',
    fontFamily: 'Inter_600SemiBold',
    lineHeight: s(22),
    textAlign: 'left',
  },

  viewAllBtn: {
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: s(12),
    paddingVertical: s(10),
    alignItems: 'center',
    marginTop: s(8),
  },
  viewAllTxt: { fontSize: s(14), fontFamily: 'Inter_500Medium', color: '#000' },

  footer: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: s(20),
    paddingTop: s(28),
    paddingBottom: s(50),
  },
  footerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: s(20),
  },
  footerLogo: { width: s(52), height: s(22) },
  bizRow: { flexDirection: 'row', alignItems: 'center' },
  footerGrayTxt: { fontSize: s(13), color: '#979797', fontFamily: 'Inter_500Medium' },
  footerSmall: { fontSize: s(12), color: '#979797', fontFamily: 'Inter_500Medium', lineHeight: s(18) },
  snsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: s(20) },
  snsIcon: { width: s(24), height: s(24) },
  scrollUpBtn: {
    width: s(36),
    height: s(36),
    borderRadius: s(12),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

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
  navLabel: { fontSize: s(10), color: '#888', fontFamily: 'Inter_500Medium' },
  navLabelOn: { color: '#1E1E1E', fontFamily: 'Inter_700Bold' },
  androidBottomFill: {
    width: '100%',
    backgroundColor: '#000',
  },

  searchPlaceholder: {
    flex: 1,
    fontSize: s(13),
    color: '#BDB3B3',
    fontFamily: 'Inter_400Regular',
  },

  // 스크롤 시 압축 헤더
  stickyCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingHorizontal: s(13),
    paddingVertical: s(8),
    backgroundColor: '#fff',
  },
});
