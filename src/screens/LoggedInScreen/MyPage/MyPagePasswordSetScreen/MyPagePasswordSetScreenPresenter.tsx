import React, {useRef} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import utils from '../../../../constants/utils';
import InputLine from '../../../../components/InputLine';

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
  margin-top: ${hp('5%')};
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

const CheckPasswordButton = styled.TouchableOpacity`
  padding: 0 10px;
  flex-direction: row;
  align-items: center;
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
  isPasswordSeen,
  isCheckVerifyCode,
  verifyCode,
  mobileNo,
  isRegisted,
  requireVerifyCode,
  onChangePassword,
  onChangeVerifyCode,
  onChangePasswordCheck,
  submit,
  toggleIsPasswordSeen,
  countdown,
  isCountDownStart,
  isCheckTimeOut,
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
                placeholder={'영문, 숫자 조합 6자 이상'}
                placeholderTextColor={'#E5E5E5'}
                selectionColor={'#642A8C'}
                onFocus={() => {
                  passwordCheckRef.current.clear();
                }}
                onChangeText={(text) => {
                  onChangePassword(text);
                }}
                value={password}
                editable={!isCheckVerifyCode}
                secureTextEntry={isPasswordSeen === true ? false : true}
              />
              <CheckPasswordButton
                onPress={() => {
                  toggleIsPasswordSeen();
                }}>
                {isPasswordSeen ? (
                  <Icon
                    name={utils.isAndroid ? 'md-eye' : 'ios-eye'}
                    size={24}
                    color="#aaa"
                  />
                ) : (
                  <Icon
                    name={utils.isAndroid ? 'md-eye-off' : 'ios-eye-off'}
                    size={24}
                    color="#ddd"
                  />
                )}
              </CheckPasswordButton>
            </TextinputCase>
            <InputLine isBefore={password == '' ? true : false} />
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
                  if (password !== '' && password.length <= 5) {
                    alertModal('비밀번호를 6자리 이상 입력하세요.');
                  }
                }}
                onChangeText={(text) => onChangePasswordCheck(text)}
                value={passwordCheck}
                editable={!isCheckVerifyCode}
                secureTextEntry={isPasswordSeen === true ? false : true}
              />
              <CheckPasswordButton onPress={() => toggleIsPasswordSeen()}>
                {isPasswordSeen ? (
                  <Icon
                    name={utils.isAndroid ? 'md-eye' : 'ios-eye'}
                    size={24}
                    color="#aaa"
                  />
                ) : (
                  <Icon
                    name={utils.isAndroid ? 'md-eye-off' : 'ios-eye-off'}
                    size={24}
                    color="#ddd"
                  />
                )}
              </CheckPasswordButton>
            </TextinputCase>
            <InputLine isBefore={passwordCheck == '' ? true : false} />
          </Case>
          <WhiteSpace />
          <Case>
            <NameText>휴대폰 번호</NameText>
            <TextinputCase>
              <MobileNoText>{mobileNo}</MobileNoText>
              <RequestButton
                onPress={() => requireVerifyCode()}
                disabled={isCheckVerifyCode}>
                <RequestText>인증요청</RequestText>
              </RequestButton>
            </TextinputCase>
            <InputLine isBefore={mobileNo == '' ? true : false} />
          </Case>
          {isCheckTimeOut && (
            <TimeText>
              인증시간이 초과되었습니다. 인증을 다시 시도해주세요
            </TimeText>
          )}
          {isCheckVerifyCode && (
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
                <InputLine isBefore={verifyCode == '' ? true : false} />
                <VerifyContainer>
                  {isCountDownStart && <CountText>{countdown}초</CountText>}
                </VerifyContainer>
              </Case>
            </>
          )}
          <SubmitBtn
            text={'설정 완료'}
            onPress={() => submit()}
            isRegist={isRegisted}
          />
        </Container>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
