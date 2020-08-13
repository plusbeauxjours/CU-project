import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import utils from '../../../constants/utils';
import SubmitBtn from '../../../components/Btn/SubmitBtn';

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

const CheckPasswordButton = styled.TouchableOpacity`
  padding-horizontal: 10px;
  flex-direction: row;
  align-items: center;
`;

const GreyText = styled.Text`
  font-size: 12px;
  color: #aaa;
  margin-top: 5px;
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
  isCountDownStart,
  isCheckAuth,
  requireAuth,
  auth,
  onChangeAuth,
  isVerify,
  passwordCheck,
  onChangePasswordCheck,
  mobileNum,
  regist,
  isRegist,
  onChangeMobileNum,
  isCheckTimeOut,
  onVerifyCode,
  countdown,
  password,
  isPasswordSeen,
  onChangePassword,
  toggleIsPasswordSeen,
}) => {
  const scrollRef = useRef(null);
  const passwordCheckRef = useRef(null);
  return (
    <BackGround>
      <KeyboardAwareScrollView>
        <ScrollView
          ref={scrollRef}
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
                    onChangeAuth(text);
                  }}
                  value={auth}
                  keyboardType={'number-pad'}
                  maxLength={6}
                />
              </TextinputCase>
              <Line isBefore={auth == '' ? true : false} />
              <VerifyContainer>
                {isCountDownStart && <CountText>{countdown}초</CountText>}
                <VerifyButton
                  onPress={() => {
                    auth !== onVerifyCode();
                  }}
                  isBefore={auth == '' ? true : false}>
                  <VerifyText>인증확인</VerifyText>
                </VerifyButton>
              </VerifyContainer>
            </Case>
            {isCheckTimeOut && (
              <TimeText>
                인증시간이 초과되었습니다. 인증을 다시 시도해주세요
              </TimeText>
            )}
            {isVerify && (
              <>
                <WhiteSpace />
                <Case>
                  <TextName>새 비밀번호</TextName>
                  <TextinputCase>
                    <TextInput
                      placeholder={'영문, 숫자 조합 6자 이상'}
                      placeholderTextColor={'#E5E5E5'}
                      selectionColor={'#642A8C'}
                      onFocus={() => {
                        passwordCheckRef.current.clear();
                        setTimeout(() => {
                          scrollRef.current.scrollTo(10000);
                        }, 200);
                      }}
                      onChangeText={(text) => {
                        onChangePassword(text);
                      }}
                      value={password}
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
                  <Line isBefore={password == '' ? true : false} />
                </Case>
                <WhiteSpace />
                <Case>
                  <TextName>새 비밀번호 확인</TextName>
                  <TextinputCase>
                    <TextInput
                      ref={passwordCheckRef}
                      placeholder={'새 비밀번호 확인'}
                      placeholderTextColor={'#E5E5E5'}
                      selectionColor={'#642A8C'}
                      onChangeText={(text) => onChangePasswordCheck(text)}
                      value={passwordCheck}
                      secureTextEntry={isPasswordSeen === true ? false : true}
                      onFocus={() => {
                        setTimeout(() => {
                          scrollRef.current.scrollTo(10000);
                        }, 200);
                      }}
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
                  <Line isBefore={password == '' ? true : false} />
                  <GreyText>
                    * 영문, 숫자 조합하여 6자 이상 입력해주세요.
                  </GreyText>
                </Case>
              </>
            )}
          </Container>
          <SubmitBtn
            text={'비밀번호 변경'}
            onPress={() => regist()}
            // isRegist={isRegist}
            isRegist={true}
          />
        </ScrollView>
      </KeyboardAwareScrollView>
    </BackGround>
  );
};
