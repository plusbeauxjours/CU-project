import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import {userLogout} from '../../../../redux/userSlice';
import {CheckBoxIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const Container = styled.View`
  padding: 0 20px;
`;

const Title = styled.View`
  height: ${hp('8%')}px;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15px;
`;
const TitleText = styled.Text`
  font-size: 20px;
  color: #404040;
  font-weight: bold;
`;
const Check = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
`;
const CheckText = styled.Text`
  font-size: 15px;
  color: #404040;
  margin-left: 10px;
  padding-top: 5px;
`;
const SubmitBtn = styled.TouchableOpacity<IIsConfirm>`
  height: ${hp('5%')}px;
  background-color: ${(props) => (props.isConfirmed ? '#FF3D3D' : '#FFC7C7')};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
const SubmitBtnText = styled.Text`
  font-size: 15px;
  color: white;
  margin-left: 10px;
  padding-top: 5px;
`;

interface IIsConfirm {
  isConfirmed: boolean;
}

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {MEMBER_SEQ, mobileNo} = useSelector((state: any) => state.userReducer);

  const confirmModal = () => {
    const params = {
      type: 'confirm',
      title: '',
      content: '회원탈퇴 하시겠습니까?',
      okCallback: () => {
        submit();
      },
      okButtonText: '예',
      cancelButtonText: '아니요',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const submit = async () => {
    try {
      const {data} = await api.toggleMember({
        MobileNo: mobileNo,
        MEMBER_SEQ,
      });
      dispatch(userLogout());
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'LoggedOutNavigation',
            state: {routes: [{name: 'StartScreen'}]},
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  return (
    <BackGround>
      <WhiteSpace />
      <Container>
        <Title>
          <TitleText>탈퇴하기</TitleText>
        </Title>
        <Check
          onPress={() => {
            setIsConfirmed(!isConfirmed);
          }}>
          {isConfirmed ? (
            <CheckBoxIcon size={22} color={'#642A8C'} />
          ) : (
            <CheckBoxIcon size={22} color={'#E5E5E5'} />
          )}
          <CheckText>데이터를 모두 삭제하고 탈퇴하겠습니다</CheckText>
        </Check>
        <WhiteSpace />
        <SubmitBtn
          isConfirmed={isConfirmed}
          onPress={() => {
            confirmModal();
          }}
          disabled={!isConfirmed}>
          <SubmitBtnText>탈퇴하기</SubmitBtnText>
        </SubmitBtn>
      </Container>
    </BackGround>
  );
};
