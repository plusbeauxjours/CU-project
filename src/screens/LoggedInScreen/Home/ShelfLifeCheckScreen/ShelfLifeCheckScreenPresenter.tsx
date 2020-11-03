import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl, FlatList, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';

import DonutCard from '~/components/DonutCard';
import MainDonut from '~/components/MainDonut';
import ShelfLifeCheckScreenCard from './ShelfLifeCheckScreenCard';
import ShelfLifeCheckScreenHeader from './ShelfLifeCheckScreenHeader';

interface IColor {
  color: string;
}

interface ICard {
  color: string;
  index?: number;
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
  height: 140px;
  border-radius: 20px;
  padding: 10px;
  background-color: white;
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

const Card = styled(Ripple)<ICard>`
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
  top: 70px;
  left: 100px;
`;

const Column = styled.View`
  width: 100%;
  position: absolute;
  align-items: flex-end;
  right: 50px;
  top: 30px;
  flex-direction: column;
`;

const LineTextContainer = styled.View<IColor>`
  align-self: flex-end;
  border-color: ${(props) => props.color};
  border-width: 1px;
  border-radius: 10px;
  padding: 0 15px;
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

const MainDonutText = styled(LineText)<IColor>`
  text-align: right;
  margin-bottom: 10px;
`;

const VerticalLine = styled.View`
  width: 0.6px;
  left: 50px;
  background-color: #ddd;
  position: absolute;
  height: 100%;
  top: 140px;
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
  tabs,
  scrollView,
  onScroll,
  opacity,
  y,
}) => {
  if (!loading && data?.length > 0) {
    return (
      <BackGround>
        <Animated.ScrollView
          ref={scrollView}
          style={StyleSheet.absoluteFill}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          scrollEventThrottle={1}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh('firstRoute')}
            />
          }
          {...{onScroll}}>
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
              <Column>
                <MainDonutText color={data[3].textColor}>
                  유통기한 등록 상품&nbsp;
                </MainDonutText>
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
                onPress={() => {}}
                rippleColor={'#666'}
                rippleDuration={600}
                rippleSize={1700}
                rippleContainerBorderRadius={20}
                rippleOpacity={0.1}>
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
            {monthBefore.map((item, index) => {
              return (
                <>
                  <VerticalLine />
                  <Animated.View style={[{opacity}, {width: '100%'}]}>
                    {index == 0 && (
                      <LineTextContainer color={'red'}>
                        <LineText color={'red'}>1일전</LineText>
                      </LineTextContainer>
                    )}
                    {index == dayBefore.length && (
                      <LineTextContainer color={'#000'}>
                        <LineText color={'#000'}>1주전</LineText>
                      </LineTextContainer>
                    )}
                    {index == weekBefore.length && (
                      <LineTextContainer color={'#000'}>
                        <LineText color={'#000'}>2주전</LineText>
                      </LineTextContainer>
                    )}
                    {index == weeksBefore.length && (
                      <LineTextContainer color={'#000'}>
                        <LineText color={'#000'}>1달전</LineText>
                      </LineTextContainer>
                    )}
                  </Animated.View>
                  <ShelfLifeCheckScreenCard
                    item={item}
                    key={index}
                    confirmModal={confirmModal}
                    cancelModal={cancelModal}
                  />
                </>
              );
            })}
          </Container>
        </Animated.ScrollView>
        <ShelfLifeCheckScreenHeader {...{y, scrollView}} />
      </BackGround>
    );
  } else {
    return null;
  }
};
