import React, {RefObject, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

interface TabModel {
  name: string;
  color?: string;
  anchor: number;
}

interface IColor {
  color: string;
}

interface TabProps {
  color: string;
  name: string;
  onMeasurement?: (measurement: number) => void;
}

interface TabsProps {
  tabs: TabModel[];
  onMeasurement?: (index: number, measurement: number) => void;
}

interface TabHeaderProps {
  transition: Animated.Node<number>;
  y: Animated.Node<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
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

const IndicatorBody = styled.View<IColor>`
  position: absolute;
  width: 65px;
  height: 4px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
  bottom: 0px;
`;

const LineTextContainer = styled.TouchableOpacity<IColor>`
  align-self: flex-end;
  background-color: white;
  border-color: ${(props) => props.color};
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
  color: ${(props) => props.color};
`;

export default ({transition, y, tabs, scrollView}: TabHeaderProps) => {
  const [measurements, setMeasurements] = useState<number[]>(
    new Array(tabs?.length).fill(0),
  );
  const opacity = transition;

  const Tab = ({name, color}: TabProps) => {
    return (
      <LineTextContainer onPress={() => console.log('kokoko')} color={color}>
        <LineText color={color}>{name}</LineText>
      </LineTextContainer>
    );
  };

  const TabsContainer = ({tabs}) => {
    return (
      <Row>
        {tabs?.map((tab, index) => (
          <Tab
            key={index}
            color={index === 0 ? '#ea1901' : '#aace36'}
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
        <TabsContainer {...{tabs}} />
      </Animated.View>
    </ListContainer>
  );
};
