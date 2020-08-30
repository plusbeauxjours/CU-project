import React, {useRef} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import DatePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import InputLine from '../../../../components/InputLine';
import {
  CameraIcon,
  FlashOffIcon,
  FlashOnIcon,
} from '../../../../constants/Icons';

interface IButton {
  isRight: boolean;
}
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

const DateText = styled.Text`
  width: 100%;
  font-size: 17px;
  margin-left: 5px;
  margin-top: 10px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  font-size: 17px;
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

const PictureSection = styled.View`
  flex: 1;
  padding: 30px 16px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

const Touchable = styled.TouchableOpacity``;

const Row = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity<IButton>`
  width: 50%;
  height: 50px;
  background-color: ${(props) => (props.isRight ? '#642A8C' : '#FFF')};
`;

const BarButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
`;

const ButtonText = styled.Text<IButton>`
  font-size: 16px;
  color: ${(props) => (props.isRight ? '#FFF' : '#642A8C')};
`;

const FlashButton = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  border-radius: 60px;
  border-color: #642a8c;
  background-color: rgba(100, 100, 100, 0.5);
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${wp('5%')}px;
  top: 30px;
`;

const CameraButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  border-color: #642a8c;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${wp('50%') - 50}px;
  bottom: 90px;
`;

const CameraGuide = styled.View`
  position: absolute;
  top: ${hp('10%')}px;
  left: ${wp('5%')}px;
  right: ${wp('5%')}px;
  bottom: ${hp('20%')}px;
  align-items: center;
  justify-content: center;
`;

export default ({
  submitFn,
  cameraPicture,
  setCameraPicture,
  checkOrcFn,
  cameraModalVisible,
  setCameraModalVisible,
  dateModalVisible,
  setDateModalVisible,
  NAME,
  setNAME,
  RESULT_COUNT,
  setRESULT_COUNT,
  EDUCATION_DATE,
  setEDUCATION_DATE,
  cameraRatioList,
  setCameraRatioList,
  cameraPictureFlash,
  setCameraPictureFlash,
}) => {
  const cameraRef = useRef(null);
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
            <CameraBox onPress={() => setCameraModalVisible(true)}>
              <Bold style={{color: '#642A8C'}}>촬영하기</Bold>
              <CameraIcon />
              <CameraIcon />
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
                keyboardType={'number-pad'}
              />
            </TextInputContainer>
            <InputLine isBefore={RESULT_COUNT == '' ? true : false} />
            <WhiteSpace />
            <TextInputContainer>
              <Touchable onPress={() => setDateModalVisible(true)}>
                <GreyText>검진일</GreyText>
                <DateText>{EDUCATION_DATE}</DateText>
              </Touchable>
            </TextInputContainer>
            <InputLine isBefore={EDUCATION_DATE == '' ? true : false} />
          </TextInputBox>
          <DatePickerModal
            headerTextIOS={'날짜를 선택하세요.'}
            cancelTextIOS={'취소'}
            confirmTextIOS={'선택'}
            isVisible={dateModalVisible}
            mode="date"
            locale="ko_KRus_EN"
            onConfirm={(date) => {
              setEDUCATION_DATE(date), setDateModalVisible(false);
            }}
            onCancel={() => setDateModalVisible(false)}
            display="default"
          />
          <SubmitBtn
            text={'입력완료'}
            onPress={() => submitFn()}
            isRegisted={true}
          />
        </Container>
      </ScrollView>
      {/* <Modal
        isVisible={cameraModalVisible}
        onBackButtonPress={() => {
          setCameraModalVisible(false);
        }}
        style={{flex: 1}}>
        {cameraPicture ? (
          <>
            <PictureSection>
              <Image source={{uri: cameraPicture}} />
            </PictureSection>
            <Row>
              <Button isRight={false} onPress={() => setCameraPicture(null)}>
                <ButtonText isRight={false}>재촬영</ButtonText>
              </Button>
              <Button isRight={true} onPress={() => checkOrcFn()}>
                <ButtonText isRight={true}>선택</ButtonText>
              </Button>
            </Row>
          </>
        ) : (
          <Camera
            ref={cameraRef}
            ratio={
              cameraRatioList.length > 0
                ? cameraRatioList[cameraRatioList.length - 1]
                : '16:9'
            }
            autoFocus={Camera.Constants.AutoFocus.on}
            style={{flex: 1}}
            onCameraReady={async () => setCameraRatioList(['16:9'])}
            flashMode={
              cameraPictureFlash
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }>
            <CameraGuide>
              <Image
                style={{height: '100%', width: '100%', opacity: 0.4}}
                source={require('../../../../assets/images/camera.png')}
                resizeMode="contain"
              />
            </CameraGuide>
            <BarButton onPress={() => setCameraModalVisible(false)}>
              <ButtonText isRight={true}> 닫기 </ButtonText>
            </BarButton>
            {cameraRatioList.length > 0 && (
              <>
                <CameraButton
                  onPress={async () => {
                    const capturedPicture = await cameraRef.current.takePictureAsync();
                    setCameraPicture(capturedPicture.uri);
                  }}>
                  <CameraIcon color="#642A8C" />
                </CameraButton>
                <FlashButton
                  onPress={async () =>
                    setCameraPictureFlash(!cameraPictureFlash)
                  }>
                  {cameraPictureFlash ? <FlashOffIcon /> : <FlashOnIcon />}
                </FlashButton>
              </>
            )}
          </Camera>
        )}
      </Modal> */}
    </BackGround>
  );
};
