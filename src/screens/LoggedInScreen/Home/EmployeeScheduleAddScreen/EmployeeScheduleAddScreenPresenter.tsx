import React from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import DatePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import moment from 'moment';

import {
  EllipseIcon,
  RemoveCircleIcon,
  HelpCircleIcon,
  CheckBoxIcon,
} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import InputLine from '~/components/InputLine';
import EmployeeScheduleAddScreenRenderDayPicker from './EmployeeScheduleAddScreenRenderDayPicker';

interface IsSelected {
  isSelected: boolean;
  substract?: string;
  color?: string;
}

interface IColor {
  color: string;
  backgroundColor?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RowSpaceTouchable = styled(RowTouchable)`
  justify-content: space-around;
`;

const RenderDayRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding: 10px 0;
  width: ${wp('100%') - 80}px;
`;

const RenderDayBox = styled.View<IsSelected>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
  background-color: ${(props) =>
    props.isSelected ? `${props.color}` : 'transparent'};
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const RenderDayBoxText = styled.Text<IsSelected>`
  color: ${(props) => (props.isSelected ? 'white' : '#CCCCCC')};
`;

const RenderDayTime = styled.View`
  margin-top: 10px;
  margin-left: 15px;
  width: 115px;
`;

const RenderDayTimeText = styled.Text<IsSelected>`
  font-size: 15px;
  color: ${(props) => (props.substract && props.isSelected ? '#000' : '#ddd')};
`;

const RenderDuration = styled.View`
  margin-top: 10px;
  margin-left: 5px;
  width: 85px;
`;

const RenderDurationText = styled.Text<IsSelected>`
  font-size: 15px;
  color: ${(props) => (props.isSelected ? '#000' : '#ddd')};
`;

const RenderWorkDayTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 15px;
`;

const RenderDayPickerTouchable = styled.TouchableOpacity<IColor>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${(props) => props.color};
  align-items: center;
  justify-content: center;
`;

const RenderDayPickerText = styled.Text<IColor>`
  font-size: 15px;
  color: ${(props) => props.color};
  font-weight: bold;
`;

const RenderTouchable = styled.TouchableOpacity<IsSelected>`
  width: 25%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#F2F2F2' : '#642a8c')};
  align-items: center;
  justify-content: center;
`;

const RenderText = styled.Text<IsSelected>`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? '#CCCCCC' : '#642A8C')};
`;

const TextInput = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  color: #642a8c;
`;

const RenderMinuteContainer = styled.View<IsSelected>`
  width: 50%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#F2F2F2' : '#642a8c')};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const StepTitle = styled.Text`
  font-weight: bold;
  font-size: 17px;
  color: #000;
  margin-bottom: 20px;
`;

const DayPickRowBox = styled.View`
  width: 100%;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const WorkTypeCheckSection = styled.View``;

const TimeListBoxText = styled.Text<IsSelected>`
  font-weight: ${(props) => (props.isSelected ? '600' : '300')};
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const InputCase = styled.View`
  margin-bottom: 20px;
`;

const DateTouchable = styled.TouchableOpacity`
  justify-content: flex-end;
  padding-bottom: 5px;
  height: 40px;
`;

const SideBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SideText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  color: #212121;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const TimePickBoxTimeText = styled.Text<IsSelected>`
  font-size: 17px;
  color: ${(props) => (props.isSelected ? '#642A8C' : '#cccccc')};
`;

const ModalContainer = styled.View`
  padding: 40px;
  background-color: white;
`;

const ModalText = styled.Text`
  color: #642a8c;
  font-size: 15px;
  margin: 20px 0 10px;
`;

const ModalFooter = styled(Row)`
  width: ${wp('100%')}px;
`;

const ModalButton = styled.TouchableOpacity`
  width: ${wp('50%')}px;
  height: 60px;
  border-color: #642a8c;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const EmptySpace = styled.View`
  width: 45px;
