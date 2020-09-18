import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';

import {ForwardIcon, LogoutIcon, PersonCircleIcon} from '~/constants/Icons';

interface IIsStore {
  isStore?: boolean;
}
const Container = styled.View<IIsStore>`
  height: 150px;
  width: ${wp('100%') - 40}px;
  background-color: white;
  flex-direction: row;
  border-radius: 30px;
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
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

const Touchable = styled(Ripple)``;

const NameText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ArrowBox = styled.View`
  width: ${wp('20%')}px;
  align-items: center;
  justify-content: center;
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
  margin-bottom: 5px;
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
  STORE,
  TYPE,
  MANAGER,
  workinglist,
  gotoHomeScreen,
}) => {
  return (
    <Touchable
      key={key}
      style={{alignItems: 'center', marginTop: 30}}
      onPress={() => gotoHomeScreen(data)}
      rippleColor={'#666'}
      rippleDuration={600}
      rippleSize={1700}
      rippleContainerBorderRadius={30}
      rippleOpacity={0.1}>
      <Container isStore={STORE == 1}>
        <ContentBox>
          {STORE == 1 ? (
            <NameText>{name}</NameText>
          ) : (
            <NameText>
              {name} {MANAGER}
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
              <IconContainer>
                <PersonCircleIcon />
              </IconContainer>
              {TYPE == '0' ? (
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
          <ForwardIcon size={20} />
        </ArrowBox>
      </Container>
    </Touchable>
  );
};
