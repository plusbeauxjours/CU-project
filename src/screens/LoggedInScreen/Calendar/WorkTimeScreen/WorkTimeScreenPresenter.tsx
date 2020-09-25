import React from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import SubmitBtn from '~/components/Btn/SubmitBtn';
import Ripple from 'react-native-material-ripple';
import {
  UpIcon,
  DownIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
} from '~/constants/Icons';

interface IsSelected {
  isSelected: boolean;
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

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

const RowTitle = styled(Row)`
  justify-content: space-between;
  height: 30px;
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

const NameText = styled.Text`
  font-size: 18px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-right: 5px;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const IncentiveText = styled.Text`
  margin-left: 10;
  font-size: 15px;
`;

const WorkTime = styled.View`
  height: 15px;
  flex-direction: row;
  justify-content: flex-start;
`;

const WorkTitleText = styled.Text`
  color: #999;
  font-size: 11px;
  margin-left: 5px;
  width: 60px;
`;

const WorkTimeText = styled.Text`
  color: #999;
  font-size: 11px;
`;

const CntArea = styled.View`
  flex: 1;
  padding-left: 15px;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RowSpaceTouchable = styled(RowTouchable)`
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
  startTime,
  endTime,
  stepFourClick,
  setStepFourClick,
  incentiveCheck,
  setIncentiveCheck,
  NAME,
  START,
  END,
  ATTENDANCE_TIME,
  WORK_OFF_TIME,
  CHANGE_START,
  CHANGE_END,
  START_TIME,
  END_TIME,
  UPDATED_START,
  UPDATED_END,
  registerFn,
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
      <Row>
        <FastImage
          style={{width: 60, height: 60, borderRadius: 30}}
          source={{
            uri: 'http://cuapi.shop-sol.com/uploads/3.png',
            headers: {Authorization: 'someAuthToken'},
            priority: FastImage.priority.low,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <CntArea>
          <NameText style={{marginBottom: 10}}>{NAME}</NameText>
          {CHANGE_START != null ? (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              <WorkTimeText>
                {(ATTENDANCE_TIME || START)?.substring(0, 5)} ~&nbsp;
                {(WORK_OFF_TIME || END)?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          ) : (
            <WorkTime>
              <WorkTitleText>근무시간 </WorkTitleText>
              <WorkTimeText>
                {(ATTENDANCE_TIME || START)?.substring(0, 5)} ~&nbsp;
                {(WORK_OFF_TIME || END)?.substring(0, 5)} >&nbsp;
                {CHANGE_START == null ? '' : CHANGE_START?.substring(0, 5)}{' '}
                ~&nbsp;
                {CHANGE_END == null ? '' : CHANGE_END?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          )}
          {UPDATED_START == null && UPDATED_END == null ? (
            <WorkTime>
              <WorkTitleText>출퇴근시간 </WorkTitleText>
              <WorkTimeText>
                {(START_TIME || '미출근')?.substring(0, 5)} ~&nbsp;
                {(END_TIME || '미퇴근')?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          ) : (
            <WorkTime>
              <WorkTitleText>출퇴근시간 </WorkTitleText>
              <WorkTimeText>
                {(START_TIME || '미출근')?.substring(0, 5)} ~&nbsp;
                {(END_TIME || '미퇴근')?.substring(0, 5)} >&nbsp;
                {(UPDATED_START || '미출근')?.substring(0, 5)} ~&nbsp;
                {(UPDATED_END || '미퇴근')?.substring(0, 5)}
              </WorkTimeText>
            </WorkTime>
          )}
        </CntArea>
      </Row>
    </Section>
  );

  const FixScheduleStepTwo = () => (
    <Section>
      <RowTitle>
        <TitleText>변경할 근무시간</TitleText>
      </RowTitle>
      <TimePickBox>
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
      </TimePickBox>
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
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <FixScheduleStepOne />
          <FixScheduleStepTwo />
          <FixScheduleStepFour />
          <SubmitBtn
            text={'수정완료'}
            isRegisted={true}
            onPress={() => registerFn()}
          />
        </Container>
      </ScrollView>
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
