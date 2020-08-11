import React from 'react';
import styled from 'styled-components/native';
import { 
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp 
} from 'react-native-responsive-screen';

import {
  ScrollView,
  StatusBar,
  Keyboard,
} from 'react-native';

const TouchableWithoutFeedback = styled.TouchableWithoutFeedback`
  flex: 1;
  background-color: pink;
`;

const Container = styled.View`
  background-color: white;
  justify-content: space-between;
  align-items: center;
`;

const TopBox = styled.View`
  margin-top: hp('5%');
  width: 80%;
  `;

const Text = styled.Text`
font-size: 18px;
`
const TextInput = styled.TextInput`
              flex: 1;
  font-size: 18px;
`

const InputCase=styled.View`
  margin-top: 20
  `;



        /* textInputCase: {
          height: hp('5%'), 
          width: wp('80%'),
          justifyContent: 'center',
          // marginTop: 8
        },
        textInputCase2: {
          marginTop: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
  
            lineNameBefore: {
              height: 2,
              width: wp('37%'),
              backgroundColor:'#E5E5E5',
              marginTop: 3
            },
            lineNameAfter: {
              height: 2,
              width: wp('37%'),
              backgroundColor:'#642A8C',
              marginTop: 3
            },
        genderCheckCase: {
          flexDirection: 'row', 
          justifyContent: 'space-around',
          marginTop: 8
        }, */

/* 
authReqBefore: {
  fontSize: 15,
  color: '#ddd',
  padding: 10
},
authReqAfter: {
  fontSize: 15,
  color: '#642A8C',
  padding: 10
},
timer: {
  fontSize: 15,
  color: '#FF3D3D',
  marginRight: 10, marginTop: 5
},
buttonBefore: {
  // marginTop: hp('5%'),
  width: wp('80%'),
  height: hp('7%'),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#CCCCCC'
},
buttonAfter: {
  // marginTop: hp('5%'),
  width: wp('80%'),
  height: hp('7%'),
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#642A8C'
},
lineBefore: {
  height: 2,
  width: wp('90%'),
  backgroundColor:'#E5E5E5',
  marginTop: 3
},
lineAfter: {
  height: 2,
  width: wp('90%'),
  backgroundColor:'#642A8C',
  marginTop: 3
},

//~~~~~~~~~~~~~~~~~~~~~~~~~
// sexType() 
//~~~~~~~~~~~~~~~~~~~~~~~~~
sexType: {
  flexDirection: 'row',
  alignItems: 'center'
  // backgroundColor: 'yellow'
},
    sexTypeRadioButtonOn: {
      width: 10,
      height: 10,
      borderRadius: 10 / 2,
      backgroundColor: '#642A8C'
    },
    sexTypeRadioButtonOff: {
      width: 16,
      height: 16,
      borderRadius: 16 / 2,
      borderColor: '#642A8C',
      borderWidth: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    } */

export default () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{}}>
      <StatusBar barStyle={'light-content'} />
      <Container>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{flex: 1}}>
          <TopBox >
            <InputCase >
              <Text>휴대폰 번호</Text>
              <View style={styles.textInputCase2}>
                <TextInput
                  selectionColor={'#642A8C'}
                  placeholder={'01012345678'}
                  placeholderTextColor={'#E5E5E5'}
                  onChangeText={(text) => {
                    this.phoneCheck(text);
                  }}
                  value={this.state.phone}
                  keyboardType={'number-pad'}
                  maxLength={11}
                />
                <TouchableOpacity
                  onPress={() => this._requireAuth()}
                  disabled={this.state.checkAuth}>
                  {this.state.checkAuth === true ? (
                    <Text style={styles.authReqBefore}>요청완료</Text>
                  ) : (
                    <Text
                      style={
                        this.state.phone === ''
                          ? styles.authReqBefore
                          : styles.authReqAfter
                      }>
                      인증요청
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={
                  this.state.phone === '' ? styles.lineBefore : styles.lineAfter
                }
              />
            </InputCase>
            <View style={{marginTop: 5}}>
              <Text style={{fontSize: 12, color: '#999'}}>
                * 웹발신 또는 스팸차단서비스 이용시 인증문자를 받지 못할 수
                있습니다.
              </Text>
            </View>

            {/* {this.state.checkAuth === true || this.state.auth != '' ? ( */}
            {/* <View style={[styles.case, {marginTop: hp('1%')}]}> */}
            <View style={styles.InputCase}>
              <Text style={styles.textName}>인증번호 입력</Text>
              <View style={styles.textInputCase}>
                <TextInput
                  selectionColor={'#642A8C'}
                  placeholder={'인증번호'}
                  placeholderTextColor={'#E5E5E5'}
                  onChangeText={(text) => {
                    this.auth(text);
                  }}
                  value={this.state.auth}
                  keyboardType={'number-pad'}
                  maxLength={6}
                />
                {/* <Text style={styles.timer}>{this.state.countdown}초</Text> */}
                <View
                  style={
                    this.state.auth == '' ? styles.lineBefore : styles.lineAfter
                  }
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    top: 0,
                  }}>
                  {this.state.countDownStart && (
                    <Text
                      style={[
                        styles.textName,
                        {marginRight: 10, color: '#FF3D3D', fontSize: 14},
                      ]}>
                      {this.state.countdown}초
                    </Text>
                  )}
                  <TouchableOpacity
                    onPress={() => {
                      this.state.auth == '' ? {} : this._onVerifyCode();
                    }}>
                    <View
                      style={[
                        this.state.auth == ''
                          ? styles.buttonBefore
                          : styles.buttonAfter,
                        {
                          height: 30,
                          width: 80,
                          borderRadius: 15,
                        },
                      ]}>
                      <Text style={{fontSize: 14, color: 'white'}}>
                        인증 확인
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              {this.state.next && !this.state.checkTimeOut && (
                <View style={{marginTop: 5}}>
                  <Text style={{color: '#642A8C'}}>
                    인증완료. 하단의 버튼을 눌러서 다음단계로 이동해 주세요.
                  </Text>
                </View>
              )}
              {/* <View style={this.state.auth === '' ? styles.lineBefore : styles.lineAfter}/> */}
            </View>
            {this.state.checkTimeOut && (
              <Text
                style={[
                  styles.textName,
                  {
                    fontSize: 12,
                    color: '#FF3D3D',
                    alignSelf: 'flex-start',
                    marginBottom: 5,
                  },
                ]}>
                인증시간이 초과되었습니다. 인증을 다시 시도해주세요
              </Text>
            )}
            {/* ) : null} */}
            {/* <View style={{height: 20}}/> */}
          </View>
          <View style={{marginTop: 30}}>
            <TouchableOpacity
              style={
                this.state.next === true && !this.state.checkTimeOut
                  ? styles.buttonAfter
                  : styles.buttonBefore
              }
              onPress={() => this.check()}>
              <Text style={{fontSize: 16, color: 'white'}}>다음단계로</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    </TouchableWithoutFeedback>
  );
};
