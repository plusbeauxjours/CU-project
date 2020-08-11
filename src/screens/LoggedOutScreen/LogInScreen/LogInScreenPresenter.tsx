import React from 'react';
import {Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  padding-vertical: ${hp('5%')};
  align-items: center;
  justify-content: center;
`;

const Space = styled.View`
  justify-content: flex-end;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;

const Line = styled.View<ILine>`
  height: 2;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

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
  padding-vertical: ${hp('2%')};
  width: ${wp('80%')};
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
  height: ${hp('3.5%')};
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
  margin-vertical: ${(props) => props.isIphoneX && hp('5%')};
`;

interface ILine {
  isBefore: boolean;
}
interface ILogoText {
  isIphoneX: boolean;
}

export default ({
  gotoFind,
  onChangeMobileNum,
  onChangePassword,
  mobileNum,
  password,
  signUp,
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
                value={mobileNum}
                keyboardType={'number-pad'}
                maxLength={11}
                clearButtonMode={'always'}
              />
            </TextInputContainer>
            <Line isBefore={mobileNum == '' ? true : false} />
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
            <Line isBefore={mobileNum == '' ? true : false} />
          </TextInputBox>
          <WhiteSpace />
          <Login>
            <Touchable onPress={() => signUp()}>
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