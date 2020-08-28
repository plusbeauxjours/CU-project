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
} from '../../../../constants/Icons';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import RoundBtn from '../../../../components/Btn/RoundBtn';
import ChecklistAddScreenCard from './ChecklistAddScreenCard';

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

const WhiteText = styled.Text`
  font-size: 12px;
  color: white;
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
  align-items: baseline;
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

const MinuteCheckTextInput = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  color: #642a8c;
`;

const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: white;
  margin: 20px 0;
`;

const ChecktimeButton = styled.TouchableOpacity`
  padding: 5px 20px;
  margin-bottom: 5px;
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

const ModalButton = styled.TouchableOpacity`
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

export default ({
  hourCheck,
  setHourCheck,
  minuteCheck,
  setMinuteCheck,
  minuteDirectInput,
  setMinuteDirectInput,
  checkpointInput,
  setCheckpointInput,
  deleteEmpFn,
  isTimeCheckedModalVisible,
  setIsTimeCheckedModalVisible,
  isRegisterModalVisible,
  setIsRegisterModalVisible,
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
  checkDirectInputFn,
  emplist,
  choiceEmp,
  setChoiceEmp,
  submitFn,
  checklist,
  type,
  confirmModal,
  setChecklistInput,
  checklistState,
  setChecklistState,
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
            setHourCheck(value);
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

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
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
              onChangeText={(text) => {
                setCheckpointInput(text);
              }}
              value={checkpointInput}
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
              text={'목록에 추가하기'}
              onPress={() => {
                let value = JSON.parse(JSON.stringify(checklistState));
                Keyboard.dismiss();
                value.push(checklistInput);
                setChecklistInput('');
                setChecklistState(value);
              }}
              isRegisted={checklistInput !== ''}
            />
            <ChecklistBox>
              {checklistState?.length === 0 && (
                <ChecklistItem>
                  <GreyText>ex. 가스벨브 잠그기</GreyText>
                </ChecklistItem>
              )}
              {checklistState?.map((data, index) => (
                <ChecklistItem key={index}>
                  <GreyText>{data}</GreyText>
                  <Touchable
                    onPress={() => {
                      let value = JSON.parse(JSON.stringify(checklistState));
                      value.splice(index, 1);
                      setChecklistState(value);
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
                  onPress={() => setIsTimeCheckedModalVisible(true)}>
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
                  <ChecktimeButtonText isSelected={customChecktime}>
                    {customChecktime ? customChecktime : '선택'}
                  </ChecktimeButtonText>
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
            <ScrollView
              horizontal={true}
              contentContainerStyle={{marginTop: 10}}>
              {choiceEmp?.map((data, index) => {
                return (
                  <Touchable
                    key={index}
                    onPress={() => deleteEmpFn(data.EMP_SEQ)}>
                    <ChecklistAddScreenCard
                      name={data.NAME}
                      image={data.IMAGE}
                    />
                  </Touchable>
                );
              })}
            </ScrollView>
            {choiceEmp?.length !== 0 && (
              <SubText>* 직원 이미지를 클릭하면 목록에서 제외됩니다.</SubText>
            )}
          </Section>
          <Modal
            isVisible={isTimeCheckedModalVisible}
            onBackdropPress={() => setIsTimeCheckedModalVisible(false)}
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
              {/* {RenderMinuteRow([0, 10, 20, 30], 1)}
              {RenderMinuteRow([40, 50, 'directInput'], 2)} */}
              {/* <RenderMinuteRow rowData={[0, 10, 20, 30]} rowNum={1} />
              <RenderMinuteRow rowData={[40, 50, 'directInput']} rowNum={2} /> */}
            </ModalContainer>
            <ModalFooter>
              {/* <ModalButton onPress={() => setIsTimeCheckedModalVisible(false)}>
                <NameText style={{color: '#642a8c'}}>닫기</NameText>
              </ModalButton> */}
              {/*<ModalButton onPress={() => checkDirectInputFn()}>
                <NameText style={{color: 'white'}}>확인</NameText>
              </ModalButton> */}
            </ModalFooter>
          </Modal>
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
              {emplist?.map((data, index) => {
                return (
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
                );
              })}
            </ScrollView>
          </RBSheet>
        </Container>
        <SubmitBtn
          text={`${type}완료`}
          onPress={() => submitFn()}
          isRegisted={
            checklist?.length === 0 &&
            (!isNoCheckedtime || customChecktime === '')
          }
        />
        {type == '수정' && (
          <DeleteButton
            onPress={() =>
              confirmModal('', '체크리스트를 삭제하시겠습니까?', '취소', '삭제')
            }>
            <DeleteButtonText>체크리스트 삭제하기</DeleteButtonText>
          </DeleteButton>
        )}
      </ScrollView>
    </BackGround>
  );
};
