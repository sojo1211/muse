import React, { useState } from 'react';
import {
  Dimensions,
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

interface CartItem {
  id: number;
  store: string;
  name: string;
  option: string;
  shipping: string;
  price: number;
  qty: number;
  selected: boolean;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    store: '탑텐',
    name: '[단독] 오션 와이드 데님 팬츠',
    option: '중청 / M',
    shipping: '05.28(수) 이내 발송예정',
    price: 34110,
    qty: 1,
    selected: true,
  },
];

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={ct.header}>
      <TouchableOpacity onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }} style={ct.closeBtn}>
        <View style={ct.closeLineA} />
        <View style={ct.closeLineB} />
      </TouchableOpacity>
      <Text style={ct.headerTitle}>장바구니</Text>
    </View>
  );
}

function Checkbox({ checked, onToggle, blue = false }: { checked: boolean; onToggle: () => void; blue?: boolean }) {
  return (
    <TouchableOpacity onPress={onToggle} style={[ct.checkbox, checked && { backgroundColor: blue ? '#0068FF' : '#57677D', borderColor: blue ? '#0068FF' : '#57677D' }]}>
      {checked && (
        <View style={ct.checkMark} />
      )}
    </TouchableOpacity>
  );
}

function SelectBar({ allSelected, onToggleAll, onDeleteSelected }: {
  allSelected: boolean; onToggleAll: () => void; onDeleteSelected: () => void;
}) {
  return (
    <View style={ct.selectBar}>
      <View style={ct.selectLeft}>
        <Checkbox checked={allSelected} onToggle={onToggleAll} blue />
        <Text style={ct.selectTxt}>전체선택 (1/1)</Text>
      </View>
      <TouchableOpacity onPress={onDeleteSelected}>
        <Text style={ct.deleteTxt}>상품삭제</Text>
      </TouchableOpacity>
    </View>
  );
}

