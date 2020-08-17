import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const ContentLine = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-color: #ddd;
`;

const ContentDataWrapper = styled.View`
  flex: 1;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
`;

const ContentLabelWrapper = styled.View`
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-color: #ddd;
  padding: 20px 15px;
  width: ${wp('28%')};
`;

const ContentLabelText = styled.Text`
  color: #000;
`;

const ContentDataText = styled.Text`
  font-weight: bold;
  color: #000;
`;

const ImageButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageButton = styled.Text`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WhiteSpace = styled.View`
  height: 50px;
`;

const Container = styled.View`
  flex: 1;
  padding-top: 30px;
  align-items: center;
`;

const HelpWrapper = styled.View`
  height: ${hp('8%')};
  width: ${wp('90%')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: white;
`;

const HelpText = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

const Box = styled.View`
  margin: ${hp('3%')} 0;
  width: ${wp('90%')};
  align-items: center;
  padding: 20px 0;
  border-radius: 20px;
  background-color: #fff;
`;

const Date = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DateArrowLeft = styled.TouchableOpacity`
  width: ${wp('10%')};
  height: ${wp('10%')};
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;
const DateArrowRight = styled(DateArrowLeft)``;
const DateTextArea = styled.TouchableOpacity`
  flex: 1;
  height: ${wp('10%')};
  align-items: center;
  justify-content: center;
`;
const DateToday = styled.TouchableOpacity`
  margin-right: 5px;
  width: ${wp('10%')};
  height: ${wp('10%')};
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;
const DateText = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
const ContentWrapper = styled.View`
  width: ${wp('90%')};
  margin-top: ${hp('3%')};
  border-bottom-width: 1px;
  border-color: #ddd;
`;

const ModifyButton = styled.TouchableOpacity`
  height: ${hp('8%')};
  width: ${wp('45%')};
  align-items: center;
  justify-content: center;
  background-color: '#AACE36';
`;
const SaveButton = styled(ModifyButton)`
  background-color: '#642A8C';
`;

const RegDate = styled.Text`
  color: #9b9b9b;
  font-size: 12px;
`;

const Row = styled.View`
  width: ${wp('90%')};
  flex-direction: row;
  justify-content: space-around;
`;

const RegDateContainer = styled.View`
  margin-top: 10px;
  width: ${wp('90%')};
  align-items: flex-end;
`;

export default ({
  NAME,
  modalVisible,
  setModalVisible,
  onRefresh,
  onRefreshProps,
  nextdata,
  backdata,
  alertModal,
  EDUCATION_TYPE,
  STORE_HEALTH_SEQ,
  TESTING_CERTIFICATE,
  REAL_NAME,
  EMP_SEQ,
  STORE_SEQ,
  TESTING_COUNT,
  position,
  owner,
  storename,
  businesstype,
  TESTING_DATE,
  SETTIME,
  selectindex,
  allData,
  params,
}) => {
  const navigation = useNavigation();
  const GetContent = ({label, data}) => (
    <ContentLine>
      <ContentLabelWrapper>
        <ContentLabelText>{label}</ContentLabelText>
      </ContentLabelWrapper>
      <ContentDataWrapper>
        <ContentDataText>{data}</ContentDataText>
      </ContentDataWrapper>
    </ContentLine>
  );

  const GetContentComponent = ({label}) => (
    <ContentLine>
      <ContentLabelWrapper>
        <ContentLabelText>{label}</ContentLabelText>
      </ContentLabelWrapper>
      {label == '교육 구분' ? (
        <ContentDataWrapper>
          <ContentDataText>
            {EDUCATION_TYPE == 'online' ? '온라인교육' : '집체교육'}
          </ContentDataText>
        </ContentDataWrapper>
      ) : (
        <ImageButtonWrapper
          onPress={() => {
            setModalVisible(true);
          }}>
          <ImageButton>사진 보기</ImageButton>
          <Icon name="right" size={16} color="#642A8C" />
        </ImageButtonWrapper>
      )}
    </ContentLine>
  );

  return (
    <BackGround>
      <ScrollView>
        <Container>
          <HelpWrapper>
            <HelpText>보건증 조기경보시스템</HelpText>
          </HelpWrapper>
          <Box>
            <Date>
              <DateArrowLeft
                onPress={() => {
                  if (selectindex == allData.length - 1) {
                    alertModal('', '최초데이터 입니다.');
                  } else {
                    backdata();
                  }
                }}>
                <Icon name="left" size={20} color="#000" />
              </DateArrowLeft>
              <DateTextArea
                onPress={() => {
                  onRefresh();
                }}>
                <DateText>{TESTING_COUNT}회차</DateText>
              </DateTextArea>
              <DateToday
                onPress={() => {
                  onRefresh();
                }}>
                <Icon name="refresh" size={26} color="#000" />
              </DateToday>
              <DateArrowRight
                onPress={() => {
                  if (selectindex == 0) {
                    alertModal('', '최신데이터 입니다.');
                  } else {
                    nextdata();
                  }
                }}>
                <Icon name="right" size={20} color="#000" />
              </DateArrowRight>
            </Date>
            <ContentWrapper>
              <GetContent label={'성명'} data={REAL_NAME} />
              <GetContent label={'회차'} data={TESTING_COUNT} />
              <GetContent label={'검진일'} data={TESTING_DATE} />
              <GetContentComponent label={'사진'} />
            </ContentWrapper>
            <RegDateContainer>
              <RegDate>※ 입력일자 : {SETTIME}</RegDate>
            </RegDateContainer>
          </Box>
        </Container>
        <Container style={{marginTop: 20, alignItems: 'center'}}>
          <Row>
            <ModifyButton
              onPress={() => {
                navigation.navigate('HealthCertificateEmpUpdate', {
                  props: params,
                  EDUCATION_TYPE,
                  STORE_HEALTH_SEQ,
                  TESTING_CERTIFICATE:
                    'http://cuapi.shop-sol.com/uploads/ocr/' +
                    TESTING_CERTIFICATE,
                  NAME: REAL_NAME,
                  EMP_SEQ,
                  STORE_SEQ,
                  FORM: '수정',
                  RESULT_COUNT: TESTING_COUNT,
                  onRefresh: onRefreshProps,
                  count: 2,
                  position,
                  owner,
                  storename,
                  businesstype,
                  EDUCATION_DATE: TESTING_DATE,
                  allData,
                });
              }}>
              <Text style={{fontSize: 16, color: 'white'}}>수정하기</Text>
            </ModifyButton>
            <SaveButton
              onPress={() => {
                navigation.navigate('HealthCertificateEmpForm', {
                  NAME,
                  EMP_SEQ,
                  STORE_SEQ,
                  FORM: '갱신',
                  onRefresh: onRefreshProps,
                  count: 2,
                });
              }}>
              <Text style={{fontSize: 16, color: 'white'}}>갱신하기</Text>
            </SaveButton>
          </Row>
          <WhiteSpace />
        </Container>
      </ScrollView>
      <ImageView
        imageIndex={0}
        images={[
          {uri: 'http://cuapi.shop-sol.com/uploads/ocr/' + TESTING_CERTIFICATE},
        ]}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      />
    </BackGround>
  );
};
