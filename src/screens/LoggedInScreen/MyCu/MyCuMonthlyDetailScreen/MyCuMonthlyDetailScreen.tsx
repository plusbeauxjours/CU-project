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
import PDFViewer from '../../../../components/PDFViewer';
import RoundBtn from '../../../../components/Btn/RoundBtn';

const BackGround = styled.View`
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
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const PDF_URL = params?.PDF_URL;
  const IMG_URL2 = params?.IMG_URL2;
  const CONTENTS2 = params?.CONTENTS2;
  const PDF_SEQ = params?.PDF_SEQ;

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const checkPdf = async () => {
    setModalVisible(true);
    const {data} = await api.setpdfcheck(PDF_SEQ, MEMBER_SEQ);
  };

  return (
    <>
      <BackGround>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
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
            text={'PDF 보기'}
            onPress={() => checkPdf()}
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
        onBackButtonPress={() => {
          setModalVisible(false);
        }}>
        <PDFViewer url={PDF_URL} setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
};
