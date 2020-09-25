import React, {useRef} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SubmitBtn from '~/components/Btn/SubmitBtn';
import InputLine from '~/components/InputLine';
import CheckPasswordBtn from '~/components/Btn/CheckPasswordBtn';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Case = styled.View`
  width: 100%;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const NameText = styled.Text`
  font-size: 16px;
  font-weight: bold;
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

const GreyText = styled.Text`
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
`;

const VerifyContainer = styled.View`
  position: absolute;
  right: 0;
  bottom: 10px;
  flex-direction: row;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const RequestButton = styled.TouchableOpacity`
  padding: 7px 14px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #642a8c;
  border-radius: 20px;
`;

const RequestText = styled.Text`
  font-size: 14px;
  color: #642a8c;
`;

const MobileNoText = styled.Text`
  font-size: 16px;
`;

export default ({
  alertModal,
  password,
  passwordCheck,
  hasCheckedVerifyCode,
  verifyCode,
  mobileNo,
  isRegisted,
  requireVerifyCode,
  onChangePassword,
  onChangeVerifyCode,
  onChangePasswordCheck,
  submit,
  countdown,
  isCountDownStarted,
  hasCheckedTimeOut,
  isPasswordSeen,
  setIsPasswordSeen,
  isPasswordCheckSeen,
  setIsPasswordCheckSeen,
}) => {
  const passwordCheckRef = useRef(null);
  return (
    <BackGround>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <Container>
          <Case>
            <NameText>새 비밀번호</NameText>
            <TextinputCase>
              <TextInput
                placeholder={'영문, 숫자 조합 8자 이상'}
                placeholderTextColor={'#E5E5E5'}
                selectionColor={'#642A8C'}
                onFocus={() => {
                  passwordCheckRef.current.clear();
                }}
                onChangeText={(text) => {
                  onChangePassword(text);
                }}
                value={password}
                editable={!hasCheckedVerifyCode}
                secureTextEntry={isPasswordSeen ? false : true}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <CheckPasswordBtn
                onPress={() => setIsPasswordSeen(!isPasswordSeen)}
                isPasswordSeen={isPasswordSeen}
              />
            </TextinputCase>
            <InputLine isBefore={password ? false : true} />
            <GreyText>* 영문, 숫자 조합하여 6자 이상 입력해주세요.</GreyText>
          </Case>
          <WhiteSpace />
          <Case>
            <NameText>새 비밀번호 확인</NameText>
            <TextinputCase>
              <TextInput
                ref={passwordCheckRef}
                placeholder={'새 비밀번호 확인'}
                placeholderTextColor={'#E5E5E5'}
                selectionColor={'#642A8C'}
                onBlur={() => {
                  if (!password && password?.length <= 5) {
                    alertModal('비밀번호를 6자리 이상 입력하세요.');
                  }
                }}
                onChangeText={(text) => onChangePasswordCheck(text)}
                value={passwordCheck}
                editable={!hasCheckedVerifyCode}
                secureTextEntry={isPasswordCheckSeen ? false : true}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <CheckPasswordBtn
                onPress={() => setIsPasswordCheckSeen(!isPasswordCheckSeen)}
                isPasswordSeen={isPasswordCheckSeen}
              />
            </TextinputCase>
            <InputLine isBefore={passwordCheck ? false : true} />
          </Case>
          <WhiteSpace />
          <Case>
            <NameText>휴대폰 번호</NameText>
            <TextinputCase>
              <MobileNoText>{mobileNo}</MobileNoText>
              <RequestButton
                onPress={() => requireVerifyCode()}
                disabled={hasCheckedVerifyCode}>
                <RequestText>인증요청</RequestText>
              </RequestButton>
            </TextinputCase>
            <InputLine isBefore={mobileNo ? false : true} />
          </Case>
          {hasCheckedTimeOut && (
            <TimeText>
              인증시간이 초과되었습니다. 인증을 다시 시도해주세요
            </TimeText>
          )}
          {hasCheckedVerifyCode && (
            <>
              <WhiteSpace />
              <Case>
                <NameText>인증번호입력</NameText>
                <TextinputCase>
                  <TextInput
                    placeholder={'인증번호를 입력해주세요'}
                    placeholderTextColor={'#E5E5E5'}
                    selectionColor={'#642A8C'}
                    onChangeText={(text) => {
                      onChangeVerifyCode(text);
                    }}
                    value={verifyCode}
                    keyboardType={'number-pad'}
                    maxLength={6}
                  />
                </TextinputCase>
                <InputLine isBefore={verifyCode ? false : true} />
                <VerifyContainer>
                  {isCountDownStarted && <CountText>{countdown}초</CountText>}
                </VerifyContainer>
              </Case>
            </>
          )}
          <SubmitBtn
            text={'설정 완료'}
            onPress={() => submit()}
            isRegisted={isRegisted}
          />
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
