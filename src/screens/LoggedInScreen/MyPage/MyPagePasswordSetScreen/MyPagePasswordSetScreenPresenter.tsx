import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View``;

export default ({route:{params}}) => {

  password: '',
  passwordCheck: '',
  isPasswordSeen: false,
  checkAuth: false,
  auth: '',
  next: false,
  timer: 100,
  phone: '',
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
        <View>
          <View style={styles.InputCase}>
            <Text style={styles.textName}>새로운 비밀번호</Text>

            <View style={styles.textInputCase}>
              <TextInput
                style={styles.textinput}
                placeholder={'영문, 숫자 조합 6자 이상'}
                placeholderTextColor={'#E5E5E5'}
                onFocus={() => {
                  this.passwordCheck.clear();
                }}
                onChangeText={(text) => {
                  this._password(text);
                }}
                value={this.state.password}
                secureTextEntry={
                  this.state.passwordSeen === true ? false : true
                }
                selectionColor={'#642A8C'}
              />
              <TouchableOpacity
                style={styles.checkPassword}
                onPress={() => {
                  this.setState({passwordSeen: !this.state.passwordSeen});
                }}>
                {this.state.passwordSeen ? (
                  <Ionicons name="ios-eye" size={24} color="#aaa" />
                ) : (
                  <Ionicons name="ios-eye-off" size={24} color="#ddd" />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={
                this.state.password === ''
                  ? styles.lineBefore
                  : styles.lineAfter
              }
            />
          </View>

          <View style={styles.InputCase}>
            <Text style={styles.textName}>새로운 비밀번호 확인</Text>

            <View style={styles.textInputCase}>
              <TextInput
                ref={(ref) => {
                  this.passwordCheck = ref;
                }}
                style={styles.textinput}
                placeholder={'영문, 숫자 조합 6자 이상'}
                placeholderTextColor={'#E5E5E5'}
                onChangeText={(text) => {
                  this._passwordCheck(text);
                }}
                onBlur={() => {
                  if (
                    this.state.password !== '' &&
                    this.state.password.length <= 5
                  ) {
                    this._AlertModal('', '비밀번호를 6자리 이상 입력하세요.');
                  }
                }}
                value={this.state.passwordCheck}
                secureTextEntry={
                  this.state.passwordSeen === true ? false : true
                }
                selectionColor={'#642A8C'}
              />
              <TouchableOpacity
                style={styles.checkPassword}
                onPress={() => {
                  this.setState({passwordSeen: !this.state.passwordSeen});
                }}>
                {this.state.passwordSeen ? (
                  <Ionicons name="ios-eye" size={24} color="#aaa" />
                ) : (
                  <Ionicons name="ios-eye-off" size={24} color="#ddd" />
                )}
              </TouchableOpacity>
            </View>
            <View
              style={
                this.state.passwordCheck === ''
                  ? styles.lineBefore
                  : styles.lineAfter
              }
            />
          </View>

          <View style={styles.InputCase}>
            <Text style={styles.textName}>휴대폰 번호</Text>

            <View style={styles.textInputCase2}>
              <Text style={styles.textinput}>{this.state.phone}</Text>
              <TouchableOpacity
                onPress={() => {
                  this._requireAuth();
                }}
                disabled={this.state.checkAuth}>
                <Text style={styles.authReqBefore}>인증요청</Text>
              </TouchableOpacity>
            </View>

            <View
              style={
                this.state.phone === '' ? styles.lineBefore : styles.lineAfter
              }
            />
          </View>

          {this.state.checkAuth === true ? (
            <View style={styles.InputCase}>
              <Text style={styles.textName}>인증번호 입력</Text>

              <View style={styles.textInputCase2}>
                <TextInput
                  style={styles.textinput}
                  placeholder={'인증번호'}
                  placeholderTextColor={'#E5E5E5'}
                  onChangeText={(text) => {
                    this._auth(text);
                  }}
                  value={this.state.auth}
                  keyboardType={'number-pad'}
                  maxLength={6}
                />
                <Text style={styles.timer}>{this.state.timer}초</Text>
              </View>

              <View
                style={
                  this.state.auth === '' ? styles.lineBefore : styles.lineAfter
                }
              />
            </View>
          ) : null}
        </View>
        <View style={{marginTop: 30, alignItems: 'center'}}>
          <TouchableOpacity
            style={
              this.state.next === true
                ? styles.buttonAfter
                : styles.buttonBefore
            }
            onPress={() => {
              this._check();
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>설정완료</Text>
          </TouchableOpacity>
          <View style={{height: 50}} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
  },
  InputCase: {
    marginTop: 30,
    paddingHorizontal: wp('10%'),
  },
  textName: {
    // marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  textInputCase: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  textinput: {
    fontSize: 15,
    flex: 1,
  },
  lineBefore: {
    height: 2,
    // width: wp('90%'),
    marginTop: 5,
    backgroundColor: '#E5E5E5',
  },
  lineAfter: {
    height: 2,
    // width: wp('90%'),
    marginTop: 5,
    backgroundColor: '#642A8C',
  },
  checkPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkPasswordText: {
    marginLeft: 8,
    color: '#aaa',
  },
  textInputCase2: {
    marginTop: 10,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // backgroundColor: 'blue'
  },
  authReqBefore: {
    fontSize: 15,
    color: '#642A8C',
    // marginRight: 10
  },
  timer: {
    fontSize: 15,
    color: '#FF3D3D',
    // marginRight: 10
  },
  buttonBefore: {
    height: hp('7%'),
    width: wp('80%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
  buttonAfter: {
    height: hp('7%'),
    width: wp('80%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#642A8C',
  },
});
