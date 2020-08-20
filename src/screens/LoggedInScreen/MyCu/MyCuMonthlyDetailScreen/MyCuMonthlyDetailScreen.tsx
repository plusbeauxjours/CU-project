import React, {useState} from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import api from '../../../../constants/LoggedInApi';
import PDFViewer from '../../../../components/PDFViewer';

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
    console.log('checkPdf', data);
  };

  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MainImageWrapper>
          {IMG_URL2 && (
            <MainImage source={{uri: IMG_URL2}} resizeMode="stretch" />
          )}
        </MainImageWrapper>
        <PdfButtonWrapper>
          <PdfButton
            onPress={() => {
              checkPdf();
            }}>
            <PdfButtonText>PDF 보기</PdfButtonText>
          </PdfButton>
        </PdfButtonWrapper>
        <TextBox>
          <Text>{CONTENTS2}</Text>
        </TextBox>
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        style={{
          height: hp('100%'),
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}>
        <PDFViewer url={PDF_URL} setModalVisible={setModalVisible} />
      </Modal>
    </BackGround>
  );
};