`;

const SelectedText = styled.Text<IsSelected>`
  margin-left: 10px;
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const TimeListRowTouchable = styled.TouchableOpacity<IsSelected>`
  padding: 10px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

export default ({
  timeList,
  timeListIndex,
  setTimeListIndex,
  originalDayList,
  removeDayFn,
  dayList,
  setDayList,
  startTime,
  endTime,
  alertModal,
  hourList,
  numberFormatPadding,
  hour,
  setHour,
  minuteList,
  minute,
  setMinute,
  isMinuteInputFocused,
  setIsMinuteInputFocused,
  isHourModalVisible,
  setIsHourModalVisible,
  submitFn,
  TYPE,
  checkAddTimeFn,
  explainModal,
  startDate,
  setStartDate,
  isStartDayModalVisible,
  setIsStartDayModalVisible,
  endDate,
  setEndDate,
  isEndDayModalVisible,
  setIsEndDayModalVisible,
  setCheckNoEndDate,
  checkNoEndDate,
  setHourModalType,
  setTimeFn,
  onDayPress,
  removeTimeFn,
}) => {
  // STEP 1의 출퇴근 시간 등록에서, <시> 컴포넌트 전체
  const RenderHour = () => {
    const returnList = [];
    const MAX_VALUE = Number(hourList[hourList.length - 1]);
    const COLUMN_COUNT = 4;
    const LOOP_SIZE = Number((hourList.length / COLUMN_COUNT).toFixed());
    let loopCount = 0;
    for (let i = 0; i < LOOP_SIZE; i++) {
      returnList.push(
        <Row style={{flexDirection: 'row'}} key={i.toString()}>
          {Array.apply(null, new Array(COLUMN_COUNT)).map((el, index) => {
            if (loopCount > MAX_VALUE) {
              return null;
            }
            loopCount++;
            return (
              <RenderHourData
                hourProps={Number(hourList[COLUMN_COUNT * i + index])}
              />
            );
          })}
        </Row>,
      );
    }
    return returnList;
  };

  // STEP 1의 출퇴근 시간 선택에서, <시> 컴포넌트
  const RenderHourData = ({hourProps}) => {
    const display = numberFormatPadding(hourProps);
    return (
      <RenderTouchable
        isSelected={display !== hour}
        onPress={() => setHour(display)}
        key={display}>
        <RenderText isSelected={display !== hour}>{display}</RenderText>
      </RenderTouchable>
    );
  };

  // STEP 1의 출퇴근 시간 등록에서, <분> 컴포넌트 전체
  const RenderMinute = () => {
    const returnList = [];
    const MAX_VALUE = Number(minuteList[minuteList.length - 1]);
    const COLUMN_COUNT = 4;
    const LOOP_SIZE = Number((minuteList.length / COLUMN_COUNT).toFixed());
    let loopCount = 0;
    for (let i = 0; i < LOOP_SIZE; i++) {
      returnList.push(
        <Row key={i.toString()}>
          {Array.apply(null, new Array(i < LOOP_SIZE ? COLUMN_COUNT : 2)).map(
            (el, index) => {
              if (loopCount > MAX_VALUE) {
                return null;
              }
              loopCount += 10;
              return (
                <RenderMinuteData
                  minuteProps={Number(minuteList[COLUMN_COUNT * i + index])}
                />
              );
            },
          )}
          {i === LOOP_SIZE - 1 && (
            <RenderMinuteContainer
              isSelected={!isMinuteInputFocused}
              key="input">
              <TextInput
                onChangeText={(text) => setMinute(text)}
                value={Number(minute) % 10 > 0 ? minute : null}
                placeholder={'직접 입력'}
                placeholderTextColor={'#CCCCCC'}
                keyboardType={'number-pad'}
                maxLength={2}
                onFocus={() => {
                  setMinute(null);
                  setIsMinuteInputFocused(true);
                }}
              />
            </RenderMinuteContainer>
          )}
        </Row>,
      );
    }
    return returnList;
  };

  // STEP 1의 출퇴근 시간 등록에서, <분> 컴포넌트
  const RenderMinuteData = ({minuteProps}) => {
    const display = numberFormatPadding(minuteProps);
    return (
      <RenderTouchable
        isSelected={isMinuteInputFocused || display !== minute}
        onPress={() => {
          Keyboard.dismiss();
          setMinute(display);
          setIsMinuteInputFocused(false);
        }}
        key={display}>
        <RenderText isSelected={isMinuteInputFocused || display !== minute}>
          {display}
        </RenderText>
      </RenderTouchable>
    );
  };

  const RenderWorkDayList = () => (
    <WorkTypeCheckSection>
      {originalDayList?.map((originalDay) => (
        <RenderWorkDayItem key={originalDay.day} originalDay={originalDay} />
      ))}
    </WorkTypeCheckSection>
  );

  const RenderWorkDayItem = ({originalDay, key}) => {
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
    const isSelected = color && flag;
    return (
      <RenderDayRow key={key}>
        <RenderDayBox isSelected={isSelected} color={color}>
          <RenderDayBoxText isSelected={isSelected}>
            {originalDay.text}
          </RenderDayBoxText>
        </RenderDayBox>
        <RenderDayTime>
          <RenderDayTimeText isSelected={isSelected} substract={substract}>
            {isSelected ? startTime : '00:00'}&nbsp;~&nbsp;
            {isSelected ? endTime : '00:00'}
          </RenderDayTimeText>
        </RenderDayTime>
        <RenderDuration>
          <RenderDurationText isSelected={isSelected}>
            {isSelected && substract}
          </RenderDurationText>
        </RenderDuration>
        {flag && isSelected && (
          <RenderWorkDayTouchable onPress={() => removeDayFn(originalDay)}>
            <RemoveCircleIcon size={22} />
          </RenderWorkDayTouchable>
        )}
      </RenderDayRow>
    );
  };

  const RenderDayPicker = () => (
    <>
      {dayList?.map((day, index) => (
        <EmployeeScheduleAddScreenRenderDayPicker
          day={day}
          index={index}
          dayList={dayList}
          timeList={timeList}
          startTime={startTime}
          endTime={endTime}
          alertModal={alertModal}
          onDayPress={onDayPress}
        />
      ))}
    </>
  );

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <InputCase>
              <Row>
                <RowTouchable
                  onPress={() =>
                    explainModal('퇴근해CU 출퇴근관리가 시작되는 일자입니다.')
                  }>
                  <NameText>일정 시작일</NameText>
                  <HelpCircleIcon />
                </RowTouchable>
              </Row>
              <DatePickerModal
                headerTextIOS={'시작일을 선택하세요.'}
                cancelTextIOS={'취소'}
                confirmTextIOS={'확인'}
                isVisible={isStartDayModalVisible}
                mode="date"
                locale="ko_KRus_EN"
                onConfirm={(date) => {
                  setStartDate(date), setIsStartDayModalVisible(false);
                }}
                onCancel={() => {
                  setIsStartDayModalVisible(false);
                }}
                display="default"
              />
              <DateTouchable onPress={() => setIsStartDayModalVisible(true)}>
                <Text>{startDate ?? ''}</Text>
              </DateTouchable>
              <InputLine isBefore={startDate === ''} />
            </InputCase>
            <InputCase>
              <Row>
                <RowTouchable
                  onPress={() => {
                    explainModal(
                      '',
                      '정해진 근무종료일이 없다면 [퇴사일 없음]으로 선택해주세요.\n\n* 직원이 퇴사하였을 경우 [직원정보]에서 퇴사일을 설정하면 사업장에서 직원이 더 이상 표시되지 않습니다.',
                    );
                  }}>
                  <NameText>일정 종료일</NameText>
                  <HelpCircleIcon />
                </RowTouchable>
              </Row>
              <DatePickerModal
                headerTextIOS={'종료일을 선택하세요.'}
                cancelTextIOS={'취소'}
                confirmTextIOS={'확인'}
                isVisible={isEndDayModalVisible}
                mode="date"
                locale="ko_KRus_EN"
                onConfirm={(date) => {
                  setEndDate(moment(date).format('YYYY-MM-DD'));
                  setIsEndDayModalVisible(false);
                }}
                onCancel={() => {
                  setIsEndDayModalVisible(false);
                }}
                display="default"
              />
              <DateTouchable
                disabled={checkNoEndDate}
                onPress={() => setIsEndDayModalVisible(true)}>
                <Text>{moment(endDate).format('YYYY.MM.DD')}</Text>
              </DateTouchable>
              <InputLine isBefore={endDate === null} />
              <RowTouchable
                style={{marginTop: 20}}
                onPress={() => {
                  setCheckNoEndDate(!checkNoEndDate);
                  setEndDate(null);
                }}>
                <SideBox>
                  {checkNoEndDate ? (
                    <CheckBoxIcon size={25} color="#642A8C" />
                  ) : (
                    <CheckBoxIcon size={25} color="#CCCCCC" />
                  )}
                  <SideText>일정 종료일 없음</SideText>
                </SideBox>
              </RowTouchable>
            </InputCase>
          </Section>
          <Section>
            <StepTitle>(STEP 1) 출퇴근 시간 입력</StepTitle>
            <RowSpaceTouchable
              onPress={() => {
                const startTimed = startTime;
                if (startTimed) {
                  const startTimeArray = startTimed.split(':');
                  setHour(startTimeArray[0]);
                  setMinute(startTimeArray[1]);
                  if (Number(startTimeArray[1]) % 10 > 0) {
                    setIsMinuteInputFocused(true);
                  }
                }
                setIsHourModalVisible(true);
                setHourModalType('start');
              }}>
              <SideText>출근시간</SideText>
              <TimePickBoxTimeText isSelected={!!startTime}>
                {startTime || '00:00'}
              </TimePickBoxTimeText>
            </RowSpaceTouchable>
            <WhiteSpace />
            <RowSpaceTouchable
              onPress={() => {
                const endTimed = endTime;
                if (endTimed) {
                  const endTimeArray = endTimed.split(':');
                  setHour(endTimeArray[0]);
                  setMinute(endTimeArray[1]);
                  if (Number(endTimeArray[1]) % 10 > 0) {
                    setIsMinuteInputFocused(true);
                  }
                }
                setIsHourModalVisible(true);
                setHourModalType('end');
              }}>
              <SideText>퇴근시간</SideText>
              <TimePickBoxTimeText isSelected={!!endTime}>
                {endTime || '00:00'}
              </TimePickBoxTimeText>
            </RowSpaceTouchable>
          </Section>
          <Section>
            <StepTitle>(STEP 2) 출퇴근 요일 선택</StepTitle>
            <DayPickRowBox>
              <RenderDayPicker />
            </DayPickRowBox>
            <RoundBtn
              isInSection={true}
              text={'추가하기'}
              onPress={() => checkAddTimeFn()}
              isRegisted={true}
            />
          </Section>
          {timeList && timeList.length !== 0 && (
            <Section>
              <StepTitle>(STEP 3) 근무일정 확인</StepTitle>
              {timeList.map((data, index) => (
                <TimeListRowTouchable
                  key={index}
                  isSelected={timeListIndex === index}
                  color={data.color}
                  onPress={() => {
                    if (timeListIndex === index) {
                      setTimeListIndex(null);
                    } else {
                      setTimeListIndex(index);
                    }
                  }}>
                  <Row>
                    <TimeListBoxText isSelected={timeListIndex === index}>
                      <EllipseIcon
                        color={timeListIndex === index ? data.color : '#ddd'}
                      />
                      &nbsp;&nbsp;
                      {data.startTime} ~ {data.endTime}
                    </TimeListBoxText>
                  </Row>
                  <Row>
                    <SelectedText
                      isSelected={timeListIndex === index}
                      color={data.color}>
                      보기
                    </SelectedText>
                    {timeListIndex === index ? (
                      <RenderWorkDayTouchable
                        onPress={() => removeTimeFn(index)}>
                        <RemoveCircleIcon size={30} />
                      </RenderWorkDayTouchable>
                    ) : (
                      <EmptySpace />
                    )}
                  </Row>
                </TimeListRowTouchable>
              ))}
              <RenderWorkDayList />
            </Section>
          )}
          <SubmitBtn
            text={`일정${TYPE} 완료`}
            onPress={() => submitFn()}
            isRegisted={timeList.length > 0}
          />
        </Container>
      </ScrollView>
      <Modal
        isVisible={isHourModalVisible}
        onBackdropPress={() => {
          setIsHourModalVisible(false);
          setHour(null);
          setMinute(null);
          setIsMinuteInputFocused(false);
        }}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}>
        <ModalContainer>
          <ModalText>시간 선택</ModalText>
          {RenderHour()}
          <ModalText>분 선택</ModalText>
          {RenderMinute()}
        </ModalContainer>
        <ModalFooter>
          <ModalButton
            onPress={() => {
              setIsHourModalVisible(false);
              setHour(null);
              setMinute(null);
              setIsMinuteInputFocused(false);
            }}>
            <NameText style={{color: '#642a8c'}}>닫기</NameText>
          </ModalButton>
          <ModalButton
            style={{backgroundColor: '#642a8c'}}
            onPress={() => setTimeFn()}>
            <NameText style={{color: 'white'}}>확인</NameText>
          </ModalButton>
        </ModalFooter>
      </Modal>
    </BackGround>
  );
};
