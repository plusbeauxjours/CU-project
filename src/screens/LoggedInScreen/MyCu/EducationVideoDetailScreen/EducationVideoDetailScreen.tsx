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
import {CloseIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const MainImage = styled.Image`
  justify-content: center;
  align-items: center;
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
  padding-top: 60px;
`;

const Text = styled.Text``;
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 24px;
  top: 55px;
`;

export default ({route: {params}}) => {
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const EMP_FILE_SEQ = params?.EMP_FILE_SEQ;
  const FILE_URL = params?.FILE_URL;
  const IMG_URL2 = params?.IMG_URL2;
  const CONTENTS2 = params?.CONTENTS2;
  const TYPE = params?.TYPE;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [visibleVideoModalClose, setVisibleVideoModalClose] = useState<boolean>(
    false,
  );

  const checkVideo = async () => {
    setModalVisible(true);
    const {data} = await api.seteducheck(EMP_FILE_SEQ, MEMBER_SEQ);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {IMG_URL2 && (
          <Wrapper>
            <FastImage
              style={{width: wp('100%'), height: hp('30%')}}
              source={{
                uri: IMG_URL2,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.normal,
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
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
        style={{
          backgroundColor: '#333333',
        }}>
        {TYPE == '0' ? (
          <ModalContainer>
            {/* <PDFViewer url={FILE_URL} /> */}
            {visibleVideoModalClose && (
              <IconContainer
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text>닫기</Text>
                <CloseIcon size={28} />
              </IconContainer>
            )}
          </ModalContainer>
        ) : (
          <ModalContainer>
            <VideoPlayer
              url={FILE_URL}
              landscapeCallback={() => {
                setVisibleVideoModalClose(false);
              }}
              portraitCallback={() => {
                setVisibleVideoModalClose(true);
              }}
            />
            {visibleVideoModalClose && (
              <IconContainer
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text>닫기</Text>
                <CloseIcon size={28} />
              </IconContainer>
            )}
          </ModalContainer>
        )}
      </Modal>
    </BackGround>
  );
};
