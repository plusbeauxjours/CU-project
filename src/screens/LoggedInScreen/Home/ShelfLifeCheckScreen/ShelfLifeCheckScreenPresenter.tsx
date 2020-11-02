import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {RefreshControl, Animated, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CheckMarkIcon, DownIcon} from '~/constants/Icons';
import moment from 'moment';
import DonutCard from '~/components/DonutCard';
import MainDonut from '~/components/MainDonut';

interface IsChecked {
  isChecked: boolean;
}

interface IColor {
  color: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  height: 200px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const View = styled.View``;
const KnobIconContainer = styled.View`
  width: 70px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #aace36;
`;

const RenderEmpty = styled.View`
  flex: 1;
  margin-top: 30px;
  border-top-width: 1px;
  border-color: #ddd;
`;

const Item = styled.TouchableOpacity<IsChecked>`
  margin: 10px 0;
  background-color: ${(props) => (props.isChecked ? '#ddd' : '#fff')};
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  height: 150px;
`;

const IconContainer = styled.View<IsChecked>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isChecked ? '#ddd' : '#000')};
`;

const Row = styled.View`
  flex-direction: row;
`;

const SpaceRow = styled(Row)`
  width: 100px;
  justify-content: space-between;
`;

const Text = styled.Text`
  font-size: 12px;
`;

const Bold = styled(Text)`
  font-weight: bold;
`;

const TextContainer = styled.View`
  margin-top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 10px;
`;

const Name = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 0.6px;
  background-color: #aaa;
`;

const Date = styled.View`
  margin-top: 10px;
  align-items: flex-end;
`;

const DateText = styled.Text`
  color: #aaa;
`;

const Card = styled.TouchableOpacity<IColor>`
  justify-content: center;
  align-items: center;
  width: 240px;
  height: 300px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  margin-left: 20px;
  &:first-child {
    background-color: red;
  }
`;

const Title = styled.View`
  flex-direction: row;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 10px;
`;

const TitleNumber = styled.Text<IColor>`
  color: ${(props) => props.color};
  font-size: 60px;
  font-weight: bold;
`;

const TitleWord = styled(TitleNumber)`
  color: ${(props) => props.color};
  margin-top: 12px;
  font-size: 30px;
`;

const PercentageText = styled.Text<IColor>`
  color: ${(props) => props.color};
  font-size: 40px;
  font-weight: bold;
  position: absolute;
`;

const Footer = styled.View`
  bottom: 10px;
  position: absolute;
  right: 20px;
`;

const SmallText = styled.Text<IColor>`
  color: ${(props) => props.color};
  font-size: 16px;
`;

const Donut = styled.View`
  position: absolute;
  top: 100px;
  left: 100px;
`;

export default ({
  SHELFLIFE_DATA,
  onDayPress,
  onRefresh,
  confirmModal,
  cancelModal,
  dayBefore,
  weekBefore,
  weeksBefore,
  monthBefore,
  loading,
  data,
  refreshing,
}) => {
  const inputRef = useRef(null);
  const navigation = useNavigation();
  const renderEmptyDate = () => <RenderEmpty />;
  const rowHasChanged = (r1, r2) => r1 !== r2;
  const renderKnob = () => (
    <KnobIconContainer>
      <DownIcon />
    </KnobIconContainer>
  );

  const renderItem = (item: any) => {
    const {
      shelfLife_SEQ,
      shelfLifeName,
      shelfLifeDate,
      checkTime,
      checkEmpName,
      shelfLifeMemo,
      checkType,
    } = item;
    return (
      <Item
        isChecked={checkType !== '0'}
        onPress={() =>
          navigation.navigate('ShelfLifeUpdateScreen', {
            shelfLife_SEQ,
            shelfLifeName,
            shelfLifeDate,
            shelfLifeMemo,
          })
        }>
        <Name>
          <NameText>{shelfLifeName}</NameText>
          <Touchable
            onPress={() => {
              if (checkType == '0') {
                confirmModal(shelfLife_SEQ, shelfLifeDate);
              } else {
                cancelModal(shelfLife_SEQ, shelfLifeDate);
              }
            }}>
            <IconContainer isChecked={checkType == '0'}>
              <CheckMarkIcon
                size={12}
                color={checkType == '0' ? '#bbb' : 'yellow'}
              />
            </IconContainer>
          </Touchable>
        </Name>
        <Date>
          <DateText>
            {shelfLifeDate.slice(0, 4)}년 {shelfLifeDate.slice(5, 7)}월
            {shelfLifeDate.slice(8, 10)}일
          </DateText>
        </Date>
        {(checkType == '1' || shelfLifeMemo !== '') && <Line />}
        {shelfLifeMemo !== '0' && (
          <TextContainer>
            <Text>{shelfLifeMemo}</Text>
          </TextContainer>
        )}
        {checkType !== '0' && (
          <TextContainer>
            <Row>
              <Text>처리직원: </Text>
              <Bold>{checkEmpName}</Bold>
            </Row>
            <Row>
              <Text>처리시간: </Text>
              <Bold>{moment(checkTime).format('YYYY.MM.DD HH:mm:ss')}</Bold>
            </Row>
          </TextContainer>
        )}
      </Item>
    );
  };
  if (!loading) {
    return (
      <BackGround>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh('firstRoute')}
            />
          }>
          <Container>
            <Section>
              <Donut>
                {data?.map((item, index) => {
                  return (
                    <MainDonut
                      key={index}
                      percentage={item.percentage}
                      color={item.textColor}
                      textColor={'red'}
                      radius={item.radius}
                      max={100}
                    />
                  );
                })}
              </Donut>
            </Section>
          </Container>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Card
                color={item.backgroundColor}
                key={index}
                onPress={() => console.log('lplplplplp898989')}>
                <Title>
                  <TitleNumber color={item.textColor}>
                    {item.titleNumber}
                  </TitleNumber>
                  <TitleWord color={item.textColor}>{item.titleWord}</TitleWord>
                </Title>
                <DonutCard
                  percentage={item.percentage}
                  color={item.textColor}
                  max={100}
                />
                <PercentageText color={item.textColor}>
                  {item.percentage}%
                </PercentageText>
                <Footer>
                  <SpaceRow>
                    <SmallText color={item.textColor}>전체 수량</SmallText>
                    <SmallText color={item.textColor}>
                      {item.totalQTY} 개
                    </SmallText>
                  </SpaceRow>
                  <SpaceRow>
                    <SmallText color={item.textColor}>처리 수량</SmallText>
                    <SmallText color={item.textColor}>
                      {item.doneQTY} 개
                    </SmallText>
                  </SpaceRow>
                </Footer>
              </Card>
            )}
          />
          <Container>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
            <Text>FFFFEDDDD</Text>
          </Container>
        </ScrollView>
      </BackGround>
    );
  } else {
    return null;
  }
};
