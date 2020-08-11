import React from 'react';
import {Image, View, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  padding: ${hp('5%')} 0;
  align-items: center;
  justify-content: center;
`;

const Space = styled.View`
  margin-top: ${hp('2%')};
  justify-content: flex-end;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const Text = styled.Text``;
/*    
  },
  backButton: {
    height: hp('10%'),
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  backText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
  },
  logoText: {
    width: wp('100%'),
    marginBottom: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  idPassword: {
    width: wp('80%'),
  },
  textinputCase: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
    marginBottom: 5,
  },
  textinput: {
    width: '100%',
    fontSize: 17,
    color: 'black',
    marginLeft: 5,
    marginTop: 10,
  },
  keepLogin: {
    height: hp('7%'),
    width: wp('90%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  keepLogin2: {
    height: hp('5%'),
    width: wp('27%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  login: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginBottom: 15,
  },
  button: {
    paddingVertical: hp('2%'),
    width: wp('80%'),
    backgroundColor: '#642A8C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 70,
  },
  space: {
   
  },
  lineBefore: {
    height: 2,
    backgroundColor: '#CCCCCC',
  },
  lineAfter: {
    height: 2,
    backgroundColor: '#642A8C',
  },
  checkbox: {
    height: 20,
    width: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderLeftColor: 'black',
    borderLeftWidth: 1,
    borderRightColor: 'black',
    borderRightWidth: 1,
  }, */

export default () => {
  return (
    <Container>
      <Text>jijijiji</Text>
    </Container>
    // <KeyboardAwareScrollView>
    //   <Container>
    //     <View
    //       style={
    //         isIphoneX()
    //           ? {...styles.logoText, marginVertical: hp('5%')}
    //           : styles.logoText
    //       }>
    //       {/* <View style={styles.logoText}> */}
    //       <Image
    //         style={{height: 175, width: 350}}
    //         resizeMode="stretch"
    //         source={require('../../../assets/images/logo_cu.png')}
    //       />
    //     </View>

    //     <View style={styles.idPassword}>
    //       <View style={styles.textinputCase}>
    //         <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>
    //           ID
    //         </Text>
    //         <TextInput
    //           style={styles.textinput}
    //           placeholder={'휴대폰번호'}
    //           placeholderTextColor={'#999'}
    //           onChangeText={(text) => {
    //             this._id(text);
    //           }}
    //           value={this.state.mobileNum}
    //           keyboardType={'number-pad'}
    //           maxLength={11}
    //           clearButtonMode={'always'}
    //         />
    //       </View>

    //       <View
    //         style={
    //           this.state.mobileNum == '' ? styles.lineBefore : styles.lineAfter
    //         }
    //       />
    //       <View style={{height: hp('3.5%')}} />
    //       <View style={styles.textinputCase}>
    //         <Text style={{fontSize: 18, color: '#212121', fontWeight: 'bold'}}>
    //           Password
    //         </Text>
    //         <TextInput
    //           style={styles.textinput}
    //           placeholder={'영문, 숫자 조합 6자 이상'}
    //           placeholderTextColor={'#999'}
    //           onChangeText={(text) => {
    //             setPassword(text);
    //           }}
    //           value={this.state.password}
    //           secureTextEntry={true}
    //           clearButtonMode={'always'}
    //         />
    //       </View>
    //       <View
    //         style={
    //           this.state.password == '' ? styles.lineBefore : styles.lineAfter
    //         }
    //       />
    //     </View>

    //     <View style={styles.login}>
    //       <Touchable
    //         onPress={() => {
    //           this._signUp();
    //         }}>
    //         <View style={styles.button}>
    //           <Text style={{fontSize: 16, color: '#ccc', fontWeight: 'bold'}}>
    //             로그인
    //           </Text>
    //         </View>
    //       </Touchable>
    //     </View>

    //     <Space>
    //       <Touchable
    //         onPress={() => {
    //           this.props.navigation.navigate('Find');
    //         }}>
    //         <UnderLineText text={'비밀번호 찾기'} fontSize={16} />
    //       </Touchable>
    //     </Space>
    //   </Container>
    // </KeyboardAwareScrollView>
  );
};
