import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import api from '../../../../constants/LoggedInApi';
import utils from '../../../../constants/utils';
import VideoPlayer from '../../../../components/VideoPlayer';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const MainImageWrapper = styled.View`
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
    console.log('seteducheck', data);
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
      <ScrollView>
        <MainImageWrapper>
          {IMG_URL2 && (
            <MainImage source={{uri: IMG_URL2}} resizeMode="stretch" />
          )}
        </MainImageWrapper>
        <PdfButtonWrapper>
          <PdfButton
            onPress={() => {
              checkVideo();
            }}>
            <PdfButtonText>동영상 보기</PdfButtonText>
          </PdfButton>
        </PdfButtonWrapper>
        <TextBox>
          <Text>{CONTENTS2}</Text>
        </TextBox>
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
                {/* <Icon
                name={utils.isAndroid ? 'md-close' : 'ios-close'}
                size={28}
                color="#642A8C"
                style={{marginRight: 5}}
              /> */}
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
                {/* <Icon
                name={utils.isAndroid ? 'md-close' : 'ios-close'}
                size={28}
                color="#642A8C"
                style={{marginRight: 5}}
              /> */}
              </IconContainer>
            )}
          </ModalContainer>
        )}
      </Modal>
    </BackGround>
  );
};
