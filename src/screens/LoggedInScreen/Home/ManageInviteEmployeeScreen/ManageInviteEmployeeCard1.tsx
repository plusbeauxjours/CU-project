import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../../../../constants/LoggedInApi';

const Container = styled.View`
  height: ${hp('10%')}px;
  width: ${wp('100%')}px;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const EmployeeBox = styled.View`
  width: ${wp('30%')}px;
  align-items: center;
`;

const AdmitText = styled.Text`
  font-size: 15px;
  color: #642a8c;
`;

const RefuseText = styled(AdmitText)`
  color: #3d3d3d;
`;

const TextBox = styled.TouchableOpacity`
  width: ${wp('13%')}px;
  justify-content: center;
  align-items: center;
`;

const ButtonBox = styled.View`
  width: ${wp('35%')}px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const PhoneText = styled.Text`
  margin-top: 5px;
  color: #555;
  font-size: 14px;
`;

export default ({
  key,
  name,
  image,
  EMP_SEQ,
  STORE_SEQ,
  STORE_NAME,
  onRefresh,
  handler1,
  handler2,
  PHONE,
  CALCULATE_DAY,
  confirmModal,
}) => {
  const navigation = useNavigation();
  const [refuse, setRefuse] = useState<boolean>(false);
  const [wording, setWording] = useState<string>('');

  const admit = () => {
    navigation.navigate('ElectronicContracts', {
      image,
      name,
      STORE_SEQ,
      EMP_SEQ,
      CALCULATE_DAY,
      STORE_NAME,
      onRefresh,
      from: 'ManageInviteEmployeeScreen',
      empType: '합류전',
    });
  };

  const refuseFn = async () => {
    handler1();
    try {
      const {data} = await api.rejectJoin({STORE_SEQ, EMP_SEQ});
      console.log(data);
      setRefuse(true);
      setWording('거절했습니다');
      handler2();
      onRefresh();
    } catch (error) {
      console.log(error);
      handler2();
      onRefresh();
    }
  };

  return (
    <Container key={key}>
      <EmployeeBox>
        <NameText>{name}</NameText>
        <PhoneText>{PHONE}</PhoneText>
      </EmployeeBox>
      {refuse ? (
        <RefuseText>{wording}</RefuseText>
      ) : (
        <ButtonBox>
          <TextBox
            onPress={() => {
              confirmModal(
                '',
                `[${name}]직원을 [${STORE_NAME}]에 합류시키겠습니까?\n\n합류 후 일정입력 단계가 진행됩니다.`,
                '취소',
                '승인',
                () => admit(),
              );
            }}>
            <AdmitText>승인</AdmitText>
          </TextBox>
          <TextBox
            onPress={() => {
              confirmModal(
                '',
                `[${name}]의 합류를 거절하시겠습니까?\n\n거절 후에도 직원초대를 통해 합류요청이 가능합니다.`,
                '취소',
                '거절',
                () => refuseFn(),
              );
            }}>
            <RefuseText>거절</RefuseText>
          </TextBox>
        </ButtonBox>
      )}
    </Container>
  );
};
