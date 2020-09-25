import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import RBSheet from 'react-native-raw-bottom-sheet';

import {
  RadioBtnOffIcon,
  RadioBtnOnIcon,
  AddCircleIcon,
  RemoveCircleIcon,
} from '~/constants/Icons';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import RoundBtn from '~/components/Btn/RoundBtn';
import ChecklistAddScreenCard from './ChecklistAddScreenCard';
import Ripple from 'react-native-material-ripple';

interface IsSelected {
  isSelected: boolean;
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

const RowTitle = styled(Row)`
  justify-content: space-between;
  height: 30px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 15px;
  border-bottom-width: 1px;
  border-color: #e5e5e5;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const RedText = styled.Text`
  color: #b91c1b;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 20px 0;
`;

const ChecktimeButton = styled.TouchableOpacity`
  padding: 5px 20px;
  border-width: 1px;
  border-radius: 30px;
  border-color: #642a8c;
`;

const ChecktimeButtonText = styled.Text<IsSelected>`
  color: #642a8c;
  font-weight: ${(props) => (props.isSelected ? 'bold' : '400')};
`;

const SubTitleText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
`;

const SubText = styled.Text`
  margin-top: 5px;
  margin-left: 21px;
  font-size: 13px;
  color: #aaa;
`;

const DeleteButton = styled.TouchableOpacity`
  margin: 50px 0;
  justify-content: center;
  align-items: center;
`;

const DeleteButtonText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ff3d3d;
  text-decoration-line: underline;
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

const ModalContainer = styled.View`
  padding: 40px;
  background-color: white;
`;

const ModalText = styled.Text`
  color: #642a8c;
  font-size: 15px;
  margin: 20px 0 10px;
`;

const NameText = styled.Text`
  font-size: 18px;
`;

const ModalFooter = styled(Row)`
  width: ${wp('100%')}px;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const ModalButton = styled(Ripple)`
  width: ${wp('50%')}px;
  height: 60px;
  border-color: #642a8c;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const ChecklistItem = styled.View`
  padding: 6px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GreyText = styled.Text`
  max-width: 230px;
  font-size: 15px;
  color: #999;
`;

const ChecklistBox = styled.View`
  margin-top: 20px;
  min-height: 200px;
  border-width: 1px;
  border-color: #e5e5e5;
  padding: 10px;
`;

const WhiteSpace = styled.View`
  height: 30px;
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

const TimeTextInput = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  color: #642a8c;
`;

export default ({
  TITLE,
  setTITLE,
  deleteEmpFn,
  isNoCheckedtime,
  setIsNoCheckedtime,
  isCheckedCamera,
  setIsCheckedCamera,
  customChecktime,
  setCustomChecktime,
  isCheckedEmpChoise,
  setIsCheckedEmpChoise,
  checklistInput,
  choiseEmpFn,
  emplist,
  choiceEmp,
  submitFn,
  LIST,
  type,
  confirmModal,
  setChecklistInput,
  setLIST,
  setHour,
  setMinute,
  setIsMinuteInputFocused,
  isHourModalVisible,
  setIsHourModalVisible,
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
              <TimeTextInput
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

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <Row>
              <TitleText>체크항목</TitleText>
              <RedText>*</RedText>
            </Row>
            <TextInput
              placeholder={'ex. 주방'}
              selectionColor={'#642A8C'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setTITLE(text)}
              value={TITLE}
            />
          </Section>

          <Section>
            <Row>
              <TitleText>체크리스트</TitleText>
              <RedText>*</RedText>
            </Row>
            <TextInput
              placeholder={'ex. 가스벨브 잠그기'}
              selectionColor={'#642A8C'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setChecklistInput(text)}
              value={checklistInput}
            />
            <RoundBtn
              isInSection={true}
              text={'목록에 추가하기'}
              onPress={() => {
                let value = JSON.parse(JSON.stringify(LIST));
                Keyboard.dismiss();
                value.push(checklistInput);
                setChecklistInput('');
                setLIST(value);
              }}
              isRegisted={checklistInput !== ''}
            />
            <ChecklistBox>
              {LIST?.length === 0 && (
                <ChecklistItem>
                  <GreyText>ex. 가스벨브 잠그기</GreyText>
                </ChecklistItem>
              )}
              {LIST?.map((data, index) => (
                <ChecklistItem key={index}>
                  <GreyText>{data}</GreyText>
                  <Touchable
                    onPress={() => {
                      let value = JSON.parse(JSON.stringify(LIST));
                      value.splice(index, 1);
                      setLIST(value);
                    }}>
                    <RemoveCircleIcon />
                  </Touchable>
                </ChecklistItem>
              ))}
            </ChecklistBox>
          </Section>

          <Section>
            <RowTitle>
              <Row>
                <TitleText>체크예정시간</TitleText>
                <RedText>*</RedText>
              </Row>
              {!isNoCheckedtime && (
                <ChecktimeButton
                  onPress={() => {
                    const customChecktimed = customChecktime;
                    if (customChecktimed) {
                      const customChecktimeArray = customChecktimed.split(':');
                      setHour(customChecktimeArray[0]);
                      setMinute(customChecktimeArray[1]);
                      if (Number(customChecktimeArray[1]) % 10 > 0) {
                        setIsMinuteInputFocused(true);
                      }
                    }
                    setIsHourModalVisible(true);
                  }}>
                  <ChecktimeButtonText isSelected={customChecktime}>
                    {customChecktime ? customChecktime : '선택'}
                  </ChecktimeButtonText>
                </ChecktimeButton>
              )}
            </RowTitle>
            <Line />
            <Touchable
              onPress={() => {
                setIsNoCheckedtime(!isNoCheckedtime);
                setCustomChecktime('');
              }}>
              <Row>
                {isNoCheckedtime ? (
                  <RadioBtnOnIcon size={22} />
                ) : (
                  <RadioBtnOffIcon size={22} />
                )}
                <SubTitleText>체크예정시간 미입력</SubTitleText>
              </Row>
              <SubText>
                미입력 선택시 정해진 시간없이 체크할 수 있으며 근무중인 직원에게
                알람을 보내지 않습니다.
              </SubText>
            </Touchable>
          </Section>

          <Section>
            <RowTitle>
              <Row>
                <TitleText>체크리스트 사진촬영</TitleText>
              </Row>
            </RowTitle>
            <Line />
            <Touchable onPress={() => setIsCheckedCamera(!isCheckedCamera)}>
              <Row>
                {isCheckedCamera ? (
                  <RadioBtnOnIcon size={22} />
                ) : (
                  <RadioBtnOffIcon size={22} />
                )}
                <SubTitleText>체크리스트 관련내용 사진촬영 필수</SubTitleText>
              </Row>
              <SubText>
                선택시 체크리스트 관련 사진을 등록해야만 체크완료 가능합니다.
              </SubText>
            </Touchable>
          </Section>

          <Section>
            <RowTitle>
              <Row>
                <TitleText>체크리스트 담당자</TitleText>
                <RedText>*</RedText>
              </Row>
              {isCheckedEmpChoise && (
                <ChecktimeButton onPress={() => RBSheetRef.current.open()}>
                  <ChecktimeButtonText>직원 선택하기</ChecktimeButtonText>
                </ChecktimeButton>
              )}
            </RowTitle>
            <Line />
            <Touchable
              onPress={() => setIsCheckedEmpChoise(!isCheckedEmpChoise)}>
              <Row>
                {isCheckedEmpChoise ? (
                  <RadioBtnOnIcon size={22} />
                ) : (
                  <RadioBtnOffIcon size={22} />
                )}
                <SubTitleText>
                  담당직원만 체크할 수 있도록 설정합니다.
                </SubTitleText>
              </Row>
              <SubText>미선택시 전 직원이 체크할 수 있습니다.</SubText>
            </Touchable>
            <WhiteSpace />
            {isCheckedEmpChoise && (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{marginTop: 10}}>
                {choiceEmp?.map((data, index) => (
                  <Touchable
                    key={index}
                    onPress={() => deleteEmpFn(data.EMP_SEQ)}>
                    <ChecklistAddScreenCard
                      name={data.NAME}
                      image={data.IMAGE}
                    />
                  </Touchable>
                ))}
              </ScrollView>
            )}
            {choiceEmp?.length !== 0 && (
              <SubText>* 직원 이미지를 클릭하면 목록에서 제외됩니다.</SubText>
            )}
          </Section>
          <SubmitBtn
            text={`${type}완료`}
            onPress={() => submitFn()}
            isRegisted={
              (LIST?.length !== 0 && isNoCheckedtime) || customChecktime
            }
          />
        </Container>
        {type == '수정' && (
          <DeleteButton
            onPress={() =>
              confirmModal('', '체크리스트를 삭제하시겠습니까?', '취소', '삭제')
            }>
            <DeleteButtonText>체크리스트 삭제하기</DeleteButtonText>
          </DeleteButton>
        )}
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
                choiseEmpFn(data);
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
