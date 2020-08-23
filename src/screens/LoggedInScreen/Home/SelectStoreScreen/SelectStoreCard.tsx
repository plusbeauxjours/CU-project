import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import utils from '../../../../constants/utils';
import {
  ForwardIcon,
  LogoutIcon,
  PersonCircleIcon,
} from '../../../../constants/Icons';

interface IIsStore {
  isStore?: boolean;
}
const Container = styled.View<IIsStore>`
  height: ${hp('15%')}px;
  width: ${wp('90%')}px;
  background-color: white;
  flex-direction: row;
  border-radius: 30px;
  elevation: 5;
  shadow-color: #4d4d4d;
  shadow-offset: { width: 8px, height: 8px };
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  margin-top: ${(props) => (props.isStore ? hp('1%') : hp('3%'))};
  margin-bottom: ${(props) => (props.isStore ? hp('2%') : 0)};
`;

const EmployeeBox = styled.View`
  flex-direction: row;
  align-items: center;
`;
const EmployeeText = styled.Text`
  font-size: 13px;
  color: grey;
`;
const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: ${wp('5%')}px;
`;

const Touchable = styled.TouchableOpacity``;

const NameText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: ${hp('1.5%')}px;
`;

const ArrowBox = styled.View`
  width: ${wp('20%')}px;
  align-items: center;
  justify-content: center;
`;
const Askbox = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #5887f9;
  border-radius: 20px;
`;
const AskText = styled.Text`
  font-size: 13px;
  color: #5887f9;
  margin: 4px 8px;
`;
const Arrow = styled.Text`
  font-size: 20px;
  color: #5887f9;
`;
const IconContainer = styled.View`
  width: 20px;
  align-items: center;
  margin-right: 3px;
  margin-top: 1px;
`;
const AddressBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${hp('0.5%')}px;
`;
const AddressText = styled.Text`
  font-size: 13px;
  color: grey;
`;
export default ({
  key,
  data,
  name,
  address1,
  address2,
  employee,
  STORE_SEQ,
  STORE,
  EMP_SEQ,
  JOIN,
  search,
  TYPE,
  MANAGER,
  workinglist,
  openModal,
  StoreEmpSeq,
  setSES,
  setStep,
  setST,
  setCalendarData,
  CalendarData,
  setCheckListData,
  CheckListData,
  setName,
  setAddress,
  alertModal,
}) => {
  const navigation = useNavigation();
  return (
    <Touchable
      key={key}
      style={{alignItems: 'center'}}
      activeOpacity={1}
      onPress={async () => {
        if (search == true) {
          null;
        } else {
          if (STORE == 1) {
            navigation.navigate('HomeScreen', {
              STORE_SEQ: STORE_SEQ,
              refresh: (obj) => {
                setName(obj.name);
                setAddress(obj.address);
              },
            });
            setStep(STORE_SEQ);
            setST(name);
            setCalendarData(CalendarData);
            setCheckListData(CheckListData);
            setSES(StoreEmpSeq);
          } else if (STORE == 0 && TYPE == '1') {
            navigation.navigate('HomeScreen', {
              data: data,
              EMP_SEQ: EMP_SEQ,
              STORE_SEQ: STORE_SEQ,
              IS_MANAGER: MANAGER == '[점장]' ? '1' : '0',
            });
            setStep(STORE_SEQ);
            setST(name);
            setCalendarData(CalendarData);
            setCheckListData(CheckListData);
            setSES(StoreEmpSeq);
          } else if (STORE == 0 && TYPE == '0') {
            alertModal('합류승인 대기중입니다.');
          }
        }
      }}>
      <Container isStore={STORE == 1}>
        <ContentBox>
          {STORE == 1 ? (
            <NameText>{name}</NameText>
          ) : (
            <NameText>
              {name} {search == true ? '' : MANAGER}
            </NameText>
          )}
          <AddressBox>
            <IconContainer>
              <LogoutIcon size={17} />
            </IconContainer>
            <AddressText>
              {address1 && address2
                ? address1.trim() + ' ' + address2.trim()
                : '주소 미등록'}
            </AddressText>
          </AddressBox>

          {STORE == 1 ? (
            <EmployeeBox>
              <IconContainer>
                <PersonCircleIcon />
              </IconContainer>
              <EmployeeText>
                {employee == 0
                  ? `${employee}명 근무중, 직원을 초대하세요.`
                  : `${employee}명 중 ${workinglist}명 근무중.`}
              </EmployeeText>
            </EmployeeBox>
          ) : (
            <EmployeeBox>
              {search !== true && (
                <IconContainer>
                  <PersonCircleIcon />
                </IconContainer>
              )}
              {search !== true && TYPE == '0' ? (
                <EmployeeText>합류 대기중</EmployeeText>
              ) : (
                <EmployeeText>
                  {employee}명 중 {workinglist}명 근무중.
                </EmployeeText>
              )}
            </EmployeeBox>
          )}
        </ContentBox>

        <ArrowBox>
          {search == true && JOIN == '0' ? (
            <Askbox
              onPress={() => {
                openModal(name, STORE_SEQ);
              }}>
              <AskText>합류요청</AskText>
            </Askbox>
          ) : (
            <Arrow>
              {search == true ? (
                <Arrow>햡류완료</Arrow>
              ) : TYPE == '0' ? (
                ''
              ) : (
                <ForwardIcon size={20} />
              )}
            </Arrow>
          )}
        </ArrowBox>
      </Container>
    </Touchable>
  );
};
