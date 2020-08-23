import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {EllipseIcon} from '../../../../constants/Icons';

interface IText {
  color: string;
}

const AddressBox = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;
const AddressText = styled.Text<IText>`
  font-size: 13px;
`;
const Touchable = styled.TouchableOpacity``;
const IconContainer = styled.View`
  width: 20px;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 17px;
  font-weight: bold;
`;

const Container = styled.View`
  width: ${wp('100%')}px;
  padding: 20px 0;
  background-color: white;
  flex-direction: row;
  margin-bottom: 20px;
`;
const ContainerBox = styled.View`
  flex: 1;
  padding: 20px;
  justify-content: center;
`;

export default ({
  key,
  STOREDATA,
  STORE_HEALTH_SEQ,
  STORE_SEQ,
  EMP_SEQ,
  NAME,
  MANAGER,
  EDUCATION_DATE,
  EDUCATION_HOUR,
  EDUCATION_TYPE,
  TESTING_DATE,
  TESTING_COUNT,
  TESTING_DAY,
  PUSH_DAY,
  TESTING_CERTIFICATE,
  REG_DT,
  REAL_NAME,
  SETTIME,
  IMG_LIST,
  type,
  onRefresh,
}) => {
  const navigation = useNavigation();
  const now = new Date();
  const pushday = new Date(PUSH_DAY);
  let dday = 0;
  dday = (pushday.getTime() - now.getTime()) / 1000 / 3600 / 24;
  if (TESTING_DATE) {
    return (
      <Touchable
        key={key}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('HealthCertificateEmpDetailScreen', {
            STORE_SEQ,
            EMP_SEQ,
            NAME,
            SETTIME,
            IMG_LIST,
            EDUCATION_TYPE,
          });
        }}>
        <Container>
          <ContainerBox>
            <NameText>
              {NAME}[{MANAGER === '1' ? '점장' : '스태프'}]
            </NameText>
            <AddressBox>
              <IconContainer>
                {TESTING_DATE && dday > 0 ? (
                  <EllipseIcon color={'#642A8C'} />
                ) : (
                  <EllipseIcon color={'#CE0505'} />
                )}
              </IconContainer>
              {TESTING_DATE ? (
                <AddressText
                  color={dday <= 0 ? '#CE0505' : '#642A8C'}
                  style={dday > 0 && {textDecorationLine: 'underline'}}>
                  검진일 : {TESTING_DATE} (갱신 D{dday <= 0 ? '+' : '-'}
                  {Math.abs(Math.floor(dday))})
                </AddressText>
              ) : (
                <AddressText color={'#CE0505'}>보건증 미등록</AddressText>
              )}
            </AddressBox>
          </ContainerBox>
        </Container>
      </Touchable>
    );
  } else {
    return (
      <Touchable
        key={key}
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('HealthCertificateEmpFormScreen', {
            STOREDATA: STOREDATA,
            STORE_SEQ,
            EMP_SEQ,
            NAME,
            MANAGER,
            EDUCATION_DATE,
            EDUCATION_HOUR,
            EDUCATION_TYPE,
            TESTING_DATE,
            REAL_NAME,
            TESTING_COUNT,
            TESTING_DAY,
            TESTING_CERTIFICATE,
            REG_DT,
            SETTIME,
            IMG_LIST,
            type,
            FORM: '입력',
            onRefresh,
            count: 1,
          });
        }}>
        <Container>
          <ContainerBox>
            <NameText>
              {NAME}[{MANAGER == '1' ? '점장' : '스태프'}]
            </NameText>
            <AddressBox>
              <IconContainer>
                {TESTING_DATE ? (
                  <EllipseIcon color={'#642A8C'} />
                ) : (
                  <EllipseIcon color={'#CE0505'} />
                )}
              </IconContainer>
              {TESTING_DATE ? (
                <AddressText color={'#642A8C'}>
                  검진일 : {TESTING_DATE}
                </AddressText>
              ) : (
                <AddressText color={'#CE0505'}>보건증 미등록</AddressText>
              )}
            </AddressBox>
          </ContainerBox>
        </Container>
      </Touchable>
    );
  }
};
