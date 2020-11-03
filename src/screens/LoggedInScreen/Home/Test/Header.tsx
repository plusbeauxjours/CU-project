import React, {RefObject} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useValue, withTimingTransition} from 'react-native-redash';
import {useSafeArea} from 'react-native-safe-area-context';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

import TabHeader from './TabHeader';
import {TabModel} from './Content';
import {HomeIcon} from '../../../../constants/Icons';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const {interpolate, Extrapolate, useCode, greaterThan, set, block} = Animated;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  title: {
    fontFamily: 'UberMoveMedium',
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1,
  },
});

interface HeaderProps {
  y: Animated.Value<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
}

export default ({y, tabs, scrollView}: HeaderProps) => {
  const toggle = useValue<0 | 1>(0);
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, {duration: 100});
  const {top: paddingTop} = insets;
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, 300))]), [toggle, y]);
  return (
    <Animated.View style={[styles.container, {paddingTop}]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: 'white',
        }}
      />
      <TabHeader {...{y, transition, tabs, scrollView}} />
    </Animated.View>
  );
};
