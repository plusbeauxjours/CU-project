import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import {View, ScrollView} from 'react-native';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';
import InputLine from '~/components/InputLine';
import {RadioBtnOnIcon, RadioBtnOffIcon} from '~/constants/Icons';

interface IPositionTypeRadioButtonOff {
  borderColor: boolean;
}

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const TypeContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const TypeText = styled.Text`
  margin-left: 5px;
  font-size: 15px;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const NameText = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const TextId = styled.Text`
  flex: 1;
  padding-left: 5px;
  margin: 10px 0;
  font-size: 15px;
  color: #642a8c;
`;

const TextInput = styled.TextInput`
  flex: 1;
  padding-left: 5px;
  margin: 10px 0;
  font-size: 15px;
  color: #642a8c;
`;

const TypeCheckCase = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20;
`;

const WhiteSpace = styled.View`
  height: ${hp('3%')}px;
`;

const Case = styled.View`
  width: 100%;
`;

const TextinputCase = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const GreyText = styled.Text`
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
`;

export default ({
  mobileNo,
  name,
  confirmModal,
  onChangeName,
  password,
  passwordCheck,
  sexTypeCheck,
  setSexTypeCheck,
  positionTypeCheck,
  setPositionTypeCheck,
  setPassword,
  setPasswordCheck,
  isPasswordSeen,
  setIsPasswordSeen,
  isPasswordCheckSeen,
  setIsPasswordCheckSeen,
}) => {
  const sexType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(sexTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setSexTypeCheck(value);
        }}>
        <Row>
          {sexTypeCheck[selection] ? (
            <RadioBtnOnIcon size={25} color="#642A8C" />
          ) : (
            <RadioBtnOffIcon size={25} color="#CCCCCC" />
          )}
        </Row>
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };

  const positionType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(positionTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          setPositionTypeCheck(value);
        }}>
        <Row>
          {positionTypeCheck[selection] ? (
            <RadioBtnOnIcon size={25} color="#642A8C" />
          ) : (
            <RadioBtnOffIcon size={25} color="#CCCCCC" />
          )}
        </Row>
        <TypeText>{text}</TypeText>
      </TypeContainer>
    );
  };

  return (
    <BackGround>
      <KeyboardAwareScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1, alignItems: 'center'}}>
          <Container>
            <Case>
              <NameText>ID</NameText>
              <TextinputCase>
                <TextId>{mobileNo}</TextId>
              </TextinputCase>
              <InputLine isBefore={false} />
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>이름</NameText>
              <TextinputCase>
                <TextInput
                  placeholder={'이름'}
                  placeholderTextColor={'#E5E5E5'}
                  onChangeText={(text) => {
                    onChangeName(text);
                  }}
                  value={name}
                />
              </TextinputCase>
              <InputLine isBefore={name == '' ? true : false} />
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>가입유형</NameText>
              <TypeCheckCase>
                <View>{positionType(1, '점주')}</View>
                <View>{positionType(0, '직원')}</View>
              </TypeCheckCase>
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>비밀번호</NameText>
              <TextinputCase>
                <TextInput
                  placeholder={'영문, 숫자 조합 6자 이상'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={'#642A8C'}
                  onFocus={() => {
                    setPassword('');
                    setPasswordCheck('');
                  }}
                  onChangeText={(text) => {
                    setPassword(text);
                    setPasswordCheck('');
                  }}
                  value={password}
                  secureTextEntry={isPasswordSeen ? false : true}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <CheckPasswordBtn
                  onPress={setIsPasswordSeen(!isPasswordSeen)}
                  isPasswordSeen={isPasswordSeen}
                />
              </TextinputCase>
              <InputLine isBefore={password == '' ? true : false} />
            </Case>
            <WhiteSpace />
            <Case>
              <NameText>비밀번호 확인</NameText>
              <TextinputCase>
                <TextInput
                  placeholder={'새 비밀번호 확인'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={'#642A8C'}
                  onChangeText={(text) => setPasswordCheck(text)}
                  value={passwordCheck}
                  secureTextEntry={isPasswordCheckSeen ? false : true}
                  onFocus={() => {}}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <CheckPasswordBtn
                  onPress={setIsPasswordCheckSeen(!isPasswordCheckSeen)}
                  isPasswordSeen={isPasswordCheckSeen}
                />
              </TextinputCase>
              <InputLine isBefore={passwordCheck == '' ? true : false} />
              <GreyText>* 영문, 숫자 조합하여 6자 이상 입력해주세요.</GreyText>
            </Case>
          </Container>
          <SubmitBtn
            text={'회원가입 완료'}
            onPress={() =>
              confirmModal(
                '정확한 가입유형을 선택하셨나요?',
                '점주 : 점주\n직원 : 점장 또는 스태프',
              )
            }
            isRegisted={
              mobileNo &&
              name &&
              password &&
              passwordCheck &&
              password === passwordCheck &&
              passwordCheck.length > 6
            }
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
