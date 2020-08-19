import React from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import {View, ScrollView} from 'react-native';
import SubmitBtn from '../../../components/Btn/SubmitBtn';
import CheckPasswordBtn from '../../../components/Btn/CheckPasswordBtn';
import InputLine from '../../../components/InputLine';

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

const PositionTypeRadioButtonOff = styled.View<IPositionTypeRadioButtonOff>`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  border-color: ${(props) => (props.borderColor ? '#642A8C' : '#e5e5e5')};
  border-width: 1px;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const PositionTypeRadioButtonOn = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #642a8c;
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
  id,
  name,
  confirmModal,
  onChangePassword,
  onChangeName,
  onBlurPassword,
  toggleIsPasswordSeen,
  isRegisted,
  isPasswordSeen,
  password,
  passwordCheck,
  sexTypeCheck,
  positionTypeCheck,
  checkValidationRegistButton,
}) => {
  const sexType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(sexTypeCheck));
    return (
      <TypeContainer
        onPress={() => {
          value.fill(false);
          value[selection] = true;
          const params = {
            sexTypeCheck: value,
            gender: '',
          };
          if (selection === 0) {
            params.gender = '남성';
          } else if (selection === 1) {
            params.gender = '남성';
          }
          checkValidationRegistButton();
        }}>
        <PositionTypeRadioButtonOff borderColor={sexTypeCheck[selection]}>
          {sexTypeCheck[selection] && <PositionTypeRadioButtonOn />}
        </PositionTypeRadioButtonOff>
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
          const params = {
            positionTypeCheck: value,
            type: '',
          };
          if (selection === 0) {
            params.type = '0';
          } else if (selection === 1) {
            params.type = '1';
          }
          checkValidationRegistButton();
        }}>
        {console.log(selection)}
        <PositionTypeRadioButtonOff borderColor={sexTypeCheck[selection]}>
          {positionTypeCheck[selection] && <PositionTypeRadioButtonOn />}
        </PositionTypeRadioButtonOff>
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
                <TextId>{id}</TextId>
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
                    checkValidationRegistButton();
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
                <View style={{flex: 1}}>{positionType(1, '점주')}</View>
                <View style={{flex: 1}}>{positionType(0, '직원')}</View>
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
                    onChangePassword(false, '');
                  }}
                  onChangeText={(text) => {
                    onChangePassword(false, text);
                  }}
                  value={password}
                  secureTextEntry={isPasswordSeen === true ? false : true}
                />
                <CheckPasswordBtn
                  onPress={toggleIsPasswordSeen}
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
                  onChangeText={(text) => onChangePassword(true, text)}
                  value={passwordCheck}
                  secureTextEntry={isPasswordSeen === true ? false : true}
                  onFocus={() => {}}
                />
                <CheckPasswordBtn
                  onPress={toggleIsPasswordSeen}
                  isPasswordSeen={isPasswordSeen}
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
            isRegisted={isRegisted}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
