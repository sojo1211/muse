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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AndroidBottomFill from '../common/AndroidBottomFill';

const { width: SW } = Dimensions.get('window');
const D = 393;
const s = (v: number) => (v * SW) / D;

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function Header({ onBack }: { onBack: () => void }) {
  return (
    <View style={rs.headerWrap}>
      <TouchableOpacity
        style={rs.backBtn}
        onPress={onBack}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Image
          source={require('../../assets/images/Research/left.png')}
          style={rs.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={rs.headerTitle}>비밀번호 재설정</Text>
    </View>
  );
}

function SectionTitle({ label }: { label: string }) {
  return <Text style={rs.sectionTitle}>{label}</Text>;
}

function FieldLabel({ label }: { label: string }) {
  return <Text style={rs.fieldLabel}>{label}</Text>;
}

function EmailRow({
  value,
  onChange,
  verified,
}: {
  value: string;
  onChange: (v: string) => void;
  verified: boolean;
}) {
  return (
    <View style={rs.emailRow}>
      <View style={[rs.inputBox, rs.emailInput]}>
        <TextInput
          style={rs.input}
          placeholder="abc@email.com"
          placeholderTextColor="#D9D9D9"
          keyboardType="email-address"
          autoCapitalize="none"
          value={value}
          onChangeText={onChange}
        />
        {verified && (
          <Image
            source={require('../../assets/images/Research/left.png')}
            style={rs.checkIcon}
            resizeMode="contain"
          />
        )}
      </View>
      <TouchableOpacity style={rs.certBtn} activeOpacity={0.8}>
        <Text style={rs.certTxt}>인증받기</Text>
      </TouchableOpacity>
    </View>
  );
}

function CodeRow({ value, onChange, timer }: { value: string; onChange: (v: string) => void; timer: string }) {
  return (
    <View style={rs.inputBox}>
      <TextInput
        style={rs.input}
        placeholder="인증번호 6자리"
        placeholderTextColor="#D9D9D9"
        keyboardType="number-pad"
        value={value}
        onChangeText={onChange}
      />
      <Text style={rs.timer}>{timer}</Text>
    </View>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <View style={rs.fieldWrap}>
      <FieldLabel label={label} />
      <View style={[rs.inputBox, error ? rs.inputError : null]}>
        <TextInput
          style={rs.input}
          placeholder="영문, 숫자, 특수문자 포함 8자 이상"
          placeholderTextColor="#D9D9D9"
          secureTextEntry
          value={value}
          onChangeText={onChange}
        />
      </View>
      {error ? <Text style={rs.errorTxt}>{error}</Text> : null}
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface ResetPasswordScreenProps {
  onBack: () => void;
}

export default function ResetPasswordScreen({ onBack }: ResetPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  const bottomPad = isAndroid ? s(40) : insets.bottom + s(40);

  function handleComplete() {
    if (newPw !== confirmPw) {
      setConfirmError('새 비밀번호로 작성해주세요.');
    } else {
      setConfirmError('');
    }
  }

  return (
    <SafeAreaView style={rs.root} edges={['top', 'left', 'right']}>
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
            contentContainerStyle={[rs.scrollContent, { paddingBottom: bottomPad }]}
          >
            {/* 본인인증하기 */}
            <SectionTitle label="본인인증하기" />

            <View style={rs.fieldWrap}>
              <FieldLabel label="이메일 주소" />
              <EmailRow value={email} onChange={setEmail} verified={false} />
            </View>

            <View style={rs.fieldWrap}>
              <FieldLabel label="인증번호" />
              <CodeRow value={code} onChange={setCode} timer="10:00" />
            </View>

            {/* 비밀번호 재설정 */}
            <SectionTitle label="비밀번호 재설정" />

            <PasswordField label="새 비밀번호" value={newPw} onChange={setNewPw} />
            <PasswordField
              label="새 비밀번호 확인"
              value={confirmPw}
              onChange={setConfirmPw}
              error={confirmError}
            />

            <TouchableOpacity style={rs.completeBtn} onPress={handleComplete} activeOpacity={0.85}>
              <Text style={rs.completeTxt}>완료</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        <AndroidBottomFill />
      </SafeAreaView>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const rs = StyleSheet.create({
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
  fieldLabel: { fontSize: s(12), fontWeight: '600', color: '#979797', marginBottom: s(6) },

  emailRow: { flexDirection: 'row', gap: s(10) },
  emailInput: { flex: 1 },

  inputBox: {
    height: s(47),
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: s(6),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(14),
  },
  inputError: { borderColor: '#FF4B4B' },
  input: { flex: 1, fontSize: s(15), fontWeight: '600', color: '#1E1E1E', paddingVertical: 0 },

  checkIcon: { width: s(16), height: s(16), tintColor: '#4CAF50' },
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
  certTxt: { fontSize: s(15), fontWeight: '500', color: '#979797' },

  errorTxt: { fontSize: s(12), color: '#FF4B4B', marginTop: s(4) },

  completeBtn: {
    width: s(353),
    height: s(50),
    backgroundColor: '#57677D',
    borderRadius: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: s(32),
  },
  completeTxt: { fontSize: s(14), fontWeight: '600', color: '#fff' },
});
