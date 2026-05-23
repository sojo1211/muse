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

// ── 소셜 로그인 버튼 ──────────────────────────────────────────

const SOCIAL_BUTTONS = [
  { label: '카카오로 시작하기',  icon: require('../../assets/images/login/kk.png') },
  { label: 'Google로 시작하기', icon: require('../../assets/images/login/gg.png') },
  { label: 'NAVER로 시작하기',  icon: require('../../assets/images/login/nn.png') },
  { label: 'Apple로 시작하기',  icon: require('../../assets/images/login/aa.png') },
];

// ── 서브 컴포넌트 ─────────────────────────────────────────────

function Logo() {
  return (
    <View style={ls.logoWrap}>
      <Image
        source={require('../../assets/images/login/pink_logo.png')}
        style={ls.logoImg}
        resizeMode="contain"
      />
      <Text style={ls.subtitle}>공연을 넘어, 인생을 뮤즈로</Text>
    </View>
  );
}

function EmailInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View style={ls.inputBox}>
      <TextInput
        style={ls.input}
        placeholder="이메일 입력"
        placeholderTextColor="#979797"
        keyboardType="email-address"
        autoCapitalize="none"
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

function PasswordInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <View style={ls.inputBox}>
      <TextInput
        style={ls.input}
        placeholder="비밀번호 입력"
        placeholderTextColor="#979797"
        secureTextEntry
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
}

function LoginButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={ls.loginBtn} onPress={onPress} activeOpacity={0.85}>
      <Text style={ls.loginTxt}>로그인</Text>
    </TouchableOpacity>
  );
}

function SocialButton({ label, icon }: { label: string; icon: ReturnType<typeof require> }) {
  return (
    <TouchableOpacity style={ls.socialBtn} activeOpacity={0.8}>
      <Image source={icon} style={ls.socialIcon} resizeMode="contain" />
      <Text style={ls.socialTxt}>{label}</Text>
    </TouchableOpacity>
  );
}

function BottomLinks({ onResetPress, onFindIdPress, onSignupPress }: { onResetPress: () => void; onFindIdPress: () => void; onSignupPress: () => void }) {
  return (
    <View style={ls.bottomRow}>
      <TouchableOpacity onPress={onSignupPress}><Text style={ls.bottomLink}>회원가입</Text></TouchableOpacity>
      <View style={ls.dividerV} />
      <TouchableOpacity onPress={onResetPress}><Text style={ls.bottomLink}>비밀번호 재설정</Text></TouchableOpacity>
      <View style={ls.dividerV} />
      <TouchableOpacity onPress={onFindIdPress}><Text style={ls.bottomLink}>아이디 찾기</Text></TouchableOpacity>
    </View>
  );
}

// ── 메인 ─────────────────────────────────────────────────────

interface LoginScreenProps {
  onBack: () => void;
  onResetPress: () => void;
  onFindIdPress: () => void;
  onSignupPress: () => void;
}

export default function LoginScreen({ onBack, onResetPress, onFindIdPress, onSignupPress }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const insets = useSafeAreaInsets();
  const isAndroid = Platform.OS === 'android';
  const bottomPad = isAndroid ? s(40) : insets.bottom + s(40);

  return (
    <SafeAreaView style={ls.root} edges={['top', 'left', 'right']}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
            bounces={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[ls.scrollContent, { paddingBottom: bottomPad }]}
          >
            {/* 뒤로가기 */}
            <TouchableOpacity style={ls.backBtn} onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Image
                source={require('../../assets/images/Research/left.png')}
                style={ls.backIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <Logo />

            <View style={ls.formWrap}>
              <EmailInput value={email} onChange={setEmail} />
              <PasswordInput value={password} onChange={setPassword} />
              <LoginButton onPress={() => {}} />
            </View>

            <View style={ls.socialWrap}>
              {SOCIAL_BUTTONS.map((btn, i) => (
                <SocialButton key={i} {...btn} />
              ))}
            </View>

            <BottomLinks onResetPress={onResetPress} onFindIdPress={onFindIdPress} onSignupPress={onSignupPress} />
          </ScrollView>
        </KeyboardAvoidingView>
        <AndroidBottomFill />
      </SafeAreaView>
  );
}

// ── 스타일 ───────────────────────────────────────────────────

const ls = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: s(40) },

  backBtn: { position: 'absolute', top: s(16), left: s(20), zIndex: 10 },
  backIcon: { width: s(24), height: s(24) },

  logoWrap: { alignItems: 'center', marginTop: s(100), marginBottom: s(36) },
  logoImg: { width: s(150), aspectRatio: 178 / 64 },
  subtitle: { fontSize: s(15), fontWeight: '600', color: '#000', marginTop: s(10) },

  formWrap: { alignItems: 'center', gap: s(12), marginBottom: s(28) },
  inputBox: {
    width: s(320),
    height: s(48),
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: s(50),
    justifyContent: 'center',
    paddingHorizontal: s(20),
    backgroundColor: '#fff',
  },
  input: { fontSize: s(12), color: '#1E1E1E', paddingVertical: 0 },

  loginBtn: {
    width: s(320),
    height: s(48),
    backgroundColor: '#57677D',
    borderRadius: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: s(8),
  },
  loginTxt: { fontSize: s(13), fontWeight: '600', color: '#fff' },

  socialWrap: { alignItems: 'center', gap: s(12), marginBottom: s(28) },
  socialBtn: {
    width: s(320),
    height: s(48),
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: s(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  socialIcon: { width: s(20), height: s(20), position: 'absolute', left: s(24) },
  socialFullImg: { height: s(20), aspectRatio: 138 / 22 },
  socialNaverImg: { height: s(28), aspectRatio: 138 / 22 },
  socialTxt: { fontSize: s(13), fontWeight: '500', color: '#1E1E1E' },

  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(10),
  },
  bottomLink: { fontSize: s(12), color: '#979797' },
  dividerV: { width: 0.5, height: s(10), backgroundColor: '#979797' },
});
