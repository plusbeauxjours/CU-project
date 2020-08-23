import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import {ForwardIcon} from '../../../../constants/Icons';

interface IText {
  isSubmited?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
`;

const Text = styled.Text<IText>`
  margin-left: 3px;
  font-size: 13px;
  color: ${(props) => (props.isSubmited ? '#642A8C' : '#CE0505')};
`;

const Section = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 20px;
  background-color: white;
  margin-bottom: 30px;
`;

const Touchable = styled.TouchableOpacity``;

const Footer = styled.View`
  align-items: center;
  margin: 0 20px;
`;

const FooterText = styled.Text`
  margin-top: 5px;
  color: #777;
  font-weight: bold;
  font-size: 15px;
`;

const TypeTitleBox = styled.View`
  align-items: center;
`;

const TypeTitleText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const GreyText = styled.Text`
  color: #bbb;
  font-size: 13px;
`;

const TypeTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconContainer = styled(Row)`
  margin-top: 20px;
  align-items: center;
`;

const ViewBtnText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  padding-right: 3px;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;
export default ({
  refreshing,
  STORE,
  STORE_SEQ,
  STOREDATA,
  EDUCATION_CERTIFICATE,
  HEALTH_CERTIFICATE_TARGET,
  HEALTH_CERTIFICATE_APPLY,
  HEALTH_DDAY,
  EDUCATION_DATA,
  explainModal,
  onRefresh,
  dday,
}) => {
  const SanitaryEducation = () => (
    <TypeTitle>
      <Row>
        <TypeTitleBox>
          <TypeTitleText>위생교육증</TypeTitleText>
        </TypeTitleBox>
        <Touchable
          onPress={() => {
            explainModal(
              '',
              '위생교육증을 등록하시면 갱신시점 알람 및 기존 교육증 이력관리가 가능합니다.\n(현재는 한국휴게음식업중앙회 발급 수료증에 한하여 등록이 가능합니다. 추후 종류 추가 예정)',
            );
          }}>
          <Icon name="help-circle" size={22} color="#bbb" />
        </Touchable>
      </Row>
      <Row>
        <ViewBtnText>등록 및 상세</ViewBtnText>
        <ForwardIcon />
      </Row>
    </TypeTitle>
  );
  const navigation = useNavigation();
  if (STORE == '0') {
    return (
      <BackGround>
        <Container>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Section
              onPress={() => {
                navigation.navigate('HealthCertificateEmpListScreen', {
                  STOREDATA,
                  STORE,
                });
              }}>
              <TypeTitle>
                <Row>
                  <TypeTitleBox>
                    <TypeTitleText>보건증</TypeTitleText>
                  </TypeTitleBox>
                </Row>
                <Row>
                  <ViewBtnText>등록 및 상세</ViewBtnText>
                  <ForwardIcon />
                </Row>
              </TypeTitle>
              {HEALTH_CERTIFICATE_APPLY == 0 ? (
                <IconContainer>
                  <Icon name={'ellipse-sharp'} size={22} color={'#CE0505'} />
                  <Text isSubmited={false}> 미등록</Text>
                </IconContainer>
              ) : (
                <IconContainer
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <Row>
                    <Icon name={'ellipse-sharp'} size={22} color={'#642A8C'} />
                    <Text isSubmited={true}>위생교육증 등록완료</Text>
                  </Row>
                  <Row>
                    <Text
                      style={
                        dday <= 0
                          ? {
                              textDecorationLine: 'underline',
                              marginTop: 5,
                              color: 'red',
                            }
                          : {marginTop: 5, color: '#aaa'}
                      }>
                      검진일시: {HEALTH_DDAY} (갱신 D{dday <= 0 ? '+' : '-'}
                      {Math.abs(Math.floor(dday))})
                    </Text>
                  </Row>
                </IconContainer>
              )}
            </Section>
            <Footer>
              <FooterText>조기경보시스템을 등록하시면</FooterText>
              <FooterText>갱신시점 이전(40일, 14일, 당일)에</FooterText>
              <FooterText>
                앱푸시 및 문자메시지로 알림을 보내드립니다
              </FooterText>
            </Footer>
          </ScrollView>
        </Container>
      </BackGround>
    );
  } else {
    return (
      <BackGround>
        <Container>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <>
              {EDUCATION_CERTIFICATE != 0 ? (
                <Section
                  onPress={() => {
                    navigation.navigate('HealthCertificateStoreDetailScreen', {
                      STORE_SEQ,
                    });
                  }}>
                  <SanitaryEducation />
                  <IconContainer
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}>
                    <Row>
                      <Icon
                        name={'ellipse-sharp'}
                        size={22}
                        color={'#642A8C'}
                      />
                      <Text isSubmited={true}>위생교육증 등록완료</Text>
                    </Row>
                    <Text
                      style={
                        dday <= 0
                          ? {
                              textDecorationLine: 'underline',
                              marginTop: 5,
                              color: 'red',
                            }
                          : {marginTop: 5, color: '#aaa'}
                      }>
                      교육일시: {EDUCATION_DATA} (갱신 D{dday <= 0 ? '+' : '-'}
                      {Math.abs(Math.floor(dday))})
                    </Text>
                  </IconContainer>
                </Section>
              ) : (
                <Section
                  onPress={() => {
                    navigation.navigate('HealthCertificateStoreFormScreen', {
                      count: 3,
                      STORE_SEQ,
                    });
                  }}>
                  <SanitaryEducation />
                  <IconContainer>
                    <Icon name={'ellipse-sharp'} size={22} color={'#CE0505'} />
                    <Text isSubmited={false}>위생교육증 미등록</Text>
                  </IconContainer>
                </Section>
              )}
              <Section
                onPress={() => {
                  navigation.navigate('HealthCertificateEmpListScreen', {
                    type: '1', // 보건증
                    STOREDATA: STOREDATA,
                    STORE: STORE,
                  });
                }}>
                <TypeTitle>
                  <Row>
                    <TypeTitleBox>
                      <TypeTitleText>보건증</TypeTitleText>
                    </TypeTitleBox>
                    <Touchable
                      onPress={() => {
                        explainModal(
                          '',
                          '직원별 보건증 등록이 가능하며, 등록 후 갱신시점 알람 및 보건증 이력관리가 가능합니다.',
                        );
                      }}>
                      <Icon name="help-circle" size={22} color="#bbb" />
                    </Touchable>
                  </Row>
                  <Row>
                    <ViewBtnText>등록 및 상세</ViewBtnText>
                    <ForwardIcon />
                  </Row>
                </TypeTitle>
                {HEALTH_CERTIFICATE_APPLY == 0 ? (
                  <IconContainer>
                    <Icon name={'ellipse-sharp'} size={22} color={'#CE0505'} />
                    <Text isSubmited={false}>미등록</Text>
                  </IconContainer>
                ) : Number(HEALTH_CERTIFICATE_APPLY) ==
                  Number(HEALTH_CERTIFICATE_TARGET) ? (
                  <IconContainer>
                    <Icon name={'ellipse-sharp'} size={22} color={'#642A8C'} />
                    <Text isSubmited={true}>
                      등록 중({HEALTH_CERTIFICATE_TARGET}명 중&nbsp;
                      {HEALTH_CERTIFICATE_APPLY}명 완료)
                    </Text>
                  </IconContainer>
                ) : (
                  <IconContainer>
                    <Icon name={'ellipse-sharp'} size={22} color={'#CE0505'} />
                    <Text isSubmited={false}>
                      등록 중({HEALTH_CERTIFICATE_TARGET}명 중&nbsp;
                      {HEALTH_CERTIFICATE_APPLY}명 완료)
                    </Text>
                  </IconContainer>
                )}
              </Section>
            </>
            <Section disabled={true}>
              <TypeTitleBox style={{alignItems: 'flex-start'}}>
                <TypeTitleText>영업신고증</TypeTitleText>
              </TypeTitleBox>
              <IconContainer>
                <GreyText>* 추후 업데이트 예정입니다.</GreyText>
              </IconContainer>
            </Section>
            <Footer>
              <FooterText>조기경보시스템을 등록하시면</FooterText>
              <FooterText>갱신시점 이전(40일, 14일, 당일)에</FooterText>
              <FooterText>
                앱푸시 및 문자메시지로 알림을 보내드립니다
              </FooterText>
            </Footer>
          </ScrollView>
        </Container>
      </BackGround>
    );
  }
};
