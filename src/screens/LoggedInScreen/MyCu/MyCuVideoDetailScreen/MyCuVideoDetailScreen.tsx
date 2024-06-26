import React, {useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import api from '~/constants/LoggedInApi';
import VideoPlayer from '~/components/VideoPlayer';
import RoundBtn from '~/components/Btn/RoundBtn';
import {StatusBar} from 'react-native';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const Wrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const WhiteSpate = styled.View`
  height: 30px;
`;

const TextBox = styled.View`
  width: 100%;
  padding: 20px;
  align-items: flex-start;
`;

const Text = styled.Text``;

export default ({route: {params}}) => {
  const VIDEO_URL = params?.VIDEO_URL;
  const IMG_URL2 = params?.IMG_URL2;
  const CONTENTS2 = params?.CONTENTS2;
  const VIDEO_SEQ = params?.VIDEO_SEQ;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const checkVideo = async () => {
    setModalVisible(true);
    await api.setvideocheck(VIDEO_SEQ);
  };

  return (
    <>
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
          <RoundBtn
            isWhiteBack={false}
            text={'동영상 보기'}
            onPress={() => {
              checkVideo();
              StatusBar.setHidden(true);
            }}
            isRegisted={true}
          />
          <WhiteSpate />
          <TextBox>
            <Text>{CONTENTS2}</Text>
          </TextBox>
        </ScrollView>
      </BackGround>
      <Modal
        isVisible={modalVisible}
        supportedOrientations={['portrait', 'landscape']}
        style={{
          flex: 1,
        }}
        onBackdropPress={() => setModalVisible(false)}
        onRequestClose={() => setModalVisible(false)}>
        <VideoPlayer url={VIDEO_URL} setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
};
