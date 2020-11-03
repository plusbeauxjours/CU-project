import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl, FlatList} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import moment from 'moment';

import DonutCard from '~/components/DonutCard';
import MainDonut from '~/components/MainDonut';
import ShelfLifeCheckScreenCard from './ShelfLifeCheckScreenCard';

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
  height: 160px;
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

const Text = styled.Text`
  font-size: 12px;
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

const Line = styled.View<IColor>`
  width: 100%;
  height: 1px;
  padding-right: 20px;
  background-color: ${(props) => props.color};
`;

const LineContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-end;
  height: 20px;
  width: ${wp('100%') - 180}px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const LineTextContainer = styled.View<IColor>`
  border-color: ${(props) => props.color};
  border-width: 1px;
  border-radius: 10px;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
`;

const LineText = styled.Text<IColor>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color};
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
}) => {
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
            {monthBefore.map((item, index) => {
              return (
                <>
                  <VerticalLine />
                  {index == 0 && (
                    <LineContainer>
                      <Line color={'red'} />
                      <LineTextContainer color={'red'}>
                        <LineText color={'red'}>1일전</LineText>
                      </LineTextContainer>
                    </LineContainer>
                  )}
                  {index == dayBefore.length && (
                    <LineContainer>
                      <Line color={'#000'} />
                      <LineTextContainer color={'#000'}>
                        <LineText color={'#000'}>1주전</LineText>
                      </LineTextContainer>
                    </LineContainer>
                  )}
                  {index == weekBefore.length && (
                    <LineContainer>
                      <Line color={'#000'} />
                      <LineTextContainer color={'#000'}>
                        <LineText color={'#000'}>2주전</LineText>
                      </LineTextContainer>
                    </LineContainer>
                  )}
                  {index == weeksBefore.length && (
                    <LineContainer>
                      <Line color={'#000'} />
                      <LineTextContainer color={'#000'}>
                        <LineText color={'#000'}>1달전</LineText>
                      </LineTextContainer>
                    </LineContainer>
                  )}
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
        </ScrollView>
      </BackGround>
    );
  } else {
    return null;
  }
};
