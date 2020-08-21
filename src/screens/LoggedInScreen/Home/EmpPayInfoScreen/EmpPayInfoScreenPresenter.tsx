import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import utils from '../../../../constants/utils';
import EmpPayInfoCard1 from './EmpPayInfoCard1';
import EmpPayInfoCard2 from './EmpPayInfoCard2';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;
const TopArea = styled.View`
  width: 100%;
  border-radius: 20px;
  background-color: white;
`;
const Profile = styled.View`
  flex: 1;
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 20px;
  margin-right: 3px;
  color: #642a8c;
  justify-content: flex-end;
`;

const GreyText = styled.Text`
  margin-right: 5px;
  color: #999;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateArrow = styled.TouchableOpacity`
  width: ${wp('10%')};
  height: ${wp('10%')};
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const Date = styled.View`
  flex: 1;
  align-items: center;
`;

const DateText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const DateReload = styled.TouchableOpacity`
  margin-right: 5px;
  width: ${wp('10%')}px;
  height: ${wp('10%')}px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const DateBox = styled(Row)`
  padding: 20px 15px;
`;

const Section = styled.View`
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const CardBox = styled.View`
  flex: 1;
  margin-top: 20px;
  align-items: center;
`;

const Box = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitle = styled.View`
  align-items: flex-start;
  justify-content: center;
`;

const BoxTitleText = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #642a8c;
`;
const DetailRowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 5px 20px;
  align-items: center;
  justify-content: space-between;
`;
const DetailRowText = styled.Text`
  font-size: 15px;
  color: #999;
`;

const BoxButton = styled.TouchableOpacity`
  width: ${wp('25%')}px;
  padding: 10px 0;
  border-radius: 30px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const BoxButtonText = styled.Text`
  font-size: 15px;
`;

const PayInfoBox = styled.View`
  margin-top: 10px;
  align-items: center;
  border-color: #bbb;
  border-width: 1px;
`;
const MainPayBox = styled.View`
  padding: 20px;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const MainPayBoxText = styled.Text`
  font-size: 23px;
`;

