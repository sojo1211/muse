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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AndroidBottomFill from '../common/AndroidBottomFill';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

// ── 데이터 ────────────────────────────────────────────────────

const STATS = [
  { label: '사이즈', best: '정사이즈예요', pct: 100 },
  { label: '색감',   best: '화면과 비슷해요', pct: 83 },
  { label: '퀄리티', best: '아주 만족해요',  pct: 63 },
];

const REVIEWS = [
  {
    user: 'dio*****', date: '25.04.29',
    option: '빈티지 중청', size: 'L',
    sizeLabel: '정사이즈예요', qualityLabel: '보통이에요', colorLabel: '화면과 비슷해요',
    text: '처음 받아봤을 때는 \'무난하네?\' 싶었는데, 입어보니 핏이 꽤 괜찮아서 자주 손이 가요. 허리는 딱 맞고, 허벅지나 힙은 너무 붙지 않게 여유 있어서 활동할 때 편하더라고요. 특히 기장감이 발목 위로 살짝 떨어지는데, 운동화나 로퍼랑 신었을 때 경쾌한 느...',
  },
  {
    user: '초록', date: '25.03.15',
    option: '연청', size: 'M',
    sizeLabel: '생각보다 커요', qualityLabel: '아주 만족해요', colorLabel: '화면과 비슷해요',
    text: '체형에 비해 허리와 엉덩이 부분이 살짝 여유 있어서 루즈하게 떨어져요. 평소 핏하게 입는 걸 선호하신다면 한 사이즈 작게 가는 것도 괜찮을 것 같아요. 저는 오히려 이 살짝 루즈한 핏이 요즘 스타일 같아서 만족했어요. 밑단도 일자로 떨어져서 다리도...',
  },
  {
    user: '냥집샤', date: '25.02.18',
    option: '중청', size: 'S',
    sizeLabel: '정사이즈예요', qualityLabel: '아주 만족해요', colorLabel: '화면과 비슷해요',
    text: '키가 작고 마른 체형인데, 허리랑 힙 모두 딱 맞아서 수선 없이 바로 입을 수 있었어요. 특히 허리 뜨는 부분 없이 안정감 있게 감싸줘서 상의를 넣어 입었을 때 핏이 정말 예뻐요. 기장도 복숭아뼈 살짝 위로 올라와서 플랫슈즈나 운동화랑 매치했을 때 깔...',
  },
];

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={rv.header}>
      <TouchableOpacity onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Image source={require('../../assets/images/Research/left.png')} style={rv.backIcon} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={rv.headerTitle}>리뷰</Text>
    </View>
  );
}

function Stars({ count = 5, size = 24 }: { count?: number; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: s(4) }}>
      {Array.from({ length: count }).map((_, i) => (
        <Image key={i} source={require('../../assets/images/page/st.png')} style={{ width: s(size), height: s(size) }} resizeMode="contain" />
      ))}
    </View>
  );
}

function RatingSummary() {
  return (
    <View style={rv.ratingSummary}>
      <Stars count={5} size={24} />
      <Text style={rv.ratingBig}>4.8 / 5</Text>
      <Text style={rv.ratingCount}>(90)</Text>
    </View>
  );
}

function StatBar({ label, best, pct }: { label: string; best: string; pct: number }) {
  return (
    <View style={rv.statRow}>
      <Text style={rv.statLabel}>{label}</Text>
      <Text style={rv.statBest}>{best}</Text>
      <View style={rv.barTrack}>
        <View style={[rv.barFill, { width: s(pct) }]} />
      </View>
      <Text style={rv.statPct}>{pct}%</Text>
    </View>
  );
}

function ReviewCard({ item }: { item: typeof REVIEWS[0] }) {
  return (
    <View>
      {/* 프로필 행 */}
      <View style={rv.profileRow}>
        <View style={rv.avatar} />
        <View style={rv.profileInfo}>
          <Text style={rv.userName}>{item.user}</Text>
          <Stars count={5} size={14} />
        </View>
        <Text style={rv.reviewDate}>{item.date}</Text>
      </View>

      {/* 사진 3장 */}
      <View style={rv.photoRow}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={rv.photoBox} />
        ))}
      </View>

      {/* 옵션 칩 */}
      <View style={rv.optionChip}>
        <Text style={rv.optionLabel}>옵션</Text>
        <Text style={rv.optionDot}> · </Text>
        <Text style={rv.optionValue}>{item.option} · {item.size}</Text>
        <View style={rv.optionSpacer} />
        <Text style={rv.sizeLabel}>사이즈</Text>
        <Text style={rv.optionDot}> </Text>
        <Text style={rv.optionValue}>{item.sizeLabel}</Text>
        <Text style={rv.optionDot}> · </Text>
        <Text style={rv.sizeLabel}>퀄리티</Text>
        <Text style={rv.optionDot}> </Text>
        <Text style={rv.optionValue}>{item.qualityLabel}</Text>
        <Text style={rv.optionDot}> · </Text>
        <Text style={rv.sizeLabel}>색감</Text>
        <Text style={rv.optionDot}> </Text>
        <Text style={rv.optionValue}>{item.colorLabel}</Text>
      </View>

      {/* 리뷰 텍스트 */}
      <Text style={rv.reviewText} numberOfLines={4}>{item.text}</Text>

      {/* 더 보기 */}
      <TouchableOpacity style={rv.moreRow}>
        <Text style={rv.moreTxt}>더 보기</Text>
      </TouchableOpacity>

      {/* 구분선 */}
      <View style={rv.thickDivider} />
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface ReviewScreenProps {
  onBack: () => void;
}

