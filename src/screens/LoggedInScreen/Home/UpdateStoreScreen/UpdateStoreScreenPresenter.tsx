import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import InputLine from '../../../../components/InputLine';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';

interface IIsPerple {
  isPerple: boolean;
}
interface IIsColumn {
  isColumn?: boolean;
}
interface IColor {
  color: string;
}
interface IIsBefore {
  isBefore?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
  justify-content: center;
`;
const ScrollView = styled.ScrollView``;
const View = styled.View`
  background-color: white;
`;
const Text = styled.Text``;
const Row = styled.View`
  flex-direction: row;
`;
const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
`;
const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
`;
const InputCase = styled.View`
  margin-top: 20px;
`;
const InputCaseRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
`;

const TextInputCase = styled.View``;
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
`;

const TypeText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
`;

const GreyText = styled.Text`
  margin-top: 5px;
  color: #aaa;
  font-size: 11px;
`;
const DeleteBtn = styled.TouchableOpacity`
  height: ${hp('5%')}px;
  align-items: center;
  justify-content: center;
`;
const DeleteBtnTExt = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ff3d3d;
  text-decoration-line: underline;
`;

const Box = styled.View`
  padding: 20px ${wp('10%')}px 30px ${wp('10%')}px;
  border-width: 1px;
  border-color: #ccc;
  background-color: #f6f6f6;
  border-radius: 5px;
  margin-top: 40px;
`;

const Touchable = styled.TouchableOpacity``;

const TypeCheckCase = styled.View<IIsColumn>`
  flex-direction: ${(props) => (props.isColumn ? 'column' : 'row')};
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
  STORE,
  setCU_CODE,
  CU_CODE,
  setName,
  name,
  LATE_TIME,
  timeCheck,
  dayCheck,
  CALCULATE_DAY,
  days,
  setDay1,
  setDays,
  setAddr1,
  setAddr2,
  addr1,
  addr2,
  commuteTypeCheck,
  setCommuteTypeCheck,
  setCommuteType,
  sizeTypeCheck,
  setSizeTypeCheck,
  setType,
  storeCategoryTypeCheck,
  setStoreCategoryTypeCheck,
  setStoreCategoryType,
  explainModal,
  gotoSearchAddress,
  submit,
  confirmModal,

