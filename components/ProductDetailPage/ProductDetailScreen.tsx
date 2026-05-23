import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AndroidBottomFill from '../common/AndroidBottomFill';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

// ── 데이터 ────────────────────────────────────────────────────

const REVIEW_DATA = [
  { text: '옷 너무 이뻐요!!! 퀄리티도 넘 좋아용 은은하게 빤짝거리는 것두 맘에 들어요! 다른색도 샀어요 얼른 날 풀려서 입고...' },
  { text: '배송도 빠르고 핏도 정말 좋아요. 재구매 의사 100%! 친구한테도 추천했어요.' },
];

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function Header({ onBack, onHomePress, onSearchPress, onCartPress }: {
  onBack: () => void; onHomePress?: () => void; onSearchPress?: () => void; onCartPress?: () => void;
}) {
  return (
    <View style={pd.header}>
      <TouchableOpacity onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Image source={require('../../assets/images/Research/left.png')} style={pd.headerIcon} resizeMode="contain" />
      </TouchableOpacity>
      <View style={pd.headerRight}>
        <TouchableOpacity onPress={onHomePress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Image source={require('../../assets/images/Tabbar/homeoff.png')} style={pd.headerIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSearchPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Image source={require('../../assets/images/Home/research.png')} style={pd.headerIcon} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onCartPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Image source={require('../../assets/images/Home/shoppingcart.png')} style={pd.headerIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function StarIcon({ size = 16 }: { size?: number }) {
  return <Image source={require('../../assets/images/page/st.png')} style={{ width: s(size), height: s(size) }} resizeMode="contain" />;
}

function InfoSection() {
  return (
    <View style={pd.infoSection}>
      {/* 브랜드 + 공유 */}
      <View style={pd.brandRow}>
        <Text style={pd.brandTxt}>탑텐</Text>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Image source={require('../../assets/images/page/Share.png')} style={pd.shareIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* 상품명 */}
      <Text style={pd.productName}>[단독] 오션 와이드 데님 팬츠</Text>

      {/* 별점 */}
      <View style={pd.ratingRow}>
        <StarIcon size={14} />
        <Text style={pd.ratingTxt}>4.8 리뷰 90</Text>
        <View style={pd.ratingUnderline} />
      </View>

      {/* 정가 + 할인율 */}
      <Text style={pd.originalPrice}>21%  37,000</Text>

      {/* 할인가 */}
      <View style={pd.priceRow}>
        <Text style={pd.discountPrice}>34,110</Text>
        <Text style={pd.wonTxt}>원</Text>
      </View>

      {/* 태그 */}
      <View style={pd.tagWrap}>
        <View style={pd.tagChip}>
          <Text style={pd.tagTxt}>자체제작</Text>
        </View>
      </View>

      {/* 구분선 */}
      <View style={pd.thinDivider} />

      {/* 배송 정보 */}
      <View style={pd.shippingRow}>
        <Text style={pd.shippingLabel}>배송</Text>
        <View style={pd.shippingDetail}>
          <View style={pd.shippingTopRow}>
            <Text style={pd.shippingValue}>직진배송</Text>
            <View style={pd.shippingDot} />
            <Text style={pd.shippingFree}>무료배송</Text>
          </View>
          <Text style={pd.shippingDate}>05.28(수) 이내 판매자 발송 예정</Text>
        </View>
      </View>
    </View>
  );
}

function DetailTabs({ activeTab, onTabChange }: { activeTab: number; onTabChange: (i: number) => void }) {
  const TABS = ['상품정보', '리뷰 90'];
  return (
    <View style={pd.tabWrap}>
      {TABS.map((t, i) => (
        <TouchableOpacity key={i} style={[pd.tabItem, activeTab === i && pd.tabItemOn]} onPress={() => onTabChange(i)}>
          <Text style={[pd.tabTxt, activeTab === i && pd.tabTxtOn]}>{t}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function ProductInfoContent() {
  return (
    <View>
      {/* 상품 정보 이미지들 */}
      <View style={{ paddingHorizontal: s(20), marginTop: s(16) }}>
        <View style={[pd.infoImg, { height: s(198) }]} />
      </View>

      {[s(450), s(312), s(439), s(439)].map((h, i) => (
        <View key={i} style={{ paddingHorizontal: s(20), marginTop: s(16) }}>
          <View style={[pd.infoImg, { height: h }]} />
        </View>
      ))}

      {/* 상품정보 더 보기 */}
      <View style={{ alignItems: 'center', marginTop: s(20), marginBottom: s(20) }}>
        <TouchableOpacity style={pd.moreBtn}>
          <Text style={pd.moreBtnTxt}>상품정보 더 보기</Text>
          <View style={pd.moreArrow}>
            <View style={pd.moreArrowLine} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ReviewContent({ onReviewPress }: { onReviewPress?: () => void }) {
  return (
    <View style={{ paddingHorizontal: s(20) }}>
      {/* 리뷰 헤더 */}
      <View style={pd.reviewHeader}>
        <View>
          <View style={pd.reviewTitleRow}>
            <Text style={pd.reviewTitle}>리뷰</Text>
            <Text style={pd.reviewCount}>90</Text>
          </View>
        </View>
        <TouchableOpacity style={pd.viewAllRow} onPress={onReviewPress}>
          <Text style={pd.viewAllTxt}>전체보기</Text>
          <View style={pd.viewAllArrow}>
            <View style={pd.viewAllArrowLine} />
          </View>
        </TouchableOpacity>
      </View>

      {/* 별점 요약 */}
      <View style={pd.reviewSummary}>
        <StarIcon size={20} />
        <Text style={pd.reviewRatingBig}>4.8 / 5</Text>
      </View>
      <Text style={pd.reviewSizeTxt}>사이즈 : 정사이즈예요 (100%)</Text>

      {/* 리뷰 카드 (가로 스크롤) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        style={{ marginTop: s(14) }}
        contentContainerStyle={{ gap: s(10) }}
      >
        {REVIEW_DATA.map((r, i) => (
          <View key={i} style={pd.reviewCard}>
            <View style={pd.reviewImg} />
            <View style={pd.reviewTextBox}>
              <Text style={pd.reviewTxt} numberOfLines={3}>{r.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function BrandInfo() {
  return (
    <View style={{ alignItems: 'center', paddingVertical: s(20) }}>
      <Text style={pd.brandInfoTxt}>해당 브랜드 몰에서 정보를 확인하고 싶나요?</Text>
    </View>
  );
}

function BottomBar({ onCartPress }: { onCartPress?: () => void }) {
  const [wished, setWished] = useState(false);
  return (
    <View style={pd.bottomBar}>
      <View style={pd.bottomInner}>
        {/* 리뷰 정보 */}
        <View style={pd.bottomReview}>
          <StarIcon size={14} />
          <Text style={pd.bottomReviewTxt}>리뷰</Text>
          <Text style={pd.bottomReviewCount}>(75)</Text>
        </View>

        {/* 세로 구분선 */}
        <View style={pd.vertDivider} />

        {/* 찜 */}
        <TouchableOpacity style={pd.wishBtn} onPress={() => setWished(!wished)} activeOpacity={0.7}>
          <View style={[pd.heartIcon, wished && pd.heartIconOn]}>
            <View style={[pd.heartLine, wished && pd.heartLineOn]} />
          </View>
        </TouchableOpacity>

        {/* 구매하기 버튼 */}
        <TouchableOpacity style={pd.buyBtn} activeOpacity={0.85} onPress={onCartPress}>
          <Text style={pd.buyBtnTxt}>구매하기</Text>
        </TouchableOpacity>
      </View>
      <AndroidBottomFill />
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface ProductDetailScreenProps {
  onBack: () => void;
  onHomePress?: () => void;
  onSearchPress?: () => void;
  onCartPress?: () => void;
  onReviewPress?: () => void;
}

export default function ProductDetailScreen({ onBack, onHomePress, onSearchPress, onCartPress, onReviewPress }: ProductDetailScreenProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <SafeAreaView style={pd.root} edges={['top', 'left', 'right']}>
        <Header onBack={onBack} onHomePress={onHomePress} onSearchPress={onSearchPress} onCartPress={onCartPress} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          contentContainerStyle={{ paddingBottom: s(90) }}
        >
          {/* 상품 이미지 */}
          <View style={pd.productImg} />

          {/* 상품 정보 */}
          <InfoSection />

          {/* 두꺼운 구분선 */}
          <View style={pd.thickDivider} />

          {/* 탭 */}
          <DetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 탭 하단 얇은 구분선 */}
          <View style={pd.tabDivider} />

          {/* 탭 컨텐츠 */}
          {activeTab === 0 ? <ProductInfoContent /> : <ReviewContent onReviewPress={onReviewPress} />}

          {/* 두꺼운 구분선 */}
          <View style={pd.thickDivider} />

          {/* 브랜드 정보 */}
          <BrandInfo />
        </ScrollView>

        <BottomBar onCartPress={onCartPress} />
      </SafeAreaView>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const pd = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  // 헤더
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    height: s(52), paddingHorizontal: s(20),
  },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: s(14) },
  headerIcon: { width: s(24), height: s(24), justifyContent: 'center', alignItems: 'center' },

  // 홈 아이콘 (그린 아이콘)
  homeIconBase: { position: 'absolute', bottom: s(2), width: s(14), height: s(10), borderWidth: 2, borderColor: '#1E1E1E', borderTopWidth: 0 },
  homeIconRoof: { position: 'absolute', top: s(2), width: 0, height: 0, borderLeftWidth: s(9), borderRightWidth: s(9), borderBottomWidth: s(8), borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#1E1E1E' },

  // 서치 아이콘
  searchCircle: { position: 'absolute', top: s(2), left: s(2), width: s(13), height: s(13), borderRadius: s(7), borderWidth: 2, borderColor: '#1E1E1E' },
  searchLine: { position: 'absolute', bottom: s(2), right: s(2), width: s(7), height: 2, backgroundColor: '#1E1E1E', transform: [{ rotate: '45deg' }] },

  // 카트 아이콘
  cartBody: { position: 'absolute', bottom: s(2), width: s(16), height: s(13), borderWidth: 2, borderColor: '#1E1E1E', borderRadius: s(2) },
  cartHandleLeft: { position: 'absolute', top: s(2), left: s(4), width: s(5), height: s(7), borderTopLeftRadius: s(5), borderTopRightRadius: s(5), borderWidth: 2, borderColor: '#1E1E1E', borderBottomWidth: 0 },
  cartHandleRight: { position: 'absolute', top: s(2), right: s(4), width: s(5), height: s(7), borderTopLeftRadius: s(5), borderTopRightRadius: s(5), borderWidth: 2, borderColor: '#1E1E1E', borderBottomWidth: 0 },

  // 상품 이미지
  productImg: { width: SW, height: s(431), backgroundColor: '#D9D9D9' },

  // 정보 섹션
  infoSection: { paddingHorizontal: s(20), paddingTop: s(16), paddingBottom: s(20) },

  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: s(10) },
  brandTxt: { fontSize: s(17), fontWeight: '500', color: '#979797' },
  shareIcon: { width: s(24), height: s(24) },

  // 공유 아이콘
  shareIconWrap: { width: s(24), height: s(24), justifyContent: 'center', alignItems: 'center' },
  shareCircle: { position: 'absolute', top: s(2), right: s(2), width: s(8), height: s(8), borderRadius: s(4), borderWidth: 2, borderColor: '#979797' },
  shareLineTop: { position: 'absolute', top: s(5), left: s(3), width: s(12), height: 2, backgroundColor: '#979797', transform: [{ rotate: '-30deg' }] },
  shareLineBottom: { position: 'absolute', bottom: s(3), left: s(3), width: s(12), height: 2, backgroundColor: '#979797', transform: [{ rotate: '30deg' }] },

  productName: { fontSize: s(15), fontWeight: '500', color: '#1E1E1E', marginBottom: s(8) },

  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: s(4), marginBottom: s(16) },
  ratingTxt: { fontSize: s(12), fontWeight: '500', color: '#1E1E1E' },
  ratingUnderline: { position: 'absolute', bottom: -s(2), left: s(20), width: s(40), height: 0.5, backgroundColor: '#1E1E1E' },

  originalPrice: { fontSize: s(14), fontWeight: '500', color: '#979797', marginBottom: s(4) },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', gap: s(2), marginBottom: s(14) },
  discountPrice: { fontSize: s(21), fontWeight: '600', color: '#3198FF' },
  wonTxt: { fontSize: s(13), fontWeight: '600', color: '#3198FF', marginBottom: s(1) },

  tagWrap: { flexDirection: 'row', gap: s(6), marginBottom: s(16) },
  tagChip: { height: s(18), backgroundColor: '#F4F4F4', borderRadius: s(3), paddingHorizontal: s(6), justifyContent: 'center' },
  tagTxt: { fontSize: s(8), fontWeight: '500', color: '#979797' },

  thinDivider: { height: 0.3, backgroundColor: '#979797', marginBottom: s(16) },

  shippingRow: { flexDirection: 'row', gap: s(16) },
  shippingLabel: { fontSize: s(12), fontWeight: '500', color: '#979797', width: s(28), marginTop: s(2) },
  shippingDetail: { flex: 1 },
  shippingTopRow: { flexDirection: 'row', alignItems: 'center', gap: s(4), marginBottom: s(4) },
  shippingValue: { fontSize: s(12), fontWeight: '600', color: '#1E1E1E' },
  shippingDot: { width: s(1), height: s(12), backgroundColor: '#1E1E1E', marginHorizontal: s(2) },
  shippingFree: { fontSize: s(12), fontWeight: '500', color: '#1E1E1E' },
  shippingDate: { fontSize: s(12), fontWeight: '600', color: '#1E1E1E' },

  thickDivider: { height: s(5), backgroundColor: '#F4F4F4' },

  // 탭
  tabWrap: { flexDirection: 'row', height: s(48) },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0 },
  tabItemOn: { borderBottomWidth: 2, borderBottomColor: '#1E1E1E' },
  tabTxt: { fontSize: s(14), fontWeight: '500', color: '#979797' },
  tabTxtOn: { fontWeight: '600', color: '#1E1E1E' },
  tabDivider: { height: 0.3, backgroundColor: '#979797' },

  // 상품 정보 이미지
  infoImg: { width: '100%', backgroundColor: '#D9D9D9', borderRadius: s(4) },

  // 더 보기 버튼
  moreBtn: {
    width: s(355), height: s(47), borderWidth: 0.3, borderColor: '#1E1E1E',
    borderRadius: s(40), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: s(6),
  },
  moreBtnTxt: { fontSize: s(12), fontWeight: '500', color: '#1E1E1E' },
  moreArrow: { width: s(16), height: s(16), justifyContent: 'center', alignItems: 'center' },
  moreArrowLine: { width: s(6), height: s(6), borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#1E1E1E', transform: [{ rotate: '45deg' }], marginLeft: -s(2) },

  // 리뷰
  reviewHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: s(20), marginBottom: s(10) },
  reviewTitleRow: { flexDirection: 'row', alignItems: 'baseline', gap: s(4) },
  reviewTitle: { fontSize: s(17), fontWeight: '600', color: '#1E1E1E' },
  reviewCount: { fontSize: s(13), fontWeight: '500', color: '#979797' },
  viewAllRow: { flexDirection: 'row', alignItems: 'center', gap: s(2) },
  viewAllTxt: { fontSize: s(11), fontWeight: '600', color: '#757575' },
  viewAllArrow: { width: s(16), height: s(16), justifyContent: 'center', alignItems: 'center' },
  viewAllArrowLine: { width: s(5), height: s(5), borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#757575', transform: [{ rotate: '-45deg' }] },

  reviewSummary: { flexDirection: 'row', alignItems: 'center', gap: s(6), marginBottom: s(4) },
  reviewRatingBig: { fontSize: s(13), fontWeight: '600', color: '#757575' },
  reviewSizeTxt: { fontSize: s(10), fontWeight: '400', color: '#757575', marginBottom: s(4) },

  reviewCard: { flexDirection: 'row', borderRadius: s(4), overflow: 'hidden' },
  reviewImg: { width: s(85), height: s(85), backgroundColor: '#D9D9D9' },
  reviewTextBox: { width: s(212), height: s(85), backgroundColor: '#ECECEC', padding: s(10) },
  reviewTxt: { fontSize: s(10), fontWeight: '400', color: '#1E1E1E', lineHeight: s(16) },

  // 브랜드 정보
  brandInfoTxt: { fontSize: s(11), fontWeight: '500', color: '#979797' },

  // 하단 바
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E9E9E9',
    paddingTop: s(10),
    paddingHorizontal: s(17),
  },
  bottomInner: {
    height: s(50), flexDirection: 'row', alignItems: 'center',
  },

  bottomReview: { width: s(70), alignItems: 'center', gap: s(2) },
  bottomReviewTxt: { fontSize: s(12), fontWeight: '600', color: '#1E1E1E' },
  bottomReviewCount: { fontSize: s(12), fontWeight: '500', color: '#979797' },

  vertDivider: { width: 0.5, height: s(30), backgroundColor: '#D9D9D9', marginHorizontal: s(8) },

  wishBtn: { width: s(50), alignItems: 'center', justifyContent: 'center' },
  heartIcon: { width: s(22), height: s(20), borderWidth: 2, borderColor: '#979797', borderRadius: s(2) },
  heartIconOn: { borderColor: '#E8526A', backgroundColor: '#E8526A' },
  heartLine: { flex: 1, borderRadius: s(2) },
  heartLineOn: { backgroundColor: '#fff' },

  buyBtn: {
    flex: 1, height: s(50), backgroundColor: '#0068FF',
    borderRadius: s(50), alignItems: 'center', justifyContent: 'center', marginLeft: s(8),
  },
  buyBtnTxt: { fontSize: s(14), fontWeight: '600', color: '#fff' },
});
