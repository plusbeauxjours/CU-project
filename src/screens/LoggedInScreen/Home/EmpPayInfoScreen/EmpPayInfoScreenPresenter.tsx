import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View``;
const Text = styled.Text``;

export default () => {
  var paytype = this.state.maindata.PAY_TYPE;
  const {STORE} = this.props;
  const NAME = this.props.navigation.state.params.NAME || this.props.NAME;
  const {STOREPAY_SHOW} = this.props.navigation.state.params;
  const {IMAGE, ISMANAGER} = this.props.navigation.state.params;

  if (paytype == '2') {
    var totalearned = this.state.maindata.earned + this.state.maindata.earned2;
    var emptotal =
      this.state.maindata.realtotal -
      this.state.maindata.fourtotal -
      totalearned;
    var ownertotal =
      emptotal +
      this.state.maindata.fourtotal +
      totalearned +
      this.state.maindata.ownerfourtotal;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{alignItems: 'center'}}>
            <View style={styles.topArea}>
              <View style={styles.profile}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 3,
                      color: '#642A8C',
                      justifyContent: 'flex-end',
                    }}>
                    {NAME}
                  </Text>
                  <Text style={{marginRight: 5, color: '#999'}}>
                    [{ISMANAGER}]
                  </Text>
                  <Text style={{color: '#999'}}>님의 급여정보</Text>
                </View>
              </View>
              <View style={styles.date}>
                <TouchableOpacity
                  onPress={() => {
                    this.backpay();
                  }}
                  style={styles.dateArrowLeft}>
                  <AntDesign name="left" size={20} style={{paddingTop: 3}} />
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.dateText}>
                    {this._replaceAll(this.state.maindata.START_DAY)} ~{' '}
                    {this._replaceAll(this.state.maindata.END_DAY)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.componentDidMount();
                  }}
                  style={styles.dateToday}>
                  <MaterialIcons
                    name="refresh"
                    size={26}
                    style={{paddingTop: 1}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.nextpay();
                  }}
                  style={styles.dateArrowRight}>
                  <AntDesign name="right" size={20} style={{paddingTop: 3}} />
                </TouchableOpacity>
              </View>
            </View>

            {STORE == '1' || STOREPAY_SHOW == '1' ? (
              <View style={styles.section}>
                <View style={styles.boxTitle1}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>고용주 지출액</Text>
                  </View>
                  <View />
                  <TouchableOpacity
                    style={styles.boxButtonSet}
                    onPress={() => {
                      this.setState({boxButton: !this.state.boxButton});
                    }}>
                    {this.state.boxButton === false ? (
                      <Text style={styles.boxButtonText}>자세히보기</Text>
                    ) : (
                      <Text style={styles.boxButtonText}>접기</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.detailInfoBox}>
                  <View style={styles.boxTitleSet2}>
                    <Text style={styles.boxTitleText2}>
                      {this.numberComma(ownertotal)} 원
                    </Text>
                  </View>
                  {this.state.boxButton === false ? null : (
                    <View>
                      <View style={styles.infoOfPay}>
                        <View style={styles.line} />
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>급여지급액</Text>
                          <Text style={styles.boxTitleText3}>
                            {this.numberComma(emptotal)} 원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>
                            4대보험 고용주부담금
                          </Text>

                          <Text style={styles.boxTitleText3}>
                            (+)
                            {this.numberComma(
                              this.state.maindata.ownerfourtotal,
                            )}{' '}
                            원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>
                            4대보험 근로자부담금
                          </Text>

                          <Text style={styles.boxTitleText3}>
                            (+){this.numberComma(this.state.maindata.fourtotal)}{' '}
                            원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>원천세</Text>
                          {/* <Text style={styles.boxTitleText3}>(+)</Text> */}
                          <Text style={styles.boxTitleText3}>
                            (+){totalearned} 원
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View></View>
            )}

            <View style={styles.section}>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <View style={styles.boxTitle}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>근로자 수령액(월급)</Text>
                  </View>
                  <View />
                  <TouchableOpacity
                    style={styles.boxButtonSet}
                    onPress={() => {
                      this.setState({boxButton2: !this.state.boxButton2});
                    }}>
                    {this.state.boxButton2 === false ? (
                      <Text style={styles.boxButtonText}>자세히보기</Text>
                    ) : (
                      <Text style={styles.boxButtonText}>접기</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.boxTitle}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>수령액(월급)</Text>
                  </View>
                  <View />
                </View>
              )}

              <View style={styles.detailInfoBox}>
                <View style={styles.boxTitleSet2}>
                  <Text style={styles.boxTitleText2}>
                    {this.numberComma(emptotal)} 원
                  </Text>
                </View>

                {this.state.boxButton2 === false ? null : (
                  <View>
                    <View style={styles.infoOfPay}>
                      <View style={styles.line} />
                      {this.state.click1 == false ? <View /> : <View />}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click1: !this.state.click1});
                          }}>
                          {this.state.click1 === false ? (
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
                          {this.numberComma(this.state.maindata.realtotal)} 원
                        </Text>
                      </View>
                      {this.state.click1 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>기본급</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(this.state.maindata.PAY)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>식대</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(this.state.maindata.MEALS)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>자가운전</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(
                                this.state.maindata.SELF_DRIVING,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>상여</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(this.state.maindata.BONUS)} 원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>성과급</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(this.state.maindata.INCENTIVE)}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click2: !this.state.click2});
                          }}>
                          {this.state.click2 === false ? (
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
                          (-){this.numberComma(this.state.maindata.fourtotal)}{' '}
                          원
                        </Text>
                      </View>
                      {this.state.click2 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>국민연금</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.pension_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>건강보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.health_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>장기요양</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.health2_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>고용보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.employment_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click3: !this.state.click3});
                          }}>
                          {this.state.click3 === false ? (
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
                      {this.state.click3 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(this.state.maindata.earned)}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>지방소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(this.state.maindata.earned2)}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  } else if (paytype == '0') {
    var totalearned = this.state.maindata.earned + this.state.maindata.earned2;
    //console.log('totalearned=',totalearned)
    var emptotal =
      this.state.maindata.realtotal +
      this.state.maindata.weekpaytotal +
      this.state.maindata.addtotal -
      this.state.maindata.minertotalpay -
      this.state.maindata.noworktotalpay;
    var realemptotal =
      this.state.maindata.realtotal +
      this.state.maindata.weekpaytotal +
      this.state.maindata.addtotal -
      this.state.maindata.minertotalpay -
      this.state.maindata.noworktotalpay -
      this.state.maindata.fourtotal -
      totalearned;

    var ownertotal =
      realemptotal +
      this.state.maindata.fourtotal +
      totalearned +
      this.state.maindata.ownerfourtotal;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <View style={{flex: 1}}>
          <ScrollView
            ref={(ref) => (this.scroll = ref)}
            contentContainerStyle={{alignItems: 'center'}}
            onScroll={(event) => {
              this.scrollY = event.nativeEvent.contentOffset.y;
            }}>
            <View style={styles.topArea}>
              <View style={styles.profile}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 3,
                      color: '#642A8C',
                      justifyContent: 'flex-end',
                    }}>
                    {NAME}
                  </Text>
                  <Text style={{marginRight: 5, color: '#999'}}>
                    [{ISMANAGER}]
                  </Text>
                  <Text style={{color: '#999'}}>님의 급여정보</Text>
                </View>
              </View>
              <View style={styles.date}>
                <TouchableOpacity
                  onPress={() => {
                    this.backpay();
                  }}
                  style={styles.dateArrowLeft}>
                  <AntDesign name="left" size={20} style={{paddingTop: 3}} />
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.dateText}>
                    {this._replaceAll(this.state.maindata.START_DAY)} ~{' '}
                    {this._replaceAll(this.state.maindata.END_DAY)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.componentDidMount();
                  }}
                  style={styles.dateToday}>
                  <MaterialIcons
                    name="refresh"
                    size={26}
                    style={{paddingTop: 1}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.nextpay();
                  }}
                  style={styles.dateArrowRight}>
                  <AntDesign name="right" size={20} style={{paddingTop: 3}} />
                </TouchableOpacity>
              </View>
            </View>

            {STORE == '1' || STOREPAY_SHOW == '1' ? (
              <View style={styles.section}>
                <View style={styles.boxTitle1}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>고용주 지출액</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.boxButtonSet}
                    onPress={() => {
                      this.setState({boxButton: !this.state.boxButton});
                    }}>
                    {this.state.boxButton === false ? (
                      <Text style={styles.boxButtonText}>자세히보기</Text>
                    ) : (
                      <Text style={styles.boxButtonText}>접기</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.detailInfoBox}>
                  <View style={styles.boxTitleSet2}>
                    <Text style={styles.boxTitleText2}>
                      {this.numberComma(ownertotal)} 원
                    </Text>
                  </View>
                  {this.state.boxButton === false ? null : (
                    <View>
                      <View style={styles.infoOfPay}>
                        <View style={styles.line} />
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>급여지급액</Text>
                          <Text style={styles.boxTitleText3}>
                            {this.numberComma(realemptotal)} 원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>
                            4대보험 고용주부담금
                          </Text>

                          <Text style={styles.boxTitleText3}>
                            (+)
                            {this.numberComma(
                              this.state.maindata.ownerfourtotal,
                            )}{' '}
                            원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>
                            4대보험 근로자부담금
                          </Text>

                          <Text style={styles.boxTitleText3}>
                            (+){this.numberComma(this.state.maindata.fourtotal)}{' '}
                            원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>원천세</Text>
                          {/* <Text style={styles.boxTitleText3}>(+)</Text> */}
                          <Text style={styles.boxTitleText3}>
                            (+){this.numberComma(totalearned)} 원
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View></View>
            )}

            <View style={styles.section}>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <View style={styles.boxTitle}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>근로자 수령액(시급)</Text>
                  </View>
                  <View />

                  <TouchableOpacity
                    style={styles.boxButtonSet}
                    onPress={() => {
                      this.setState({boxButton2: !this.state.boxButton2});
                    }}>
                    {this.state.boxButton2 === false ? (
                      <Text style={styles.boxButtonText}>자세히보기</Text>
                    ) : (
                      <Text style={styles.boxButtonText}>접기</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.boxTitle}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>수령액(시급)</Text>
                  </View>
                  <View />
                </View>
              )}

              <View style={styles.detailInfoBox}>
                <View style={styles.boxTitleSet2}>
                  <Text style={styles.boxTitleText2}>
                    {this.numberComma(realemptotal)} 원
                  </Text>
                </View>

                {this.state.boxButton2 === false ? null : (
                  <View>
                    <View style={styles.infoOfPay}>
                      <View style={styles.line} />
                      {this.state.click1 == false ? <View /> : <View />}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click1: !this.state.click1});
                          }}>
                          {this.state.click1 === false ? (
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
                          {this.numberComma(emptotal)} 원
                        </Text>
                      </View>
                      {this.state.click1 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>기본급여</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(this.state.maindata.realtotal)}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>주휴수당</Text>
                            <Text style={styles.boxTitleText3}>
                              (+)
                              {this.numberComma(
                                this.state.maindata.weekpaytotal,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>
                              야간/초과/휴일 수당
                            </Text>
                            <Text style={styles.boxTitleText3}>
                              (+)
                              {this.numberComma(
                                this.state.maindata.addtotal,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>
                              지각/조퇴 차감
                            </Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.minertotalpay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>
                              결근/휴무 차감
                            </Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.noworktotalpay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click2: !this.state.click2});
                          }}>
                          {this.state.click2 === false ? (
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
                          (-){this.numberComma(this.state.maindata.fourtotal)}{' '}
                          원
                        </Text>
                      </View>
                      {this.state.click2 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>국민연금</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.pension_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>건강보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.health_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>장기요양</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.health2_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>고용보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.employment_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click3: !this.state.click3});
                          }}>
                          {this.state.click3 === false ? (
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
                        {/* <Text style={styles.boxTitleText3}>(-)</Text> */}
                        <Text style={styles.boxTitleText3}>
                          (-){this.numberComma(totalearned)} 원
                        </Text>
                      </View>
                      {this.state.click3 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(this.state.maindata.earned)}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>지방소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(this.state.maindata.earned2)}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>

            <View
              style={{
                width: wp('100%'),
                alignItems: 'center',
                marginBottom: hp('3%'),
              }}>
              <TouchableOpacity
                ref={(ref) => (this.refCheck1 = ref)}
                style={styles.button}
                onPress={() => {
                  if (this.state.maindata.CARDLIST.length == 0) {
                    this._AlertModal('', '급여현황이 존재하지 않습니다.');
                    return false;
                  }
                  this.props.setSplashVisible(true);
                  this.setState(
                    {
                      click4: !this.state.click4,
                      cardShow: !this.state.cardShow,
                    },
                    () => {
                      if (this.state.click4) {
                        if (
                          this.refCheck1 &&
                          this.refCheck1.state.touchable.positionOnActivate
                        ) {
                          this.pressGroup(
                            this.refCheck1.state.touchable.positionOnActivate
                              .top,
                          );
                        }
                      } else {
                        this.props.setSplashVisible(false);
                      }
                    },
                  );
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  일별 급여현황
                </Text>
                {this.state.cardShow === true ? (
                  <MaterialCommunityIcons
                    name="arrow-collapse-up"
                    size={18}
                    color="black"
                    style={{marginLeft: 5, paddingTop: 2}}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-collapse-down"
                    size={18}
                    color="black"
                    style={{marginLeft: 5, paddingTop: 2}}
                  />
                )}
              </TouchableOpacity>
              {this.state.cardShow == true ? (
                <View style={styles.cardBox}>
                  {this.state.maindata.CARDLIST.map((data) => {
                    console.log('data=', data);
                    console.log('data=', this.state.maindata.CARDLIST);

                    return (
                      <Card
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
                </View>
              ) : (
                <View />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  } else {
    var totalearned = this.state.maindata.earned + this.state.maindata.earned2;
    //console.log('totalearned=',totalearned)
    var emptotal = this.state.maindata.realtotal;
    var realemptotal =
      this.state.maindata.realtotal -
      this.state.maindata.fourtotal -
      totalearned;

    var ownertotal =
      realemptotal +
      this.state.maindata.fourtotal +
      totalearned +
      this.state.maindata.ownerfourtotal;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <View style={{flex: 1}}>
          <ScrollView
            ref={(ref) => (this.scroll = ref)}
            contentContainerStyle={{alignItems: 'center'}}
            onScroll={(event) => {
              this.scrollY = event.nativeEvent.contentOffset.y;
            }}>
            <View style={styles.topArea}>
              <View style={styles.profile}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      marginRight: 3,
                      color: '#642A8C',
                      justifyContent: 'flex-end',
                    }}>
                    {NAME}
                  </Text>
                  <Text style={{marginRight: 5, color: '#999'}}>
                    [{ISMANAGER}]
                  </Text>
                  <Text style={{color: '#999'}}>님의 급여정보</Text>
                </View>
              </View>
              <View style={styles.date}>
                <TouchableOpacity
                  onPress={() => {
                    this.backpay();
                  }}
                  style={styles.dateArrowLeft}>
                  <AntDesign name="left" size={20} style={{paddingTop: 3}} />
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={styles.dateText}>
                    {this._replaceAll(this.state.maindata.START_DAY)} ~{' '}
                    {this._replaceAll(this.state.maindata.END_DAY)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.componentDidMount();
                  }}
                  style={styles.dateToday}>
                  <MaterialIcons
                    name="refresh"
                    size={26}
                    style={{paddingTop: 1}}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.nextpay();
                  }}
                  style={styles.dateArrowRight}>
                  <AntDesign name="right" size={20} style={{paddingTop: 3}} />
                </TouchableOpacity>
              </View>
            </View>

            {STORE == '1' || STOREPAY_SHOW == '1' ? (
              <View style={styles.section}>
                <View style={styles.boxTitle}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>고용주 지출액</Text>
                  </View>
                  <View />
                  <TouchableOpacity
                    style={styles.boxButtonSet}
                    onPress={() => {
                      this.setState({boxButton: !this.state.boxButton});
                    }}>
                    {this.state.boxButton === false ? (
                      <Text style={styles.boxButtonText}>자세히보기</Text>
                    ) : (
                      <Text style={styles.boxButtonText}>접기</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.detailInfoBox}>
                  <View style={styles.boxTitleSet2}>
                    <Text style={styles.boxTitleText2}>
                      {this.numberComma(ownertotal)} 원
                    </Text>
                  </View>
                  {this.state.boxButton === false ? null : (
                    <View>
                      <View style={styles.infoOfPay}>
                        <View style={styles.line} />
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>급여지급액</Text>
                          <Text style={styles.boxTitleText3}>
                            {this.numberComma(realemptotal)} 원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>
                            4대보험 고용주부담금
                          </Text>

                          <Text style={styles.boxTitleText3}>
                            (+)
                            {this.numberComma(
                              this.state.maindata.ownerfourtotal,
                            )}{' '}
                            원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>
                            4대보험 근로자부담금
                          </Text>

                          <Text style={styles.boxTitleText3}>
                            (+){this.numberComma(this.state.maindata.fourtotal)}{' '}
                            원
                          </Text>
                        </View>
                        <View style={styles.pay}>
                          <Text style={styles.boxTitleText3}>원천세</Text>
                          {/* <Text style={styles.boxTitleText3}>(+)</Text> */}
                          <Text style={styles.boxTitleText3}>
                            (+){this.numberComma(totalearned)} 원
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            ) : (
              <View></View>
            )}

            <View style={styles.section}>
              {STORE == '1' || STOREPAY_SHOW == '1' ? (
                <View style={styles.boxTitle}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>근로자 수령액(일급)</Text>
                  </View>
                  <View />
                  <TouchableOpacity
                    style={styles.boxButtonSet}
                    onPress={() => {
                      this.setState({boxButton2: !this.state.boxButton2});
                    }}>
                    {this.state.boxButton2 === false ? (
                      <Text style={styles.boxButtonText}>자세히보기</Text>
                    ) : (
                      <Text style={styles.boxButtonText}>접기</Text>
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.boxTitle}>
                  <View style={styles.boxTitleSet}>
                    <Text style={styles.boxTitleText}>수령액(일급)</Text>
                  </View>
                  <View />
                </View>
              )}

              <View style={styles.detailInfoBox}>
                <View style={styles.boxTitleSet2}>
                  <Text style={styles.boxTitleText2}>
                    {this.numberComma(realemptotal)} 원
                  </Text>
                </View>

                {this.state.boxButton2 === false ? null : (
                  <View>
                    <View style={styles.infoOfPay}>
                      <View style={styles.line} />
                      {this.state.click1 == false ? <View /> : <View />}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click1: !this.state.click1});
                          }}>
                          {this.state.click1 === false ? (
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
                          {this.numberComma(this.state.maindata.realtotal)} 원
                        </Text>
                      </View>
                      {this.state.click1 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>기본급여</Text>
                            <Text style={styles.boxTitleText3}>
                              {this.numberComma(this.state.maindata.realtotal)}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click2: !this.state.click2});
                          }}>
                          {this.state.click2 === false ? (
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
                          (-){this.numberComma(this.state.maindata.fourtotal)}{' '}
                          원
                        </Text>
                      </View>
                      {this.state.click2 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>국민연금</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.pension_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>건강보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.health_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>장기요양</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.health2_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>고용보험</Text>
                            <Text style={styles.boxTitleText3}>
                              (-)
                              {this.numberComma(
                                this.state.maindata.employment_pay,
                              )}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                      <View style={styles.pay}>
                        <TouchableOpacity
                          style={styles.pay2}
                          onPress={() => {
                            this.setState({click3: !this.state.click3});
                          }}>
                          {this.state.click3 === false ? (
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
                      {this.state.click3 == false ? (
                        <View />
                      ) : (
                        <View style={styles.infoOfPay}>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(this.state.maindata.earned)}{' '}
                              원
                            </Text>
                          </View>
                          <View style={styles.pay}>
                            <Text style={styles.boxTitleText3}>지방소득세</Text>
                            <Text style={styles.boxTitleText3}>
                              (-){this.numberComma(this.state.maindata.earned2)}{' '}
                              원
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </View>
            </View>

            <View
              style={{
                width: wp('100%'),
                alignItems: 'center',
                marginBottom: hp('3%'),
              }}>
              <TouchableOpacity
                ref={(ref) => (this.refCheck2 = ref)}
                style={styles.button}
                onPress={() => {
                  if (this.state.maindata.CARDLIST1.length == 0) {
                    this._AlertModal('', '급여현황이 존재하지 않습니다.');
                    return false;
                  }
                  this.setState(
                    {
                      click5: !this.state.click5,
                      cardShow: !this.state.cardShow,
                    },
                    () => {
                      if (this.state.click5) {
                        if (
                          this.refCheck2 &&
                          this.refCheck2.state.touchable.positionOnActivate
                        ) {
                          this.props.setSplashVisible(true);
                          this.pressGroup(
                            this.refCheck2.state.touchable.positionOnActivate
                              .top,
                          );
                        }
                      }
                    },
                  );
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  일별 급여현황
                </Text>
                {this.state.cardShow === true ? (
                  <MaterialCommunityIcons
                    name="arrow-collapse-up"
                    size={18}
                    color="black"
                    style={{marginLeft: 5, paddingTop: 2}}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="arrow-collapse-down"
                    size={18}
                    color="black"
                    style={{marginLeft: 5, paddingTop: 2}}
                  />
                )}
              </TouchableOpacity>
              {this.state.cardShow == true ? (
                <View style={styles.cardBox}>
                  {this.state.maindata.CARDLIST1.map((data) => {
                    return (
                      <Card2
                        day={data.START}
                        yoil={data.DAY}
                        total={data.payment}
                      />
                    );
                  })}
                </View>
              ) : (
                <View />
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
};
