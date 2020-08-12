import React, {useRef} from 'react';
import {Text, View, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import styles from './styles.js';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

interface IIsBefore {
  isBefore: boolean;
}

const Line = styled.View<IIsBefore>`
  height: 2px;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

export default ({
  confirmModal,
  onChangeName,
  onChangePassword,
  onBlurPassword,
  toggleIsPasswordSeen,
  isPasswordSeen,
  isRegist,
  sexTypeCheck,
  positionTypeCheck,
  password,
  passwordCheck,
}) => {
  const passwordRef = useRef();
  const passwordCheckRef = useRef();

  const sexType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(sexTypeCheck));

    return (
      <View>
        <TouchableOpacity
          style={styles.positionType}
          onPress={() => {
            value.fill(false); // ES6
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

            this.setState(params, () => {
              this._checkValidationRegistButton();
            });
          }}>
          <View
            style={
              sexTypeCheck[selection]
                ? {...styles.positionTypeRadioButtonOff, borderColor: '#642A8C'}
                : styles.positionTypeRadioButtonOff
            }>
            {sexTypeCheck[selection] && (
              <View style={styles.positionTypeRadioButtonOn} />
            )}
          </View>
          <Text style={{marginLeft: 5, fontSize: 15}}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const positionType = (selection, text) => {
    let value = JSON.parse(JSON.stringify(positionTypeCheck));
    // console.log(selection, value);

    return (
      <View>
        <TouchableOpacity
          style={styles.positionType}
          onPress={() => {
            value.fill(false); // ES6
            value[selection] = true;

            const params = {
              positionTypeCheck: value,
              type: null,
            };

            if (selection === 0) {
              // 직원
              params.type = '0';
            } else if (selection === 1) {
              // 점주
              params.type = '1';
            }

            this.setState(params, () => {
              this._checkValidationRegistButton();
            });
          }}>
          <View
            style={
              positionTypeCheck[selection]
                ? {...styles.positionTypeRadioButtonOff, borderColor: '#642A8C'}
                : styles.positionTypeRadioButtonOff
            }>
            {positionTypeCheck[selection] && (
              <View style={styles.positionTypeRadioButtonOn} />
            )}
          </View>
          <Text style={{marginLeft: 5, fontSize: 15}}>{text}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView
        extraHeight={100}
        contentContainerStyle={{paddingBottom: hp('10%')}}>
        <View style={styles.topBox}>
          <View style={styles.InputCase}>
            <Text style={[styles.textName]}>ID</Text>
            <Text style={styles.textinput}>{id}</Text>
            <View style={[styles.lineAfter, {backgroundColor: '#642A8C'}]} />
          </View>
          <View style={[styles.InputCase]}>
            <View style={styles.nameGender}>
              <View style={styles.nameGender2}>
                <Text style={styles.textName}>이름</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder={'이름'}
                  placeholderTextColor={'#E5E5E5'}
                  onChangeText={(text) => {
                    this.setState({name: text}, () => {
                      this._checkValidationRegistButton();
                    });
                  }}
                  value={name}
                />

                <Line isBefore={name == '' ? true : false} />
              </View>
            </View>
          </View>

          <View style={styles.InputCase}>
            <Text style={styles.textName}>가입유형</Text>
            <View style={styles.typeCheckCase}>
              <View style={{flex: 1}}>{positionType(1, '점주')}</View>
              <View style={{flex: 1}}>{positionType(0, '직원')}</View>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: wp('10%'),
              backgroundColor: 'white',
              justifyContent: 'center',
              paddingVertical: 20,
            }}>
            <Text style={styles.textName}>비밀번호</Text>
            <View style={styles.textinputCase}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  ref={passwordRef}
                  style={styles.textinput}
                  secureTextEntry={isPasswordSeen === true ? false : true}
                  placeholder={'영문, 숫자 조합 6자 이상'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={'#642A8C'}
                  onFocus={() => {
                    passwordCheck.clear();
                  }}
                  onChangeText={(text) => {
                    onChangePassword(false, text);
                  }}
                  value={password}
                />
                <TouchableOpacity
                  style={styles.checkPassword}
                  onPress={() => toggleIsPasswordSeen}>
                  {isPasswordSeen ? (
                    <Ionicons name="ios-eye" size={24} color="#aaa" />
                  ) : (
                    <Ionicons name="ios-eye-off" size={24} color="#ddd" />
                  )}
                </TouchableOpacity>
              </View>
              <Line isBefore={password == '' ? true : false} />
            </View>
            <Text style={[styles.textName, {marginTop: 20}]}>
              비밀번호 확인
            </Text>
            <View style={styles.textinputCase}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  ref={passwordCheckRef}
                  secureTextEntry={isPasswordSeen ? false : true}
                  style={styles.textinput}
                  placeholder={'영문, 숫자 조합 6자 이상'}
                  placeholderTextColor={'#E5E5E5'}
                  selectionColor={'#642A8C'}
                  onFocus={() => {}}
                  onChangeText={(text) => {
                    onChangePassword(true, text);
                  }}
                  onBlur={(text) => {
                    onBlurPassword(text);
                  }}
                  value={passwordCheck}
                />
                <TouchableOpacity
                  style={styles.checkPassword}
                  onPress={() => toggleIsPasswordSeen()}>
                  {isPasswordSeen ? (
                    <Ionicons name="ios-eye" size={24} color="#aaa" />
                  ) : (
                    <Ionicons name="ios-eye-off" size={24} color="#ddd" />
                  )}
                </TouchableOpacity>
              </View>

              <Line isBefore={passwordCheck == '' ? true : false} />
            </View>
          </View>
        </View>
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <TouchableOpacity
            style={
              isRegist === false ? styles.buttonBefore : styles.buttonAfter
            }
            onPress={() => {
              confirmModal(
                '정확한 가입유형을 선택하셨나요?',
                '점주 : 점주\n직원 : 점장 또는 스태프',
              );
            }}
            disabled={!isRegist}>
            <Text style={{fontSize: 16, color: 'white'}}>회원가입 완료</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
