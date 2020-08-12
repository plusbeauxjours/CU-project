import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import {View, ScrollView} from 'react-native';
import SubmitBtn from '../../../components/SubmitBtn';
import CheckPasswordBtn from '../../../components/CheckPasswordBtn';

interface IIsBefore {
  isBefore: boolean;
}
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

const Line = styled.View<IIsBefore>`
  height: 2px;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
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
  width: ${wp('80%')};
  align-items: center;
  margin-top: ${hp('5%')};
`;

const TextName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;
const TextId = styled.Text`
  flex: 1;
  padding-left: 5px;
  margin-vertical: 10px;
  font-size: 15px;
  color: #642a8c;
`;

const TextInput = styled.TextInput`
  flex: 1;
  padding-left: 5px;
  margin-vertical: 10px;
  font-size: 15px;
  color: #642a8c;
`;

const TypeCheckCase = styled.View`
  flex-direction: row;
  margin-top: 20;
`;

const WhiteSpace = styled.View`
  height: ${hp('3%')};
`;

const Case = styled.View`
  width: 100%;
`;

const CheckPasswordButton = styled.TouchableOpacity`
  padding-horizontal: 10px;
  flex-direction: row;
  align-items: center;
`;

const TextinputCase = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 8px;
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
  isRegist,
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
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1, alignItems: 'center'}}>
          <Container>
            <Case>
              <TextName>ID</TextName>
              <TextinputCase>
                <TextId>{id}</TextId>
              </TextinputCase>
              <Line isBefore={false} />
            </Case>
            <WhiteSpace />
            <Case>
              <TextName>이름</TextName>
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
              <Line isBefore={name == '' ? true : false} />
            </Case>
            <WhiteSpace />
            <Case>
              <TextName>가입유형</TextName>
              <TypeCheckCase>
                <View style={{flex: 1}}>{positionType(1, '점주')}</View>
                <View style={{flex: 1}}>{positionType(0, '직원')}</View>
              </TypeCheckCase>
            </Case>
            <WhiteSpace />
            <Case>
              <TextName>비밀번호</TextName>
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
              <Line isBefore={password == '' ? true : false} />
            </Case>
            <WhiteSpace />
            <Case>
              <TextName>비밀번호 확인</TextName>
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
              <Line isBefore={passwordCheck == '' ? true : false} />
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
            isRegist={isRegist}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
