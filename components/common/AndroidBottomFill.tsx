import { Platform, View, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SW } = Dimensions.get('window');
const s = (v: number) => (v * SW) / 393;

export default function AndroidBottomFill() {
  const insets = useSafeAreaInsets();
  if (Platform.OS !== 'android') return null;
  return <View style={{ height: Math.max(insets.bottom, s(20)), backgroundColor: '#000' }} />;
}
