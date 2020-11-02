import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl, Animated, FlatList, TextInput} from 'react-native';
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

interface ICard {
  color: string;
  index?: string;
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
  height: 160px;
  border-radius: 20px;
  padding: 10px;
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
  align-items: center;
`;

const SpaceRow = styled(Row)`
  width: 80px;
  justify-content: space-between;
`;

const WideSpaceRow = styled(SpaceRow)`
  width: 110px;
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

const Card = styled.TouchableOpacity<ICard>`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 280px;
  border-radius: 20px;
  background-color: ${(props) => props.color};
  margin-left: 20px;
  margin-right: ${(props) => (props.index == 3 ? 20 : 0)};
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

const SectionTitle = styled(TitleWord)`
  margin-top: 10px;
  text-align: right;
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
  font-size: 12px;
`;

const SmallBold = styled(SmallText)<IColor>`
  font-weight: bold;
`;

const Donut = styled.View`
  position: absolute;
  top: 80px;
  left: 80px;
`;

const Column = styled.View`
  position: absolute;
  right: 30px;
  top: 70px;
  flex-direction: column;
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
  if (!loading && data?.length > 0) {
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
              {data && (
                <Donut>
                  <MainDonut
                    percentage={data[0].totalQTY}
                    color={data[0].textColor}
                    radius={data[0].radius}
                    max={data[3].totalQTY}
                  />
                  <MainDonut
                    percentage={data[1].totalQTY}
                    color={data[1].textColor}
                    radius={data[1].radius}
                    max={data[3].totalQTY}
                  />
                  <MainDonut
                    percentage={data[2].totalQTY}
                    color={data[2].textColor}
                    radius={data[2].radius}
                    max={data[3].totalQTY}
                  />
                  <MainDonut
                    percentage={data[3].totalQTY}
                    color={data[3].textColor}
                    radius={data[3].radius}
                    max={data[3].totalQTY}
                  />
                </Donut>
              )}
              <SectionTitle color={data[3].textColor}>
                유통기한 등록 상품&nbsp;
              </SectionTitle>
              <Column>
                <WideSpaceRow>
                  <SmallText
                    color={data[0].textColor}
                    style={{fontWeight: 'bold'}}>
                    1일전 전체 수량
                  </SmallText>
                  <SmallBold color={data[0].textColor}>
                    {data[0].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
                <WideSpaceRow>
                  <SmallText color={data[3].textColor}>
                    1주전 전체 수량
                  </SmallText>
                  <SmallBold color={data[3].textColor}>
                    {data[1].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
                <WideSpaceRow>
                  <SmallText color={data[3].textColor}>
                    2주전 전체 수량
                  </SmallText>
                  <SmallBold color={data[3].textColor}>
                    {data[2].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
                <WideSpaceRow>
                  <SmallText color={data[3].textColor}>
                    1달전 전체 수량
                  </SmallText>
                  <SmallBold color={data[3].textColor}>
                    {data[3].totalQTY}&nbsp;개
                  </SmallBold>
                </WideSpaceRow>
              </Column>
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
                index={index}
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
                      <SmallBold color={item.textColor}>
                        {item.totalQTY}
                      </SmallBold>
                      &nbsp;개
                    </SmallText>
                  </SpaceRow>
                  <SpaceRow>
                    <SmallText color={item.textColor}>처리 수량</SmallText>
                    <SmallText color={item.textColor}>
                      <SmallBold color={item.textColor}>
                        {item.doneQTY}
                      </SmallBold>
                      &nbsp;개
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
