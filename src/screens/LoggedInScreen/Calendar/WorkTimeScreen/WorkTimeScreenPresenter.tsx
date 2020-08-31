import React from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import {Avatar} from 'react-native-elements';
import {
  UpIcon,
  DownIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
} from '../../../../constants/Icons';

interface IsSelected {
  isSelected: boolean;
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
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

export default ({
  hourCheck,
  minuteCheck,
  minuteDirectInput,
  setMinuteDirectInput,
  setHourCheck,
  setMinuteCheck,
  checkDirectInputFn,
  isTimeCheckModalVisible,
  setIsTimeCheckModalVisible,
  setTimeSwitch,
  startTime,
  endTime,
  stepFourClick,
  setStepFourClick,
  incentiveCheck,
  setIncentiveCheck,
  IMAGE,
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
}) => {
  const RenderHourRow = (rowData, rowNum) => (
    <Row>
      <RenderHourRowData rowData={rowData} rowNum={rowNum} />
    </Row>
  );

  const RenderHourRowData = ({rowData, rowNum}) => {
    let value = JSON.parse(JSON.stringify(hourCheck));
    return rowData?.map((data, index) => {
      index = index + 4 * (rowNum - 1);
      return (
        <CheckTouchable
          key={index}
          isSelected={value[index]}
          onPress={() => {
            value.fill(false); // ES6
            value[index] = true;
            setHourCheck(value);
          }}>
          <CheckTouchableText isSelected={value[index]}>
            {data < 10 ? `0${data}` : data}
          </CheckTouchableText>
        </CheckTouchable>
      );
    });
  };

  const RenderMinuteRow = (rowData, rowNum) => (
    <Row>
      <RenderMinuteRowData rowData={rowData} rowNum={rowNum} />
    </Row>
  );

  const RenderMinuteRowData = ({rowData, rowNum}) => {
    let value = JSON.parse(JSON.stringify(minuteCheck));
    return rowData?.map((data, index) => {
      index = index + 4 * (rowNum - 1);
      if (data === 'directInput') {
        return (
          <MinuteCheckTextInputContainer isSelected={value[index]} key={index}>
            <MinuteCheckTextInput
              selectionColor={'#642A8C'}
              onChangeText={(text) => setMinuteDirectInput(text)}
              value={minuteDirectInput}
              placeholder={'직접 입력'}
              placeholderTextColor={'#CCCCCC'}
              keyboardType={'number-pad'}
              maxLength={2}
              onFocus={() => {
                value.fill(false); // ES6
                value[index] = true;
                setMinuteCheck(value);
              }}
            />
          </MinuteCheckTextInputContainer>
        );
      }
      return (
        <CheckTouchable
          isSelected={value[index]}
          onPress={() => {
            Keyboard.dismiss();
            value.fill(false); // ES6
            value[index] = true;
            setMinuteCheck(value);
            setMinuteDirectInput('');
          }}
          key={index}>
          <CheckTouchableText isSelected={value[index]}>
            {data < 10 ? `0${data}` : data}
          </CheckTouchableText>
        </CheckTouchable>
      );
    });
  };

  const FixScheduleStepOne = () => (
    <Section>
      <Row>
        <Avatar
          rounded
          size={50}
          source={{
            uri: `http://133.186.209.113/uploads/${IMAGE}`,
          }}
          containerStyle={{borderWidth: 1, borderColor: '#ccc'}}
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
            setIsTimeCheckModalVisible(true);
            setTimeSwitch('start');
          }}>
          <Text>출근시간</Text>
          <Text color={startTime}>{startTime ?? '00:00'}</Text>
        </RowSpaceTouchable>
        <WhiteSpace />
        <RowSpaceTouchable
          onPress={() => {
            setIsTimeCheckModalVisible(true);
            setTimeSwitch('end');
          }}>
          <Text>퇴근시간</Text>
          <Text color={endTime}>{endTime ?? '00:00'}</Text>
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
        isVisible={isTimeCheckModalVisible}
        onBackdropPress={() => {
          let valueH = JSON.parse(JSON.stringify(hourCheck));
          let valueM = JSON.parse(JSON.stringify(minuteCheck));
          setIsTimeCheckModalVisible(false);
          setHourCheck(valueH);
          setMinuteCheck(valueM);
          setMinuteDirectInput('');
        }}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}>
        <ModalContainer>
          <ModalText>시간 선택</ModalText>
          {RenderHourRow([0, 1, 2, 3], 1)}
          {RenderHourRow([4, 5, 6, 7], 2)}
          {RenderHourRow([8, 9, 10, 11], 3)}
          {RenderHourRow([12, 13, 14, 15], 4)}
          {RenderHourRow([16, 17, 18, 19], 5)}
          {RenderHourRow([20, 21, 22, 23], 6)}
          {/* <RenderHourRow rowData={[0, 1, 2, 3]} rowNum={1} />
          <RenderHourRow rowData={[4, 5, 6, 7]} rowNum={2} />
          <RenderHourRow rowData={[8, 9, 10, 11]} rowNum={3} />
          <RenderHourRow rowData={[12, 13, 14, 15]} rowNum={4} />
          <RenderHourRow rowData={[16, 17, 18, 19]} rowNum={5} />
          <RenderHourRow rowData={[20, 21, 22, 23]} rowNum={6} /> */}
          <ModalText>분 선택</ModalText>
          {RenderMinuteRow([0, 10, 20, 30], 1)}
          {RenderMinuteRow([40, 50, 'directInput'], 2)}
          {/* <RenderMinuteRow rowData={[0, 10, 20, 30]} rowNum={1} />
          <RenderMinuteRow rowData={[40, 50, 'directInput']} rowNum={2} /> */}
        </ModalContainer>
        <ModalFooter>
          <ModalButton
            onPress={() => {
              let valueH = JSON.parse(JSON.stringify(hourCheck));
              let valueM = JSON.parse(JSON.stringify(minuteCheck));
              setIsTimeCheckModalVisible(false);
              setHourCheck(valueH);
              setMinuteCheck(valueM);
              setMinuteDirectInput('');
            }}>
            <NameText style={{color: '#642a8c'}}>닫기</NameText>
          </ModalButton>
          <ModalButton
            style={{backgroundColor: '#642a8c'}}
            onPress={() => checkDirectInputFn()}>
            <NameText style={{color: 'white'}}>확인</NameText>
          </ModalButton>
        </ModalFooter>
      </Modal>
    </BackGround>
  );
};
