import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import {AddCircleIcon, RemoveCircleIcon, EllipseIcon} from '~/constants/Icons';
import CalendarAddScreenCard from './CalendarAddScreenCard';
import RoundBtn from '~/components/Btn/RoundBtn';
import Ripple from 'react-native-material-ripple';
import {
  DownIcon,
  UpIcon,
  RadioBtnOffIcon,
  RadioBtnOnIcon,
} from '~/constants/Icons';

interface IsSelected {
  isSelected: boolean;
  color?: string;
}

interface IColor {
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text<IColor>`
  color: ${(props) => (props.color ? '#642A8C' : 'black')};
`;

const SelectedText = styled.Text<IsSelected>`
  margin-left: 10px;
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpaceTouchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const RowTouchable = styled.TouchableOpacity<IsSelected>`
  padding: 10px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;

const RowTitle = styled(Row)`
  justify-content: space-between;
  height: 30px;
`;

const CheckTouchable = styled.TouchableOpacity<IsSelected>`
  width: 25%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#642a8c' : '#F2F2F2')};
  align-items: center;
  justify-content: center;
`;

const CheckTouchableText = styled.Text<IsSelected>`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => (props.isSelected ? '#642a8c' : '#CCC')};
`;
const MinuteCheckTextInputContainer = styled.View<IsSelected>`
  width: 50%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#642a8c' : '#F2F2F2')};
  align-items: center;
  justify-content: center;
`;

const MinuteCheckTextInput = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  color: #642a8c;
`;

const ModalCheckEmpList = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 25px 10px;
  width: ${wp('100%')}px;
  background-color: white;
  border-color: #e5e5e5;
  border-bottom-width: 1px;
`;

const Bold = styled.Text`
  font-weight: bold;
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

const ModalButton = styled(Ripple)`
  width: ${wp('50%')}px;
  height: 60px;
  border-color: #642a8c;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const TimePickBox = styled.View`
  margin-top: 20px;
  padding: 20px;
  border-color: #f2f2f2;
  border-top-width: 1px;
`;

const EmptyBoxText = styled.Text`
  font-size: 15px;
  color: #cccccc;
  margin: 20px 0;
`;
const GreyText = styled.Text`
  font-size: 13px;
  color: #999;
`;
const NameText = styled.Text`
  font-size: 18px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-right: 5px;
`;

const ChecktimeButton = styled.TouchableOpacity`
  padding: 5px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: #642a8c;
`;

const ChecktimeButtonText = styled.Text`
  color: #642a8c;
  font-weight: 400;
`;

const SubText = styled.Text`
  margin-top: 5px;
  margin-left: 21px;
  font-size: 13px;
  color: #aaa;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const RenderWorkDayTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  z-index: 2;
`;

const IncentiveText = styled.Text`
  margin-left: 10;
  font-size: 15px;
`;

const EmptySpace = styled.View`
  width: 45px;
`;

const TimeRowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TimeRowSpaceTouchable = styled(TimeRowTouchable)`
  justify-content: space-around;
`;

const SideText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  color: #212121;
`;

const TimePickBoxTimeText = styled.Text<IsSelected>`
  font-size: 17px;
  color: ${(props) => (props.isSelected ? '#642A8C' : '#cccccc')};
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

const RenderMinuteContainer = styled.View<IsSelected>`
  width: 50%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isSelected ? '#F2F2F2' : '#642a8c')};
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const TextInput = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  color: #642a8c;
`;

export default ({
  alertModal,
  markedDates,
  setMarkedDates,
  emplist,
  timeCheck,
  registerFn,
  addEmpFn,
  deleteEmpFn,
  checkAddTimeFn,
  deleteColorFn,
  choiceEmp,
  startTime,
  endTime,
  timeSelected,
  setTimeSelected,
  stepFourClick,
  setStepFourClick,
  incentiveCheck,
  setIncentiveCheck,
  setHour,
  setMinute,
  setIsMinuteInputFocused,
  isHourModalVisible,
  setIsHourModalVisible,
  setHourModalType,
  hourList,
  numberFormatPadding,
  hour,
  minute,
  minuteList,
  isMinuteInputFocused,
  setTimeFn,
}) => {
  const RBSheetRef = useRef(null);

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

  const FixScheduleStepOne = () => (
    <Section>
      <RowTitle>
        <TitleText>(STEP 1) 직원 선택</TitleText>
        <ChecktimeButton onPress={() => RBSheetRef.current.open()}>
          <ChecktimeButtonText>직원 선택하기</ChecktimeButtonText>
        </ChecktimeButton>
      </RowTitle>
      {choiceEmp?.length !== 0 && (
        <>
          <ScrollView horizontal={true} contentContainerStyle={{marginTop: 10}}>
            {choiceEmp?.map((data, index) => (
              <Touchable key={index} onPress={() => deleteEmpFn(data.MobileNo)}>
                <CalendarAddScreenCard name={data.NAME} image={data.IMAGE} />
              </Touchable>
            ))}
          </ScrollView>
          <SubText>* 직원 이미지를 클릭하면 목록에서 제외됩니다.</SubText>
        </>
      )}
    </Section>
  );

  const FixScheduleStepTwo = () => (
    <Section>
      <RowTitle>
        <TitleText>(STEP 2) 출퇴근 시간 입력</TitleText>
      </RowTitle>
      <TimePickBox>
        <TimeRowSpaceTouchable
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
        </TimeRowSpaceTouchable>
        <WhiteSpace />
        <TimeRowSpaceTouchable
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
        </TimeRowSpaceTouchable>
      </TimePickBox>
      <RoundBtn
        isInSection={true}
        text={'출퇴근 목록에 추가'}
        onPress={() => checkAddTimeFn()}
        isRegisted={true}
      />

      {timeCheck.length === 0 && (
        <TimePickBox>
          <EmptyBoxText>
            출근, 퇴근시간 입력 후 추가하기를 눌러주세요
          </EmptyBoxText>
        </TimePickBox>
      )}
      <WhiteSpace />
      {timeCheck?.map((data, index) => (
        <RowTouchable
          key={index}
          isSelected={timeSelected === index}
          color={data.color}
          onPress={() => setTimeSelected(index)}>
          <Row>
            <EllipseIcon color={data.color} />
            <SelectedText
              isSelected={timeSelected === index}
              color={data.color}>
              {data.start} ~ {data.end}
            </SelectedText>
          </Row>
          <Row>
            <SelectedText
              isSelected={timeSelected === index}
              color={data.color}>
              선택
            </SelectedText>
            {timeSelected === index ? (
              <RenderWorkDayTouchable onPress={() => deleteColorFn(index)}>
                <RemoveCircleIcon size={30} />
              </RenderWorkDayTouchable>
            ) : (
              <EmptySpace />
            )}
          </Row>
        </RowTouchable>
      ))}
    </Section>
  );

  const FixScheduleStepThree = () => (
    <Section>
      <RowTitle>
        <TitleText>(STEP 3) 근무일 입력</TitleText>
      </RowTitle>
      <GreyText>
        출퇴근목록의 시간을 클릭하여 선택한 후 캘린더에서 일정을 선택하세요.
      </GreyText>
      <Calendar
        theme={{
          arrowColor: 'black',
          todayTextColor: '#AACE36',
        }}
        monthFormat={'yyyy년 M월'}
        style={{borderColor: '#F2F2F2', borderTopWidth: 1}}
        hideExtraDays={true}
        onDayPress={(day) => {
          if (timeSelected === null) {
            return alertModal('추가하신 출퇴근 시간을 먼저 선택해주세요.');
          }
          let temp = {
            key: timeCheck[timeSelected].color,
            color: timeCheck[timeSelected].color,
          };
          let value = JSON.parse(JSON.stringify(markedDates));
          let testIndex;
          if (value[day.dateString]) {
            testIndex = value[day.dateString].dots.findIndex(
              (element) => element.key === temp.key,
            );
            if (testIndex === -1) {
              value[day.dateString] = {
                dots: [temp],
              };
            } else {
              value[day.dateString].dots.splice(testIndex, 1);
            }
          } else {
            value[day.dateString] = {
              dots: [temp],
            };
          }
          setMarkedDates(value);
        }}
        markedDates={markedDates}
        markingType={'multi-dot'}
      />
    </Section>
  );

  const FixScheduleStepFour = () => (
    <Section>
      <Touchable onPress={() => setStepFourClick(!stepFourClick)}>
        <RowTitle>
          <RowTitle>
            <TitleText>(선택) 수당 포함여부</TitleText>
          </RowTitle>
          {stepFourClick ? (
            <UpIcon color={'#BCC5D3'} />
          ) : (
            <DownIcon color={'#000'} />
          )}
        </RowTitle>
      </Touchable>

      {stepFourClick && (
        <>
          <Incentive selection={0} text={'적용(1배)'} />
          <Incentive selection={1} text={'초과, 야간근무수당 적용(1.5배)'} />
          <Incentive selection={2} text={'초과, 야간근무수당 중복적용(2배)'} />
        </>
      )}
    </Section>
  );

  const Incentive = ({selection, text}) => {
    let valueI = JSON.parse(JSON.stringify(incentiveCheck));
    return (
      <Touchable
        style={{flexDirection: 'row', margin: 10}}
        onPress={() => {
          valueI.fill(false);
          valueI[selection] = true;
          setIncentiveCheck(valueI);
        }}>
        <Row>
          {incentiveCheck[selection] ? (
            <RadioBtnOnIcon size={25} color="#642A8C" />
          ) : (
            <RadioBtnOffIcon size={25} color="#CCCCCC" />
          )}
          <IncentiveText>{text}</IncentiveText>
        </Row>
      </Touchable>
    );
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <FixScheduleStepOne />
          <FixScheduleStepTwo />
          <FixScheduleStepThree />
          <FixScheduleStepFour />
          <SubmitBtn
            text={'일정추가완료'}
            isRegisted={true}
            onPress={() => registerFn()}
          />
        </Container>
      </ScrollView>
      <RBSheet
        ref={RBSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={350}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <ScrollView
          persistentScrollbar={true}
          contentContainerStyle={{alignItems: 'center'}}>
          {emplist?.map((data, index) => (
            <Touchable
              key={index}
              onPress={() => {
                addEmpFn(data);
              }}>
              <ModalCheckEmpList>
                <Bold>{data.NAME}</Bold>
                <Text>{data.MobileNo}</Text>
                <AddCircleIcon size={20} />
              </ModalCheckEmpList>
            </Touchable>
          ))}
        </ScrollView>
      </RBSheet>
      <Modal
        isVisible={isHourModalVisible}
        onRequestClose={() => {
          setIsHourModalVisible(false);
          setHour(null);
          setMinute(null);
          setIsMinuteInputFocused(false);
        }}
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
            }}
            rippleColor={'#666'}
            rippleDuration={600}
            rippleSize={1200}
            rippleContainerBorderRadius={30}
            rippleOpacity={0.1}>
            <NameText style={{color: '#642a8c'}}>닫기</NameText>
          </ModalButton>
          <ModalButton
            style={{backgroundColor: '#642a8c'}}
            onPress={() => setTimeFn()}
            rippleColor={'#ac52eb'}
            rippleSize={1200}
            rippleDuration={600}
            rippleOpacity={0.2}>
            <NameText style={{color: 'white'}}>확인</NameText>
          </ModalButton>
        </ModalFooter>
      </Modal>
    </BackGround>
  );
};
