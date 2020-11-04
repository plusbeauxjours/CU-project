import React, {useState} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {Platform, StyleSheet, View} from 'react-native';

import Animated, {
  Value,
  and,
  block,
  cond,
  greaterOrEq,
  interpolate,
  lessOrEq,
  set,
  useCode,
} from 'react-native-reanimated';
import MaskedView from '@react-native-community/masked-view';
import {withTransition} from 'react-native-redash';
import Tabs from '../Test/Tabs';

interface TabModel {
  name: string;
  color?: string;
  anchor: number;
}

interface IColor {
  color: string;
  isSelectedCategory: boolean;
}

interface TabProps {
  color: string;
  name: string;
  index: number;
  selectedCategory: number;
  gotoCategory: (index: number) => void;
}

interface TabsProps {
  tabs: TabModel[];
}

interface TabHeaderProps {
  transition: Animated.Node<number>;
  tabs: TabModel[];
  selectedCategory: number;
  gotoCategory: (index: number) => void;
}

const ListContainer = styled.View`
  height: 50px;
  flex-direction: row;
  width: 100%;
  left: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  width: ${wp('100%') - 40}px;
  justify-content: space-between;
  bottom: 20px;
`;

const LineTextContainer = styled.TouchableOpacity<IColor>`
  align-self: flex-end;
  background-color: white;
  border-color: ${(props) => props.color};
  background-color: ${(props) =>
    props.isSelectedCategory ? props.color : 'transparent'};
  border-width: 1px;
  border-radius: 15px;
  padding: 5px 15px;
  height: 30px;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 10px;
`;

const LineText = styled.Text<IColor>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isSelectedCategory ? 'white' : props.color)};
`;

export default ({
  transition,
  tabs,
  selectedCategory,
  gotoCategory,
}: TabHeaderProps) => {
  const opacity = transition;

  const Tab = ({
    name,
    index,
    selectedCategory,
    color,
    gotoCategory,
  }: TabProps) => {
    return (
      <LineTextContainer
        onPress={() => gotoCategory(index)}
        color={color}
        isSelectedCategory={index === selectedCategory}>
        <LineText color={color} isSelectedCategory={index === selectedCategory}>
          {name}
        </LineText>
      </LineTextContainer>
    );
  };

  const TabsContainer = ({tabs}) => {
    return (
      <Row>
        {tabs?.map((tab, index) => (
          <Tab
            key={index}
            index={index}
            selectedCategory={selectedCategory}
            color={index === 0 ? '#ea1901' : '#aace36'}
            gotoCategory={gotoCategory}
            {...tab}
          />
        ))}
      </Row>
    );
  };

  return (
    <ListContainer as={Animated.View} style={{opacity}}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
        }}>
        <TabsContainer {...{tabs}} gotoCategory={gotoCategory} />
      </Animated.View>
    </ListContainer>
  );
};
