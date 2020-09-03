import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import api from '../../../../constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';

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

export default ({key, EMP_NAME, EMP_SEQ, PHONE, STORE_SEQ}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isRefused, setIsRefused] = useState<boolean>(false);

  const gotoElectronicContracts = () => {
    navigation.navigate('ElectronicContractsScreen', {
      from: 'ManageInviteEmployeeScreen',
      empType: '합류전',
    });
  };

  const confirmModal = (EMP_NAME, EMP_SEQ) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: `[${EMP_NAME}]의 합류를 거절하시겠습니까?\n\n거절 후에도 직원초대를 통해 합류요청이 가능합니다.`,
      cancelButtonText: '취소',
      okButtonText: '거절',
      warning: 'yes',
      okCallback: () => {
        refuseFn(EMP_SEQ);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 거절버튼 (초대에 응한 직원)
  const refuseFn = async (EMP_SEQ) => {
    try {
      const {data} = await api.rejectJoin({STORE_SEQ, EMP_SEQ});
      if (data.message === 'SUCCESS') {
        setIsRefused(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container key={key}>
      <EmployeeBox>
        <NameText>{EMP_NAME}</NameText>
        <PhoneText>{PHONE}</PhoneText>
      </EmployeeBox>
      {isRefused ? (
        <ButtonBox>
          <RefuseText>거절했습니다</RefuseText>
        </ButtonBox>
      ) : (
        <ButtonBox>
          <TextBox onPress={() => gotoElectronicContracts()}>
            <AdmitText>승인</AdmitText>
          </TextBox>
          <TextBox onPress={() => confirmModal(EMP_NAME, EMP_SEQ)}>
            <RefuseText>거절</RefuseText>
          </TextBox>
        </ButtonBox>
      )}
    </Container>
  );
};
