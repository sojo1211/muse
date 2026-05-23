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
    <View style={ss.headerWrap}>
      <TouchableOpacity style={ss.backBtn} onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <Image source={require('../../assets/images/Research/left.png')} style={ss.backIcon} resizeMode="contain" />
      </TouchableOpacity>
      <Text style={ss.headerTitle}>회원가입</Text>
    </View>
  );
}

function SectionTitle({ label }: { label: string }) {
  return <Text style={ss.sectionTitle}>{label}</Text>;
}

function FieldLabel({ label }: { label: string }) {
  return <Text style={ss.fieldLabel}>{label}</Text>;
}

function InputRow({ value, onChange, placeholder, keyboardType = 'default', secure = false }: {
  value: string; onChange: (v: string) => void; placeholder: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad'; secure?: boolean;
}) {
  return (
    <View style={ss.inputBox}>
      <TextInput
        style={ss.input}
        placeholder={placeholder}
        placeholderTextColor="#D9D9D9"
        keyboardType={keyboardType}
        autoCapitalize="none"
        secureTextEntry={secure}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

function InputWithBtn({ value, onChange, placeholder, btnLabel }: {
  value: string; onChange: (v: string) => void; placeholder: string; btnLabel: string;
}) {
  return (
    <View style={ss.splitRow}>
      <View style={[ss.inputBox, ss.splitInput]}>
        <TextInput
          style={ss.input}
          placeholder={placeholder}
          placeholderTextColor="#D9D9D9"
          autoCapitalize="none"
          value={value}
          onChangeText={onChange}
        />
      </View>
      <TouchableOpacity style={ss.certBtn} activeOpacity={0.8}>
        <Text style={ss.certTxt}>{btnLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

function CheckItem({ label, checked, onToggle, showArrow = false }: {
  label: string; checked: boolean; onToggle: () => void; showArrow?: boolean;
}) {
  return (
    <TouchableOpacity style={ss.checkRow} onPress={onToggle} activeOpacity={0.7}>
      <View style={[ss.checkbox, checked && ss.checkboxOn]}>
        {checked && <View style={ss.checkMark} />}
      </View>
      <Text style={ss.checkTxt}>{label}</Text>
      {showArrow && (
        <Image source={require('../../assets/images/Research/left.png')} style={ss.arrowIcon} resizeMode="contain" />
      )}
    </TouchableOpacity>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface SignupScreenProps {
  onBack: () => void;
}

export default function SignupScreen({ onBack }: SignupScreenProps) {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const [agreeAll, setAgreeAll] = useState(false);
  const [agree14, setAgree14] = useState(false);
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeSms, setAgreeSms] = useState(false);

  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  const bottomPad = isAndroid ? s(40) : insets.bottom + s(40);

  function toggleAll() {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgree14(next);
    setAgreeTerm(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
    setAgreeSms(next);
  }

  return (
    <SafeAreaView style={ss.root} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header onBack={onBack} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[ss.scrollContent, { paddingBottom: bottomPad }]}
          >
            {/* 본인인증하기 */}
            <SectionTitle label="본인인증하기" />

            <View style={ss.fieldWrap}>
              <FieldLabel label="전화번호" />
              <InputWithBtn value={phone} onChange={setPhone} placeholder="전화번호" btnLabel="인증받기" />
            </View>
            <View style={ss.fieldWrap}>
              <FieldLabel label="인증번호" />
              <View style={ss.inputBox}>
                <TextInput
                  style={ss.input}
                  placeholder="인증번호 6자리"
                  placeholderTextColor="#D9D9D9"
                  keyboardType="number-pad"
                  value={code}
                  onChangeText={setCode}
                />
                <Text style={ss.timer}>00:00</Text>
              </View>
            </View>

            {/* 필수정보입력 */}
            <SectionTitle label="필수정보입력" />

            <View style={ss.fieldWrap}>
              <FieldLabel label="이름" />
              <InputRow value={name} onChange={setName} placeholder="홍길동" />
            </View>
            <View style={ss.fieldWrap}>
              <FieldLabel label="이메일" />
              <InputWithBtn value={email} onChange={setEmail} placeholder="이메일" btnLabel="중복확인" />
            </View>
            <View style={ss.fieldWrap}>
              <FieldLabel label="아이디" />
              <InputWithBtn value={userId} onChange={setUserId} placeholder="비밀번호 (대소 영문자/숫자/특수문자 8자)" btnLabel="중복확인" />
            </View>
            <View style={ss.fieldWrap}>
              <FieldLabel label="비밀번호" />
              <InputRow value={password} onChange={setPassword} placeholder="비밀번호 (대소 영문자/숫자/특수문자 8자)" secure />
            </View>
            <View style={ss.fieldWrap}>
              <InputRow value={passwordConfirm} onChange={setPasswordConfirm} placeholder="비밀번호 확인" secure />
            </View>

            {/* 선택사항 */}
            <SectionTitle label="선택사항" />

            <View style={ss.fieldWrap}>
              <FieldLabel label="닉네임" />
              <InputRow value={nickname} onChange={setNickname} placeholder="닉네임" />
            </View>

            {/* 구분선 */}
            <View style={ss.divider} />

            {/* 약관 동의 */}
            <CheckItem label="모두 동의합니다." checked={agreeAll} onToggle={toggleAll} />
            <CheckItem label="[필수] 만14세 이상입니다" checked={agree14} onToggle={() => setAgree14(!agree14)} />
            <CheckItem label="[필수] 서비스 이용약관" checked={agreeTerm} onToggle={() => setAgreeTerm(!agreeTerm)} showArrow />
            <CheckItem label="[필수] 개인정보 수집 및 이용 동의" checked={agreePrivacy} onToggle={() => setAgreePrivacy(!agreePrivacy)} showArrow />
            <CheckItem label="[선택] 마케팅 목적의 개인정보 수집 및 이용" checked={agreeMarketing} onToggle={() => setAgreeMarketing(!agreeMarketing)} showArrow />
            <CheckItem label="[선택] 마케팅 정보 수신 동의(SMS)" checked={agreeSms} onToggle={() => setAgreeSms(!agreeSms)} showArrow />

            {/* 가입하기 버튼 */}
            <TouchableOpacity style={ss.submitBtn} activeOpacity={0.85}>
              <Text style={ss.submitTxt}>가입하기</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
        <AndroidBottomFill />
      </SafeAreaView>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const ss = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: s(20), paddingBottom: s(40) },

  headerWrap: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    height: s(52), paddingHorizontal: s(20),
  },
  backBtn: { position: 'absolute', left: s(20) },
  backIcon: { width: s(24), height: s(24) },
  headerTitle: { fontSize: s(17), fontWeight: '600', color: '#1E1E1E' },

  sectionTitle: { fontSize: s(17), fontWeight: '600', color: '#1E1E1E', marginTop: s(24), marginBottom: s(16) },

  fieldWrap: { marginBottom: s(12) },
  fieldLabel: { fontSize: s(15), fontWeight: '600', color: '#1E1E1E', marginBottom: s(8) },

  splitRow: { flexDirection: 'row', gap: s(10) },
  splitInput: { flex: 1 },

  inputBox: {
    height: s(47), borderWidth: 1, borderColor: '#979797', borderRadius: s(6),
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: s(14),
  },
  input: { flex: 1, fontSize: s(15), fontWeight: '600', color: '#1E1E1E', paddingVertical: 0 },
  timer: { fontSize: s(12), fontWeight: '600', color: '#D9D9D9' },

  certBtn: {
    width: s(94), height: s(47), borderWidth: 1, borderColor: '#979797',
    borderRadius: s(23.5), alignItems: 'center', justifyContent: 'center',
  },
  certTxt: { fontSize: s(15), fontWeight: '500', color: '#1E1E1E' },

  divider: { height: s(5), backgroundColor: '#F4F4F4', marginHorizontal: -s(20), marginVertical: s(20) },

  checkRow: { flexDirection: 'row', alignItems: 'center', gap: s(10), paddingVertical: s(10) },
  checkbox: {
    width: s(20), height: s(20), borderWidth: 1.5, borderColor: '#979797',
    borderRadius: s(3), alignItems: 'center', justifyContent: 'center',
  },
  checkboxOn: { borderColor: '#57677D', backgroundColor: '#57677D' },
  checkMark: { width: s(10), height: s(6), borderBottomWidth: 2, borderLeftWidth: 2, borderColor: '#fff', transform: [{ rotate: '-45deg' }, { translateY: -1 }] },
  checkTxt: { flex: 1, fontSize: s(13), fontWeight: '500', color: '#979797' },
  arrowIcon: { width: s(14), height: s(14), transform: [{ rotate: '180deg' }] },

  submitBtn: {
    width: s(353), height: s(50), backgroundColor: '#57677D', borderRadius: s(50),
    alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: s(24),
  },
  submitTxt: { fontSize: s(14), fontWeight: '600', color: '#fff' },
});
