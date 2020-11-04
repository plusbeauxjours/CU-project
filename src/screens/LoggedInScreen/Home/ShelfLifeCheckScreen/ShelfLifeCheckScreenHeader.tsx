import React, {RefObject} from 'react';
import Animated from 'react-native-reanimated';
import {useValue, withTimingTransition} from 'react-native-redash';
import {useSafeArea} from 'react-native-safe-area-context';

import ShelfLifeCheckScreenTabHeader from './ShelfLifeCheckScreenTabHeader';
import styled from 'styled-components/native';

interface TabModel {
  name: string;
  anchor: number;
}

export const MIN_HEADER_HEIGHT = 45;
const {useCode, greaterThan, set, block} = Animated;

const HeaderBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 50px;
  flex-direction: row;
  background-color: white;
  align-items: center;
`;

const HeaderContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

interface HeaderProps {
  y: Animated.Value<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
}

export default ({y, tabs, scrollView}: HeaderProps) => {
  const toggle = useValue<number>(0);
  const insets = useSafeArea();
  const transition = withTimingTransition(toggle, {duration: 200});
  const {top: paddingTop} = insets;
  const opacity = transition;
  useCode(() => block([set(toggle, greaterThan(y, 400))]), [toggle, y]);
  return (
    <HeaderContainer as={Animated.View} style={{paddingTop}}>
      <HeaderBackground as={Animated.View} style={{opacity}} />
      <ShelfLifeCheckScreenTabHeader
        y={y}
        transition={transition}
        tabs={tabs}
        scrollView={scrollView}
      />
    </HeaderContainer>
  );
};
