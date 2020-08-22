import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import InputLine from '../../../../components/InputLine';

const WhiteSpace = styled.View`
  height: 30px;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const ScrollView = styled.ScrollView``;
const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
`;
const TitleText = styled.Text`
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
`;
const CameraBox = styled.TouchableOpacity`
  margin: 20px;
  width: 300px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: #642a8c;
`;

const TextContainer = styled.View`
  align-items: center;
`;
const Text = styled.Text``;
const TextInput = styled.TextInput`
  width: 100%;
  font-size: 17px;
  color: black;
  margin-left: 5px;
  margin-top: 10px;
`;
const Bold = styled(Text)``;

const Section = styled.View`
  padding: 30px 0;
  border-radius: 20px;
  align-items: center;
  background-color: white;
`;

const TextInputContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-left: 5px;
  margin-bottom: 5px;
`;

const TextInputBox = styled.View`
  padding: 30px 20px;
  border-radius: 20px;
  background-color: white;
`;

const GreyText = styled.Text`
  font-size: 18;
  color: #999;
  font-weight: bold;
`;

export default ({
  submit,
  checkorc,
  modalVisible,
  setModalVisible,
  NAME,
  setNAME,
  RESULT_COUNT,
  setRESULT_COUNT,
  EDUCATION_DATE,
  setEDUCATION_DATE,
}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}>
        <Container>
          <Section>
            <TextContainer>
              <TitleText>보건증을 촬영해주세요</TitleText>
              <Text>문자인식(OCR) 기술로</Text>
              <Text>정보를 자동으로 입력할 수 있습니다</Text>
            </TextContainer>
            <CameraBox onPress={() => setModalVisible(true)}>
              <Bold style={{color: '#642A8C'}}>촬영하기</Bold>
              <Icon name="camera-outline" size={30} color="#642A8C" />
            </CameraBox>
            <Bold>* 인식이 불안정할 경우 직접입력하여 진행해 주세요.</Bold>
          </Section>
          <WhiteSpace />
          <TextInputBox>
            <TextInputContainer>
              <GreyText>성명</GreyText>
              <TextInput
                placeholder={'성명'}
                placeholderTextColor={'#999'}
                onChangeText={(text) => {
                  setNAME(text);
                }}
                value={NAME}
                maxLength={6}
              />
            </TextInputContainer>
            <InputLine isBefore={NAME == '' ? true : false} />
            <WhiteSpace />
            <TextInputContainer>
              <GreyText>회차</GreyText>
              <TextInput
                placeholder={'회차'}
                placeholderTextColor={'#999'}
                onChangeText={(text) => {
                  setRESULT_COUNT(text);
                }}
                value={RESULT_COUNT}
                maxLength={6}
              />
            </TextInputContainer>
            <InputLine isBefore={RESULT_COUNT == '' ? true : false} />
            <WhiteSpace />
            <TextInputContainer>
              <GreyText>검진일</GreyText>
              {console.log(EDUCATION_DATE)}
              <TextInput
                placeholder={EDUCATION_DATE}
                placeholderTextColor={'#999'}
                onChangeText={(text) => {
                  setEDUCATION_DATE(text);
                }}
                value={EDUCATION_DATE}
                clearButtonMode={'always'}
                editable={false}>
                <DatePicker
                  showIcon={false}
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    justifyContent: 'center',
                  }}
                  date={EDUCATION_DATE ?? ''}
                  placeholder="기한 입력"
                  mode="date"
                  format="YYYY-MM-DD"
                  minDate="1900/01/01"
                  maxDate="9999/12/31"
                  confirmBtnText="확인"
                  cancelBtnText="취소"
                  locale="ko"
                  androidMode="spinner"
                  customStyles={{
                    dateInput: {
                      alignItems: 'center',
                      borderWidth: 0,
                    },
                    dateText: {
                      fontSize: 16,
                    },
                  }}
                  onDateChange={(date) => {
                    setEDUCATION_DATE(date);
                  }}
                />
              </TextInput>
            </TextInputContainer>
            <InputLine isBefore={EDUCATION_DATE == '' ? true : false} />
          </TextInputBox>
          <SubmitBtn
            text={'입력완료'}
            onPress={() => submit()}
            isRegisted={true}
          />
        </Container>
      </ScrollView>
      {/* <Modal
        isVisible={this.state.modalVisible}
        style={{margin: 0}}
        onBackButtonPress={() => {
          this.setState({modalVisible: false});
        }}>
        <View style={{flex: 1}}>
          {this.state.cameraPicture ? (
            <>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 16,
                  paddingTop: isIphoneX() ? 50 : 30,
                }}>
                <View style={{flex: 1, marginBottom: 22}}>
                  <Image
                    source={{uri: this.state.cameraPicture}}
                    style={{width: '100%', height: '100%', borderRadius: 5}}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={styles.cameraPictureRetryButton}
                    onPress={() => {
                      this.setState({
                        cameraPicture: null,
                      });
                    }}>
                    <Text style={{fontSize: 16, color: '#642A8C'}}>
                      {' '}
                      재촬영{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      ...styles.cameraPictureRetryButton,
                      backgroundColor: '#642A8C',
                    }}
                    onPress={async () => {
                      this.checkorc();
                    }}>
                    <Text style={{fontSize: 16, color: '#fff'}}> 선택 </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Camera
              ref={(ref) => {
                this.cameraRef = ref;
              }}
              ratio={
                this.state.cameraRatioList.length > 0
                  ? this.state.cameraRatioList[
                      this.state.cameraRatioList.length - 1
                    ]
                  : '16:9'
              }
              autoFocus={Camera.Constants.AutoFocus.on}
              style={{flex: 1}}
              onCameraReady={async () => {
                this.setState({
                  cameraRatioList: ['16:9'],
                });
              }}
              flashMode={
                cameraPictureFlash
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              }>
              <View style={styles.cameraGuide}>
                <Image
                  style={{height: '100%', width: '100%', opacity: 0.4}}
                  source={require('../../../../assets/images/camera.png')}
                  resizeMode="contain"
                />
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <TouchableOpacity
                  style={styles.cameraPictureCloseButton}
                  onPress={() => {
                    this.setState({
                      modalVisible: false,
                    });
                  }}>
                  <Text style={{fontSize: 16, color: '#FFFFFF'}}> 닫기 </Text>
                </TouchableOpacity>
              </View>
              {this.state.cameraRatioList.length > 0 ? (
                <>
                  <TouchableOpacity
                    style={styles.cameraPictureButton}
                    onPress={async () => {
                      const capturedPicture = await this.cameraRef.takePictureAsync();

                      this.setState({
                        cameraPicture: capturedPicture.uri,
                      });
                    }}>
                    <AntDesign
                      name="camerao"
                      size={32}
                      color="#642A8C"
                      style={{paddingTop: 3}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cameraPictureFlashButton}
                    onPress={async () => {
                      this.setState({
                        cameraPictureFlash: !this.state.cameraPictureFlash,
                      });
                    }}>
                    <Ionicons
                      name={
                        this.state.cameraPictureFlash
                          ? 'ios-flash-off'
                          : 'ios-flash'
                      }
                      size={20}
                      color="#FFFFFF"
                      style={{paddingTop: 3}}
                    />
                  </TouchableOpacity>
                </>
              ) : null}
            </Camera>
          )}
        </View>
      </Modal> */}
    </BackGround>
  );
};
