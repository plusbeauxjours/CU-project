import React, {useEffect, useRef} from 'react';
import {Easing, TextInput, Animated, View, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default ({
  percentage,
  radius = 100,
  strokeWidth = 60,
  delay = 500,
  duration = 700,
  color,
  max,
}) => {
  const animated = useRef(new Animated.Value(0)).current;
  const circleRef = useRef(null);
  const inputRef = useRef(null);
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = (toValue) => {
    return Animated.timing(animated, {
      delay,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animated.addListener(
      (v) => {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circumference - (circumference * maxPerc) / 100;
        if (inputRef?.current) {
          inputRef.current.setNativeProps({
            text: `${Math.round(v.value)}%`,
          });
        }
        if (circleRef?.current) {
          circleRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [percentage],
    );

    return () => {
      animated.removeAllListeners();
    };
  });

  return (
    // <View>
    <Svg
      height={radius * 2}
      width={radius * 2}
      viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
      <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
        <Circle
          ref={circleRef}
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDashoffset={circumference}
          strokeDasharray={circumference}
        />
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeOpacity=".1"
        />
      </G>
    </Svg>
    //     <AnimatedTextInput
    //       ref={inputRef}
    //       underlineColorAndroid="transparent"
    //       editable={false}
    //       defaultValue="0"
    //       style={[
    //         StyleSheet.absoluteFillObject,
    //         {fontSize: 40, color},
    //         styles.text,
    //       ]}
    //     />
    //   </View>
  );
};

const styles = StyleSheet.create({
  text: {fontWeight: 'bold', textAlign: 'center'},
});
