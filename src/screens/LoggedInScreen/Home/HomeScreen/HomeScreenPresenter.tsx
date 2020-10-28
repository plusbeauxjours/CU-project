import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

import {
  ForwardIcon,
  HelpIcon,
  SettingIcon,
  QrCodeIcon,
} from '~/constants/Icons';
import utils from '~/constants/utils';

interface IImage {
  isCheckListItems?: boolean;
}

interface IIsTrue {
  isTrue: boolean;
}

const BackGround = styled.View`
  flex: 1;
  background-color: #642a8c;
`;

const Touchable = styled.TouchableOpacity``;
const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const IconContainer = styled.TouchableOpacity`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 30px;
`;

const MyPage = styled.View`
  flex-direction: row;
  flex: 1;
  margin-right: ${wp('5%')}px;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MenuCnt = styled.TouchableOpacity<IIsTrue>`
  width: ${(wp('100%') - 20) / 3}px;
  height: ${wp('40%')}px;
  justify-content: center;
  align-items: center;
  left: ${(props) => (props.isTrue ? '-7px' : 0)};
`;

const NewCnt = styled.View`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -5px;
  right: 0;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: red;
`;

const NewCntText = styled.Text`
  color: white;
  font-weight: bold;
`;

const MenuBox = styled.View`
  padding: 0 10px;
  padding-bottom: 15px;
  background-color: white;
  flex: 1;
  align-items: center;
`;

const Qr = styled.TouchableOpacity`
  width: ${wp('100%') - 40}px;
  border-width: 1px;
  border-color: #642a8c;
  padding: ${hp('2%')}px ${wp('10%')}px;
  flex-direction: row;
  margin-top: 30px;
  border-radius: 5px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const QrText = styled.Text`
  margin-right: 15px;
  font-weight: bold;
  font-size: 22px;
  color: #642a8c;
`;

const NoticeCnt = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: #3f4450;
`;

const NoticeTitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #aace36;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NoticeContainer = styled.View`
  margin-left: 50px;
  justify-content: center;
  height: ${wp('20%')}px;
  padding: 10px;
`;

const NoticeArea = styled.View`
  padding: 0 ${wp('3%')}px;
  background-color: #642a8c;
`;

const Footer = styled.View`
  height: 50px;
  background-color: #642a8c;
`;

const StoreName = styled.View`
  padding: 0 ${wp('5%')}px;
  justify-content: center;
  align-items: flex-start;
`;

const StoreText = styled.Text`
  color: white;
  font-size: 24px;
  line-height: ${wp('8%')}px;
`;

const StoreSubText = styled.Text`
  color: #ddd;
  font-size: 22px;
`;

const StoreUpdate = styled.View`
  flex: 1;
  padding: 0 ${wp('5%')}px 15px ${wp('5%')}px;
  padding-bottom: 15px;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StoreUpdateBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${hp('0.5%')}px 15px ${hp('0.5%')}px 20px;
  border-width: 1px;
  border-color: white;
  border-radius: 20px;
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.4);
`;

const WhiteText = styled.Text`
  color: white;
`;

const MenuTitleArea = styled.View`
  flex-direction: row;
  align-self: flex-start;
  margin-top: 20px;
  border-radius: 30px;
  padding: 10px 20px;
  background-color: #642a8c;
`;

const MenuTitle = styled.Text`
  font-size: 16px;
  color: white;
  font-weight: bold;
`;

const Bold = styled(MenuTitle)`
  color: white;
  font-weight: 600;
`;

const PurpleBg = styled.View<IIsTrue>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${(props) => (props.isTrue ? hp('10%') : hp('15%'))};
  background-color: #642a8c;
`;

const GreenBg = styled(PurpleBg)<IIsTrue>`
  position: absolute;
  top: 0;
  height: ${(props) => (props.isTrue ? hp('15%') : hp('30%'))};
  background-color: #aace36;
`;

