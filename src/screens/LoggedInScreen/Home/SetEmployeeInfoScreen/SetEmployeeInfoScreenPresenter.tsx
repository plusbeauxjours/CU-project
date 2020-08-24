import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View``;
const Text = styled.Text``;
const TextInput = styled.TextInput``;

export default ({
  payDay,
  payMonth,
  payYear,
  startDay,
  setPayDay,
  setPayMonth,
  setPayYear,
  setStartDay,
  empImage,
  empName,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'height' : 'none'}
      style={styles.container}
      keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      enabled={true}>
      <StatusBar barStyle={'light-content'} />
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          ref={(ref) => (this.scroll = ref)}
          scrollEventThrottle={16}
          onScroll={(event) => {
            this.scrollY = event.nativeEvent.contentOffset.y;
          }}
          keyboardShouldPersistTaps={'always'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <View style={styles.employeeBox}>
                  <Image
                    style={styles.profileImage}
                    // resizeMode="stretch"
                    source={{
                      uri: `http://133.186.209.113/uploads/${empImage}`,
                    }}
                  />
                  <Text style={styles.name}>{empName}</Text>
                </View>

                <TouchableOpacity
                  ref={(ref) => (this.refCheck1 = ref)}
                  style={
                    this.state.click1 === false
                      ? styles.box
                      : {...styles.box, borderWidth: 2}
                  }
                  onPress={() => {
                    this.setState({click1: !this.state.click1}, () => {
                      if (this.state.click1) {
                        if (
                          this.refCheck1 &&
                          this.refCheck1.state.touchable.positionOnActivate
                        ) {
                          this.pressGroup(
                            this.refCheck1.state.touchable.positionOnActivate
                              .top,
                          );
                        }
                      }
                    });
                  }}>
                  <View style={styles.boxTitle}>
                    <Text style={styles.titleText}>
                      <Text style={{color: '#FF3D3D'}}>(필수) </Text>
                      출퇴근정보 입력
                    </Text>
                    {this.state.click1 === false ? (
                      <Entypo
                        name="triangle-down"
                        size={30}
                        color="#642A8C"
                        style={{}}
                      />
                    ) : (
                      <Entypo
                        name="triangle-up"
                        size={30}
                        color="#BCC5D3"
                        style={{}}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {this.state.click1 === true ? (
                  <View style={styles.contentsBox}>
                    <View style={styles.InputCase}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textName}>
                          입사일{' '}
                          <Text style={{color: '#B91C1B', paddingTop: 3}}>
                            *
                          </Text>
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            this._ExplainModal(
                              '',
                              '직원의 출퇴근관리가 시작되는 날입니다.\n\n기존 직원은 앱 설치 당일로 설정하시길 권장드립니다.\n신규 직원일 경우에는 근로계약서 상 근무시작일로 입력해 주세요.',
                            );
                          }}>
                          <AntDesign
                            name="questioncircle"
                            size={18}
                            color="#bbb"
                            style={{paddingLeft: 5}}
                          />
                        </TouchableOpacity>
                      </View>
                      <DatePicker
                        ref={(picker) => {
                          this.datePickerDOB = picker;
                        }}
                        showIcon={false}
                        style={{}}
                        date={this.state.startDay ? this.state.startDay : ''}
                        placeholder="시작일 입력"
                        mode="date"
                        format="YYYY-MM-DD"
                        minDate="1900/01/01"
                        maxDate="9999/12/31"
                        confirmBtnText="확인"
                        cancelBtnText="취소"
                        locale="ko"
                        androidMode="spinner"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0,
                          },
                          dateText: {
                            justifyContent: 'center',
                            fontSize: 16,
                          },
                        }}
                        onDateChange={(date) => {
                          this.setState({startDay: date});
                        }}
                      />
                      <View
                        style={
                          this.state.startDay === ''
                            ? styles.lineBefore
                            : styles.lineAfter
                        }
                      />
                    </View>

                    <View style={styles.InputCase}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.textName}>
                          퇴사일{' '}
                          <Text style={{color: '#B91C1B', paddingTop: 3}}>
                            *
                          </Text>
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            this._ExplainModal(
                              '',
                              '정해진 근무종료일이 없다면 [퇴사일 없음]으로 선택해주세요.\n\n* 직원이 퇴사하였을 경우 [직원정보]에서 퇴사일을 설정하면 사업장에서 직원이 더 이상 표시되지 않습니다.',
                            );
                          }}>
                          <AntDesign
                            name="questioncircle"
                            size={18}
                            color="#bbb"
                            style={{paddingLeft: 5}}
                          />
                        </TouchableOpacity>
                      </View>
                      <DatePicker
                        ref={(picker) => {
                          this.datePickerDOB = picker;
                        }}
                        showIcon={false}
                        style={{}}
                        date={this.state.endDay ? this.state.endDay : ''}
                        placeholder="종료일 입력"
                        mode="date"
                        format="YYYY-MM-DD"
                        minDate="1900/01/01"
                        maxDate="9999/12/31"
                        confirmBtnText="확인"
                        cancelBtnText="취소"
                        locale="ko"
                        androidMode="spinner"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0,
                          },
                          dateText: {
                            justifyContent: 'center',
                            fontSize: 16,
                          },
                        }}
                        onDateChange={(date) => {
                          this.setState({
                            endDay: date,
                            endDayCheck: false,
                          });
                        }}
                      />
                      <View
                        style={
                          this.state.endDay === ''
                            ? styles.lineBefore
                            : styles.lineAfter
                        }
                      />
                      <View style={styles.sideBox}>
                        <TouchableOpacity
                          style={{flexDirection: 'row', alignItems: 'center'}}
                          onPress={() => {
                            this.setState({
                              endDayCheck: !this.state.endDayCheck,
                              endDay: '',
                              markedDatesE: {},
                            });
                          }}>
                          {this.state.endDayCheck ? (
                            <Ionicons
                              name="ios-checkbox-outline"
                              size={25}
                              color="#642A8C"
                              style={{paddingTop: 3}}
                            />
                          ) : (
                            <Ionicons
                              name="ios-checkbox-outline"
                              size={25}
                              color="#CCCCCC"
                              style={{paddingTop: 3}}
                            />
                          )}

                          <Text style={styles.sideText2}>퇴사일 없음</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ) : null}

                <Modal
                  isVisible={this.state.isModalVisible}
                  onBackdropPress={() => this.setState({isModalVisible: false})}
                  style={{margin: 0, justifyContent: 'flex-end'}}
                  avoidKeyboard={true}>
                  <View style={{backgroundColor: 'white'}}>
                    <Text
                      style={{
                        color: '#642A8C',
                        fontSize: 17,
                        paddingHorizontal: 20,
                        marginVertical: 20,
                      }}>
                      날짜 선택
                    </Text>

                    <Calendar
                      theme={{
                        arrowColor: '#642A8C',
                        todayTextColor: '#AACE36',
                      }}
                      style={{marginBottom: 40}}
                      onDayPress={(day) => {
                        this.startDay(day);
                        this.setState({isModalVisible: false});
                      }}
                      monthFormat={'yyyy년 M월'}
                      onPressArrowLeft={(substractMonth) => substractMonth()}
                      onPressArrowRight={(addMonth) => addMonth()}
                      markedDates={this.state.markedDatesS}
                    />

                    <TouchableOpacity
                      style={styles.buttonAfter}
                      onPress={() => {
                        this.setState({isModalVisible: false});
                      }}>
                      <Text style={{fontSize: 16, color: 'white'}}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

                <Modal
                  isVisible={this.state.isModalVisible2}
                  onBackdropPress={() =>
                    this.setState({isModalVisible2: false})
                  }
                  style={{margin: 0, justifyContent: 'flex-end'}}
                  avoidKeyboard={true}>
                  <View style={{backgroundColor: 'white'}}>
                    <Text
                      style={{
                        color: '#642A8C',
                        fontSize: 17,
                        paddingHorizontal: 20,
                        marginVertical: 20,
                      }}>
                      날짜 선택
                    </Text>

                    <Calendar
                      theme={{
                        arrowColor: '#642A8C',
                        todayTextColor: '#AACE36',
                      }}
                      style={{marginBottom: 40}}
                      onDayPress={(day) => {
                        this.endDay(day);
                        this.setState({isModalVisible2: false});
                      }}
                      monthFormat={'yyyy년 M월'}
                      onPressArrowLeft={(substractMonth) => substractMonth()}
                      onPressArrowRight={(addMonth) => addMonth()}
                      markedDates={this.state.markedDatesE}
                    />

                    <TouchableOpacity
                      style={styles.buttonAfter}
                      onPress={() => {
                        this.setState({isModalVisible2: false});
                      }}>
                      <Text style={{fontSize: 16, color: 'white'}}>닫기</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

                <TouchableOpacity
                  ref={(ref) => (this.refCheck2 = ref)}
                  style={
                    this.state.click2 === false
                      ? styles.box
                      : {...styles.box, borderWidth: 2}
                  }
                  onPress={() => {
                    this.setState(
                      {
                        click2: !this.state.click2,
                        payMonth:
                          Number((this.state.payDay || '').substr(5, 2)) || '',
                      },
                      () => {
                        if (this.state.click2) {
                          if (
                            this.refCheck2 &&
                            this.refCheck2.state.touchable.positionOnActivate
                          ) {
                            this.pressGroup(
                              this.refCheck2.state.touchable.positionOnActivate
                                .top,
                            );
                          }
                        }
                      },
                    );
                  }}>
                  <View style={styles.boxTitle}>
                    <Text style={styles.titleText}>
                      <Text style={{color: '#FF3D3D'}}>(필수) </Text>
                      급여정보 입력
                    </Text>
                    {this.state.click2 === false ? (
                      <Entypo
                        name="triangle-down"
                        size={30}
                        color="#642A8C"
                        style={{}}
                      />
                    ) : (
                      <Entypo
                        name="triangle-up"
                        size={30}
                        color="#BCC5D3"
                        style={{}}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {this.state.click2 === true ? (
                  <View style={styles.contentsBox}>
                    <View style={styles.deductionTypeBox}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.salaryDetailsBoxTextName}>
                          급여 유형{' '}
                          <Text style={{color: '#B91C1B', paddingTop: 3}}>
                            *
                          </Text>
                        </Text>
                      </View>
                      <View style={styles.salaryDetailsBoxLine} />
                      <View style={styles.slectDeductionTypePickRowBox}>
                        {this.payCheck(0, '시급')}
                        {this.payCheck(1, '일급')}
                        {this.payCheck(2, '월급')}
                      </View>
                    </View>

                    {this.state.payCheck[0] === true ? (
                      <View style={{}}>
                        <View style={{...styles.payBox, marginBottom: 0}}>
                          <Text style={{flex: 1, textAlign: 'center'}}>
                            시급
                          </Text>
                          <TextInput
                            style={styles.textinput}
                            placeholder={'금액을 입력해주세요.'}
                            placeholderTextColor={'#E5E5E5'}
                            onChangeText={(text) => {
                              this.setState({pay: text.replace(/,/g, '')});
                            }}
                            value={this.state.pay
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            keyboardType={'number-pad'}
                          />
                          <Text style={{marginRight: 20}}>원</Text>
                        </View>
                        <View>
                          <Text
                            style={{color: '#aaa', marginTop: 3, fontSize: 13}}>
                            *2020년 최저 시급은 {this.state.MINPAY}원 입니다.
                          </Text>
                        </View>
                      </View>
                    ) : null}

                    {this.state.payCheck[1] === true ? (
                      <View style={styles.payBox}>
                        <Text style={{flex: 1, textAlign: 'center'}}>일급</Text>
                        <TextInput
                          style={styles.textinput}
                          placeholder={'금액을 입력해주세요.'}
                          placeholderTextColor={'#E5E5E5'}
                          onChangeText={(text) => {
                            this.setState({pay: text.replace(/,/g, '')});
                          }}
                          value={this.state.pay
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          keyboardType={'number-pad'}
                        />
                        <Text style={{marginRight: 20}}>원</Text>
                      </View>
                    ) : null}

                    {this.state.payCheck[2] === true ? (
                      <View style={{}}>
                        <View style={{...styles.payBox2, marginBottom: 0}}>
                          <View style={styles.payType}>
                            <Text style={{flex: 1, textAlign: 'center'}}>
                              기본급
                            </Text>
                            <TextInput
                              style={styles.textinput}
                              placeholder={'금액을 입력해주세요.'}
                              placeholderTextColor={'#E5E5E5'}
                              onChangeText={(text) => {
                                this.setState({pay1: text.replace(/,/g, '')});
                              }}
                              value={this.state.pay1
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              keyboardType={'number-pad'}
                            />
                            <Text style={{marginRight: 20}}>원</Text>
                          </View>
                          <View style={styles.payType}>
                            <Text style={{flex: 1, textAlign: 'center'}}>
                              식대
                            </Text>
                            <TextInput
                              style={styles.textinput}
                              placeholder={'금액을 입력해주세요.'}
                              placeholderTextColor={'#E5E5E5'}
                              onChangeText={(text) => {
                                this.setState({pay2: text.replace(/,/g, '')});
                              }}
                              value={this.state.pay2
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              keyboardType={'number-pad'}
                            />
                            <Text style={{marginRight: 20}}>원</Text>
                          </View>
                          <View style={styles.payType}>
                            <Text style={{flex: 1, textAlign: 'center'}}>
                              자가운전
                            </Text>
                            <TextInput
                              style={styles.textinput}
                              placeholder={'금액을 입력해주세요.'}
                              placeholderTextColor={'#E5E5E5'}
                              onChangeText={(text) => {
                                this.setState({pay3: text.replace(/,/g, '')});
                              }}
                              value={this.state.pay3
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              keyboardType={'number-pad'}
                            />
                            <Text style={{marginRight: 20}}>원</Text>
                          </View>
                          <View style={styles.payType}>
                            <Text style={{flex: 1, textAlign: 'center'}}>
                              상여
                            </Text>
                            <TextInput
                              style={styles.textinput}
                              placeholder={'금액을 입력해주세요.'}
                              placeholderTextColor={'#E5E5E5'}
                              onChangeText={(text) => {
                                this.setState({pay4: text.replace(/,/g, '')});
                              }}
                              value={this.state.pay4
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              keyboardType={'number-pad'}
                            />
                            <Text style={{marginRight: 20}}>원</Text>
                          </View>
                          <View style={styles.payType}>
                            <Text style={{flex: 1, textAlign: 'center'}}>
                              성과급
                            </Text>
                            <TextInput
                              style={styles.textinput}
                              placeholder={'금액을 입력해주세요.'}
                              placeholderTextColor={'#E5E5E5'}
                              onChangeText={(text) => {
                                this.setState({pay5: text.replace(/,/g, '')});
                              }}
                              value={this.state.pay5
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              keyboardType={'number-pad'}
                            />
                            <Text style={{marginRight: 20}}>원</Text>
                          </View>
                          <View style={styles.payLine} />
                          <View style={styles.payType}>
                            <Text style={{flex: 1, textAlign: 'center'}}>
                              합계
                            </Text>
                            <Text style={styles.textinput}>{this.total()}</Text>
                            <Text style={{marginRight: 20}}>원</Text>
                          </View>
                        </View>
                        <View style={{marginBottom: 30}} />
                      </View>
                    ) : null}
                    {this.state.payCheck[0] == true ? (
                      <View style={styles.probationBox}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text style={styles.salaryDetailsBoxTextName}>
                              수습기간 설정
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                this._ExplainModal(
                                  '',
                                  "급여계산 : 입력하신 '입사일'부터 '수습종료일'까지의 기간동안 '급여비율'에 따라 일할계산 됩니다.",
                                );
                              }}>
                              <AntDesign
                                name="questioncircle"
                                size={18}
                                color="#bbb"
                                style={{paddingLeft: 5, paddingTop: 2}}
                              />
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            style={{marginRight: 10}}
                            onPress={() => {
                              if (this.state.probation === true) {
                                let periodvalue = JSON.parse(
                                  JSON.stringify(this.state.periodCheck),
                                ).fill(false);
                                let percentvalue = JSON.parse(
                                  JSON.stringify(this.state.percentCheck),
                                ).fill(false);
                                this.setState({
                                  probationPeriod: '',
                                  probationPercent: '',
                                  periodCheck: periodvalue,
                                  percentCheck: percentvalue,
                                  periodDirectInput: '',
                                  percentDirectInput: '',
                                });
                              }
                              this.setState({probation: !this.state.probation});
                            }}>
                            <Ionicons
                              name="ios-checkbox-outline"
                              size={30}
                              color={
                                this.state.probation === false
                                  ? '#CCCCCC'
                                  : '#642A8C'
                              }
                              style={{paddingTop: 3}}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.probationBoxLine} />
                        {this.state.probation ? (
                          <View style={{}}>
                            <View style={{}}>
                              <Text style={{color: '#aaa', fontSize: 13}}>
                                * 수습기간은 [입사일]인{' '}
                                {this.state.startDay.substr(0, 4)}년{' '}
                                {this.state.startDay.substr(5, 2)}월{' '}
                                {this.state.startDay.substr(8, 2)}일부터
                                [수습종료일]까지 적용됩니다.
                              </Text>
                            </View>
                            <View
                              style={{alignItems: 'flex-end', marginTop: 15}}>
                              <View style={styles.probationTitle}>
                                <Text
                                  style={{
                                    textAlign: 'right',
                                    fontSize: 15,
                                    width: wp('60%') - 10,
                                  }}>
                                  수습종료일
                                </Text>
                                <DatePicker
                                  ref={(picker) => {
                                    this.datePickerDOB = picker;
                                  }}
                                  showIcon={false}
                                  style={{}}
                                  date={
                                    this.state.probationPeriod
                                      ? this.state.probationPeriod
                                      : ''
                                  }
                                  placeholder=""
                                  mode="date"
                                  format="YYYY-MM-DD"
                                  minDate="1900/01/01"
                                  maxDate="9999/12/31"
                                  confirmBtnText="확인"
                                  cancelBtnText="취소"
                                  locale="ko"
                                  androidMode="spinner"
                                  customStyles={{
                                    dateTouch: {
                                      flex: 0,
                                      width: wp('25%'),
                                    },
                                    dateTouchBody: {
                                      width: wp('25%'),
                                      marginLeft: 10,
                                    },
                                    dateInput: {
                                      alignItems: 'center',
                                      paddingVertical: 3,
                                      borderColor: '#CCC',
                                    },
                                    dateText: {
                                      justifyContent: 'center',
                                    },
                                  }}
                                  onDateChange={(date) => {
                                    this.setState({
                                      probationPeriod: date,
                                    });
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  ...styles.probationTitle,
                                  marginTop: 10,
                                }}>
                                <Text style={{fontSize: 15}}>급여비율</Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    width: wp('25%'),
                                    marginLeft: 10,
                                  }}>
                                  <TouchableOpacity
                                    style={styles.selectBox}
                                    onPress={() => {
                                      this.setState({
                                        probationPercentModalVisible: true,
                                      });
                                    }}>
                                    <Text>{this.state.probationPercent}</Text>
                                  </TouchableOpacity>
                                  <View
                                    style={{
                                      flex: 1,
                                      flexDirection: 'row',
                                      alignItems: 'flex-end',
                                    }}>
                                    <Text
                                      style={{color: '#642A8C', fontSize: 12}}>
                                      %
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                          </View>
                        ) : null}

                        {this.state.probationPeriodModalVisible === true && (
                          <Modal
                            onBackdropPress={() => {
                              this.setState({
                                probationPeriodModalVisible: false,
                              });
                            }}
                            isVisible={this.state.probationPeriodModalVisible}
                            style={{margin: 0, justifyContent: 'flex-end'}}
                            avoidKeyboard={true}>
                            <View style={{backgroundColor: 'white'}}>
                              <Text
                                style={{
                                  color: '#642A8C',
                                  fontSize: 17,
                                  paddingHorizontal: 20,
                                  marginVertical: 20,
                                }}>
                                수습기간 종료일 선택
                              </Text>

                              <Calendar
                                theme={{
                                  arrowColor: '#642A8C',
                                  todayTextColor: '#AACE36',
                                }}
                                minDate={this.state.startDay}
                                style={{marginBottom: 40}}
                                onDayPress={(day) => {
                                  this.probationDay(day);
                                  this.setState({
                                    probationPeriodModalVisible: false,
                                  });
                                }}
                                monthFormat={'yyyy년 M월'}
                                onPressArrowLeft={(substractMonth) =>
                                  substractMonth()
                                }
                                onPressArrowRight={(addMonth) => addMonth()}
                                markedDates={this.state.markedDatesE}
                              />

                              <TouchableOpacity
                                style={styles.buttonAfter}
                                onPress={() => {
                                  this.setState({
                                    probationPeriodModalVisible: false,
                                  });
                                }}>
                                <Text style={{fontSize: 16, color: 'white'}}>
                                  닫기
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </Modal>
                        )}

                        {this.state.probationPercentModalVisible === true && (
                          <Modal
                            onBackdropPress={() => {
                              let value = JSON.parse(
                                JSON.stringify(this.state.percentCheck),
                              );
                              value.fill(false); // ES6
                              this.setState({
                                probationPercentModalVisible: false,
                                percentCheck: value,
                                percentDirectInput: '',
                              });
                            }}
                            isVisible={this.state.probationPercentModalVisible}
                            style={{margin: 0, justifyContent: 'flex-end'}}
                            avoidKeyboard={true}>
                            <View style={{backgroundColor: 'white'}}>
                              <View>
                                <Text
                                  style={{
                                    fontSize: 17,
                                    color: '#642A8C',
                                    paddingHorizontal: 20,
                                    marginTop: 20,
                                  }}>
                                  급여비율 선택(%)
                                </Text>
                                <View
                                  style={{
                                    borderColor: '#F2F2F2',
                                    borderWidth: 1,
                                    marginVertical: 20,
                                  }}>
                                  {this.renderProbation2([100, 90, 80, 70], 1)}
                                  {this.renderProbation2(
                                    [60, 50, 'directInput'],
                                    2,
                                  )}
                                </View>
                              </View>

                              <KeyboardAvoidingView behavior="padding" enabled>
                                <View style={styles.normalCommute1}>
                                  <TouchableOpacity
                                    style={styles.buttonAfter1}
                                    onPress={() => {
                                      let value = JSON.parse(
                                        JSON.stringify(this.state.percentCheck),
                                      );
                                      value.fill(false); // ES6
                                      this.setState({
                                        probationPercentModalVisible: false,
                                        percentCheck: value,
                                        percentDirectInput: '',
                                      });
                                    }}>
                                    <Text
                                      style={{fontSize: 18, color: '#642a8c'}}>
                                      닫기{' '}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    style={styles.buttonAfter2}
                                    onPress={() => this.checkDirectInput2()}>
                                    <Text
                                      style={{fontSize: 16, color: 'white'}}>
                                      확인
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </KeyboardAvoidingView>
                            </View>
                          </Modal>
                        )}
                      </View>
                    ) : null}
                    <View style={styles.salaryDetailsBox}>
                      {this.state.payCheck[2] === true ? null : (
                        <View style={styles.salarySystemBox}>
                          <Text style={styles.salaryDetailsBoxTextName}>
                            항목 선택
                          </Text>
                          <View
                            style={{
                              ...styles.salaryDetailsBoxLine,
                              marginBottom: 0,
                            }}
                          />
                          <View style={styles.salarySystemPickBox}>
                            {this.salarySystem(1, '주휴수당 자동 가산')}
                            {this.salarySystem(2, '휴게시간 자동 차감')}
                            {this.salarySystem(
                              0,
                              '추가, 야간, 휴일수당 50% 자동 가산',
                            )}
                          </View>
                        </View>
                      )}

                      <View style={styles.deductionTypeBox}>
                        <Text style={styles.salaryDetailsBoxTextName}>
                          공제 유형 선택{' '}
                          <Text style={{color: '#B91C1B', paddingTop: 3}}>
                            *
                          </Text>
                        </Text>
                        <View style={styles.salaryDetailsBoxLine} />
                        <View style={styles.slectDeductionTypePickRowBox}>
                          {this.deductionType(0, '4대보험')}
                          {this.deductionType(1, '프리랜서(3.3%)')}
                          {this.deductionType(2, '적용안함')}
                        </View>
                        {this.state.deductionTypeCheck[
                          DEDUCTION_TYPE_INDEX_INSURANCE
                        ] ? (
                          <View
                            style={
                              styles.slectDeductionTypePickRowBoxInsurance
                            }>
                            <View
                              style={
                                styles.slectDeductionTypePickRowBoxInsuranceBox
                              }>
                              <View
                                style={
                                  styles.slectDeductionTypePickRowBoxInsuranceType
                                }>
                                {this.insuranceType(0, '국민연금')}
                                <View style={{height: 25}} />
                                {this.insuranceType(1, '건강보험')}
                                <View style={{height: 25}} />
                                {this.insuranceType(2, '고용보험')}
                                <View style={{height: 25}} />
                                {this.insuranceType(3, '산재보험')}
                              </View>
                            </View>
                          </View>
                        ) : null}
                      </View>
                    </View>
                    <View style={{paddingHorizontal: 10}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.salaryDetailsBoxTextName}>
                          적용 시작 월 설정{' '}
                          <Text style={{color: '#B91C1B', paddingTop: 3}}>
                            *
                          </Text>
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            // this._ExplainModal('', (this.state.HELPMODALTEXT).split('@').join('\n'));
                            this._ExplainModal(
                              '',
                              '[ 급여 적용 시작월 이란? ]\n\n설정한 급여가 적용되는 월이며, 7월로 설정할 경우 정산일 기준 7월에 시작하는 날부터 적용됩니다.\nEx) 적용시작월 7월, 정산일 15일\n= 급여 계산 시작일: 7월16일\n\n[ 급여가 변경되었을 경우? ]\n\n기존 직원의 급여가 변경된 경우 [직원설정]에서 변경된 직원의 급여를 입력 후 변경이 시작되는 월을 설정해놓으면 해당 월부터 자동으로 급여 변경이 적용됩니다.',
                            );
                          }}>
                          <AntDesign
                            name="questioncircle"
                            size={18}
                            color="#bbb"
                            style={{paddingLeft: 10, paddingTop: 2}}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          ...styles.salaryDetailsBoxLine,
                          marginBottom: 10,
                        }}
                      />
                      <View styl={{marginBottom: 10}}>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontWeight: 'bold'}}>급여정산일: </Text>
                          <Text>
                            {this.state.CALCULATE_DAY == '1'
                              ? '매월 말일'
                              : `${this.state.CALCULATE_DAY - 1}일`}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontWeight: 'bold'}}>
                            {this.getPeriod(this.state.CALCULATE_DAY)}
                          </Text>
                          <Text>부터 급여에 적용됩니다</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          marginTop: 15,
                          marginBottom: 30,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={{fontSize: 18, marginRight: 5}}>20</Text>
                          <TouchableOpacity
                            onPress={() => this.setState({payYearModal: true})}
                            style={
                              this.state.payYear === ''
                                ? {
                                    ...styles.yearInputCase,
                                    borderColor: '#E5E5E5',
                                  }
                                : styles.yearInputCase
                            }>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                              {this.state.payYear}
                            </Text>
                          </TouchableOpacity>
                          <Text style={{fontSize: 18}}> 년</Text>
                        </View>

                        <View style={{width: 20}} />

                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <TouchableOpacity
                            onPress={() => this.setState({payMonthModal: true})}
                            style={
                              this.state.payMonth === ''
                                ? {
                                    ...styles.yearInputCase,
                                    borderColor: '#E5E5E5',
                                  }
                                : styles.yearInputCase
                            }>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                              {this.state.payMonth}
                            </Text>
                          </TouchableOpacity>
                          <Text style={{fontSize: 18}}> 월</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}

                {/* 급여 적용 시작 월 설정 (년도) 모달 */}
                <Modal
                  onBackdropPress={() => {
                    let value = JSON.parse(
                      JSON.stringify(this.state.payYearCheck),
                    );
                    value.fill(false); // ES6
                    this.setState({
                      payYearModal: false,
                      payYearCheck: value,
                    });
                  }}
                  isVisible={this.state.payYearModal}
                  style={{margin: 0, justifyContent: 'flex-end'}}
                  avoidKeyboard={true}>
                  <View style={{backgroundColor: 'white'}}>
                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                          color: '#642A8C',
                          paddingHorizontal: 20,
                          marginTop: 20,
                        }}>
                        년도 선택
                      </Text>
                      <View
                        style={{
                          borderColor: '#F2F2F2',
                          borderWidth: 1,
                          marginVertical: 20,
                        }}>
                        {console.log('pypypypyypypypypypy', py)}
                        {this.renderPayYear([py - 3, py - 2, py - 1, py], 1)}
                        {this.renderPayYear(
                          [Number(py) + 1, Number(py) + 2, 'directInput'],
                          2,
                        )}
                      </View>
                    </View>

                    <KeyboardAvoidingView behavior="padding" enabled>
                      <View style={styles.normalCommute1}>
                        <TouchableOpacity
                          style={styles.buttonAfter1}
                          onPress={() => {
                            let value = JSON.parse(
                              JSON.stringify(this.state.payYearCheck),
                            );
                            value.fill(false); // ES6
                            this.setState({
                              payYearModal: false,
                              payYearCheck: value,
                            });
                          }}>
                          <Text style={{fontSize: 18, color: '#642a8c'}}>
                            닫기{' '}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonAfter2}
                          onPress={() => {
                            this.PYcheckDirectInput();
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            확인
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </KeyboardAvoidingView>
                  </View>
                </Modal>
                {/* 급여 적용 시작 월 설정 (월) 모달 */}
                <Modal
                  onBackdropPress={() => {
                    let value = JSON.parse(
                      JSON.stringify(this.state.payMonthCheck),
                    );
                    value.fill(false); // ES6
                    this.setState({
                      payMonthModal: false,
                      payMonthCheck: value,
                    });
                  }}
                  isVisible={this.state.payMonthModal}
                  style={{margin: 0, justifyContent: 'flex-end'}}
                  avoidKeyboard={true}>
                  <View style={{backgroundColor: 'white'}}>
                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                          color: '#642A8C',
                          paddingHorizontal: 20,
                          marginTop: 20,
                        }}>
                        월 선택
                      </Text>
                      <View
                        style={{
                          borderColor: '#F2F2F2',
                          borderWidth: 1,
                          marginVertical: 20,
                        }}>
                        {this.renderPayMonth([1, 2, 3, 4], 1)}
                        {this.renderPayMonth([5, 6, 7, 8], 2)}
                        {this.renderPayMonth([9, 10, 11, 12], 3)}
                      </View>
                    </View>

                    <KeyboardAvoidingView behavior="padding" enabled>
                      <View style={styles.normalCommute1}>
                        <TouchableOpacity
                          style={styles.buttonAfter1}
                          onPress={() => {
                            let value = JSON.parse(
                              JSON.stringify(this.state.payMonthCheck),
                            );
                            value.fill(false); // ES6
                            this.setState({
                              payMonthModal: false,
                              payMonthCheck: value,
                            });
                          }}>
                          <Text style={{fontSize: 18, color: '#642a8c'}}>
                            닫기{' '}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonAfter2}
                          onPress={() => {
                            const {payMonthCheck} = this.state;
                            let value = JSON.parse(
                              JSON.stringify(payMonthCheck),
                            );
                            value.fill(false); // ES6
                            if (!payMonthCheck.includes(true)) {
                              return;
                            }
                            let payMonth = payMonthCheck.indexOf(true) + 1;
                            let payMonthFormat = payMonth;
                            payMonthFormat < 10
                              ? (payMonthFormat = '0' + payMonthFormat)
                              : payMonthFormat;
                            this.setState({
                              payMonthModal: false,
                              payMonth: payMonth,
                              payDay: `20${this.state.payYear}-${payMonthFormat}-01`,
                              payMonthCheck: value,
                            });
                          }}>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            확인
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </KeyboardAvoidingView>
                  </View>
                </Modal>

                {this.state.isHelpModalVisible === true && (
                  <Modal
                    onBackdropPress={() =>
                      this.setState({isHelpModalVisible: false})
                    }
                    isVisible={this.state.isHelpModalVisible}
                    style={{margin: 0, justifyContent: 'flex-end'}}>
                    <View style={{height: 280, backgroundColor: 'white'}}>
                      <View style={{flex: 1}}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 30, color: '#642A8C'}}>
                            도움말 입니다.
                          </Text>
                          <View style={{height: 30}} />
                          <Text style={{fontSize: 15, color: '#707070'}}>
                            세부 도움말이 작성될 공간입니다.
                          </Text>
                          <Text style={{fontSize: 15, color: '#707070'}}>
                            세부 도움말이 작성될 공간입니다.
                          </Text>
                          <Text style={{fontSize: 15, color: '#707070'}}>
                            세부 도움말이 작성될 공간입니다.
                          </Text>
                          <Text style={{fontSize: 15, color: '#707070'}}>
                            세부 도움말이 작성될 공간입니다.
                          </Text>
                          <Text style={{fontSize: 15, color: '#707070'}}>
                            세부 도움말이 작성될 공간입니다.
                          </Text>
                        </View>
                      </View>

                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          style={styles.modalYesButton}
                          onPress={() =>
                            this.setState({isHelpModalVisible: false})
                          }>
                          <Text style={{fontSize: 16, color: 'white'}}>
                            확인
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                )}
                <Modal
                  isVisible={this.state.isSalaryModalVisible1}
                  onBackdropPress={() =>
                    this.setState({isSalaryModalVisible1: false})
                  }
                  style={{margin: 0, justifyContent: 'flex-end'}}
                  avoidKeyboard={true}>
                  <View style={{height: 300, backgroundColor: 'white'}}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 30,
                            color: '#642A8C',
                            marginTop: 40,
                          }}>
                          주휴수당 계산 방법 선택
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          paddingHorizontal: 40,
                        }}>
                        {this.weekType(1, '(자동) 근로기준법 기준')}
                        <View style={{height: 30}} />
                        {this.weekType(0, '(수동) 월 근무시간 입력')}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{...styles.buttonAfter, width: wp('100%')}}
                      onPress={() => {
                        if (this.state.weekTypeCheck[0]) {
                          if (this.state.weekTime === '') {
                            this._AlertModal(
                              '',
                              '수동 선택시 월 근무시간을 반드시 입력해주세요',
                            );
                            return;
                          } else if (isNaN(Number(this.state.weekTime))) {
                            this._AlertModal(
                              '',
                              '근무시간에 숫자만 입력 가능합니다.',
                            );
                            return;
                          } else if (Number(this.state.weekTime) < 0) {
                            this._AlertModal(
                              '',
                              '근무시간에 음수를 입력할 수 없습니다',
                            );
                            return;
                          }
                        }

                        this.setState({isSalaryModalVisible1: false});
                      }}>
                      <Text style={{fontSize: 16, color: 'white'}}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>

                <Modal
                  isVisible={this.state.isSalaryModalVisible2}
                  onBackdropPress={() =>
                    this.setState({isSalaryModalVisible2: false})
                  }
                  style={{margin: 0, justifyContent: 'flex-end'}}
                  avoidKeyboard={true}>
                  <View style={{height: 300, backgroundColor: 'white'}}>
                    <View style={{flex: 1}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 30,
                            color: '#642A8C',
                            marginTop: 40,
                          }}>
                          휴게시간 계산 방법 선택
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          paddingHorizontal: 40,
                        }}>
                        {this.restType(1, '(자동) 근로기준법 기준')}
                        <View style={{height: 30}} />
                        {this.restType(0, '(수동) 일 휴게시간 입력')}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{...styles.buttonAfter, width: wp('100%')}}
                      onPress={() => {
                        if (this.state.restTypeCheck[0]) {
                          if (this.state.restTime === '') {
                            this._AlertModal(
                              '',
                              '수동 선택시 일 휴게시간을 반드시 입력해주세요',
                            );
                            return;
                          } else if (isNaN(Number(this.state.restTime))) {
                            this._AlertModal(
                              '',
                              '휴게시간에 숫자만 입력 가능합니다.',
                            );
                            return;
                          } else if (Number(this.state.restTime) < 0) {
                            this._AlertModal(
                              '',
                              '휴게시간에 음수를 입력할 수 없습니다',
                            );
                            return;
                          }
                        }

                        this.setState({isSalaryModalVisible2: false});
                      }}>
                      <Text style={{fontSize: 16, color: 'white'}}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <TouchableOpacity
                  ref={(ref) => (this.refCheck5 = ref)}
                  style={
                    this.state.click5 === false
                      ? styles.box
                      : {...styles.box, borderWidth: 2}
                  }
                  onPress={() => {
                    this.setState({click5: !this.state.click5}, () => {
                      if (this.state.click5) {
                        if (
                          this.refCheck5 &&
                          this.refCheck5.state.touchable.positionOnActivate
                        ) {
                          this.pressGroup(
                            this.refCheck5.state.touchable.positionOnActivate
                              .top,
                          );
                        }
                      }
                    });
                  }}>
                  <View style={styles.boxTitle}>
                    <Text style={styles.titleText}>
                      (선택) 직책/권한 설정, 급여보기 설정
                    </Text>
                    {this.state.click5 === false ? (
                      <Entypo
                        name="triangle-down"
                        size={30}
                        color="#642A8C"
                        style={{}}
                      />
                    ) : (
                      <Entypo
                        name="triangle-up"
                        size={30}
                        color="#BCC5D3"
                        style={{}}
                      />
                    )}
                  </View>
                </TouchableOpacity>

                {this.state.click5 === true ? (
                  <View style={styles.positionAndAuthorityBox}>
                    <View style={styles.positionBox}>
                      <Text style={styles.positionAndAuthorityBoxTextName}>
                        직책 선택{' '}
                        <Text style={{color: '#B91C1B', paddingTop: 3}}>*</Text>
                      </Text>
                      <View style={styles.positionAndAuthorityBoxLine} />
                      <View style={styles.positionPickRowBox}>
                        {this.position(0, '스태프')}
                        {this.position(1, '점장')}
                      </View>
                    </View>

                    {this.state.positionCheck.includes(true) === true && (
                      <View style={styles.authorityBox}>
                        {this.authority(0, '선택 시 본인급여 확인 가능')}

                        {this.state.positionCheck[1] === true && (
                          <View>
                            <View style={{height: 25}} />
                            {this.authority(4, '선택 시 사업장 급여 확인 가능')}
                            <View style={styles.authorityBoxLine} />
                            {this.authority(
                              1,
                              '[점장] 직원급여/일정 수정 가능',
                            )}
                            <View style={{height: 25}} />
                            {this.authority(2, '[점장] 직원 캘린더 수정 가능')}
                            <View style={{height: 25}} />
                            {this.authority(
                              3,
                              '[점장] 타 직원 출퇴근 알람 받기',
                            )}
                          </View>
                        )}
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
              <View style={{marginTop: 30, alignItems: 'center'}}>
                <TouchableOpacity
                  style={
                    this.state.regist === false
                      ? styles.buttonBefore
                      : styles.buttonAfter
                  }
                  onPress={() => {
                    this._register();
                  }}
                  disabled={false}>
                  <Text style={{fontSize: 16, color: 'white'}}>
                    {this.props.navigation.state.params.TITLE == '직원정보 수정'
                      ? '수정완료'
                      : '입력완료'}
                  </Text>
                </TouchableOpacity>
                <View style={{height: 50}} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};
