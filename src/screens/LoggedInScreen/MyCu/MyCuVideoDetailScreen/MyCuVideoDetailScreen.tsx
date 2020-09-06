import React, {useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import api from '../../../../constants/LoggedInApi';
import VideoPlayer from '../../../../components/VideoPlayer';
import {CloseCircleIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.Image`
  width: ${wp('100%')}px;
  height: ${hp('30%')}px;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const PdfButtonWrapper = styled.View`
  margin: 16px;
  justify-content: center;
  align-items: center;
`;

const PdfButton = styled.TouchableOpacity`
  width: ${wp('75%')}px;
  height: ${hp('7%')}px;
  border-radius: 35px;
  justify-content: center;
  align-items: center;
  background-color: #642a8c;
`;

const PdfButtonText = styled.Text`
  color: white;
`;

const TextBox = styled.View`
  padding: 0 16px;
`;
const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const Text = styled.Text``;

export default ({route: {params}}) => {
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const VIDEO_URL = params?.VIDEO_URL;
  const IMG_URL2 = params?.IMG_URL2;
  const CONTENTS2 = params?.CONTENTS2;
  const VIDEO_SEQ = params?.VIDEO_SEQ;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const checkVideo = async () => {
    setModalVisible(true);
    const {data} = await api.setvideocheck(VIDEO_SEQ, MEMBER_SEQ);
  };

  // const screenOrientationChange(event) {
  //   const info = event.orientationInfo;
  //   const state = {};

  //   if (info) {
  //     if (info.orientation.startsWith('LANDSCAPE')) {
  //       state.iosModalHeaderTopStyle = 25;
  //       state.iosModalHeaderButtonTopStyle = 25;
  //     } else if (info.orientation.startsWith('PORTRAIT')) {
  //       state.iosModalHeaderTopStyle = 55;
  //       state.iosModalHeaderButtonTopStyle = 55;
  //     }

  //     this.setState(state);
  //   }
  // }

  // useEffect(() => {
  //   ScreenOrientation.addOrientationChangeListener((event) => {
  //     screenOrientationChange(event);
  //   });
  // }, []);

  // useEffect(() => {
  //   return () => {
  //     ScreenOrientation.removeOrientationChangeListeners();
  //   };
  // });

  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}>
        {IMG_URL2 && (
          <Wrapper>
            <FastImage
              style={{width: wp('100%'), height: hp('30%')}}
              source={{
                uri: IMG_URL2,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </Wrapper>
        )}
        <PdfButtonWrapper>
          <PdfButton
            onPress={() => {
              checkVideo();
            }}>
            <PdfButtonText>동영상 보기</PdfButtonText>
          </PdfButton>
        </PdfButtonWrapper>
        <Wrapper>
          <Text>{CONTENTS2}</Text>
        </Wrapper>
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        style={{
          height: hp('100%'),
        }}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}>
        <VideoPlayer url={VIDEO_URL} setModalVisible={setModalVisible} />
      </Modal>
    </BackGround>
  );
};