const ShowPictureModalTouchable = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

const ShowPictureModalText = styled.Text`
  padding: 10px 0;
  font-size: 30px;
  color: white;
`;

const ShowPictureModalImage = styled.View`
  width: ${wp('90%')}px;
  height: ${wp('90%')}px;
`;

const WorkingModalContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const GoWork = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: 60px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: #642a8c;
`;

const WorkText = styled.Text`
  color: #ffffff;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const WorkStartButton = styled.TouchableOpacity`
  height: ${hp('20%')}px;
  width: ${wp('50%')}px;
  align-items: center;
  justify-content: center;
`;

const WorkEndButton = styled(WorkStartButton)`
  border-left-width: 1px;
`;

const WorkStartBtnText = styled.Text`
  font-size: 24px;
  color: #642a8c;
`;

const WorkEndBtnText = styled(WorkStartBtnText)`
  color: #aace36;
`;

const WhiteSpace = styled.View`
  height: 20px;
`;

const EventArea = styled.View`
  width: ${wp('100%')}px;
  padding: 0 20px;
  background-color: #642a8c;
  border-radius: 8px;
  margin: 20px 0;
`;

const ShadowTouchable = styled.TouchableOpacity`
  margin-top: 10px;
  border-radius: 8px;
  shadow-opacity: 0.55;
  shadow-radius: 5px;
  shadow-color: grey;
  shadow-offset: 5px 5px;
  elevation: 6;
