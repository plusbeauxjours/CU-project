import React, {useState} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import api from '../../../../constants/LoggedInApi';
import {CloseCircleIcon} from '../../../../constants/Icons';

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

const NameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const PhoneText = styled.Text`
  margin-top: 5px;
  color: #555;
  font-size: 14px;
`;

const SendText = styled.Text`
  font-size: 12px;
`;
const Touchable = styled.TouchableOpacity`
  margin-left: 5px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ButtonBox = styled.TouchableOpacity`
  width: ${wp('35%')}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 20px;
  padding: 7px 14px;
`;

export default ({
  key,
  join_emp_seq,
  name,
  STORE_SEQ,
  handler,
  PHONE,
  deleteModal,
}) => {
  const [isSent, setIsSent] = useState<boolean>(false);

  const sendFn = async () => {
    try {
      handler(true);
      const {data} = await api.sendOneEmp({STORE_SEQ, PHONE});
      if (data.message == 'SUCCESS') {
        setIsSent(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      handler(false);
    }
  };

  return (
    <Container key={key}>
      <EmployeeBox>
        <NameText>{name}</NameText>
        <PhoneText>{PHONE}</PhoneText>
      </EmployeeBox>
      <Row>
        {isSent ? (
          <ButtonBox>
            <SendText>전송 완료</SendText>
          </ButtonBox>
        ) : (
          <ButtonBox
            onPress={() => {
              sendFn();
            }}>
            <SendText>초대 메시지 재전송</SendText>
          </ButtonBox>
        )}
        <Touchable
          onPress={() => {
            deleteModal(
              '초대 메시지 미열람 직원',
              '초대내역을 삭제합니다',
              '취소',
              '삭제',
              join_emp_seq,
            );
          }}>
          <CloseCircleIcon />
        </Touchable>
      </Row>
    </Container>
  );
};
