import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setUserName} from '../../../../redux/userSlice';
import api from '../../../../constants/LoggedInApi';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import InputLine from '../../../../components/InputLine';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
`;

const NameText = styled.Text`
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const TextInput = styled.TextInput`
  padding: 5px 0;
  font-size: 15px;
  color: black;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {MEMBER_SEQ, mobileNo, name} = useSelector(
    (state: any) => state.userReducer,
  );
  const [newName, setNewName] = useState<string>('');
  const [gender, setGender] = useState<string>('0');

  const submit = async () => {
    if (name === '') {
      alert('[에러] 이를을 기입해주세요.');
      return;
    }
    try {
      const {data} = await api.changeName({
        MobileNo: mobileNo,
        MEMBER_SEQ,
        NAME: newName,
        GENDER: gender,
      });
      if (data.message === 'SUCCESS') {
        navigation.navigate('MyPageMainScreen');
        dispatch(setUserName(newName));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BackGround>
      <WhiteSpace />
      <Container>
        <NameText>이름</NameText>
        <TextInput
          placeholder={'변경하실 이름을 입력해주세요.'}
          selectionColor={'#642A8C'}
          placeholderTextColor={'#CCCCCC'}
          onChangeText={(text) => {
            setNewName(text);
          }}
          value={newName}
          maxLength={10}
        />
        <InputLine isBefore={newName === '' ? true : false} />
        <SubmitBtn
          text={'수정하기'}
          onPress={() => submit()}
          isRegist={newName !== ''}
        />
      </Container>
    </BackGround>
  );
};
