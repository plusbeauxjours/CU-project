import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';

interface IIsBefore {
  isBefore: boolean;
}

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
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

const NameText = styled.Text`
  font-size: 16px;
  font-weight: bold;
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

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: black;
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
  mobileNo,
  gotoSignup,
  onChangeMobileNum,
  onChangeVerifyNum,
  requireVerifyCode,
  onVerifyCode,
  countdown,
  isCountDownStarted,
  hasCheckedVerifyCode,
  hasCheckTimeOut,
  isVerified,
}) => {
  return (
    <BackGround>
      <KeyboardAwareScrollView>
        <Container>
          <Case>
            <NameText>휴대폰 번호</NameText>
            <TextinputCase>
              <TextInput
                placeholder={'휴대폰번호를 입력해주세요'}
                placeholderTextColor={'#CCCCCC'}
                selectionColor={'#642A8C'}
                onChangeText={(text) => {
                  onChangeMobileNum(text);
                }}
                value={mobileNo}
                keyboardType={'number-pad'}
                maxLength={11}
              />
              <RequestButton
                onPress={() => requireVerifyCode()}
                disabled={hasCheckedVerifyCode}>
                <RequestText>인증요청</RequestText>
              </RequestButton>
            </TextinputCase>
            <InputLine isBefore={mobileNo == '' ? true : false} />
          </Case>
          <WhiteSpace />
          <Case>
            <NameText>인증번호입력</NameText>
            <TextinputCase>
              <TextInput
                placeholder={'인증번호를 입력해주세요'}
                placeholderTextColor={'#CCCCCC'}
                selectionColor={'#642A8C'}
                onChangeText={(text) => {
                  onChangeVerifyNum(text);
                }}
                value={verifyCode}
                keyboardType={'number-pad'}
                maxLength={6}
              />
            </TextinputCase>
            <InputLine isBefore={verifyCode == '' ? true : false} />
            <VerifyContainer>
              {isCountDownStarted && <CountText>{countdown}초</CountText>}
              <VerifyButton
                onPress={() => onVerifyCode()}
                isBefore={verifyCode == '' ? true : false}>
                <VerifyText>인증확인</VerifyText>
              </VerifyButton>
            </VerifyContainer>
          </Case>
          {hasCheckTimeOut && (
            <TimeText>
              인증시간이 초과되었습니다. 인증을 다시 시도해주세요
            </TimeText>
          )}
          <SubmitBtn
            text={'다음단계로'}
            onPress={() => gotoSignup()}
            isRegisted={isVerified}
          />
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
