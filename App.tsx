import {
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
    useFonts
} from '@expo-google-fonts/inter';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainScreen from './components/MainPage/MainScreen';
import OnboardingScreen from './components/OnboardingPage/OnboardingScreen';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });

  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    if (!fontsLoaded) return;
    const timer = setTimeout(() => setShowOnboarding(false), 2000);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      {showOnboarding ? <OnboardingScreen /> : <MainScreen />}
    </SafeAreaProvider>
  );
}
