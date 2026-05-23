import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, View } from 'react-native';

interface Props {
  style?: object;
}

export default function AnimatedRibbon({ style }: Props) {
  const anim = useRef(new Animated.Value(0)).current;
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (size.width === 0) return;
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 2200,
      delay: 300,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [size.width]);

  const animatedWidth = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, size.width],
  });

  return (
    <View
      style={style}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ width, height });
      }}
    >
      <Animated.View style={{ width: animatedWidth, height: size.height, overflow: 'hidden' }}>
        <Image
          source={require('../../assets/images/Onboarding/ribbon.png')}
          style={{ width: size.width, height: size.height }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}
