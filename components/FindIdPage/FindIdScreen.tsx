import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={fs.headerWrap}>
      <TouchableOpacity
        style={fs.backBtn}
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image
          source={require('../../assets/images/Research/left.png')}
          style={fs.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={fs.headerTitle}>아이디 찾기</Text>
    </View>
  );
}

function PhoneRow({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View style={fs.splitRow}>
      <View style={[fs.inputBox, fs.phoneInput]}>
        <TextInput
          style={fs.input}
          placeholder="전화번호"
          placeholderTextColor="#D9D9D9"
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChange}
        />
      </View>
      <TouchableOpacity style={fs.certBtn} activeOpacity={0.8}>
        <Text style={fs.certTxt}>인증받기</Text>
      </TouchableOpacity>
    </View>
  );
}

function CodeRow({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View style={fs.inputBox}>
      <TextInput
        style={fs.input}
        placeholder="인증번호 6자리"
        placeholderTextColor="#D9D9D9"
        keyboardType="number-pad"
        value={value}
        onChangeText={onChange}
      />
      <Text style={fs.timer}>00:00</Text>
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface FindIdScreenProps {
  onBack: () => void;
}

export default function FindIdScreen({ onBack }: FindIdScreenProps) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [foundEmail] = useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={fs.root} edges={['top', 'left', 'right', 'bottom']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Header onBack={onBack} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={fs.scrollContent}
          >
            {/* 본인인증하기 */}
            <Text style={fs.sectionTitle}>본인인증하기</Text>

            <View style={fs.fieldWrap}>
              <Text style={fs.fieldLabel}>전화번호</Text>
              <PhoneRow value={phone} onChange={setPhone} />
            </View>

            <View style={fs.fieldWrap}>
              <Text style={fs.fieldLabel}>인증번호</Text>
              <CodeRow value={code} onChange={setCode} />
            </View>

            {/* 이메일 결과 */}
            <View style={fs.fieldWrap}>
              <Text style={fs.fieldLabel}>이메일</Text>
              <View style={fs.inputBox}>
                <TextInput
                  style={fs.input}
                  placeholder="이메일"
                  placeholderTextColor="#D9D9D9"
                  editable={false}
                  value={foundEmail}
                />
              </View>
            </View>

            <TouchableOpacity style={fs.confirmBtn} activeOpacity={0.85}>
              <Text style={fs.confirmTxt}>확인</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const fs = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: s(20), paddingBottom: s(40) },

  headerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: s(52),
    paddingHorizontal: s(20),
  },
  backBtn: { position: 'absolute', left: s(20) },
  backIcon: { width: s(24), height: s(24) },
  headerTitle: { fontSize: s(17), fontWeight: '600', color: '#1E1E1E' },

  sectionTitle: {
    fontSize: s(17),
    fontWeight: '600',
    color: '#1E1E1E',
    marginTop: s(24),
    marginBottom: s(16),
  },

  fieldWrap: { marginBottom: s(16) },
  fieldLabel: { fontSize: s(15), fontWeight: '600', color: '#1E1E1E', marginBottom: s(8) },

  splitRow: { flexDirection: 'row', gap: s(10) },
  phoneInput: { flex: 1 },

  inputBox: {
    height: s(47),
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: s(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(14),
  },
  input: { flex: 1, fontSize: s(15), fontWeight: '600', color: '#1E1E1E', paddingVertical: 0 },

  timer: { fontSize: s(12), fontWeight: '600', color: '#D9D9D9' },

  certBtn: {
    width: s(94),
    height: s(47),
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: s(23.5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  certTxt: { fontSize: s(15), fontWeight: '500', color: '#1E1E1E' },

  confirmBtn: {
    width: s(353),
    height: s(50),
    backgroundColor: '#57677D',
    borderRadius: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: s(32),
  },
  confirmTxt: { fontSize: s(14), fontWeight: '600', color: '#fff' },
});
