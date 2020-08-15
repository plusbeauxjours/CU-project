import React from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InputLine from '../../../components/InputLine';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  padding: ${hp('5%')}px 0;
  align-items: center;
  justify-content: center;
`;

const Space = styled.View`
  justify-content: flex-end;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 17px;
  color: black;
  margin-left: 5px;
  margin-top: 10px;
`;

const Login = styled.View`
  height: ${hp('7%')};
  width: ${wp('90%')};
  align-items: center;
  justify-content: center;
`;

const UnderLineText = styled.Text`
  text-decoration-line: underline;
  font-size: 16px;
`;

const Button = styled.View`
  width: ${wp('100%') - 40};
  height: ${hp('7%')};
  background-color: #642a8c;
  align-items: center;
  justify-content: center;
  border-radius: 70px;
`;

const GreyText = styled.Text`
  font-size: 18;
  color: #212121;
  font-weight: bold;
`;

const WhiteText = styled.Text`
  font-size: 16px;
  color: #ccc;
  font-weight: bold;
`;

const WhiteSpace = styled.View`
  height: ${hp('3%')};
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const TextInputBox = styled.View`
  width: ${wp('80%')};
`;

const LogoText = styled.View<ILogoText>`
  width: ${wp('100%')};
  margin-bottom: ${hp('6%')};
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.isIphoneX && hp('5%')}px 0;
`;

interface ILogoText {
  isIphoneX: boolean;
}

export default ({
  gotoFind,
  onChangeMobileNum,
  onChangePassword,
  mobileNo,
  password,
  logIn,
}) => {
  return (
    <BackGround>
      <KeyboardAwareScrollView>
        <Container>
          <LogoText isIphoneX={isIphoneX()}>
            <Image
              style={{height: 175, width: 350}}
              resizeMode="stretch"
              source={require('../../../assets/images/logo_cu.png')}
            />
          </LogoText>
          <TextInputBox>
            <TextInputContainer>
              <GreyText>ID</GreyText>
              <TextInput
                placeholder={'휴대폰번호'}
                placeholderTextColor={'#999'}
                onChangeText={(text) => {
                  onChangeMobileNum(text);
                }}
                value={mobileNo}
                keyboardType={'number-pad'}
                maxLength={11}
                clearButtonMode={'always'}
              />
            </TextInputContainer>
            <InputLine isBefore={mobileNo == '' ? true : false} />
            <WhiteSpace />
            <TextInputContainer>
              <GreyText>Password</GreyText>
              <TextInput
                placeholder={'영문, 숫자 조합 6자 이상'}
                placeholderTextColor={'#999'}
                onChangeText={(text) => {
                  onChangePassword(text);
                }}
                value={password}
                secureTextEntry={true}
                clearButtonMode={'always'}
              />
            </TextInputContainer>
            <InputLine isBefore={password == '' ? true : false} />
          </TextInputBox>
          <WhiteSpace />
          <Login>
            <Touchable onPress={() => logIn()}>
              <Button>
                <WhiteText>로그인</WhiteText>
              </Button>
            </Touchable>
          </Login>
          <WhiteSpace />
          <Space>
            <Touchable onPress={() => gotoFind()}>
              <UnderLineText>비밀번호 찾기</UnderLineText>
            </Touchable>
          </Space>
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
