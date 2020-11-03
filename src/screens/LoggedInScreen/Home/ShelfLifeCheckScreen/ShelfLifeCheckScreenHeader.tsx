import React, {RefObject} from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated from 'react-native-reanimated';
import {useValue, withTimingTransition} from 'react-native-redash';
import {useSafeArea} from 'react-native-safe-area-context';

import ShelfLifeCheckScreenTabHeader from './ShelfLifeCheckScreenTabHeader';

interface TabModel {
  name: string;
  anchor: number;
}

const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;
const {useCode, greaterThan, set, block} = Animated;

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
  const toggle = useValue<number>(0);
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, {duration: 300});
  const {top: paddingTop} = insets;
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, 400))]), [toggle, y]);
  return (
    <Animated.View style={[styles.container, {paddingTop}]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: 'white',
        }}
      />
      <Text>jifjdifji</Text>
      <Text>jifjdifji</Text>
      <Text>jifjdifji</Text>
      <Text>jifjdifji</Text>
      {/* <ShelfLifeCheckScreenTabHeader {...{y, transition, tabs, scrollView}} /> */}
    </Animated.View>
  );
};