const DetailBox = styled.View`
  width: 100%;
`;
const Line = styled.View`
  height: 1px;
  background-color: #bbb;
`;
const ToggleIcon = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Footer = styled.View`
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`;
const FooterBtn = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  padding: 15px 10px;
  border-radius: 10px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export default ({
  NAME,
  maindata,
  PAY_TYPE,
  backpay,
  replaceAll,
  nextpay,
  STORE,
  STOREPAY_SHOW,
  IMAGE,
  ISMANAGER,
  boxButton,
  setBoxButton,
  boxButton2,
  setBoxButton2,
  onRefresh,
  numberComma,
  click1,
  click2,
  click3,
  click4,
  click5,
  cardShow,
  setClick1,
  setClick2,
  setClick3,
  setClick4,
  setClick5,
  setCardShow,
  onPressFooter,
}) => {
  const MainBoxContainer = ({text, onPress, boxButton}) => (
    <Box>
      <BoxTitle>
        <BoxTitleText>{text}</BoxTitleText>
      </BoxTitle>
      <BoxButton onPress={onPress}>
        {boxButton ? (
          <BoxButtonText>접기</BoxButtonText>
        ) : (
          <BoxButtonText>자세히보기</BoxButtonText>
        )}
      </BoxButton>
    </Box>
  );

  const DetailListRow = ({text, value}) => (
    <DetailRowContainer>
      <DetailRowText>{text}</DetailRowText>
      <DetailRowText>{value} 원</DetailRowText>
    </DetailRowContainer>
  );

  const MainInfoOfPay = ({text, value, click, onPress}) => (
    <DetailRowContainer>
      <ToggleIcon onPress={onPress}>
        {click ? (
          <Icon name="caret-up" size={22} color="#BCC5D3" />
        ) : (
          <Icon name="caret-down" size={22} color="#777" />
        )}
        <DetailRowText>{text}</DetailRowText>
      </ToggleIcon>
      <DetailRowText>{value} 원</DetailRowText>
    </DetailRowContainer>
  );

  const TopAreaContainer = () => (
    <TopArea>
      <Profile>
        <NameText>{NAME}</NameText>
        <GreyText>[{ISMANAGER}]</GreyText>
        <GreyText>님의 급여정보</GreyText>
      </Profile>
      <DateBox>
        <DateArrow onPress={() => backpay()}>
          <Icon
            name={
              utils.isAndroid
                ? 'md-chevron-back-outline'
                : 'ios-chevron-back-outline'
            }
            size={22}
            color="#bbb"
          />
        </DateArrow>
        <Date>
          <DateText>
            {replaceAll(maindata.START_DAY)} ~ {replaceAll(maindata.END_DAY)}
          </DateText>
        </Date>
        <DateReload onPress={() => onRefresh()}>
          <Icon name="reload-outline" size={26} />
        </DateReload>
        <DateArrow onPress={() => nextpay()}>
          <Icon
            name={
              utils.isAndroid
                ? 'md-chevron-forward-outline'
                : 'ios-chevron-forward-outline'
            }
            size={22}
            color="#bbb"
          />
        </DateArrow>
      </DateBox>
    </TopArea>
  );

  const DetailAreaContainer = ({totalearned}) => (
    <>
      <MainInfoOfPay
        text={'4대보험 근로자부담금'}
        value={`(-)${numberComma(maindata.fourtotal)}`}
        click={click2}
        onPress={() => setClick2(!click2)}
      />
      {click2 && (
        <DetailBox>
          <DetailListRow
            text={'국민연금'}
            value={`(-)${numberComma(maindata.pension_pay)}`}
          />
          <DetailListRow
            text={'건강보험'}
            value={`(-)${numberComma(maindata.health_pay)}`}
          />
          <DetailListRow
            text={'장기요양'}
            value={`(-)${numberComma(maindata.health2_pay)}`}
          />
          <DetailListRow
            text={'고용보험'}
            value={`(-)${numberComma(maindata.employment_pay)}`}
          />
        </DetailBox>
      )}
      <MainInfoOfPay
        text={'원천세'}
        value={`(-)${numberComma(totalearned)}`}
        click={click3}
        onPress={() => setClick3(!click3)}
      />
      {click3 && (
        <DetailBox>
          <DetailListRow
            text={'소득세'}
            value={`(-)${numberComma(maindata.earned)}`}
          />
          <DetailListRow
            text={'지방소득세'}
            value={`(-)${numberComma(maindata.earned2)}`}
          />
        </DetailBox>
      )}
    </>
  );

  if (PAY_TYPE == '2') {
    const totalearned = maindata.earned + maindata.earned2;
    const emptotal = maindata.realtotal - maindata.fourtotal - totalearned;
    const ownertotal =
      emptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;
    return (
      <BackGround>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <TopAreaContainer />

            {(STORE == '1' || STOREPAY_SHOW == '1') && (
              <Section>
                <MainBoxContainer
                  text={'고용주 지출액'}
                  onPress={() => setBoxButton(!boxButton)}
                  boxButton={boxButton}
                />
                <PayInfoBox>
                  <MainPayBox>
                    <MainPayBoxText>
                      {numberComma(ownertotal)} 원
                    </MainPayBoxText>
                  </MainPayBox>
                  {boxButton && (
                    <DetailBox>
                      <Line />
                      <DetailListRow
                        text={'급여지급액'}
                        value={numberComma(emptotal)}
                      />
                      <DetailListRow
                        text={'4대보험 고용주부담금'}
                        value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                      />
                      <DetailListRow
                        text={'4대보험 근로자부담금'}
                        value={`(+) ${numberComma(maindata.fourtotal)}`}
                      />
                      <DetailListRow
                        text={'원천세'}
                        value={`(+) ${numberComma(totalearned)}`}
                      />
                    </DetailBox>
                  )}
                </PayInfoBox>
              </Section>
            )}

            <Section>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <MainBoxContainer
                  text={'근로자 수령액(월급)'}
                  onPress={() => setBoxButton2(!boxButton2)}
                  boxButton={boxButton2}
                />
              ) : (
                <Box>
                  <BoxTitle>
                    <BoxTitleText>근로자 수령액(월급)</BoxTitleText>
                  </BoxTitle>
                </Box>
              )}
              <PayInfoBox>
                <MainPayBox>
                  <MainPayBoxText>{numberComma(emptotal)} 원</MainPayBoxText>
                </MainPayBox>
                {boxButton2 && (
                  <DetailBox>
                    <Line />
                    <MainInfoOfPay
                      text={'공제전 금액'}
                      value={numberComma(maindata.realtotal)}
                      click={click1}
                      onPress={() => setClick1(!click1)}
                    />
                    {click1 && (
                      <DetailBox>
                        <DetailListRow
                          text={'기본급'}
                          value={numberComma(maindata.PAY)}
                        />
                        <DetailListRow
                          text={'식대'}
                          value={numberComma(maindata.MEALS)}
                        />
                        <DetailListRow
                          text={'자가운전'}
                          value={numberComma(maindata.SELF_DRIVING)}
                        />
                        <DetailListRow
                          text={'상여'}
                          value={numberComma(maindata.BONUS)}
                        />
                        <DetailListRow
                          text={'성과급'}
                          value={numberComma(maindata.INCENTIVE)}
                        />
                      </DetailBox>
                    )}
                    <DetailAreaContainer totalearned={totalearned} />
                  </DetailBox>
                )}
              </PayInfoBox>
            </Section>
          </Container>
        </ScrollView>
      </BackGround>
    );
  } else if (PAY_TYPE == '0') {
    const totalearned = maindata.earned + maindata.earned2;
    const emptotal =
      maindata.realtotal +
      maindata.weekpaytotal +
      maindata.addtotal -
      maindata.minertotalpay -
      maindata.noworktotalpay;
    const realemptotal =
      maindata.realtotal +
      maindata.weekpaytotal +
      maindata.addtotal -
      maindata.minertotalpay -
      maindata.noworktotalpay -
      maindata.fourtotal -
      totalearned;
    const ownertotal =
      realemptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;
    return (
      <BackGround>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <TopAreaContainer />

            {(STORE == '1' || STOREPAY_SHOW == '1') && (
              <Section>
                <MainBoxContainer
                  text={'고용주 지출액'}
                  onPress={() => setBoxButton(!boxButton)}
                  boxButton={boxButton}
                />
                <PayInfoBox>
                  <MainPayBox>
                    <MainPayBoxText>
                      {numberComma(ownertotal)} 원
                    </MainPayBoxText>
                  </MainPayBox>
                  {boxButton && (
                    <DetailBox>
                      <Line />
                      <DetailListRow
                        text={'급여지급액'}
                        value={numberComma(realemptotal)}
                      />
                      <DetailListRow
                        text={'4대보험 고용주부담금'}
                        value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                      />
                      <DetailListRow
                        text={'4대보험 근로자부담금'}
                        value={`(+) ${numberComma(maindata.fourtotal)}`}
                      />
                      <DetailListRow
                        text={'원천세'}
                        value={`(+) ${numberComma(totalearned)}`}
                      />
                    </DetailBox>
                  )}
                </PayInfoBox>
              </Section>
            )}
            <Section>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <MainBoxContainer
                  text={'근로자 수령액(시급)'}
                  onPress={() => setBoxButton2(!boxButton2)}
                  boxButton={boxButton2}
                />
              ) : (
                <Box>
                  <BoxTitle>
                    <BoxTitleText>근로자 수령액(월급)</BoxTitleText>
                  </BoxTitle>
                </Box>
              )}
              <PayInfoBox>
                <MainPayBox>
                  <MainPayBoxText>
                    {numberComma(realemptotal)} 원
                  </MainPayBoxText>
                </MainPayBox>
                {boxButton2 && (
                  <DetailBox>
                    <Line />
                    <MainInfoOfPay
                      text={'공제전 금액'}
                      value={numberComma(emptotal)}
                      click={click1}
                      onPress={() => setClick1(!click1)}
                    />
                    {click1 && (
                      <DetailBox>
                        <DetailListRow
                          text={'기본급'}
                          value={numberComma(maindata.realtotal)}
                        />
                        <DetailListRow
                          text={'주휴수당'}
                          value={`(+)${numberComma(maindata.weekpaytotal)}`}
                        />
                        <DetailListRow
                          text={'야간/초과/휴일 수당'}
                          value={`(+)${numberComma(maindata.addtotal)}`}
                        />
                        <DetailListRow
                          text={'지각/조퇴 차감'}
                          value={`(-)${numberComma(maindata.minertotalpay)}`}
                        />
                        <DetailListRow
                          text={'결근/휴무 차감'}
                          value={`(-)${numberComma(maindata.noworktotalpay)}`}
                        />
                      </DetailBox>
                    )}
                    <DetailAreaContainer totalearned={totalearned} />
                  </DetailBox>
                )}
              </PayInfoBox>
            </Section>

            <Footer>
              <FooterBtn onPress={() => onPressFooter('click4')}>
                <DateText>일별 급여현황</DateText>
                {cardShow ? (
                  <Icon name="caret-up" size={22} color="#BCC5D3" />
                ) : (
                  <Icon name="caret-down" size={22} color="#777" />
                )}
              </FooterBtn>
              {cardShow && (
                <CardBox>
                  {maindata.CARDLIST.map((data) => {
                    return (
                      <EmpPayInfoCard1
                        key={data.key}
                        day={data.START}
                        yoil={data.DAY}
                        base={data.basic_payment}
                        night={data.night_payment}
                        over={data.day_payment}
                        holi={0}
                        late={data.miner_payment}
                        total={data.payment}
                      />
                    );
                  })}
                </CardBox>
              )}
            </Footer>
          </Container>
        </ScrollView>
      </BackGround>
    );
  } else {
    const totalearned = maindata.earned + maindata.earned2;
    const realemptotal = maindata.realtotal - maindata.fourtotal - totalearned;
    const ownertotal =
      realemptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;
    return (
      <BackGround>
        <ScrollView
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}>
          <Container>
            <TopAreaContainer />
            {(STORE == '1' || STOREPAY_SHOW == '1') && (
              <Section>
                <MainBoxContainer
                  text={'고용주 지출액'}
                  onPress={() => setBoxButton(!boxButton)}
                  boxButton={boxButton}
                />
                <PayInfoBox>
                  <MainPayBox>
                    <MainPayBoxText>
                      {numberComma(ownertotal)} 원
                    </MainPayBoxText>
                  </MainPayBox>
                  {boxButton && (
                    <DetailBox>
                      <Line />
                      <DetailListRow
                        text={'급여지급액'}
                        value={numberComma(realemptotal)}
                      />
                      <DetailListRow
                        text={'4대보험 고용주부담금'}
                        value={`(+) ${numberComma(maindata.ownerfourtotal)}`}
                      />
                      <DetailListRow
                        text={'4대보험 근로자부담금'}
                        value={`(+) ${numberComma(maindata.fourtotal)}`}
                      />
                      <DetailListRow
                        text={'원천세'}
                        value={`(+) ${numberComma(totalearned)}`}
                      />
                    </DetailBox>
                  )}
                </PayInfoBox>
              </Section>
            )}
            <Section>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <MainBoxContainer
                  text={'근로자 수령액(월급)'}
                  onPress={() => setBoxButton2(!boxButton2)}
                  boxButton={boxButton2}
                />
              ) : (
                <Box>
                  <BoxTitle>
                    <BoxTitleText>근로자 수령액(월급)</BoxTitleText>
                  </BoxTitle>
                </Box>
              )}
              <PayInfoBox>
                <MainPayBox>
                  <MainPayBoxText>
                    {numberComma(realemptotal)} 원
                  </MainPayBoxText>
                </MainPayBox>
                {boxButton2 && (
                  <DetailBox>
                    <Line />
                    <MainInfoOfPay
                      text={'공제전 금액'}
                      value={numberComma(maindata.realtotal)}
                      click={click1}
                      onPress={() => setClick1(!click1)}
                    />
                    {click1 && (
                      <DetailBox>
                        <DetailListRow
                          text={'기본급'}
                          value={numberComma(maindata.realtotal)}
                        />
                      </DetailBox>
                    )}
                    <DetailAreaContainer totalearned={totalearned} />
                  </DetailBox>
                )}
              </PayInfoBox>
            </Section>
            <Footer>
              <FooterBtn
                onPress={() => {
                  onPressFooter('click5');
                }}>
                <DateText>일별 급여현황</DateText>
                {cardShow ? (
                  <Icon name="caret-up" size={22} color="#BCC5D3" />
                ) : (
                  <Icon name="caret-down" size={22} color="#777" />
                )}
              </FooterBtn>
              {cardShow && (
                <CardBox>
                  {maindata.CARDLIST1.map((data) => {
                    return (
                      <EmpPayInfoCard2
                        day={data.START}
                        yoil={data.DAY}
                        total={data.payment}
                      />
                    );
                  })}
                </CardBox>
              )}
            </Footer>
          </Container>
        </ScrollView>
      </BackGround>
    );
  }
};