function CartItemCard({
  item,
  onToggle,
  onRemove,
  onQtyChange,
}: {
  item: CartItem;
  onToggle: () => void;
  onRemove: () => void;
  onQtyChange: (delta: number) => void;
}) {
  return (
    <View style={ct.itemGroup}>
      {/* 스토어 행 */}
      <View style={ct.storeRow}>
        <Checkbox checked={item.selected} onToggle={onToggle} blue />
        <Text style={ct.storeName}>{item.store}</Text>
      </View>

      {/* 상품 정보 */}
      <View style={ct.productRow}>
        <View style={ct.productImg} />
        <View style={ct.productInfo}>
          <Text style={ct.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={ct.productShipping}>{item.shipping}</Text>
        </View>
        <TouchableOpacity onPress={onRemove} style={ct.removeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <View style={ct.removeLineA} />
          <View style={ct.removeLineB} />
        </TouchableOpacity>
      </View>

      {/* 옵션 칩 */}
      <View style={ct.optionChip}>
        <Text style={ct.optionTxt}>{item.option}</Text>
      </View>

      {/* 가격 행 */}
      <View style={ct.priceRow}>
        <Text style={ct.priceLabel}>상품 금액</Text>
        <Text style={ct.priceValue}>{item.price.toLocaleString()}원</Text>
      </View>

      {/* 액션 버튼 행 */}
      <View style={ct.actionRow}>
        <TouchableOpacity style={ct.optionBtn} activeOpacity={0.8}>
          <Text style={ct.optionBtnTxt}>옵션 변경</Text>
        </TouchableOpacity>
        <View style={ct.qtyBox}>
          <TouchableOpacity onPress={() => onQtyChange(-1)} style={ct.qtyBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <View style={ct.minusBar} />
          </TouchableOpacity>
          <Text style={ct.qtyNum}>{item.qty}</Text>
          <TouchableOpacity onPress={() => onQtyChange(1)} style={ct.qtyBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <View style={ct.plusV} />
            <View style={ct.plusH} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function PaymentSummary({ subtotal, shipping }: { subtotal: number; shipping: number }) {
  const total = subtotal + shipping;
  return (
    <>
      {/* 두꺼운 회색 구분선 */}
      <View style={ct.thickDivider} />

      <View style={ct.summarySection}>
        <Text style={ct.summaryTitle}>결제 예상 금액</Text>

        <View style={ct.summaryRow}>
          <Text style={ct.summaryLabel}>상품금액</Text>
          <Text style={ct.summaryValue}>{subtotal.toLocaleString()}원</Text>
        </View>
        <View style={ct.summaryRow}>
          <Text style={ct.summaryLabel}>배송비</Text>
          <Text style={ct.summaryValue}>{shipping === 0 ? '0원' : `${shipping.toLocaleString()}원`}</Text>
        </View>

        <Text style={ct.summaryCalcTxt}>
          상품 {subtotal.toLocaleString()}원 + 배송비 {shipping === 0 ? '0원' : `${shipping.toLocaleString()}원`} = {total.toLocaleString()}원
        </Text>
      </View>

      <View style={ct.divider} />

      <View style={ct.totalRow}>
        <Text style={ct.totalLabel}>총 결제 금액</Text>
        <Text style={ct.totalValue}>{total.toLocaleString()}원</Text>
      </View>
    </>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface CartScreenProps {
  onBack: () => void;
}

export default function CartScreen({ onBack }: CartScreenProps) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const allSelected = items.every(i => i.selected);
  const selectedItems = items.filter(i => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = 0;

  function toggleAll() {
    const next = !allSelected;
    setItems(prev => prev.map(i => ({ ...i, selected: next })));
  }

  function toggleItem(id: number) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, selected: !i.selected } : i));
  }

  function removeItem(id: number) {
    setItems(prev => prev.filter(i => i.id !== id));
  }

  function deleteSelected() {
    setItems(prev => prev.filter(i => !i.selected));
  }

  function changeQty(id: number, delta: number) {
    setItems(prev => prev.map(i =>
      i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
    ));
  }

  return (
    <SafeAreaView style={ct.root} edges={['top', 'left', 'right']}>
        <Header onBack={onBack} />
        <View style={ct.divider} />

        <SelectBar allSelected={allSelected} onToggleAll={toggleAll} onDeleteSelected={deleteSelected} />
        <View style={ct.divider} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          bounces={false}
          contentContainerStyle={{ paddingBottom: s(100) }}
        >
          {items.length === 0 ? (
            <View style={ct.emptyWrap}>
              <Text style={ct.emptyTitle}>장바구니에 담긴 상품이 없어요</Text>
              <Text style={ct.emptySubTxt}>원하는 상품을 담아보세요</Text>
              <TouchableOpacity style={ct.emptyShopBtn} activeOpacity={0.8} onPress={onBack}>
                <Text style={ct.emptyShopBtnTxt}>쇼핑 계속하기</Text>
              </TouchableOpacity>
            </View>
          ) : (
            items.map(item => (
              <CartItemCard
                key={item.id}
                item={item}
                onToggle={() => toggleItem(item.id)}
                onRemove={() => removeItem(item.id)}
                onQtyChange={(d) => changeQty(item.id, d)}
              />
            ))
          )}

          <View style={ct.divider} />
          <PaymentSummary subtotal={subtotal} shipping={shipping} />
        </ScrollView>

        {/* 바로 구매 버튼 */}
        <View style={ct.bottomBar}>
          <TouchableOpacity
            style={[ct.buyBtn, selectedItems.length === 0 && ct.buyBtnDisabled]}
            activeOpacity={0.85}
            disabled={selectedItems.length === 0}
          >
            <Text style={ct.buyBtnTxt}>바로 구매</Text>
          </TouchableOpacity>
          <AndroidBottomFill />
        </View>
      </SafeAreaView>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const ct = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },

  header: {
    height: s(52),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(20),
  },
  headerTitle: { fontSize: s(17), fontWeight: '600', color: '#1E1E1E' },
  closeBtn: { position: 'absolute', left: s(20), width: s(24), height: s(24), justifyContent: 'center', alignItems: 'center' },
  closeLineA: { position: 'absolute', width: s(14), height: 2, backgroundColor: '#1E1E1E', borderRadius: 2, transform: [{ rotate: '45deg' }] },
  closeLineB: { position: 'absolute', width: s(14), height: 2, backgroundColor: '#1E1E1E', borderRadius: 2, transform: [{ rotate: '-45deg' }] },

  divider: { height: StyleSheet.hairlineWidth, backgroundColor: '#979797' },
  thickDivider: { height: s(5), backgroundColor: '#F4F4F4' },

  // 전체선택 바
  selectBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(20),
    height: s(44),
  },
  selectLeft: { flexDirection: 'row', alignItems: 'center', gap: s(8) },
  selectTxt: { fontSize: s(13), fontWeight: '500', color: '#1E1E1E' },
  deleteTxt: { fontSize: s(13), fontWeight: '500', color: '#1E1E1E' },

  // 체크박스
  checkbox: {
    width: s(22), height: s(22),
    borderRadius: s(3), borderWidth: 1.5, borderColor: '#D9D9D9',
    alignItems: 'center', justifyContent: 'center',
  },
  checkMark: {
    width: s(11), height: s(6),
    borderBottomWidth: 2, borderLeftWidth: 2,
    borderColor: '#fff',
    transform: [{ rotate: '-45deg' }, { translateY: -s(1) }],
  },

  // 상품 그룹
  itemGroup: { paddingHorizontal: s(20), paddingVertical: s(16) },

  storeRow: { flexDirection: 'row', alignItems: 'center', gap: s(8), marginBottom: s(12) },
  storeName: { fontSize: s(15), fontWeight: '600', color: '#1E1E1E' },

  productRow: { flexDirection: 'row', alignItems: 'flex-start', gap: s(10), marginBottom: s(12) },
  productImg: { width: s(72), height: s(72), backgroundColor: '#D9D9D9', borderRadius: s(3) },
  productInfo: { flex: 1, gap: s(4) },
  productName: { fontSize: s(12), fontWeight: '500', color: '#1E1E1E', lineHeight: s(18) },
  productShipping: { fontSize: s(12), fontWeight: '500', color: '#979797' },

  removeBtn: { width: s(16), height: s(16), justifyContent: 'center', alignItems: 'center' },
  removeLineA: { position: 'absolute', width: s(10), height: 1, backgroundColor: '#979797', transform: [{ rotate: '45deg' }] },
  removeLineB: { position: 'absolute', width: s(10), height: 1, backgroundColor: '#979797', transform: [{ rotate: '-45deg' }] },

  optionChip: {
    height: s(36), backgroundColor: '#F4F4F4', borderRadius: s(3),
    justifyContent: 'center', paddingHorizontal: s(14), marginBottom: s(12),
  },
  optionTxt: { fontSize: s(13), fontWeight: '500', color: '#1E1E1E' },

  priceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: s(10) },
  priceLabel: { fontSize: s(12), fontWeight: '500', color: '#979797' },
  priceValue: { fontSize: s(15), fontWeight: '600', color: '#1E1E1E' },

  actionRow: { flexDirection: 'row', gap: s(8) },
  optionBtn: {
    flex: 1, height: s(35), borderWidth: 0.5, borderColor: '#D9D9D9',
    borderRadius: s(4), alignItems: 'center', justifyContent: 'center',
  },
  optionBtnTxt: { fontSize: s(13), fontWeight: '500', color: '#757575' },

  qtyBox: {
    flex: 1, height: s(35), borderWidth: 0.5, borderColor: '#D9D9D9',
    borderRadius: s(4), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: s(10),
  },
  qtyBtn: { width: s(24), height: s(24), alignItems: 'center', justifyContent: 'center' },
  qtyNum: { fontSize: s(14), fontWeight: '500', color: '#757575' },
  minusBar: { width: s(12), height: 1.5, backgroundColor: '#979797', borderRadius: 1 },
  plusV: { position: 'absolute', width: 1.5, height: s(12), backgroundColor: '#757575', borderRadius: 1 },
  plusH: { position: 'absolute', width: s(12), height: 1.5, backgroundColor: '#757575', borderRadius: 1 },

  // 결제 요약
  summarySection: { paddingHorizontal: s(20), paddingTop: s(20), paddingBottom: s(8) },
  summaryTitle: { fontSize: s(16), fontWeight: '600', color: '#1E1E1E', marginBottom: s(16) },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: s(10) },
  summaryLabel: { fontSize: s(13), fontWeight: '500', color: '#1E1E1E' },
  summaryValue: { fontSize: s(13), fontWeight: '500', color: '#1E1E1E' },
  summaryCalcTxt: { fontSize: s(14), fontWeight: '500', color: '#757575', marginTop: s(4) },

  totalRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: s(20), paddingVertical: s(20),
  },
  totalLabel: { fontSize: s(15), fontWeight: '600', color: '#1E1E1E' },
  totalValue: { fontSize: s(20), fontWeight: '700', color: '#3198FF' },

  emptyWrap: { alignItems: 'center', paddingVertical: s(80) },
  emptyTxt: { fontSize: s(15), color: '#979797', fontWeight: '500' },
  emptyTitle: { fontSize: s(19), fontWeight: '600', color: '#1E1E1E', textAlign: 'center', marginBottom: s(8) },
  emptySubTxt: { fontSize: s(14), fontWeight: '500', color: '#979797', textAlign: 'center', marginBottom: s(20) },
  emptyShopBtn: { width: s(177), height: s(50), backgroundColor: '#979797', borderRadius: s(50), alignItems: 'center', justifyContent: 'center' },
  emptyShopBtnTxt: { fontSize: s(14), fontWeight: '600', color: '#fff' },

  // 하단 버튼
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff', paddingHorizontal: s(20), paddingTop: s(10),
  },
  buyBtn: {
    height: s(50), backgroundColor: '#57677D',
    borderRadius: s(50), alignItems: 'center', justifyContent: 'center',
  },
  buyBtnDisabled: { backgroundColor: '#D9D9D9' },
  buyBtnTxt: { fontSize: s(14), fontWeight: '600', color: '#fff' },
});
