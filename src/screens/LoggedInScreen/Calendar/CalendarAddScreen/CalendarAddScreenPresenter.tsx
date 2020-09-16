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

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import {
  AddCircleIcon,
  RemoveCircleIcon,
  EllipseIcon,
} from '../../../../constants/Icons';
import CalendarAddScreenCard from './CalendarAddScreenCard';
import RoundBtn from '../../../../components/Btn/RoundBtn';
import {
  DownIcon,
  UpIcon,
  RadioBtnOffIcon,
  RadioBtnOnIcon,
} from '../../../../constants/Icons';

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export default ({
  alertModal,
  markedDates,
  setMarkedDates,
  emplist,
  timeCheck,
  hourCheck,
  minuteCheck,
  minuteDirectInput,
  setMinuteDirectInput,
  setHourCheck,
  setMinuteCheck,
  registerFn,
  addEmpFn,
  deleteEmpFn,
  checkAddTimeFn,
  deleteColorFn,
  choiceEmp,
  checkDirectInputFn,
  isTimeCheckModalVisible,
  setIsTimeCheckModalVisible,
  setTimeSwitch,
  startTime,
  endTime,
  timeSelected,
  setTimeSelected,
  stepFourClick,
  setStepFourClick,
  incentiveCheck,
  setIncentiveCheck,
}) => {
  const RBSheetRef = useRef(null);

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
            <EllipseIcon size={30} color={data.color} />
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
            <RenderWorkDayTouchable onPress={() => deleteColorFn(index)}>
              <RemoveCircleIcon size={30} />
            </RenderWorkDayTouchable>
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
          <ModalText>분 선택</ModalText>
          {RenderMinuteRow([0, 10, 20, 30], 1)}
          {RenderMinuteRow([40, 50, 'directInput'], 2)}
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
