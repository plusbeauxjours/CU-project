import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InputLine from '~/components/InputLine';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import {
  RadioBtnOnIcon,
  RadioBtnOffIcon,
  HelpCircleIcon,
} from '~/constants/Icons';

interface IIsPerple {
  isPerple: boolean;
}
interface IColor {
  color: string;
}
interface IIsBefore {
  isBefore?: boolean;
}

interface IsError {
  isError?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Section = styled.View`
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const ModalContainer = styled.View`
  background-color: white;
`;

const Text = styled.Text``;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const InputCaseRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const NameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
  border-radius: 20px;
`;

const RequestText = styled.Text`
  font-size: 12px;
  color: white;
`;

const TextInput = styled.TextInput`
  flex: 1;
  padding: 10px 0;
  font-size: 15px;
  color: black;
`;

const CheckDay = styled.TouchableOpacity<IIsPerple>`
  width: 20%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isPerple ? '#642A8C' : '#F2F2F2')};
  align-items: center;
  justify-content: center;
`;

const CheckDayText = styled.Text<IIsPerple>`
  color: ${(props) => (props.isPerple ? '#642A8C' : '#F2F2F2')};
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const TypeText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
`;

const GreyText = styled.Text<IsError>`
  font-size: 12px;
  color: ${(props) => (props.isError ? 'red' : '#aaa')};
  margin-top: 5px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #000;
  font-weight: bold;
  margin-bottom: 10px;
  margin-right: 10px;
`;

const Touchable = styled.TouchableOpacity``;

const TypeCheckCase = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 8px;
`;

const InputText = styled.Text<IIsBefore>`
  padding: 10px 0;
  font-size: 15px;
  color: ${(props) => (props.isBefore ? '#b5b5b5' : 'black')};
`;

const WhiteSpace = styled.View`
  height: 20px;
`;

const ModalList = styled.TouchableOpacity`
  height: ${hp('7%')}px;
  border-bottom-width: 1px;
  border-color: #ddd;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const ModalText = styled.Text`
  font-size: 15px;
`;

const ModalConfirmArea = styled.View`
  width: ${wp('100%')}px;
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
`;

const ModalConfirm = styled.TouchableOpacity<IColor>`
  height: ${hp('7%')}px;
  width: ${wp('50%')}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

const ModalConfirmText = styled.Text<IColor>`
  font-size: 18px;
  color: ${(props) => props.color};
`;

const ModalTitle = styled.Text`
  font-size: 17px;
  color: #642a8c;
  padding: 0 20px;
  margin-top: 20px;
`;

const ModalInfoText = styled.Text`
  font-size: 13px;
  padding: 0 20px;
  margin-top: 5px;
`;

const ModalCalendar = styled.View`
  background-color: white;
  border-color: #f2f2f2;
  border-width: 1px;
  margin: 20px 0;
`;

const SubmitBtnContainer = styled.TouchableOpacity`
  width: 100%;
  height: ${hp('7%')}px;
  background-color: #642a8c;
  justify-content: center;
  align-items: center;
`;

const SubmitBtnText = styled.Text`
  font-size: 15px;
  color: white;
  margin-left: 10px;
  padding-top: 5px;
`;

export default ({
  days,
  sizeTypeCheck,
  setTYPE,
  setDays,
  CALCULATE_DAY,
  onPressLate,
  onPressEarly,
  modalVisible1,
  setModalVisible1,
  modalVisible2,
  setModalVisible2,
  modalVisible3,
  setModalVisible3,
  checkDirectInput,
  EARLY_TIME,
  LATE_TIME,
  timeCheck,
  EARLYtimeCheck,
  explainModal,
  dayCheck,
  gotoSearchAddress,
  setADDR1,
  ADDR1,
  setADDR2,
  ADDR2,
  setSizeTypeCheck,
  setCU_CODE,
  CU_CODE,
  NAME,
  setNAME,
  submit,
}) => {
  const RenderDayRowData = ({rowData, rowNum}) => {
    let value = JSON.parse(JSON.stringify(days));
    return rowData.map((data, index) => {
      index = index + 5 * (rowNum - 1);
      return (
        <CheckDay
          key={index}
          isPerple={value[index] === true}
          onPress={() => {
            value.fill(false);
            value[index] = true;
            setDays(value);
          }}>
          <CheckDayText isPerple={value[index] === true}>{data}</CheckDayText>
        </CheckDay>
      );
    });
  };

  const renderDayRow = (rowData, rowNum) => {
    return (
      <Row>
        <RenderDayRowData rowData={rowData} rowNum={rowNum} />
      </Row>
    );
  };

  const SizeType = ({selection, text}) => {
    let value = JSON.parse(JSON.stringify(sizeTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setSizeTypeCheck(value);
          setTYPE(selection);
        }}>
        {sizeTypeCheck[selection] ? (
          <RadioBtnOnIcon size={17} />
        ) : (
          <RadioBtnOffIcon size={17} />
        )}
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <TitleText>점포 정보</TitleText>
            <WhiteSpace />
            <NameText>점포코드</NameText>
            <TextInput
              placeholder={'코드를 입력해주세요.'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => {
                setCU_CODE(text);
              }}
              onFocus={() => {
                setCU_CODE('');
              }}
              value={CU_CODE}
              keyboardType={'number-pad'}
              maxLength={5}
            />
            <InputLine isBefore={CU_CODE === ''} />
            <WhiteSpace />
            <NameText>점포명</NameText>
            <Row>
              <Text style={{marginRight: 10}}>CU</Text>
              <TextInput
                placeholder={'OOO점'}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  setNAME(text);
                }}
                value={NAME}
              />
            </Row>
            <InputLine isBefore={NAME === ''} />
            <GreyText isError={NAME?.length > 10}>
              * 점포명은 10자 이하로 입력해주세요.
            </GreyText>
            <WhiteSpace />
            <InputCaseRow>
              <RowTouchable
                onPress={() => {
                  explainModal(
                    '',
                    '입력하신 주소로 출퇴근관리 QR키트를 발송해 드립니다. 일반우편으로 발송되며, 원활한 수령을 위하여 정확한 주소 입력 부탁드립니다.',
                  );
                }}>
                <NameText>기본주소</NameText>
                <HelpCircleIcon />
              </RowTouchable>
              <RequestButton onPress={() => gotoSearchAddress()}>
                <RequestText>주소 검색</RequestText>
              </RequestButton>
            </InputCaseRow>
            <TextInput
              placeholder={'서울시 성동구'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => setADDR1(text)}
              value={ADDR1}
              editable={false}
            />
            <InputLine isBefore={ADDR1 === ''} />
            <WhiteSpace />
            <NameText>상세주소</NameText>
            <TextInput
              placeholder={'1층 102호'}
              placeholderTextColor={'#E5E5E5'}
              onChangeText={(text) => {
                setADDR2(text);
              }}
              value={ADDR2}
            />
            <InputLine isBefore={ADDR2 === ''} />
          </Section>
          <Section>
            <TitleText>출퇴근정보 설정</TitleText>
            <WhiteSpace />
            <RowTouchable
              onPress={() => {
                explainModal(
                  '지각 허용시간',
                  '설정한 시간까지는 지각을 하여도 급여에서 차감되지 않습니다. 단, 지각 허용시간을 초과할 경우에는 지각시간(허용시간+초과시간)이 차감됩니다.\n\nEx) 10분 설정 후 5분 지각 시 : 미차감\nEx) 10분 설정 후 15분 지각 시 : 15분 차감',
                );
              }}>
              <NameText>지각 허용시간</NameText>
              <HelpCircleIcon />
            </RowTouchable>
            <Touchable
              onPress={() => {
                setModalVisible2(true);
              }}>
              <InputText isBefore={timeCheck === false}>
                {LATE_TIME}분
              </InputText>
              <InputLine isBefore={timeCheck === false} />
            </Touchable>
            <WhiteSpace />
            <RowTouchable
              onPress={() => {
                explainModal(
                  '조퇴 허용시간',
                  '설정한 시간까지는 지각을 하여도 급여에서 차감되지 않습니다. 단, 조퇴 허용시간을 초과할 경우에는 조퇴시간(허용시간+초과시간)이 차감됩니다.\n\nEx) 10분 설정 후 5분 조퇴 시 : 미차감\nEx) 10분 설정 후 15분 조퇴 시 : 15분 차감',
                );
              }}>
              <NameText>조퇴 허용시간</NameText>
              <HelpCircleIcon />
            </RowTouchable>
            <Touchable
              onPress={() => {
                setModalVisible1(true);
              }}>
              <InputText isBefore={EARLYtimeCheck === false}>
                {EARLY_TIME}분
              </InputText>
              <InputLine isBefore={EARLYtimeCheck === false} />
            </Touchable>
          </Section>
          <Section>
            <TitleText>급여정보 설정</TitleText>
            <WhiteSpace />
            <RowTouchable
              onPress={() => {
                explainModal(
                  '사업장 규모',
                  '5인 이상 사업장 선택 시 추가근무, 야간근무 수당이 자동으로 가산됩니다. 자세한 설명은 [도움말 전체보기]에서 확인하세요.',
                );
              }}>
              <NameText>사업장 규모</NameText>
              <HelpCircleIcon />
            </RowTouchable>
            <TypeCheckCase>
              <SizeType selection={0} text={'5인 미만'} />
              <SizeType selection={1} text={'5인 이상'} />
            </TypeCheckCase>
            <RowTouchable
              activeOpacity={1}
              onPress={() => {
                explainModal(
                  '급여정산일',
                  '급여가 계산되는 기간 설정입니다.\n(급여지급일과 혼동하지 마세요.)\n\nEx1) 25일 설정 : 전월 26일 ~ 당월 25일 기간동안의 급여계산\n\nEx2) 말일 설정 : 당월 1일 ~ 당월 말일 기간동안의 급여계산',
                );
              }}>
              <NameText>
                급여정산일
                <HelpCircleIcon />
              </NameText>
            </RowTouchable>
            <Touchable
              onPress={() => {
                let value = JSON.parse(JSON.stringify(days));
                value.fill(false);
                if (dayCheck) {
                  if (CALCULATE_DAY == '1') {
                    value[29] = true;
                  } else {
                    value[Number(CALCULATE_DAY) - 2] = true;
                  }
                }
                setModalVisible3(!modalVisible3);
                setDays(value);
              }}>
              <InputText isBefore={dayCheck === false}>
                {CALCULATE_DAY == 1 ? '말일' : `${CALCULATE_DAY - 1}일`}
              </InputText>
              <InputLine isBefore={dayCheck === false} />
            </Touchable>
            <GreyText>
              * 급여산정 기간 설정으로 급여지급일과 혼동하지 마세요
            </GreyText>
          </Section>
          <Modal
            isVisible={modalVisible1}
            onRequestClose={() => setModalVisible1(false)}
            onBackdropPress={() => setModalVisible1(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              <ModalList onPress={() => onPressEarly(0, '0')}>
                <ModalText>0분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(5, '1')}>
                <ModalText>5분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(10, '1')}>
                <ModalText>10분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(15, '1')}>
                <ModalText>15분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(30, '1')}>
                <ModalText>30분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressEarly(60, '1')}>
                <ModalText>60분</ModalText>
              </ModalList>
              <SubmitBtnContainer
                onPress={() => {
                  setModalVisible1(false);
                }}>
                <SubmitBtnText>확인</SubmitBtnText>
              </SubmitBtnContainer>
            </ModalContainer>
          </Modal>
          <Modal
            isVisible={modalVisible2}
            onRequestClose={() => setModalVisible2(false)}
            onBackdropPress={() => setModalVisible2(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              <ModalList onPress={() => onPressLate(0, '0')}>
                <ModalText>0분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(5, '1')}>
                <ModalText>5분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(10, '1')}>
                <ModalText>10분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(15, '1')}>
                <ModalText>15분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(30, '1')}>
                <ModalText>30분</ModalText>
              </ModalList>
              <ModalList onPress={() => onPressLate(60, '1')}>
                <ModalText>60분</ModalText>
              </ModalList>
              <SubmitBtnContainer
                onPress={() => {
                  setModalVisible2(false);
                }}>
                <SubmitBtnText>확인</SubmitBtnText>
              </SubmitBtnContainer>
            </ModalContainer>
          </Modal>
          <Modal
            isVisible={modalVisible3}
            onRequestClose={() => setModalVisible3(false)}
            onBackdropPress={() => setModalVisible3(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <ModalContainer>
              <ModalTitle>정산일 선택</ModalTitle>
              <ModalInfoText>
                * 30일, 31일은 '말일'로 선택해주세요.
              </ModalInfoText>
              <ModalCalendar>
                {renderDayRow([1, 2, 3, 4, 5], 1)}
                {renderDayRow([6, 7, 8, 9, 10], 2)}
                {renderDayRow([11, 12, 13, 14, 15], 3)}
                {renderDayRow([16, 17, 18, 19, 20], 4)}
                {renderDayRow([21, 22, 23, 24, 25], 5)}
                {renderDayRow([26, 27, 28, 29, '말일'], 6)}
              </ModalCalendar>
              <ModalConfirmArea>
                <ModalConfirm
                  color={'#fff'}
                  onPress={() => {
                    setModalVisible3(!modalVisible3);
                  }}>
                  <ModalConfirmText color={'#642a8c'}>닫기</ModalConfirmText>
                </ModalConfirm>
                <ModalConfirm
                  color={'#642a8c'}
                  onPress={() => checkDirectInput()}>
                  <ModalConfirmText color={'white'}>확인</ModalConfirmText>
                </ModalConfirm>
              </ModalConfirmArea>
            </ModalContainer>
          </Modal>
          <SubmitBtn
            text={'등록하기'}
            onPress={() => submit()}
            isRegisted={
              NAME !== '' &&
              NAME?.length < 11 &&
              ADDR1 !== '' &&
              ADDR2 !== '' &&
              timeCheck == true &&
              EARLYtimeCheck == true &&
              dayCheck == true
            }
          />
        </Container>
      </ScrollView>
    </BackGround>
  );
};
