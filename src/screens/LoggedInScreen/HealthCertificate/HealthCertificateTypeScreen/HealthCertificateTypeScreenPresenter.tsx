import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

interface IText {
  color: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: grey;
`;

const AddressBox = styled.View`
  margin-top: 10px;
  flex-direction: row;
  align-items: center;
`;
const AddressText = styled.Text<IText>`
  font-size: 13px;
`;

const ScrollView = styled.ScrollView``;
const Section = styled.TouchableOpacity`
  border-radius: 20px;
  background-color: #fff;
`;
const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
`;
const Text = styled.Text``;

const IconContainer = styled.View`
  width: 20px;
  align-items: center;
`;

const Footer = styled.View`
  align-items: center;
  margin-top: 30px;
  margin: 0 20px;
`;

const FooterText = styled.Text`
  margin-top: 5px;
  color: #777;
  font-weight: bold;
  font-size: 15px;
`;

const TypeTitleBox = styled.View`
  padding: 8px 0;
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
`;

const ViewBtn = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ViewBtnText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  padding-right: 3px;
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
  const navigation = useNavigation();
  if (STORE == '0') {
    return (
      <BackGround>
        <Container>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <Section
              onPress={() => {
                navigation.navigate('HealthCertificateEmpList', {
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
                <ViewBtn>
                  <ViewBtnText>등록 및 상세</ViewBtnText>
                  <Icon name="right" size={14} color="#642A8C" />
                </ViewBtn>
              </TypeTitle>

              {HEALTH_CERTIFICATE_APPLY == 0 ? (
                <IconContainer>
                  <Icon name={'circle'} size={22} color={'#CE0505'} />
                  <AddressText color={'#CE0505'}> 미등록</AddressText>
                </IconContainer>
              ) : (
                <AddressBox
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}>
                  <IconContainer>
                    <Icon name={'circle'} size={22} color={'#642A8C'} />
                    <AddressText color={'#642A8C'}>
                      위생교육증 등록완료
                    </AddressText>
                  </IconContainer>
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
                    {Math.abs(dday)})
                  </Text>
                </AddressBox>
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <>
              {EDUCATION_CERTIFICATE != 0 ? (
                <Section
                  onPress={() => {
                    navigation.navigate('HealthCertificateStoreDetail', {
                      STORE_SEQ,
                    });
                  }}>
                  <TypeTitle>
                    <Row>
                      <TypeTitleBox>
                        <TypeTitleText>위생교육증</TypeTitleText>
                      </TypeTitleBox>
                      <TouchableOpacity
                        onPress={() => {
                          explainModal(
                            '',
                            '위생교육증을 등록하시면 갱신시점 알람 및 기존 교육증 이력관리가 가능합니다.\n(현재는 한국휴게음식업중앙회 발급 수료증에 한하여 등록이 가능합니다. 추후 종류 추가 예정)',
                          );
                        }}>
                        <Icon name="questioncircle" size={22} color="#bbb" />
                      </TouchableOpacity>
                    </Row>
                    <ViewBtn>
                      <ViewBtnText>등록 및 상세</ViewBtnText>
                      <Icon name="right" size={14} color="#642A8C" />
                    </ViewBtn>
                  </TypeTitle>

                  <AddressBox
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}>
                    <IconContainer>
                      <Icon name={'circle'} size={22} color={'#642A8C'} />
                      <AddressText color={'#642A8C'}>
                        위생교육증 등록완료
                      </AddressText>
                    </IconContainer>
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
                      {Math.abs(dday)})
                    </Text>
                  </AddressBox>
                </Section>
              ) : (
                <Section
                  onPress={() => {
                    navigation.navigate('HealthCertificateStoreForm', {
                      count: 3,
                      STORE_SEQ,
                    });
                  }}>
                  <TypeTitle>
                    <Row>
                      <TypeTitleBox>
                        <TypeTitleText>위생교육증</TypeTitleText>
                      </TypeTitleBox>
                      <TouchableOpacity
                        onPress={() => {
                          explainModal(
                            '',
                            '위생교육증을 등록하시면 갱신시점 알람 및 기존 교육증 이력관리가 가능합니다.\n(현재는 한국휴게음식업중앙회 발급 수료증에 한하여 등록이 가능합니다. 추후 종류 추가 예정)',
                          );
                        }}>
                        <Icon name="questioncircle" size={22} color="#bbb" />
                      </TouchableOpacity>
                    </Row>
                    <ViewBtn>
                      <ViewBtnText>등록 및 상세</ViewBtnText>
                      <Icon name="right" size={14} color="#642A8C" />
                    </ViewBtn>
                  </TypeTitle>

                  <AddressBox>
                    <IconContainer>
                      <Icon name={'circle'} size={22} color={'#CE0505'} />
                      <AddressText color={'#CE0505'}>
                        위생교육증 미등록
                      </AddressText>
                    </IconContainer>
                  </AddressBox>
                </Section>
              )}
              <Section
                onPress={() => {
                  navigation.navigate('HealthCertificateEmpList', {
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
                      <Icon name="questioncircle" size={22} color="#bbb" />
                    </Touchable>
                  </Row>
                  <ViewBtn>
                    <ViewBtnText>등록 및 상세</ViewBtnText>
                    <Icon name="right" size={14} color="#642A8C" />
                  </ViewBtn>
                </TypeTitle>
                {HEALTH_CERTIFICATE_APPLY == 0 ? (
                  <AddressBox>
                    <IconContainer>
                      <Icon name={'circle'} size={22} color={'#CE0505'} />
                      <AddressText color={'#CE0505'}>미등록</AddressText>
                    </IconContainer>
                  </AddressBox>
                ) : Number(HEALTH_CERTIFICATE_APPLY) ==
                  Number(HEALTH_CERTIFICATE_TARGET) ? (
                  <AddressBox>
                    <IconContainer>
                      <Icon name={'circle'} size={22} color={'#642A8C'} />
                      <AddressText color={'#642A8C'}>
                        등록 중({HEALTH_CERTIFICATE_TARGET}명 중{' '}
                        {HEALTH_CERTIFICATE_APPLY}명 완료)
                      </AddressText>
                    </IconContainer>
                  </AddressBox>
                ) : (
                  <AddressBox>
                    <IconContainer>
                      <Icon name={'circle'} size={22} color={'#CE0505'} />
                      <AddressText color={'#CE0505'}>
                        등록 중({HEALTH_CERTIFICATE_TARGET}명 중{' '}
                        {HEALTH_CERTIFICATE_APPLY}명 완료)
                      </AddressText>
                    </IconContainer>
                  </AddressBox>
                )}
              </Section>
            </>
            <Section disabled={true}>
              <TypeTitleBox style={{alignItems: 'flex-start'}}>
                <TypeTitleText>영업신고증</TypeTitleText>
              </TypeTitleBox>
              <GreyText>* 추후 업데이트 예정입니다.</GreyText>
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
