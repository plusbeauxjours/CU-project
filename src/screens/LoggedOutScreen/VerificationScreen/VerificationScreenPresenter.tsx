import React from 'react';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SubmitBtn from '../../../components/SubmitBtn';

interface IIsBefore {
  isBefore: boolean;
}

const Container = styled.View`
  width: ${wp('80%')};
  align-items: center;
  margin-top: ${hp('5%')};
`;

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const RequestText = styled.Text`
  font-size: 14px;
  color: #642a8c;
`;

const VerifyText = styled.Text`
  font-size: 14px;
  color: white;
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #642a8c;
  border-radius: 20px;
`;

const TextName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

const WhiteSpace = styled.View`
  height: ${hp('3%')};
`;

const Case = styled.View`
  width: 100%;
`;

const TextinputCase = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: 8px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: black;
`;

const Line = styled.View<IIsBefore>`
  height: 2px;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

const TimeText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #ff3d3d;
  align-self: flex-start;
  margin-bottom: 5px;
`;

const CountText = styled(TimeText)`
  align-self: center;
  margin-right: 10px;
  margin-bottom: 0;
`;

const VerifyButton = styled.TouchableOpacity<IIsBefore>`
  padding: 7px 14px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

const VerifyContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

export default ({
  verifyCode,
  mobileNum,
  gotoSignup,
  onChangeMobileNum,
  onChangeVerifyNum,
  requireAuth,
  onVerifyCode,
  countdown,
  isCountDownStart,
  isCheckAuth,
  isCheckTimeOut,
  isVerify,
}) => {
  return (
    <BackGround>
      <KeyboardAwareScrollView>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1, alignItems: 'center'}}>
          <Container>
            <Case>
              <TextName>휴대폰 번호</TextName>
              <TextinputCase>
                <TextInput
                  placeholder={'휴대폰번호를 입력해주세요'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={'#642A8C'}
                  onChangeText={(text) => {
                    onChangeMobileNum(text);
                  }}
                  value={mobileNum}
                  keyboardType={'number-pad'}
                  maxLength={11}
                />
                <RequestButton
                  onPress={() => requireAuth()}
                  disabled={isCheckAuth}>
                  <RequestText>인증요청</RequestText>
                </RequestButton>
              </TextinputCase>
              <Line isBefore={mobileNum == '' ? true : false} />
            </Case>
            <WhiteSpace />
            <Case>
              <TextName>인증번호입력</TextName>
              <TextinputCase>
                <TextInput
                  placeholder={'인증번호를 입력해주세요'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={'#642A8C'}
                  onChangeText={(text) => {
                    onChangeVerifyNum(text);
                  }}
                  value={verifyCode}
                  keyboardType={'number-pad'}
                  maxLength={6}
                />
              </TextinputCase>
              <Line isBefore={verifyCode == '' ? true : false} />
              <VerifyContainer>
                {isCountDownStart && <CountText>{countdown}초</CountText>}
                <VerifyButton
                  onPress={() => {
                    verifyCode !== onVerifyCode();
                  }}
                  isBefore={verifyCode == '' ? true : false}>
                  <VerifyText>인증확인</VerifyText>
                </VerifyButton>
              </VerifyContainer>
            </Case>
            {isCheckTimeOut && (
              <TimeText>
                인증시간이 초과되었습니다. 인증을 다시 시도해주세요
              </TimeText>
            )}
          </Container>
          <SubmitBtn
            text={'다음단계로'}
            onPress={() => gotoSignup()}
            isRegist={isVerify}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
