import React, {useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';

import api from '~/constants/LoggedInApi';
import VideoPlayer from '~/components/VideoPlayer';
import PDFViewer from '~/components/PDFViewer';
import {StatusBar} from 'react-native';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Wrapper = styled.View`
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

const Text = styled.Text``;

export default ({route: {params}}) => {
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const EMP_FILE_SEQ = params?.EMP_FILE_SEQ;
  const FILE_URL = params?.FILE_URL;
  const IMG_URL2 = params?.IMG_URL2;
  const CONTENTS2 = params?.CONTENTS2;
  const TYPE = params?.TYPE;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const checkVideo = async () => {
    setModalVisible(true);
    const {data} = await api.seteducheck(EMP_FILE_SEQ, MEMBER_SEQ);
  };
  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        {IMG_URL2 && (
          <Wrapper>
            <FastImage
              style={{width: wp('100%'), height: hp('30%')}}
              source={{
                uri: `http://cuapi.shop-sol.com/uploads/edu/${IMG_URL2}`,
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </Wrapper>
        )}
        {FILE_URL && (
          <PdfButtonWrapper>
            <PdfButton
              onPress={() => {
                checkVideo();
                StatusBar.setHidden(true);
              }}>
              <PdfButtonText>동영상 보기</PdfButtonText>
            </PdfButton>
          </PdfButtonWrapper>
        )}
        <Wrapper>
          <Text>{CONTENTS2}</Text>
        </Wrapper>
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        style={{
          height: hp('100%'),
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}>
        {TYPE == '0' ? (
          <PDFViewer
            url={`http://cuapi.shop-sol.com/uploads/edu/${FILE_URL}`}
            setModalVisible={setModalVisible}
          />
        ) : (
          <VideoPlayer
            url={`http://cuapi.shop-sol.com/uploads/edu/${FILE_URL}`}
            setModalVisible={setModalVisible}
          />
        )}
      </Modal>
    </BackGround>
  );
};
