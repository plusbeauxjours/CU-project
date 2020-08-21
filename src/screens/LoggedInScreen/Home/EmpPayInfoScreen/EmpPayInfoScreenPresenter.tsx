import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import utils from '../../../../constants/utils';

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
}) => {
  const BoxContainer = ({text, onPress, value}) => (
    <Box>
      <BoxTitle>
        <BoxTitleText>{text}</BoxTitleText>
      </BoxTitle>
      <BoxButton onPress={onPress}>
        {value ? (
          <BoxButtonText>접기</BoxButtonText>
        ) : (
          <BoxButtonText>자세히보기</BoxButtonText>
        )}
      </BoxButton>
    </Box>
  );

  // if (PAY_TYPE == '2') {
  //   var totalearned = maindata.earned + maindata.earned2;
  //   var emptotal = maindata.realtotal - maindata.fourtotal - totalearned;
  //   var ownertotal =
  //     emptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;
  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
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
                  {replaceAll(maindata.START_DAY)} ~{' '}
                  {replaceAll(maindata.END_DAY)}
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

          <Section>
            {STORE == '1' || STOREPAY_SHOW == '1' ? (
              <BoxContainer
                text={'근로자 수령액(월급)'}
                onPress={() => setBoxButton2(!boxButton2)}
                value={boxButton2}
              />
            ) : (
              <Box>
                <BoxTitle>
                  <BoxTitleText>수령액(월급)</BoxTitleText>
                </BoxTitle>
              </Box>
            )}
            {/* 
              <View style={styles.detailInfoBox}>
                <View style={styles.boxTitleSet2}>
                  <Text style={styles.boxTitleText2}>
                    {this.numberComma(emptotal)} 원
                  </Text>
                </View>
                {boxButton2 === false ? null : (
                  <View>
                    <View style={styles.infoOfPay}>
                      <View style={styles.line} />
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click1: !click1});
                          }}>
                          {click1 === false ? (
                            <Entypo
                              name="triangle-down"
                              size={30}
                              color="#777"
                              style={{paddingBottom: 3}}
                            />
                          ) : (
                            <Entypo
                              name="triangle-up"
                              size={30}
                              color="#BCC5D3"
                              style={{paddingTop: 3}}
                            />
                          )}
                          <Text style={styles.boxTitleText3}>공제전 금액</Text>
                        </TouchableOpacity>
                        <Text style={styles.boxTitleText3}>
                          {this.numberComma(maindata.realtotal)} 원
                        </Text>
                      </View>
                      {click1 &&
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>기본급</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(maindata.PAY)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>식대</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(maindata.MEALS)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>자가운전</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(maindata.SELF_DRIVING)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>상여</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(maindata.BONUS)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>성과급</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(maindata.INCENTIVE)} 원
                            </Text>
                          </View>
                        </View>
                      )}

                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click2: !click2});
                          }}>
                          {click2 === false ? (
                            <Entypo
                              name="triangle-down"
                              size={30}
                              color="#777"
                              style={{paddingBottom: 3}}
                            />
                          ) : (
                            <Entypo
                              name="triangle-up"
                              size={30}
                              color="#BCC5D3"
                              style={{paddingTop: 3}}
                            />
                          )}
                          <Text style={styles.boxTitleText3}>
                            4대보험 근로자부담금
                          </Text>
                        </TouchableOpacity>
                        <Text style={styles.boxTitleText3}>
                          (-){this.numberComma(maindata.fourtotal)} 원
                        </Text>
                      </View>
                      {click2 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>국민연금</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(maindata.pension_pay)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>건강보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(maindata.health_pay)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>장기요양</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(maindata.health2_pay)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>고용보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(maindata.employment_pay)} 원
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click3: !click3});
                          }}>
                          {click3 === false ? (
                            <Entypo
                              name="triangle-down"
                              size={30}
                              color="#777"
                              style={{paddingBottom: 3}}
                            />
                          ) : (
                            <Entypo
                              name="triangle-up"
                              size={30}
                              color="#BCC5D3"
                              style={{paddingTop: 3}}
                            />
                          )}
                          <Text style={styles.boxTitleText3}>원천세</Text>
                        </TouchableOpacity>
                        <Text style={styles.boxTitleText3}>
                          (-){this.numberComma(totalearned)} 원
                        </Text>
                      </View>
                      {click3 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(maindata.earned)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>지방소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(maindata.earned2)} 원
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )} 
              </View>*/}
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
  // } else if (PAY_TYPE == '0') {
  //   var totalearned = maindata.earned + maindata.earned2;
  //   //console.log('totalearned=',totalearned)
  //   var emptotal =
  //     maindata.realtotal +
  //     maindata.weekpaytotal +
  //     maindata.addtotal -
  //     maindata.minertotalpay -
  //     maindata.noworktotalpay;
  //   var realemptotal =
  //     maindata.realtotal +
  //     maindata.weekpaytotal +
  //     maindata.addtotal -
  //     maindata.minertotalpay -
  //     maindata.noworktotalpay -
  //     maindata.fourtotal -
  //     totalearned;

  //   var ownertotal =
  //     realemptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;

  //   return (
  //     <BackGround>
  //       <ScrollView
  //         keyboardDismissMode="on-drag"
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={{alignItems: 'center'}}>
  //         <Container>
  //           <TopArea>
  //             <Profile>
  //               <NameText>{NAME}</NameText>
  //               <GreyText>[{ISMANAGER}]</GreyText>
  //               <GreyText>님의 급여정보</GreyText>
  //             </Profile>
  //             <DateBox>
  //               <DateArrow onPress={() => backpay()}>
  //                 <Icon
  //                   name={
  //                     utils.isAndroid
  //                       ? 'md-chevron-back-outline'
  //                       : 'ios-chevron-back-outline'
  //                   }
  //                   size={22}
  //                   color="#bbb"
  //                 />
  //               </DateArrow>
  //               <Date>
  //                 <DateText>
  //                   {replaceAll(maindata.START_DAY)} ~{' '}
  //                   {replaceAll(maindata.END_DAY)}
  //                 </DateText>
  //               </Date>
  //               <DateReload onPress={() => onRefresh()}>
  //                 <Icon name="reload-outline" size={26} />
  //               </DateReload>
  //               <DateArrow onPress={() => nextpay()}>
  //                 <Icon
  //                   name={
  //                     utils.isAndroid
  //                       ? 'md-chevron-forward-outline'
  //                       : 'ios-chevron-forward-outline'
  //                   }
  //                   size={22}
  //                   color="#bbb"
  //                 />
  //               </DateArrow>
  //             </DateBox>
  //           </TopArea>

  //           {STORE == '1' ||
  //             (STOREPAY_SHOW == '1' && (
  //               <Section>
  // <BoxContainer text={"고용주 지출액"}
  // onPress={() => setBoxButton(!boxButton)}
  // value={boxButton}/>

  //                 <View style={styles.detailInfoBox}>
  //                   <View style={styles.boxTitleSet2}>
  //                     <Text style={styles.boxTitleText2}>
  //                       {this.numberComma(ownertotal)} 원
  //                     </Text>
  //                   </View>
  //                   {boxButton === false ? null : (
  //                     <View>
  //                       <View style={styles.infoOfPay}>
  //                         <View style={styles.line} />
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>급여지급액</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             {this.numberComma(realemptotal)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>
  //                             4대보험 고용주부담금
  //                           </Text>

  //                           <Text style={styles.boxTitleText3}>
  //                             (+)
  //                             {this.numberComma(maindata.ownerfourtotal)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>
  //                             4대보험 근로자부담금
  //                           </Text>

  //                           <Text style={styles.boxTitleText3}>
  //                             (+){this.numberComma(maindata.fourtotal)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>원천세</Text>
  //                           {/* <Text style={styles.boxTitleText3}>(+)</Text> */}
  //                           <Text style={styles.boxTitleText3}>
  //                             (+){this.numberComma(totalearned)} 원
  //                           </Text>
  //                         </View>
  //                       </View>
  //                     </View>
  //                   )}
  //                 </View>
  //               </Section>
  //             ))}

  //           <Section>
  //             {STORE == '1' || STOREPAY_SHOW == '1' ? (
  // <BoxContainer text={"근로자 수령액(시급)"}
  // onPress={() => setBoxButton2(!boxButton2)}
  // value={boxButton2}/>
  //
  //             ) : (
  //               <Box style={styles.boxTitle}>
  //                 <BoxTitle>
  //                   <BoxTitleText>수령액(시급)</BoxTitleText>
  //                 </BoxTitle>
  //               </Box>
  //             )}

  //             <View style={styles.detailInfoBox}>
  //               <View style={styles.boxTitleSet2}>
  //                 <Text style={styles.boxTitleText2}>
  //                   {this.numberComma(realemptotal)} 원
  //                 </Text>
  //               </View>

  //               {boxButton2 === false ? null : (
  //                 <View style={styles.infoOfPay}>
  //                   <View style={styles.line} />
  //                   {click1 == false ? <View /> : <View />}
  //                   <View style={styles.pay}>
  //                     <TouchableOpacity
  //                       style={styles.pay2}
  //                       onPress={() => {
  //                         this.setState({click1: !click1});
  //                       }}>
  //                       {click1 === false ? (
  //                         <Entypo
  //                           name="triangle-down"
  //                           size={30}
  //                           color="#777"
  //                           style={{paddingBottom: 3}}
  //                         />
  //                       ) : (
  //                         <Entypo
  //                           name="triangle-up"
  //                           size={30}
  //                           color="#BCC5D3"
  //                           style={{paddingTop: 3}}
  //                         />
  //                       )}
  //                       <Text style={styles.boxTitleText3}>공제전 금액</Text>
  //                     </TouchableOpacity>
  //                     <Text style={styles.boxTitleText3}>
  //                       {this.numberComma(emptotal)} 원
  //                     </Text>
  //                   </View>
  //                   {click1 == false ? (
  //                     <View />
  //                   ) : (
  //                     <View style={styles.infoOfPay}>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>기본급여</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           {this.numberComma(maindata.realtotal)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>주휴수당</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (+)
  //                           {this.numberComma(maindata.weekpaytotal)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>
  //                           야간/초과/휴일 수당
  //                         </Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (+)
  //                           {this.numberComma(maindata.addtotal)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>
  //                           지각/조퇴 차감
  //                         </Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-)
  //                           {this.numberComma(maindata.minertotalpay)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>
  //                           결근/휴무 차감
  //                         </Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-)
  //                           {this.numberComma(maindata.noworktotalpay)} 원
  //                         </Text>
  //                       </View>
  //                     </View>
  //                   )}
  //                   <View style={styles.pay}>
  //                     <TouchableOpacity
  //                       style={styles.pay2}
  //                       onPress={() => {
  //                         this.setState({click2: !click2});
  //                       }}>
  //                       {click2 === false ? (
  //                         <Entypo
  //                           name="triangle-down"
  //                           size={30}
  //                           color="#777"
  //                           style={{paddingBottom: 3}}
  //                         />
  //                       ) : (
  //                         <Entypo
  //                           name="triangle-up"
  //                           size={30}
  //                           color="#BCC5D3"
  //                           style={{paddingTop: 3}}
  //                         />
  //                       )}
  //                       <Text style={styles.boxTitleText3}>
  //                         4대보험 근로자부담금
  //                       </Text>
  //                     </TouchableOpacity>
  //                     <Text style={styles.boxTitleText3}>
  //                       (-){this.numberComma(maindata.fourtotal)} 원
  //                     </Text>
  //                   </View>
  //                   {click2 == false ? (
  //                     <View />
  //                   ) : (
  //                     <View style={styles.infoOfPay}>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>국민연금</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-)
  //                           {this.numberComma(maindata.pension_pay)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>건강보험</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-)
  //                           {this.numberComma(maindata.health_pay)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>장기요양</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-)
  //                           {this.numberComma(maindata.health2_pay)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>고용보험</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-)
  //                           {this.numberComma(maindata.employment_pay)} 원
  //                         </Text>
  //                       </View>
  //                     </View>
  //                   )}
  //                   <View style={styles.pay}>
  //                     <TouchableOpacity
  //                       style={styles.pay2}
  //                       onPress={() => {
  //                         this.setState({click3: !click3});
  //                       }}>
  //                       {click3 === false ? (
  //                         <Entypo
  //                           name="triangle-down"
  //                           size={30}
  //                           color="#777"
  //                           style={{paddingBottom: 3}}
  //                         />
  //                       ) : (
  //                         <Entypo
  //                           name="triangle-up"
  //                           size={30}
  //                           color="#BCC5D3"
  //                           style={{paddingTop: 3}}
  //                         />
  //                       )}
  //                       <Text style={styles.boxTitleText3}>원천세</Text>
  //                     </TouchableOpacity>
  //                     {/* <Text style={styles.boxTitleText3}>(-)</Text> */}
  //                     <Text style={styles.boxTitleText3}>
  //                       (-){this.numberComma(totalearned)} 원
  //                     </Text>
  //                   </View>
  //                   {click3 == false ? (
  //                     <View />
  //                   ) : (
  //                     <View style={styles.infoOfPay}>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>소득세</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-){this.numberComma(maindata.earned)} 원
  //                         </Text>
  //                       </View>
  //                       <View style={styles.pay}>
  //                         <Text style={styles.boxTitleText3}>지방소득세</Text>
  //                         <Text style={styles.boxTitleText3}>
  //                           (-){this.numberComma(maindata.earned2)} 원
  //                         </Text>
  //                       </View>
  //                     </View>
  //                   )}
  //                 </View>
  //               )}
  //             </View>
  //           </Section>

  //           <View
  //             style={{
  //               width: wp('100%'),
  //               alignItems: 'center',
  //               marginBottom: hp('3%'),
  //             }}>
  //             <TouchableOpacity
  //               ref={(ref) => (this.refCheck1 = ref)}
  //               style={styles.button}
  //               onPress={() => {
  //                 if (maindata.CARDLIST.length == 0) {
  //                   this._AlertModal('', '급여현황이 존재하지 않습니다.');
  //                   return false;
  //                 }
  //                 this.props.setSplashVisible(true);
  //                 this.setState(
  //                   {
  //                     click4: !click4,
  //                     cardShow: !cardShow,
  //                   },
  //                   () => {
  //                     if (click4) {
  //                       if (
  //                         this.refCheck1 &&
  //                         this.refCheck1.state.touchable.positionOnActivate
  //                       ) {
  //                         this.pressGroup(
  //                           this.refCheck1.state.touchable.positionOnActivate
  //                             .top,
  //                         );
  //                       }
  //                     } else {
  //                       this.props.setSplashVisible(false);
  //                     }
  //                   },
  //                 );
  //               }}>
  //               <Text style={{fontSize: 15, fontWeight: 'bold'}}>
  //                 일별 급여현황
  //               </Text>
  //               {cardShow === true ? (
  //                 <MaterialCommunityIcons
  //                   name="arrow-collapse-up"
  //                   size={18}
  //                   color="black"
  //                   style={{marginLeft: 5, paddingTop: 2}}
  //                 />
  //               ) : (
  //                 <MaterialCommunityIcons
  //                   name="arrow-collapse-down"
  //                   size={18}
  //                   color="black"
  //                   style={{marginLeft: 5, paddingTop: 2}}
  //                 />
  //               )}
  //             </TouchableOpacity>
  //             {cardShow && (
  //               <CardBox>
  //                 {maindata.CARDLIST.map((data) => {
  //                   console.log('data=', data);
  //                   console.log('data=', maindata.CARDLIST);

  //                   return (
  //                     <Card
  //                       key={data.key}
  //                       day={data.START}
  //                       yoil={data.DAY}
  //                       base={data.basic_payment}
  //                       night={data.night_payment}
  //                       over={data.day_payment}
  //                       holi={0}
  //                       late={data.miner_payment}
  //                       total={data.payment}
  //                     />
  //                   );
  //                 })}
  //               </CardBox>
  //             )}
  //           </View>
  //         </Container>
  //       </ScrollView>
  //     </BackGround>
  //   );
  // } else {
  //   var totalearned = maindata.earned + maindata.earned2;
  //   //console.log('totalearned=',totalearned)
  //   var emptotal = maindata.realtotal;
  //   var realemptotal = maindata.realtotal - maindata.fourtotal - totalearned;

  //   var ownertotal =
  //     realemptotal + maindata.fourtotal + totalearned + maindata.ownerfourtotal;

  //   return (
  //     <BackGround>
  //       <ScrollView
  //         keyboardDismissMode="on-drag"
  //         showsVerticalScrollIndicator={false}
  //         contentContainerStyle={{alignItems: 'center'}}>
  //         <Container>
  //           <TopArea>
  //             <Profile>
  //               <NameText>{NAME}</NameText>
  //               <GreyText>[{ISMANAGER}]</GreyText>
  //               <GreyText>님의 급여정보</GreyText>
  //             </Profile>
  //             <DateBox>
  //               <DateArrow onPress={() => backpay()}>
  //                 <Icon
  //                   name={
  //                     utils.isAndroid
  //                       ? 'md-chevron-back-outline'
  //                       : 'ios-chevron-back-outline'
  //                   }
  //                   size={22}
  //                   color="#bbb"
  //                 />
  //               </DateArrow>
  //               <Date>
  //                 <DateText>
  //                   {replaceAll(maindata.START_DAY)} ~{' '}
  //                   {replaceAll(maindata.END_DAY)}
  //                 </DateText>
  //               </Date>
  //               <DateReload onPress={() => onRefresh()}>
  //                 <Icon name="reload-outline" size={26} />
  //               </DateReload>
  //               <DateArrow onPress={() => nextpay()}>
  //                 <Icon
  //                   name={
  //                     utils.isAndroid
  //                       ? 'md-chevron-forward-outline'
  //                       : 'ios-chevron-forward-outline'
  //                   }
  //                   size={22}
  //                   color="#bbb"
  //                 />
  //               </DateArrow>
  //             </DateBox>
  //             <Date>
  //               <TouchableOpacity
  //                 onPress={() => {
  //                   this.backpay();
  //                 }}
  //                 style={styles.dateArrowLeft}>
  //                 <AntDesign name="left" size={20} style={{paddingTop: 3}} />
  //               </TouchableOpacity>
  //               <View style={{flex: 1, alignItems: 'center'}}>
  //                 <Text style={styles.dateText}>
  //                   {this._replaceAll(maindata.START_DAY)} ~{' '}
  //                   {this._replaceAll(maindata.END_DAY)}
  //                 </Text>
  //               </View>
  //               <TouchableOpacity
  //                 onPress={() => {
  //                   this.componentDidMount();
  //                 }}
  //                 style={styles.dateToday}>
  //                 <MaterialIcons
  //                   name="refresh"
  //                   size={26}
  //                   style={{paddingTop: 1}}
  //                 />
  //               </TouchableOpacity>

  //               <TouchableOpacity
  //                 onPress={() => {
  //                   this.nextpay();
  //                 }}
  //                 style={styles.dateArrowRight}>
  //                 <AntDesign name="right" size={20} style={{paddingTop: 3}} />
  //               </TouchableOpacity>
  //             </Date>
  //           </TopArea>

  //           {STORE == '1' ||
  //             (STOREPAY_SHOW == '1' && (
  //               <Section>

  //                 <Box>
  //                   <BoxTitle>
  //                     <BoxTitleText>고용주 지출액</BoxTitleText>
  //                   </BoxTitle>
  //                   <BoxButton
  //                     onPress={() => {
  //                       this.setState({boxButton: !boxButton});
  //                     }}>
  //                     {boxButton  ? (
  //                       <BoxButtonText >접기</BoxButtonText>
  //                       ) : (
  //                       <BoxButtonText >자세히보기</BoxButtonText>
  //                     )}
  //                   </BoxButton>
  //                 </Box>

  //                 <View style={styles.detailInfoBox}>
  //                   <View style={styles.boxTitleSet2}>
  //                     <Text style={styles.boxTitleText2}>
  //                       {this.numberComma(ownertotal)} 원
  //                     </Text>
  //                   </View>
  //                   {boxButton === false ? null : (
  //                     <View>
  //                       <View style={styles.infoOfPay}>
  //                         <View style={styles.line} />
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>급여지급액</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             {this.numberComma(realemptotal)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>
  //                             4대보험 고용주부담금
  //                           </Text>

  //                           <Text style={styles.boxTitleText3}>
  //                             (+)
  //                             {this.numberComma(maindata.ownerfourtotal)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>
  //                             4대보험 근로자부담금
  //                           </Text>

  //                           <Text style={styles.boxTitleText3}>
  //                             (+){this.numberComma(maindata.fourtotal)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>원천세</Text>
  //                           {/* <Text style={styles.boxTitleText3}>(+)</Text> */}
  //                           <Text style={styles.boxTitleText3}>
  //                             (+){this.numberComma(totalearned)} 원
  //                           </Text>
  //                         </View>
  //                       </View>
  //                     </View>
  //                   )}
  //                 </View>
  //               </Section>
  //             ))}

  //           <Section>
  //             {STORE == '1' || STOREPAY_SHOW == '1' ? (

  //               <Box>
  //                 <BoxTitle>
  //                   <BoxTitleText>근로자 수령액(일급)</BoxTitleText>
  //                 </BoxTitle>

  //                 <BoxButton
  //                   onPress={() => {
  //                     this.setState({boxButton2: !boxButton2});
  //                   }}>
  //                   {boxButton2 === false ? (
  //                     <BoxButtonText >자세히보기</BoxButtonText>
  //                   ) : (
  //                     <BoxButtonText >접기</BoxButtonText>
  //                   )}
  //                 </BoxButton>
  //               </Box>
  //             ) : (
  //               <Box>
  //                 <BoxTitle>
  //                   <BoxTitleText>근로자 수령액(월급)</BoxTitleText>
  //                 </BoxTitle>
  //               </Box>
  //             )}

  //             <View style={styles.detailInfoBox}>
  //               <View style={styles.boxTitleSet2}>
  //                 <Text style={styles.boxTitleText2}>
  //                   {this.numberComma(realemptotal)} 원
  //                 </Text>
  //               </View>

  //               {boxButton2 && (
  //                 <View>
  //                   <View style={styles.infoOfPay}>
  //                     <View style={styles.line} />
  //                     {click1 == false ? <View /> : <View />}
  //                     <View style={styles.pay}>
  //                       <BoxButton
  //                         style={styles.pay2}
  //                         onPress={() => {
  //                           this.setState({click1: !click1});
  //                         }}>
  //                         {click1 === false ? (
  //                           <Entypo
  //                             name="triangle-down"
  //                             size={30}
  //                             color="#777"
  //                             style={{paddingBottom: 3}}
  //                           />
  //                         ) : (
  //                           <Entypo
  //                             name="triangle-up"
  //                             size={30}
  //                             color="#BCC5D3"
  //                             style={{paddingTop: 3}}
  //                           />
  //                         )}
  //                         <Text style={styles.boxTitleText3}>공제전 금액</Text>
  //                       </TouchableOpacity>
  //                       <Text style={styles.boxTitleText3}>
  //                         {this.numberComma(maindata.realtotal)} 원
  //                       </Text>
  //                     </View>
  //                     {click1 == false ? (
  //                       <View />
  //                     ) : (
  //                       <View style={styles.infoOfPay}>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>기본급여</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             {this.numberComma(maindata.realtotal)} 원
  //                           </Text>
  //                         </View>
  //                       </View>
  //                     )}
  //                     <View style={styles.pay}>
  //                       <TouchableOpacity
  //                         style={styles.pay2}
  //                         onPress={() => {
  //                           this.setState({click2: !click2});
  //                         }}>
  //                         {click2 === false ? (
  //                           <Entypo
  //                             name="triangle-down"
  //                             size={30}
  //                             color="#777"
  //                             style={{paddingBottom: 3}}
  //                           />
  //                         ) : (
  //                           <Entypo
  //                             name="triangle-up"
  //                             size={30}
  //                             color="#BCC5D3"
  //                             style={{paddingTop: 3}}
  //                           />
  //                         )}
  //                         <Text style={styles.boxTitleText3}>
  //                           4대보험 근로자부담금
  //                         </Text>
  //                       </TouchableOpacity>
  //                       <Text style={styles.boxTitleText3}>
  //                         (-){this.numberComma(maindata.fourtotal)} 원
  //                       </Text>
  //                     </View>
  //                     {click2 == false ? (
  //                       <View />
  //                     ) : (
  //                       <View style={styles.infoOfPay}>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>국민연금</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             (-)
  //                             {this.numberComma(maindata.pension_pay)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>건강보험</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             (-)
  //                             {this.numberComma(maindata.health_pay)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>장기요양</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             (-)
  //                             {this.numberComma(maindata.health2_pay)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>고용보험</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             (-)
  //                             {this.numberComma(maindata.employment_pay)} 원
  //                           </Text>
  //                         </View>
  //                       </View>
  //                     )}
  //                     <View style={styles.pay}>
  //                       <TouchableOpacity
  //                         style={styles.pay2}
  //                         onPress={() => {
  //                           this.setState({click3: !click3});
  //                         }}>
  //                         {click3 === false ? (
  //                           <Entypo
  //                             name="triangle-down"
  //                             size={30}
  //                             color="#777"
  //                             style={{paddingBottom: 3}}
  //                           />
  //                         ) : (
  //                           <Entypo
  //                             name="triangle-up"
  //                             size={30}
  //                             color="#BCC5D3"
  //                             style={{paddingTop: 3}}
  //                           />
  //                         )}
  //                         <Text style={styles.boxTitleText3}>원천세</Text>
  //                       </TouchableOpacity>
  //                       <Text style={styles.boxTitleText3}>
  //                         (-){this.numberComma(totalearned)} 원
  //                       </Text>
  //                     </View>
  //                     {click3 == false ? (
  //                       <View />
  //                     ) : (
  //                       <View style={styles.infoOfPay}>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>소득세</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             (-){this.numberComma(maindata.earned)} 원
  //                           </Text>
  //                         </View>
  //                         <View style={styles.pay}>
  //                           <Text style={styles.boxTitleText3}>지방소득세</Text>
  //                           <Text style={styles.boxTitleText3}>
  //                             (-){this.numberComma(maindata.earned2)} 원
  //                           </Text>
  //                         </View>
  //                       </View>
  //                     )}
  //                   </View>
  //                 </View>
  //               )}
  //             </View>
  //           </Section>

  //           <View
  //             style={{
  //               width: wp('100%'),
  //               alignItems: 'center',
  //               marginBottom: hp('3%'),
  //             }}>
  //             <TouchableOpacity
  //               ref={(ref) => (this.refCheck2 = ref)}
  //               style={styles.button}
  //               onPress={() => {
  //                 if (maindata.CARDLIST1.length == 0) {
  //                   this._AlertModal('', '급여현황이 존재하지 않습니다.');
  //                   return false;
  //                 }
  //                 this.setState({
  //                   click5: !click5,
  //                   cardShow: !cardShow,
  //                 });
  //               }}>
  //               <Text style={{fontSize: 15, fontWeight: 'bold'}}>
  //                 일별 급여현황
  //               </Text>
  //               {cardShow ? (
  //                 <MaterialCommunityIcons
  //                   name="arrow-collapse-up"
  //                   size={18}
  //                   color="black"
  //                   style={{marginLeft: 5, paddingTop: 2}}
  //                 />
  //               ) : (
  //                 <MaterialCommunityIcons
  //                   name="arrow-collapse-down"
  //                   size={18}
  //                   color="black"
  //                   style={{marginLeft: 5, paddingTop: 2}}
  //                 />
  //               )}
  //             </TouchableOpacity>
  //             {cardShow && (
  //               <CardBox>
  //                 {maindata.CARDLIST1.map((data) => {
  //                   return (
  //                     <Card2
  //                       day={data.START}
  //                       yoil={data.DAY}
  //                       total={data.payment}
  //                     />
  //                   );
  //                 })}
  //               </CardBox>
  //             )}
  //           </View>
  //         </Container>
  //       </ScrollView>
  //     </BackGround>
  // );
  // }
};