  modalVisible1,
  modalVisible2,
  modalVisible3,
  setModalVisible1,
  setModalVisible2,
  setModalVisible3,
  onPressDistance,
  onPressLate,
  checkDirectInput,
}) => {
  const renderDayRowData = (rowData, rowNum) => {
    let value = JSON.parse(JSON.stringify(days));
    return rowData.map((data, index) => {
      index = index + 5 * (rowNum - 1);
      return (
        <CheckDay
          key={index}
          isPerple={value[index] === true}
          onPress={() => {
            value[index] = true;
            setDay1(index - 1);
            setDays(value);
          }}>
          <CheckDayText isPerple={value[index] === true}>{data}</CheckDayText>
        </CheckDay>
      );
    });
  };

  const renderDayRow = (rowData, rowNum) => {
    return <Row>{renderDayRowData(rowData, rowNum)}</Row>;
  };

  const commuteType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(commuteTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value[selection] = true;
          setCommuteTypeCheck(value);
          setCommuteType(selection);
        }}>
        {/* {commuteTypeCheck[selection] ? (
          <Icon name="circle" size={17} color="#642A8C" />
        ) : (
          <Icon name="circle" size={17} color="#F2F2F2" />
        )} */}
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };
  const sizeType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(sizeTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value[selection] = true;
          setSizeTypeCheck(value);
          setType(selection);
        }}>
        {/* {sizeTypeCheck[selection] ? (
          <Icon name="circle" size={17} color="#642A8C" />
        ) : (
          <Icon name="circle" size={17} color="#F2F2F2" />
        )} */}
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };

  const storeCategoryType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(storeCategoryTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value[selection] = true;
          setStoreCategoryTypeCheck(value);
          setStoreCategoryType(selection);
        }}>
        {/* {storeCategoryTypeCheck[selection] ? (
          <Icon name="circle" size={17} color="#642A8C" />
        ) : (
          <Icon name="circle" size={17} color="#F2F2F2" />
        )} */}
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
          <InputCase>
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
          </InputCase>
          <InputCase>
            <NameText>점포명</NameText>
            <TextInputCase>
              <TextInput
                placeholder={'위솝 역삼점'}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  setName(text);
                }}
                value={name}
                editable={STORE == 0 ? false : true}
              />
              <InputLine isBefore={name === ''} />
            </TextInputCase>
          </InputCase>
          <InputCase>
            <InputCaseRow>
              <RowTouchable
                onPress={() => {
                  explainModal(
                    '',
                    '입력하신 주소로 출퇴근관리 QR키트를 발송해 드립니다. 일반우편으로 발송되며, 원활한 수령을 위하여 정확한 주소 입력 부탁드립니다.',
                  );
                }}>
                <NameText>기본주소</NameText>
                {/* <Icon name="questioncircle" size={18} color="#bbb" /> */}
              </RowTouchable>
              <RequestButton onPress={() => gotoSearchAddress()}>
                <RequestText>주소 검색</RequestText>
              </RequestButton>
            </InputCaseRow>
            <TextInputCase>
              <TextInput
                placeholder={'서울시 성동구'}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  setAddr1(text);
                }}
                value={addr1}
                editable={STORE == 0 ? false : true}
              />
              <InputLine isBefore={addr1 === ''} />
            </TextInputCase>
          </InputCase>
          <InputCase>
            <NameText>상세주소</NameText>
            <TextInputCase>
              <TextInput
                placeholder={'1층 102호'}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  setAddr2(text);
                }}
                value={addr2}
                editable={STORE == 0 ? false : true}
              />
              <InputLine isBefore={addr2 === ''} />
            </TextInputCase>
          </InputCase>
          <Box>
            <NameText style={{alignSelf: 'center'}}>출퇴근정보 설정</NameText>
            <InputCase>
              {STORE == '1' ? (
                <>
                  <RowTouchable
                    onPress={() => {
                      explainModal(
                        '지각 허용시간',
                        '설정한 시간까지는 지각을 하여도 급여에서 차감되지 않습니다. 단, 지각 허용시간을 초과할 경우에는 지각시간(허용시간+초과시간)이 차감됩니다.\n\nEx) 10분 설정 후 5분 지각 시 : 미차감\nEx) 10분 설정 후 15분 지각 시 : 15분 차감',
                      );
                    }}>
                    <NameText>지각 허용시간</NameText>
                    {/* <Icon name="questioncircle" size={18} color="#bbb" /> */}
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
                </>
              ) : (
                <>
                  <NameText>지각 허용시간</NameText>
                  <TextInputCase>
                    <InputText isBefore={timeCheck === false}>
                      {LATE_TIME}분
                    </InputText>
                    <InputLine isBefore={timeCheck === false} />
                  </TextInputCase>
                </>
              )}
            </InputCase>
          </Box>
          <Box>
            <NameText style={{alignSelf: 'center'}}>급여정보 설정</NameText>
            <InputCase>
              {STORE == '1' ? (
                <>
                  <TypeContainer
                    onPress={() => {
                      explainModal(
                        '사업장 규모',
                        '5인 이상 사업장 선택 시 추가근무, 야간근무 수당이 자동으로 가산됩니다. 자세한 설명은 [도움말 전체보기]에서 확인하세요.',
                      );
                    }}>
                    <NameText style={{marginRight: 5}}>사업장 규모</NameText>
                    {/* <Icon name="questioncircle" size={18} color="#bbb" /> */}
                  </TypeContainer>
                  <TypeCheckCase>
                    <View>{sizeType(0, '5인 미만')}</View>
                    <View>{sizeType(1, '5인 이상')}</View>
                  </TypeCheckCase>
                </>
              ) : (
                <>
                  <TypeContainer>
                    <NameText style={{marginRight: 5}}>사업장 규모</NameText>
                  </TypeContainer>
                  <TypeCheckCase isColumn={STORE == '1'}>
                    <Text>
                      {sizeTypeCheck[0] == true ? '5인 미만' : '5인 이상'}
                    </Text>
                    <InputLine isBefore={false} />
                  </TypeCheckCase>
                </>
              )}
            </InputCase>
            <InputCase>
              {STORE == '1' ? (
                <>
                  <TypeContainer
                    activeOpacity={1}
                    onPress={() => {
                      explainModal(
                        '급여정산일',
                        '급여가 계산되는 기간 설정입니다.\n(급여지급일과 혼동하지 마세요.)\n\nEx1) 25일 설정 : 전월 26일 ~ 당월 25일 기간동안의 급여계산\n\nEx2) 말일 설정 : 당월 1일 ~ 당월 말일 기간동안의 급여계산',
                      );
                    }}>
                    <NameText style={{marginRight: 5}}>급여정산일</NameText>
                    {/* <Icon name="questioncircle" size={18} color="#bbb" /> */}
                  </TypeContainer>
                  <Touchable
                    onPress={() => {
                      if (STORE == '0') {
                        return;
                      } else {
                        let value = JSON.parse(JSON.stringify(days));

                        if (dayCheck) {
                          if (CALCULATE_DAY == '1') {
                            value[29] = true;
                          } else {
                            value[Number(CALCULATE_DAY) - 2] = true;
                          }
                        }
                        setModalVisible3(!modalVisible3);
                        setDays(value);
                      }
                    }}>
                    <InputText>
                      {CALCULATE_DAY == 1 ? '말일' : `${CALCULATE_DAY - 1}일`}
                    </InputText>
                    <InputLine isBefore={dayCheck === false} />
                  </Touchable>
                  <GreyText>
                    * 급여산정 기간 설정으로 급여지급일과 혼동하지 마세요
                  </GreyText>
                </>
              ) : (
                <>
                  <TypeContainer>
                    <NameText style={{marginRight: 5}}>급여정산일</NameText>
                  </TypeContainer>
                  <TextInputCase>
                    <InputText>
                      {CALCULATE_DAY == 0 ? '말일' : `${CALCULATE_DAY - 1}일`}
                    </InputText>
                    <InputLine isBefore={dayCheck === false} />
                    <GreyText>
                      * 급여산정 기간 설정으로 급여지급일과 혼동하지 마세요
                    </GreyText>
                  </TextInputCase>
                </>
              )}
            </InputCase>
          </Box>
          {/* <Modal
            isVisible={modalVisible1}
            onBackdropPress={() => setModalVisible1(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <View style={{backgroundColor: 'white'}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <ModalList onPress={() => onPressDistance('150')}>
                  <ModalText>150m</ModalText>
                </ModalList>
                <ModalList onPress={() => onPressDistance('200')}>
                  <ModalText>200m</ModalText>
                </ModalList>
                <ModalList onPress={() => onPressDistance('500')}>
                  <ModalText>500m</ModalText>
                </ModalList>
                <ModalList onPress={() => onPressDistance('1000')}>
                  <ModalText>1km</ModalText>
                </ModalList>
                <ModalList onPress={() => onPressDistance('1500')}>
                  <ModalText>1.5km</ModalText>
                </ModalList>
                <ModalList onPress={() => onPressDistance('2000')}>
                  <ModalText>2km</ModalText>
                </ModalList>
                <ModalList onPress={() => onPressDistance('4000')}>
                  <ModalText>4km</ModalText>
                </ModalList>
              </ScrollView>
              <SubmitBtn
                text={'확인'}
                onPress={() => setModalVisible1(false)}
                isRegisted={true}
              />
            </View>
          </Modal> */}
          <Modal
            isVisible={modalVisible2}
            onBackdropPress={() => setModalVisible2(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
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
          </Modal>
          <Modal
            isVisible={modalVisible3}
            onBackdropPress={() => setModalVisible3(false)}
            style={{margin: 0, justifyContent: 'flex-end'}}
            avoidKeyboard={true}>
            <View>
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
            </View>
          </Modal>
        </Container>
        {STORE == '1' && (
          <>
            <SubmitBtn
              text={'수정하기'}
              onPress={() => submit()}
              isRegisted={true}
            />
            <InputCase>
              <DeleteBtn
                onPress={() => {
                  confirmModal('매장을 폐업상태로 변경하시겠습니까?');
                }}>
                <DeleteBtnTExt>매장 폐업하기</DeleteBtnTExt>
              </DeleteBtn>
            </InputCase>
            <WhiteSpace />
          </>
        )}
      </ScrollView>
    </BackGround>
  );
};