export default function ReviewScreen({ onBack }: ReviewScreenProps) {
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  const bottomPad = isAndroid ? s(40) : insets.bottom + s(40);

  return (
    <SafeAreaView style={rv.root} edges={['top', 'left', 'right']}>
        <Header onBack={onBack} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          contentContainerStyle={{ paddingBottom: bottomPad }}
        >
          {/* 별점 요약 */}
          <RatingSummary />

          {/* 통계 바 */}
          <View style={rv.statsSection}>
            {STATS.map((s, i) => (
              <StatBar key={i} {...s} />
            ))}
          </View>

          {/* 구분선 */}
          <View style={rv.thickDivider} />

          {/* 리뷰 목록 */}
          {REVIEWS.map((item, i) => (
            <ReviewCard key={i} item={item} />
          ))}
        </ScrollView>
        <AndroidBottomFill />
      </SafeAreaView>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const rv = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: s(52), paddingHorizontal: s(20),
  },
  backIcon: { position: 'absolute', left: s(20), width: s(24), height: s(24) },
  headerTitle: { fontSize: s(17), fontWeight: '600', color: '#1E1E1E' },

  // 별점 요약
  ratingSummary: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: s(8), paddingVertical: s(20),
  },
  ratingBig: { fontSize: s(20), fontWeight: '600', color: '#1E1E1E' },
  ratingCount: { fontSize: s(13), fontWeight: '600', color: '#979797' },

  // 통계
  statsSection: { paddingHorizontal: s(20), gap: s(10), marginBottom: s(16) },
  statRow: {
    flexDirection: 'row', alignItems: 'center',
    height: s(42), borderWidth: 0.5, borderColor: '#D9D9D9', borderRadius: s(4),
    paddingHorizontal: s(10), gap: s(6),
  },
  statLabel: { fontSize: s(13), fontWeight: '600', color: '#979797', width: s(36) },
  statBest: { fontSize: s(13), fontWeight: '600', color: '#1E1E1E', flex: 1 },
  barTrack: { width: s(100), height: s(6), backgroundColor: '#D9D9D9', borderRadius: s(3) },
  barFill: { height: s(6), backgroundColor: '#0068FF', borderRadius: s(3) },
  statPct: { fontSize: s(13), fontWeight: '500', color: '#979797', width: s(34), textAlign: 'right' },

  thickDivider: { height: s(5), backgroundColor: '#F4F4F4' },

  // 리뷰 카드
  profileRow: {
    flexDirection: 'row', alignItems: 'center', gap: s(10),
    paddingHorizontal: s(20), paddingTop: s(20), paddingBottom: s(12),
  },
  avatar: { width: s(40), height: s(40), borderRadius: s(20), backgroundColor: '#D9D9D9' },
  profileInfo: { flex: 1, gap: s(4) },
  userName: { fontSize: s(14), fontWeight: '600', color: '#1E1E1E' },
  reviewDate: { fontSize: s(12), fontWeight: '500', color: '#979797' },

  photoRow: {
    flexDirection: 'row', gap: s(10),
    paddingHorizontal: s(20), marginBottom: s(12),
  },
  photoBox: { width: s(120), height: s(120), backgroundColor: '#D9D9D9', borderRadius: s(16) },

  optionChip: {
    marginHorizontal: s(20), marginBottom: s(12),
    backgroundColor: '#F4F4F4', borderRadius: s(11),
    paddingHorizontal: s(10), paddingVertical: s(10),
    flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center',
  },
  optionLabel: { fontSize: s(12), fontWeight: '600', color: '#979797' },
  optionDot: { fontSize: s(12), fontWeight: '600', color: '#979797' },
  optionValue: { fontSize: s(12), fontWeight: '600', color: '#757575' },
  optionSpacer: { width: '100%', height: s(4) },
  sizeLabel: { fontSize: s(12), fontWeight: '600', color: '#979797' },

  reviewText: {
    marginHorizontal: s(20), marginBottom: s(8),
    fontSize: s(13), fontWeight: '400', color: '#000', lineHeight: s(19),
  },

  moreRow: { alignItems: 'flex-end', paddingHorizontal: s(20), marginBottom: s(16) },
  moreTxt: { fontSize: s(12), fontWeight: '500', color: '#979797' },
});
