import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View``;
const Text = styled.Text``;

export default () => {
  // 근무 요일별 시간 목록
  const renderWorkDay = (originalDay) => {
    const timeListed = timeList;
    const substractHour = (startTime, endTime) => {
      const startTimeArray = startTime.split(':');
      let startTimeHour = Number(startTimeArray[0]);
      let startTimeMinute = Number(startTimeArray[1]);
      const endTimeArray = endTime.split(':');
      let endTimeHour = Number(endTimeArray[0]);
      let endTimeMinute = Number(endTimeArray[1]);
      let resultTimeHour = 0;
      let resultTimeMinute = 0;
      if (
        startTimeHour > endTimeHour ||
        (startTimeHour === endTimeHour && startTimeMinute > endTimeMinute)
      ) {
        endTimeHour += 24;
      }
      if (startTimeMinute > endTimeMinute) {
        endTimeHour--;
        endTimeMinute += 60;
      }
      resultTimeMinute = endTimeMinute - startTimeMinute;
      resultTimeHour = endTimeHour - startTimeHour;
      return `(${resultTimeHour}h ${resultTimeMinute}m)`;
    };
    const timeListIndexed = timeListIndex;
    let startTime = '00:00';
    let endTime = '00:00';
    let flag = false;
    let color = null;
    for (let i = 0; i < timeListed.length; i++) {
      const time = timeListed[i];
      for (const day of time.dayList) {
        if (day.isChecked && originalDay.day === day.day) {
          startTime = time.startTime;
          endTime = time.endTime;
          flag = true;
          if (timeListIndexed !== null && timeListIndexed === i) {
            color = time.color;
          }
        }
      }
    }
    const substract = flag ? substractHour(startTime, endTime) : '';
    const isSelect = color && flag;
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: -5,
          marginBottom: 10,
          paddingVertical: 8,
          width: '100%',
        }}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={this._style(
              isSelect,
              {...styles.dayBoxOn, borderColor: '#CCCCCC'},
              {borderColor: color, backgroundColor: color},
            )}>
            <Text
              style={this._style(isSelect, styles.dayBoxText, {
                color: 'white',
              })}>
              {originalDay.text}
            </Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 15}}>
            <Text
              style={
                (this._style(isSelect, styles.dayBoxTextTime, {}),
                this._style(substract, {color: '#000'}, {}, {color: '#ddd'}))
              }>
              {startTime} ~ {endTime}
            </Text>
          </View>
          <View style={{marginTop: 10, marginLeft: 15, width: 85}}>
            <Text style={this._style(isSelect, styles.dayBoxTextTime, {})}>
              {substract}
            </Text>
          </View>
        </View>
        {flag ? (
          <TouchableOpacity
            style={styles.dayBoxTO}
            onPress={() => {
              this._removeDay(originalDay);
            }}>
            <AntDesign name="minuscircleo" size={20} color="#FF3D3D" />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  /*
   * 요일에 해당하는 선택 버튼 생성
   */
  const _renderDayPicker = () => {
    const dayList = this.state.dayList;
    const timeList = this.state.timeList;
    const returnList = [];

    for (let i = 0; i < dayList.length; i++) {
      const isChecked = dayList[i].isChecked;
      const borderColor = isChecked ? '#642A8C' : '#CCCCCC';
      // const backgroundColor1 = (isChecked ? '#642A8C' : '#FFFFFF') || isDisabled ? '#bbb' : '#FFFFFF';

      let isDisabled = false;

      for (const time of timeList) {
        if (!isDisabled) {
          for (const day of time.dayList) {
            if (day.isChecked && day.day === dayList[i].day) {
              isDisabled = true;
              break;
            }
          }
        }
      }
      var bgc;
      if (isChecked && !isDisabled) {
        bgc = '#642A8C';
      } else if (!isChecked && isDisabled) {
        bgc = '#bbb';
      } else if (isChecked && isDisabled) {
        bgc = '#bbb';
      } else {
        bgc = '#fff';
      }
      const TC = isChecked ? '#fff' : '#000';
      // const backgroundColor = isDisabled ? '#bbb' : '#FFFFFF';

      returnList.push(
        <TouchableOpacity
          style={{...styles.dayBoxOn, borderColor, backgroundColor: bgc}}
          onPress={() => {
            if (!isDisabled) {
              const startTime = this.state.startTime;
              const endTime = this.state.endTime;

              if (!startTime || !endTime) {
                this._AlertModal('', '시간을 선택해주세요.');
                return;
              }

              dayList[i].isChecked = !isChecked;

              this.setState({dayList});
            }
          }}
          key={dayList[i].day.toString()}>
          <Text style={{...styles.dayBoxTextOn, borderColor, color: TC}}>
            {dayList[i].text}
          </Text>
        </TouchableOpacity>,
      );
    }

    return returnList;
  };

  // STEP 1의 출퇴근 시간 등록에서, <시> 컴포넌트 전체
  const _renderHour = () => {
    const returnList = [];
    const hourList = this.state.hourList;
    const MAX_VALUE = Number(hourList[hourList.length - 1]);
    const COLUMN_COUNT = 4;
    const LOOP_SIZE = (hourList.length / COLUMN_COUNT).toFixed();

    let loopCount = 0;

    for (let i = 0; i < LOOP_SIZE; i++) {
      returnList.push(
        <View style={{flexDirection: 'row'}} key={i.toString()}>
          {Array.apply(null, new Array(COLUMN_COUNT)).map((el, index) => {
            if (loopCount > MAX_VALUE) {
              return null;
            }

            loopCount++;

            return this._renderHourData(
              Number(hourList[COLUMN_COUNT * i + index]),
            );
          })}
        </View>,
      );
    }

    return returnList;
  };

  // STEP 1의 출퇴근 시간 선택에서, <시> 컴포넌트
  const _renderHourData = (hour) => {
    const display = this._numberFormatPadding(hour);

    return (
      <TouchableOpacity
        style={this._style(display !== this.state.hour, styles.checkTO, {
          borderColor: '#F2F2F2',
        })}
        onPress={() => this.setState({hour: display})}
        key={display}>
        <Text
          style={this._style(display !== this.state.hour, styles.checkTOText, {
            color: '#CCCCCC',
          })}>
          {display}
        </Text>
      </TouchableOpacity>
    );
  };

  // STEP 1의 출퇴근 시간 등록에서, <분> 컴포넌트 전체
  const _renderMinute = () => {
    const returnList = [];
    const minuteList = this.state.minuteList;
    const MAX_VALUE = Number(minuteList[minuteList.length - 1]);
    const COLUMN_COUNT = 4;
    const LOOP_SIZE = (minuteList.length / COLUMN_COUNT).toFixed();

    let loopCount = 0;

    for (let i = 0; i < LOOP_SIZE; i++) {
      returnList.push(
        <View style={{flexDirection: 'row'}} key={i.toString()}>
          {Array.apply(null, new Array(i < LOOP_SIZE ? COLUMN_COUNT : 2)).map(
            (el, index) => {
              if (loopCount > MAX_VALUE) {
                return null;
              }

              loopCount += 10;

              return this._renderMinuteData(
                Number(minuteList[COLUMN_COUNT * i + index]),
              );
            },
          )}
          {i === LOOP_SIZE - 1 ? (
            <View
              style={this._style(
                !this.state.minuteInputFocused,
                styles.minuteCheckTI,
                {borderColor: '#F2F2F2'},
              )}
              key="input">
              <TextInput
                style={styles.minuteCheckTIText}
                onChangeText={(text) => this.setState({minute: text})}
                value={
                  Number(this.state.minute) % 10 > 0 ? this.state.minute : null
                }
                placeholder={'직접 입력'}
                placeholderTextColor={'#CCCCCC'}
                keyboardType={'number-pad'}
                maxLength={2}
                onFocus={() => {
                  this.setState({
                    minute: null,
                    minuteInputFocused: true,
                  });
                }}
              />
            </View>
          ) : null}
        </View>,
      );
    }

    return returnList;
  };

  // STEP 1의 출퇴근 시간 등록에서, <분> 컴포넌트
  const _renderMinuteData = (minute) => {
    const minuteInputFocused = this.state.minuteInputFocused;
    const display = this._numberFormatPadding(minute);

    return (
      <TouchableOpacity
        style={this._style(
          minuteInputFocused || display !== this.state.minute,
          styles.checkTO,
          {borderColor: '#F2F2F2'},
        )}
        onPress={() => {
          Keyboard.dismiss();
          this.setState({minute: display, minuteInputFocused: false});
        }}
        key={display}>
        <Text
          style={this._style(
            minuteInputFocused || display !== this.state.minute,
            styles.checkTOText,
            {color: '#CCCCCC'},
          )}>
          {display}
        </Text>
      </TouchableOpacity>
    );
  };

  const _getStep3 = () => (
    <>
      <View
        style={{
          ...styles.section,
          backgroundColor: '#FFFFFF',
          paddingBottom: 30,
          marginBottom: 20,
        }}>
        <View>
          <Text style={styles.stepOneTitle}>(STEP 3) 근무일정 확인</Text>
        </View>
        {this.state.timeList.length > 0 &&
          this.state.timeList.map((data, index) => {
            return (
              <TouchableOpacity
                style={this._style(
                  this.state.timeListIndex === index,
                  styles.timeBox,
                  {borderWidth: 1, borderColor: data.color},
                )}
                key={index}
                onPress={() => {
                  if (this.state.timeListIndex === index) {
                    this.setState({
                      timeListIndex: null,
                    });
                  } else {
                    this.setState({
                      timeListIndex: index,
                    });
                  }
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      ...styles.timeBoxColor,
                      backgroundColor: data.color,
                    }}
                  />
                  <Text style={styles.timeBoxText}>
                    {data.startTime} ~ {data.endTime}
                  </Text>
                </View>
                <View style={{marginRight: 20}}>
                  <Text
                    style={
                      this.state.timeListIndex === index
                        ? {color: data.color}
                        : {color: '#ddd'}
                    }>
                    보기
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.timeBoxTO}
                  onPress={() => {
                    this._removeTime(index);
                  }}>
                  <AntDesign
                    name="minuscircleo"
                    size={20}
                    color="#FF3D3D"
                    style={{paddingTop: 2}}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        <View style={styles.dayListBox}>
          <View style={styles.dayBoxWrapper}>
            {this.state.originalDayList.map((originalDay) => {
              return (
                <View style={styles.dayBox} key={originalDay.day}>
                  {this._renderWorkDay(originalDay)}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      {this.state.workType === constant.WORK_TYPE.FIX ? (
        <>
          <ScrollView style={{paddingBottom: 20}}>
            <View style={{...styles.section, marginVertical: 20}}>
              <View style={styles.workDayBoxWrapper}>
                <View style={styles.contentsBox}>
                  <View style={styles.InputCase}>
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={() => {
                        this._ExplainModal(
                          '',
                          '퇴근해CU 출퇴근관리가 시작되는 일자입니다.',
                        );
                      }}>
                      <Text style={styles.textName}>일정 시작일</Text>
                      <AntDesign
                        name="questioncircle"
                        size={18}
                        color="#bbb"
                        style={{paddingLeft: 5}}
                      />
                    </TouchableOpacity>
                    <DatePicker
                      ref={(picker) => {
                        this.datePickerDOB = picker;
                      }}
                      showIcon={false}
                      style={{}}
                      date={this.state.startDate ? this.state.startDate : ''}
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
                        this.setState({startDate: date});
                      }}
                    />
                    <View
                      style={this._style(
                        this.state.startDate,
                        styles.lineAfter,
                        styles.lineBefore,
                      )}
                    />
                  </View>

                  <View style={styles.InputCase}>
                    <TouchableOpacity
                      style={{flexDirection: 'row', alignItems: 'center'}}
                      onPress={() => {
                        this._ExplainModal(
                          '',
                          '매주 근무일정이 상이하다면 주 단위로 일정을 설정한 다음(일정시작-일정종료) 새로운 일정시작-일정종료를 설정해주세요.\n\n자세한 설명은 [도움말 전체보기]에서 확인하세요.',
                        );
                      }}>
                      <Text style={styles.textName}>일정 종료일</Text>
                      <AntDesign
                        name="questioncircle"
                        size={18}
                        color="#bbb"
                        style={{paddingLeft: 5}}
                      />
                    </TouchableOpacity>
                    <DatePicker
                      ref={(picker) => {
                        this.datePickerDOB = picker;
                      }}
                      showIcon={false}
                      style={{}}
                      date={this.state.endDate ? this.state.endDate : ''}
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
                          endDate: date,
                          checkNoEndDate: null,
                        });
                      }}
                    />
                    <View
                      style={this._style(
                        this.state.endDate,
                        styles.lineAfter,
                        styles.lineBefore,
                      )}
                    />
                    <View style={styles.sideBox}>
                      <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => {
                          this.setState({
                            checkNoEndDate: !this.state.checkNoEndDate,
                            endDate: null,
                            markedEndDate: null,
                          });
                        }}>
                        {this.state.checkNoEndDate ? (
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
                        <Text style={styles.sideText2}>일정 종료일 없음</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                ...styles.section,
                backgroundColor: '#FFFFFF',
                marginBottom: 25,
              }}>
              <Text style={styles.stepOneTitle}>(STEP 1) 출퇴근 시간 입력</Text>
              <View style={styles.timePickBox}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                  onPress={() => {
                    const startTime = this.state.startTime;
                    const params = {
                      hourModalVisible: true,
                      hourModalType: 'start',
                    };

                    if (startTime) {
                      const startTimeArray = startTime.split(':');

                      params.hour = startTimeArray[0];
                      params.minute = startTimeArray[1];

                      if (Number(params.minute) % 10 > 0) {
                        params.minuteInputFocused = true;
                      }
                    }

                    this.setState(params);
                  }}>
                  <Text style={styles.timePickBoxTitle}>출근시간</Text>
                  <Text
                    style={this._style(
                      !!this.state.startTime,
                      styles.timePickBoxTimeText,
                      {color: '#642A8C'},
                    )}>
                    {this.state.startTime || '00:00'}
                  </Text>
                </TouchableOpacity>
                <View style={{height: 25}} />
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                  onPress={() => {
                    const endTime = this.state.endTime;
                    const params = {
                      hourModalVisible: true,
                      hourModalType: 'end',
                    };

                    if (endTime) {
                      const endTimeArray = endTime.split(':');

                      params.hour = endTimeArray[0];
                      params.minute = endTimeArray[1];

                      if (Number(params.minute) % 10 > 0) {
                        params.minuteInputFocused = true;
                      }
                    }

                    this.setState(params);
                  }}>
                  <Text style={styles.timePickBoxTitle}>퇴근시간</Text>
                  <Text
                    style={this._style(
                      !!this.state.endTime,
                      styles.timePickBoxTimeText,
                      {color: '#642A8C'},
                    )}>
                    {this.state.endTime || '00:00'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{...styles.section, marginBottom: 25}}>
              <View>
                <Text style={styles.stepOneTitle}>
                  (STEP 2) 출퇴근 요일 선택
                </Text>
                <View style={styles.dayPickRowBox}>
                  {this._renderDayPicker()}
                </View>
              </View>
              <TouchableOpacity
                style={styles.timeAddButtonON}
                onPress={() => this._checkAddTime()}>
                <Text style={styles.timeAddButtonText}>추가하기</Text>
              </TouchableOpacity>
            </View>
            {this._getStep3()}
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <TouchableOpacity
                style={this._style(
                  this.state.timeList.length > 0,
                  styles.buttonAfter,
                  {},
                  styles.buttonBefore,
                )}
                onPress={() => {
                  if (this.state.timeList.length > 0) {
                    this._register();
                  }
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>
                  일정{TYPE} 완료
                </Text>
              </TouchableOpacity>
              <View style={{height: 50}} />
            </View>
          </ScrollView>
          <Modal
            isVisible={this.state.hourModalVisible}
            onBackdropPress={() => {
              this.setState({
                hourModalVisible: false,
                hour: null,
                minute: null,
                minuteInputFocused: false,
              });
            }}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <View style={{backgroundColor: 'white'}}>
              <View>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#000000',
                    paddingHorizontal: 20,
                    marginTop: 20,
                  }}>
                  시간 선택
                </Text>
                <View
                  style={{
                    borderColor: '#F2F2F2',
                    borderWidth: 1,
                    marginVertical: 20,
                  }}>
                  {this._renderHour()}
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontSize: 17,
                    color: '#000000',
                    paddingHorizontal: 20,
                  }}>
                  분 선택
                </Text>
                <View
                  style={{
                    borderColor: '#F2F2F2',
                    borderWidth: 1,
                    marginVertical: 20,
                  }}>
                  {this._renderMinute()}
                </View>
              </View>

              <KeyboardAvoidingView behavior="padding" enabled>
                <View style={styles.normalCommute1}>
                  <TouchableOpacity
                    style={styles.buttonAfter1}
                    onPress={() => {
                      this.setState({
                        hourModalVisible: false,
                        hour: null,
                        minute: null,
                        minuteInputFocused: false,
                      });
                    }}>
                    <Text style={{fontSize: 18, color: '#642a8c'}}>닫기 </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonAfter2}
                    onPress={() => this._setTime()}>
                    <Text style={{fontSize: 16, color: 'white'}}>확인</Text>
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
          <Modal
            isVisible={this.state.calendarModalVisible}
            onBackdropPress={() => this.setState({calendarModalVisible: false})}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <View style={{backgroundColor: 'white'}}>
              <Text
                style={{
                  color: '#000000',
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
                onDayPress={(date) => this._selectDate(date)}
                monthFormat={'yyyy년 M월'}
                onPressArrowLeft={(substractMonth) => substractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
                markedDates={
                  this.state.calendarModalType === 'start'
                    ? this.state.markedStartDate
                    : this.state.markedEndDate
                }
              />

              <TouchableOpacity
                style={{...styles.buttonAfter, width: wp('100%')}}
                onPress={() => {
                  this.setState({calendarModalVisible: false});
                }}>
                <Text style={{fontSize: 16, color: 'white'}}>확인</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      ) : null}
    </View>
  );
};