`;
const bannerHeight = (wp('100%') - 40) * 0.286754400291120815;

export default ({
  notice,
  STORE_DATA,
  MEMBER_NAME,
  STORE,
  STORE_NAME,
  TOTAL_COUNT,
  WORKING_COUNT,
  qrModalOpen,
  setQrModalOpen,
  setShowPictureModal,
  showPictureModal,
  workingModalOpen,
  setWorkingModalOpen,
  goWorkFn,
  leaveWorkFn,
  handleBarCodeScanned,
  invitedEmpCount,
  checklistCount,
  NOTICE_COUNT,
  QR,
}) => {
  const navigation = useNavigation();
  const MenuCntContainer = ({selection, paging, count = 0}) => (
    <MenuCnt
      style={{zIndex: 4}}
      isTrue={selection == '체크리스트'}
      activeOpacity={0.6}
      onPress={() => {
        selection == 'QR보기'
          ? setShowPictureModal(true)
          : navigation.navigate(`${paging}`);
      }}>
      {(selection == '직원합류승인' || selection == '업무일지') &&
        count !== 0 &&
        count && (
          <NewCnt style={{zIndex: 5}}>
            <NewCntText>{count < 10 ? count : '9+'}</NewCntText>
          </NewCnt>
        )}
      <AdrChange paging={paging} />
    </MenuCnt>
  );

  const AdrChange = ({paging}) => {
    let source;
    if (paging == 'InviteEmployeeScreen') {
      source = require(`../../../../assets/main/Invite.png`);
    } else if (paging == 'EmployeeListScreen') {
      source = require(`../../../../assets/main/EmployeeList.png`);
    } else if (paging == 'ManageInviteEmployeeScreen') {
      source = require(`../../../../assets/main/ManageInviteEmployee.png`);
    } else if (
      paging == 'CalendarInfoScreen' &&
      STORE_DATA?.CalendarEdit == 1
    ) {
      source = require(`../../../../assets/main/CalendarInfo.png`);
    } else if (
      paging == 'CalendarInfoScreen' &&
      STORE_DATA?.CalendarEdit !== 1
    ) {
      source = require(`../../../../assets/main/CalendarInfoEmp.png`);
    } else if (paging == 'PaymentInfoScreen') {
      source = require(`../../../../assets/main/PaymentInfo.png`);
    } else if (paging == 'EmpPaymentInfoScreen') {
      source = require(`../../../../assets/main/PaymentInfo.png`);
    } else if (paging == 'EmployeeInfoEMPScreen') {
      source = require(`../../../../assets/main/EmployeeInfoEmp.png`);
    } else if (paging == 'qrViewScreen') {
      source = require(`../../../../assets/main/qrView.png`);
    } else if (paging == 'ChecklistItemsScreen') {
      source = require(`../../../../assets/main/ChecklistItems.png`);
    } else if (paging == 'ChecklistShareMainScreen') {
      source = require(`../../../../assets/main/ChecklistShareMain.png`);
    } else if (paging == 'ShelfLifeCheckScreen') {
      source = require(`../../../../assets/main/shelfLifeCheck.png`);
    } else if (paging == 'HealthCertificateTypeScreen') {
      source = require(`../../../../assets/main/HealthCertificateType.png`);
    } else if (paging == 'MyCuMonthlyListScreen') {
      source = require(`../../../../assets/main/MycuMonthlyList.png`);
    } else if (paging == 'MyCuVideoListScreen') {
      source = require(`../../../../assets/main/MycuVideoList.png`);
    } else if (paging == 'EducationVideoListScreen') {
      source = require(`../../../../assets/main/EducationVideoList.png`);
    }
    return (
      <FastImage
        style={{width: '100%', height: '100%'}}
        source={source}
        resizeMode={FastImage.resizeMode.contain}
      />
    );
  };
  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <FastImage
          style={{width: wp('100%'), height: hp('30%')}}
          source={require('../../../../assets/main/mainTopBg.png')}
          resizeMode={FastImage.resizeMode.cover}>
          <MyPage>
            {STORE === '1' && (
              <IconContainer
                onPress={() => {
                  navigation.navigate('HelpModalScreen');
                }}>
                <HelpIcon />
              </IconContainer>
            )}
            <IconContainer
              onPress={() => {
                navigation.navigate('MyPageMainScreen');
              }}>
              <SettingIcon />
            </IconContainer>
          </MyPage>
          <StoreName>
            <StoreText>안녕하세요.</StoreText>
            <Row>
              <StoreText>{MEMBER_NAME}</StoreText>
              <StoreSubText>님</StoreSubText>
            </Row>
          </StoreName>
          <StoreUpdate>
            <Row>
              <Text
                style={{
                  color: '#AACE36',
                  fontSize: utils.isAndroid ? 14 : 18,
                }}>
                Nice to CU_&nbsp;
              </Text>
              <Text
                style={{
                  color: '#AACE36',
                  fontSize: utils.isAndroid ? 14 : 18,
                }}>
                {STORE_NAME}
              </Text>
            </Row>
            <Row>
              {TOTAL_COUNT > 0 ? (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                    alignSelf: 'flex-end',
                  }}>
                  <WhiteText>{TOTAL_COUNT}</WhiteText>명 중&nbsp;
                  <WhiteText>{WORKING_COUNT}</WhiteText>명 근무중
                </Text>
              ) : (
                <Text style={{color: 'white', fontSize: 15}}>
                  합류된 직원이 없습니다 직원을 초대하세요
                </Text>
              )}
            </Row>
            <WhiteSpace />
            <Row>
              <StoreUpdateBtn
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'SelectStoreScreen'}],
                  });
                }}>
                <WhiteText>점포전환</WhiteText>
                <ForwardIcon size={18} color={'white'} />
              </StoreUpdateBtn>
              <StoreUpdateBtn
                onPress={() => {
                  navigation.navigate('UpdateStoreScreen');
                }}>
                <WhiteText>점포정보</WhiteText>
                <ForwardIcon size={18} color={'white'} />
              </StoreUpdateBtn>
            </Row>
          </StoreUpdate>
        </FastImage>
        <MenuBox style={{zIndex: 1}}>
          {STORE == '0' && (
            <Qr onPress={async () => setQrModalOpen(true)}>
              <QrText>출퇴근하기</QrText>
              <QrCodeIcon />
            </Qr>
          )}
          {STORE == '1' ? ( // 점주 ============================
            <>
              <MenuTitleArea style={{zIndex: 3}}>
                <MenuTitle>더욱 쉬워진,</MenuTitle>
                <Bold> 직원관리</Bold>
              </MenuTitleArea>
              <Container>
                <MenuCntContainer
                  selection={'직원초대'}
                  paging={'InviteEmployeeScreen'}
                />
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'직원목록'}
                    paging={'EmployeeListScreen'}
                  />
                )}
                <MenuCntContainer
                  selection={'직원합류승인'}
                  paging={'ManageInviteEmployeeScreen'}
                  count={invitedEmpCount}
                />
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'캘린더'}
                    paging={'CalendarInfoScreen'}
                  />
                )}
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'급여정보'}
                    paging={'PaymentInfoScreen'}
                  />
                )}
                {TOTAL_COUNT !== 0 && (
                  <MenuCntContainer
                    selection={'QR보기'}
                    paging={'qrViewScreen'}
                  />
                )}
              </Container>
              {STORE_DATA.arbashow == 1 && (
                <>
                  <MenuTitleArea style={{zIndex: 3}}>
                    <MenuTitle>언제든지,</MenuTitle>
                    <Bold> 구인관리</Bold>
                  </MenuTitleArea>
                  <ShadowTouchable
                    onPress={() => {
                      Linking.openURL(STORE_DATA.eventUrl2);
                    }}>
                    <FastImage
                      style={{
                        width: wp('100%') - 40,
                        height: bannerHeight,
                        borderRadius: 8,
                      }}
                      source={require('../../../../assets/main/gubgooBanner.png')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </ShadowTouchable>
                  <WhiteSpace />
                </>
              )}
              <MenuTitleArea style={{zIndex: 3}}>
                <MenuTitle>정확한,</MenuTitle>
                <Bold> 업무관리</Bold>
              </MenuTitleArea>
              <Container>
                <MenuCntContainer
                  selection={'체크리스트'}
                  paging={'ChecklistItemsScreen'}
                  count={checklistCount}
                />
                <MenuCntContainer
                  selection={'업무일지'}
                  paging={'ChecklistShareMainScreen'}
                  count={NOTICE_COUNT}
                />
                <MenuCntContainer
                  selection={'유통기한'}
                  paging={'ShelfLifeCheckScreen'}
                />
                <MenuCntContainer
                  selection={'조기경보'}
                  paging={'HealthCertificateTypeScreen'}
                />
                <MenuCntContainer
                  selection={'노무월간지'}
                  paging={'MyCuMonthlyListScreen'}
                />
                <MenuCntContainer
                  selection={'교육영상'}
                  paging={'MyCuVideoListScreen'}
                />
              </Container>
            </>
          ) : (
            <>
              {STORE_DATA?.IS_MANAGER == '1' ? ( // 점장 ============================
                <>
                  <MenuTitleArea style={{zIndex: 3}}>
                    <MenuTitle>더욱 쉬워진,</MenuTitle>
                    <Bold> 직원관리</Bold>
                  </MenuTitleArea>
                  <Container>
                    <MenuCntContainer
                      selection={'직원초대'}
                      paging={'InviteEmployeeScreen'}
                    />
                    {TOTAL_COUNT !== 0 &&
                      (STORE_DATA?.OTHERPAY_SHOW == 1 ? (
                        <MenuCntContainer
                          selection={'직원목록'}
                          paging={'EmployeeListScreen'}
                        />
                      ) : (
                        <MenuCntContainer
                          selection={'직원정보'}
                          paging={'EmployeeInfoEMPScreen'}
                        />
                      ))}
                    <MenuCntContainer
                      selection={'직원합류승인'}
                      paging={'ManageInviteEmployeeScreen'}
                      count={invitedEmpCount}
                    />
                    {TOTAL_COUNT !== 0 && (
                      <MenuCntContainer
                        selection={'캘린더'}
                        paging={'CalendarInfoScreen'}
                      />
                    )}
                    {TOTAL_COUNT !== 0 && STORE_DATA?.STOREPAY_SHOW == '1' ? (
                      <MenuCntContainer
                        selection={'급여정보'}
                        paging={'PaymentInfoScreen'}
                      />
                    ) : (
                      STORE_DATA?.PAY_SHOW == 1 && (
                        <MenuCntContainer
                          selection={'급여정보'}
                          paging={'EmpPaymentInfoScreen'}
                        />
                      )
                    )}
                    {TOTAL_COUNT !== 0 && (
                      <MenuCntContainer
                        selection={'QR보기'}
                        paging={'qrView'}
                      />
                    )}
                  </Container>
                  {STORE_DATA.arbashow2 == 1 && (
                    <>
                      <MenuTitleArea style={{zIndex: 3}}>
                        <MenuTitle>언제든지,</MenuTitle>
                        <Bold> 구인관리</Bold>
                      </MenuTitleArea>
                      <ShadowTouchable
                        onPress={() => {
                          Linking.openURL(STORE_DATA.eventUrl2);
                        }}>
                        <FastImage
                          style={{
                            width: wp('100%') - 40,
                            height: bannerHeight,
                            borderRadius: 8,
                          }}
                          source={require('../../../../assets/main/gubgooBanner.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </ShadowTouchable>
                      <WhiteSpace />
                    </>
                  )}
                  <MenuTitleArea style={{zIndex: 3}}>
                    <MenuTitle>정확한,</MenuTitle>
                    <Bold> 업무관리</Bold>
                  </MenuTitleArea>
                  <Container>
                    <MenuCntContainer
                      selection={'체크리스트'}
                      paging={'ChecklistItemsScreen'}
                      count={checklistCount}
                    />
                    <MenuCntContainer
                      selection={'업무일지'}
                      paging={'ChecklistShareMainScreen'}
                      count={NOTICE_COUNT}
                    />
                    <MenuCntContainer
                      selection={'유통기한'}
                      paging={'ShelfLifeCheckScreen'}
                    />
                    <MenuCntContainer
                      selection={'업무영상'}
                      paging={'EducationVideoListScreen'}
                    />
                  </Container>
                </>
              ) : (
                // 스태프 ============================
                <>
                  <MenuTitleArea style={{zIndex: 3}}>
                    <MenuTitle>더욱 쉬워진,</MenuTitle>
                    <Bold> 일터관리</Bold>
                  </MenuTitleArea>
                  <Container>
                    <MenuCntContainer
                      selection={'캘린더'}
                      paging={'CalendarInfoScreen'}
                    />
                    <MenuCntContainer
                      selection={'직원정보'}
                      paging={'EmployeeInfoEMPScreen'}
                    />
                    {STORE_DATA?.PAY_SHOW == 1 && (
                      <MenuCntContainer
                        selection={'급여정보'}
                        paging={'EmpPaymentInfoScreen'}
                      />
                    )}
                    <MenuCntContainer
                      selection={'체크리스트'}
                      paging={'ChecklistItemsScreen'}
                      count={checklistCount}
                    />
                    <MenuCntContainer
                      selection={'업무일지'}
                      paging={'ChecklistShareMainScreen'}
                      count={NOTICE_COUNT}
                    />
                    <MenuCntContainer
                      selection={'유통기한 알리미'}
                      paging={'ShelfLifeCheckScreen'}
                    />
                    <MenuCntContainer
                      selection={'업무영상'}
                      paging={'EducationVideoListScreen'}
                    />
                  </Container>
                </>
              )}
            </>
          )}
          <GreenBg style={{zIndex: -1}} isTrue={STORE == '1'} />
          <PurpleBg
            style={{zIndex: -1}}
            isTrue={STORE_DATA?.IS_MANAGER == '0'}
          />
        </MenuBox>
        {STORE == '1' && STORE_DATA.eventShow1 == '1' && (
          <EventArea>
            <ShadowTouchable
              onPress={() => {
                Linking.openURL(STORE_DATA.eventUrl1);
              }}>
              <FastImage
                style={{
                  width: wp('100%') - 40,
                  height: bannerHeight,
                  borderRadius: 8,
                }}
                source={{uri: STORE_DATA.eventImage1}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </ShadowTouchable>
          </EventArea>
        )}
        {STORE == '0' && STORE_DATA.eventShow2 == '1' && (
          <EventArea>
            <ShadowTouchable
              onPress={() => {
                Linking.openURL(STORE_DATA.eventUrl2);
              }}>
              <FastImage
                style={{
                  width: wp('100%') - 40,
                  height: bannerHeight,
                  borderRadius: 8,
                }}
                source={{uri: STORE_DATA.eventImage2}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </ShadowTouchable>
          </EventArea>
        )}
        {STORE == '1' && (
          <NoticeArea>
            <Touchable
              onPress={() => {
                navigation.navigate('ChecklistShareMainScreen', {
                  notice: '1',
                });
              }}>
              <FastImage
                style={{width: '100%', height: 60, marginTop: 30}}
                source={require('../../../../assets/main/noticeBar.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <NoticeCnt>
                <FastImage
                  style={{width: 80, height: 80}}
                  source={require('../../../../assets/main/cuMark_white.png')}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <NoticeContainer>
                  <NoticeTitle ellipsizeMode="tail">{notice.TITLE}</NoticeTitle>
                </NoticeContainer>
              </NoticeCnt>
            </Touchable>
          </NoticeArea>
        )}
        <Footer />
      </ScrollView>
      <Modal
        isVisible={workingModalOpen}
        animationOutTiming={1}
        onRequestClose={() => setWorkingModalOpen(false)}
        onBackdropPress={() => setWorkingModalOpen(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <WorkingModalContainer>
          <WorkStartButton onPress={() => goWorkFn()}>
            <WorkStartBtnText>출근</WorkStartBtnText>
          </WorkStartButton>
          <WorkEndButton onPress={() => leaveWorkFn()}>
            <WorkEndBtnText>퇴근</WorkEndBtnText>
          </WorkEndButton>
        </WorkingModalContainer>
      </Modal>
      <Modal
        isVisible={qrModalOpen}
        onBackdropPress={() => setQrModalOpen(false)}
        onRequestClose={() => setQrModalOpen(false)}
        style={{margin: 0}}
        avoidKeyboard={true}>
        <QRCodeScanner
          topViewStyle={{height: 0, flex: 0}}
          reactivate={true}
          reactivateTimeout={1500}
          cameraStyle={{width: wp('100%'), height: hp('100%')}}
          onRead={handleBarCodeScanned}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: '카메라 권한 설정',
            message:
              '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          permissionDialogTitle={''}
          permissionDialogMessage={''}
          bottomContent={
            <GoWork onPress={() => setQrModalOpen(false)}>
              <WorkText>닫기</WorkText>
            </GoWork>
          }
        />
      </Modal>
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={showPictureModal}
        style={{position: 'relative', marginVertical: hp('5%')}}
        onBackdropPress={() => setShowPictureModal(false)}
        onRequestClose={() => setShowPictureModal(false)}>
        <ShowPictureModalTouchable
          onPress={() => {
            setShowPictureModal(false);
          }}>
          <ShowPictureModalText>출퇴근 QR</ShowPictureModalText>
          <ShowPictureModalImage>
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{uri: 'http://cuapi.shop-sol.com/' + QR}}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ShowPictureModalImage>
        </ShowPictureModalTouchable>
      </Modal>
    </BackGround>
  );
};
