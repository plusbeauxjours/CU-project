import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import utils from '../../../../constants/utils';
import {ActivityIndicator} from 'react-native';
import {
  ForwardIcon,
  HelpIcon,
  SettingIcon,
  QrCodeIcon,
} from '../../../../constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
const ImageBackground = styled.ImageBackground``;
const Text = styled.Text``;

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
`;

const Image = styled.Image<IImage>`
  width: 100%;
  height: 100%;
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

const Box = styled.View`
  margin: 20px 0;
`;

const MyPage = styled.View`
  flex-direction: row;
  flex: 1;
  margin-right: ${wp('5%')}px;
  align-items: flex-end;
  justify-content: flex-end;
`;

const MenuCnt = styled.TouchableOpacity`
  width: ${wp('33%')}px;
  height: ${wp('40%')}px;
  justify-content: center;
  align-items: center;
`;

const NewCnt = styled.View`
  position: absolute;
  top: -5px;
  right: ${wp('0%')}px;
  padding: 10px 3px;
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
  border-radius: 10px;
  background-color: white;
  flex: 1;
  align-items: center;
`;

const Qr = styled.TouchableOpacity`
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

const LoadingTextContainer = styled.View`
  position: absolute;
  top: ${hp('53%')}px;
  left: 0;
  right: 0;
  align-items: center;
`;
const LoadingText = styled.Text`
  color: #642a8c;
`;

const NoticeCnt = styled.View`
  margin-top: 15px;
  padding: 15px;
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
  margin-bottom: 5px;
`;

const NoticeText = styled.Text`
  font-size: 12px;
  color: #ddd;
`;

const NoticeContainer = styled.View`
  flex: 1;
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

const BarcodeContainer = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
`;

const BarcodeLayerTop = styled.View`
  flex: 2;
  background-color: rgba(0, 0, 0, 0.6);
`;

const BarcodeLayerCenter = styled.View`
  flex: 3;
  flex-direction: row;
`;

const BarcodeLayerLeft = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Focused = styled.View`
  flex: 10;
`;

const BarcodeLayerRight = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
`;

const BarcodeLayerBottom = styled.View`
  flex: 2;
  background-color: rgba(0, 0, 0, 0.6);
`;

const WorkingModalContainer = styled.View`
  background-color: white;
`;

const WorkingModalBox = styled.View`
  height: ${hp('8%')}px;
  border-bottom-width: 1px;
  border-color: #ddd;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Work = styled.View`
  width: ${wp('100%')}px;
  flex-direction: row;
`;

const GoWork = styled.TouchableOpacity`
  width: ${wp('100%')}px;
  height: 52px;
  justify-content: center;
  align-items: center;
  background-color: #642a8c;
`;

const WorkText = styled.Text`
  color: '#FFFFFF';
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const WorkingModalText = styled.Text`
  font-size: 22px;
  color: #333;
  font-weight: bold;
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

export default ({
  notice,
  storeResult,
  NAME,
  STORE,
  STORE_SEQ,
  STORE_NAME,
  EMPLOYEE,
  WORKINGLIST,
  hasCameraPermission,
  barcodeModalOpen,
  setBarcodeModalOpen,
  pictureModalOpen,
  setShowPictureModal,
  showPictureModal,
  setPictureModalOpen,
  workingModalOpen,
  setWorkingModalOpen,
  modalRef,
  goWork,
  leaveWork,
  handleBarCodeScanned,
  checkPermissions,
  QR,
}) => {
  const navigation = useNavigation();
  const menuCnt = (selection, paging, state = 0) => (
    <MenuCnt
      onPress={() => {
        if (selection == 'QR보기') {
          setPictureModalOpen(true);
        }
        navigation.navigate(`${paging}`, {
          STOREDATA: storeResult,
          STORE,
          STORE_SEQ,
          EMP_SEQ: storeResult?.EMP_SEQ,
          STOREPAY_SHOW: storeResult?.STOREPAY_SHOW,
          ISMANAGER: storeResult?.IS_MANAGER == 1 ? '점장' : '스태프',
        });
      }}>
      {newCnt(selection, state)}
      {adrChange(paging)}
    </MenuCnt>
  );

  const newCnt = (selection, count) => {
    if (selection == '직원합류승인' || selection == '업무일지') {
      if (count !== 0 && count != undefined) {
        return (
          <NewCnt>
            <NewCntText>{count < 10 ? count : '9+'}</NewCntText>
          </NewCnt>
        );
      }
    }
  };

  const adrChange = (paging) => {
    let source;
    if (paging == 'InviteEmployeeScreen') {
      source = require(`../../../../assets/main/Invite.png`);
    } else if (paging == 'EmployeeListScreen') {
      source = require(`../../../../assets/main/EmployeeList.png`);
    } else if (paging == 'ManageInviteEmployeeScreen') {
      source = require(`../../../../assets/main/ManageInviteEmployee.png`);
    } else if (
      paging == 'CalendarInfoScreen' &&
      storeResult?.CalendarEdit == 1
    ) {
      source = require(`../../../../assets/main/CalendarInfo.png`);
    } else if (
      paging == 'CalendarInfoScreen' &&
      storeResult?.CalendarEdit !== 1
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
      <Image
        source={source}
        isCheckListItems={paging == 'ChecklistItemsScreen'}
        resizeMode="contain"
      />
    );
  };

  if (storeResult !== undefined) {
    return (
      <BackGround>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            source={require('../../../../assets/main/mainTopBg.png')}
            resizeMode={'cover'}
            style={{height: hp('30%')}}>
            <MyPage>
              {STORE !== '1' && (
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
                <StoreText>{NAME}</StoreText>
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
                {EMPLOYEE > 0 ? (
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 15,
                      alignSelf: 'flex-end',
                    }}>
                    <WhiteText>{EMPLOYEE}</WhiteText>명 중{' '}
                    <WhiteText>{WORKINGLIST}</WhiteText>명 근무중
                  </Text>
                ) : (
                  <Text style={{color: 'white', fontSize: 15}}>
                    합류된 직원이 없습니다 직원을 초대하세요
                  </Text>
                )}
              </Row>
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
                    navigation.navigate('UpdateStoreScreen', {
                      STOREDATA: storeResult,
                    });
                  }}>
                  <WhiteText>점포정보</WhiteText>
                  <ForwardIcon size={18} color={'white'} />
                </StoreUpdateBtn>
              </Row>
            </StoreUpdate>
          </ImageBackground>
          <MenuBox>
            {STORE == 0 && (
              <Qr
                onPress={async () => {
                  setBarcodeModalOpen(true);
                  await checkPermissions();
                }}>
                <QrText>출퇴근하기</QrText>
                <QrCodeIcon />
              </Qr>
            )}
            {STORE == '1' ? ( // 점주 ============================
              <>
                <MenuTitleArea>
                  <MenuTitle>더욱 쉬워진,</MenuTitle>
                  <Bold> 직원관리</Bold>
                </MenuTitleArea>
                <Container>
                  {menuCnt('직원초대', 'InviteEmployeeScreen')}
                  {EMPLOYEE !== 0 && menuCnt('직원목록', 'EmployeeListScreen')}
                  {menuCnt(
                    '직원합류승인',
                    'ManageInviteEmployeeScreen',
                    storeResult?.inviteemp,
                  )}
                </Container>
                <Row>
                  {EMPLOYEE !== 0 && menuCnt('캘린더', 'CalendarInfoScreen')}
                  {EMPLOYEE !== 0 && menuCnt('급여정보', 'PaymentInfoScreen')}
                  {EMPLOYEE !== 0 && menuCnt('QR보기', 'qrViewScreen')}
                </Row>
                <Box>
                  <MenuTitleArea>
                    <MenuTitle>정확한,</MenuTitle>
                    <Bold> 업무관리</Bold>
                  </MenuTitleArea>
                  <Row>
                    {menuCnt(
                      '체크리스트',
                      'ChecklistItemsScreen',
                      storeResult?.checklength,
                    )}
                    {menuCnt(
                      '업무일지',
                      'ChecklistShareMainScreen',
                      storeResult?.noticelength,
                    )}
                    {menuCnt('유통기한 알리미', 'ShelfLifeCheckScreen')}
                  </Row>
                  <Row>
                    {menuCnt('조기경보', 'HealthCertificateTypeScreen')}
                    {menuCnt('노무월간지', 'MyCuMonthlyListScreen')}
                    {menuCnt('교육영상', 'MyCuVideoListScreen')}
                  </Row>
                </Box>
              </>
            ) : (
              <>
                {storeResult?.IS_MANAGER == '1' ? ( // 점장 ============================
                  <>
                    <MenuTitleArea>
                      <MenuTitle>더욱 쉬워진,</MenuTitle>
                      <Bold> 직원관리</Bold>
                    </MenuTitleArea>
                    <Container>
                      {menuCnt('직원초대', 'InviteEmployeeScreen')}
                      {EMPLOYEE == 0
                        ? null
                        : storeResult?.OTHERPAY_SHOW == 1
                        ? menuCnt('직원목록', 'EmployeeListScreen')
                        : menuCnt('직원정보', 'EmployeeInfoEMPScreen')}
                      {menuCnt(
                        '직원합류승인',
                        'ManageInviteEmployeeScreen',
                        storeResult?.inviteemp,
                      )}
                      {EMPLOYEE == 0
                        ? null
                        : storeResult?.CalendarEdit == 1
                        ? menuCnt('캘린더', 'CalendarInfoScreen')
                        : menuCnt('캘린더', 'CalendarInfoScreen')}
                      {EMPLOYEE !== 0 && storeResult?.STOREPAY_SHOW == '1'
                        ? menuCnt('급여정보', 'PaymentInfoScreen')
                        : storeResult?.PAY_SHOW == 1
                        ? menuCnt('급여정보', 'EmpPaymentInfoScreen')
                        : null}
                      {EMPLOYEE !== 0 && menuCnt('QR보기', 'qrView')}
                    </Container>
                    <Box>
                      <MenuTitleArea>
                        <MenuTitle>정확한,</MenuTitle>
                        <Bold> 업무관리</Bold>
                      </MenuTitleArea>
                      <Container>
                        {menuCnt(
                          '체크리스트',
                          'ChecklistItemsScreen',
                          storeResult?.checklength,
                        )}
                        {menuCnt(
                          '업무일지',
                          'ChecklistShareMainScreen',
                          storeResult?.noticelength,
                        )}
                        {menuCnt('유통기한 알리미', 'ShelfLifeCheckScreen')}
                        {menuCnt('업무영상', 'EducationVideoListScreen')}
                      </Container>
                    </Box>
                  </>
                ) : (
                  // 스태프 ============================
                  <>
                    <MenuTitleArea>
                      <MenuTitle>더욱 쉬워진,</MenuTitle>
                      <Bold> 일터관리</Bold>
                    </MenuTitleArea>
                    <Container>
                      {menuCnt('캘린더', 'CalendarInfoScreen')}
                      {menuCnt('직원정보', 'EmployeeInfoEMPScreen')}
                      {storeResult?.PAY_SHOW == 1 &&
                        menuCnt('급여정보', 'EmpPaymentInfoScreen')}
                      {menuCnt('체크리스트', 'ChecklistItemsScreen')}
                      {menuCnt(
                        '업무일지',
                        'ChecklistShareMainScreen',
                        storeResult?.noticelength,
                      )}
                      {menuCnt('유통기한 알리미', 'ShelfLifeCheckScreen')}
                      {menuCnt('업무영상', 'EducationVideoListScreen')}
                    </Container>
                  </>
                )}
              </>
            )}
            <GreenBg isTrue={STORE == '1'} />
            <PurpleBg isTrue={storeResult?.IS_MANAGER == '0'} />
          </MenuBox>
          {STORE == '1' && (
            <NoticeArea>
              <Touchable
                onPress={() => {
                  navigation.navigate('ChecklistShareMainScreen', {
                    STOREDATA: storeResult,
                    notice: '1',
                  });
                }}>
                <Image
                  source={require('../../../../assets/main/noticeBar.png')}
                  style={{width: '100%', height: wp('10%')}}
                  resizeMode="contain"
                />
                <NoticeCnt>
                  <Image
                    source={require('../../../../assets/main/cuMark_white.png')}
                    style={{width: wp('20%'), height: wp('20%')}}
                    resizeMode="contain"
                  />
                  <NoticeContainer>
                    <NoticeTitle ellipsizeMode="tail">
                      {notice.TITLE}
                    </NoticeTitle>
                    <NoticeText numberOfLines={3} ellipsizeMode="tail">
                      {notice.CONTENTS}
                    </NoticeText>
                  </NoticeContainer>
                </NoticeCnt>
              </Touchable>
            </NoticeArea>
          )}
          <Footer />
        </ScrollView>
        <Modal
          ref={modalRef}
          isVisible={workingModalOpen}
          animationOutTiming={1}
          onBackdropPress={() => setWorkingModalOpen(false)}
          style={{margin: 0, justifyContent: 'flex-end'}}>
          <WorkingModalContainer>
            <WorkingModalBox
              style={{
                height: hp('8%'),
                borderBottomWidth: 1,
                borderColor: '#ddd',
              }}>
              <WorkingModalText style={{}}>출퇴근하기</WorkingModalText>
            </WorkingModalBox>

            <Row style={{flexDirection: 'row'}}>
              <WorkStartButton onPress={() => goWork()}>
                <WorkStartBtnText>출근</WorkStartBtnText>
              </WorkStartButton>
              <WorkEndButton onPress={() => leaveWork()}>
                <WorkEndBtnText>퇴근</WorkEndBtnText>
              </WorkEndButton>
            </Row>
          </WorkingModalContainer>
        </Modal>

        <Modal
          isVisible={barcodeModalOpen && hasCameraPermission}
          onBackdropPress={() => setBarcodeModalOpen(false)}
          onBackButtonPress={() => setBarcodeModalOpen(false)}
          style={{margin: 0, justifyContent: 'flex-end'}}
          avoidKeyboard={true}>
          <Container>
            {/* <BarcodeContainer>
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned}>
              <BarcodeLayerTop />
              <BarcodeLayerCenter>
                <BarcodeLayerLeft />
                <Focused />
                <BarcodeLayerRight />
              </BarcodeLayerCenter>
              <BarcodeLayerBottom />
            </BarCodeScanner>
          </BarcodeContainer> */}
            <Work>
              <GoWork
                onPress={() => {
                  setBarcodeModalOpen(false);
                }}>
                <WorkText>닫기</WorkText>
              </GoWork>
            </Work>
          </Container>
        </Modal>

        <Modal
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          isVisible={showPictureModal}
          style={{position: 'relative', marginVertical: hp('5%')}}
          onBackdropPress={() => {
            setShowPictureModal(false);
          }}
          onBackButtonPress={() => {
            setShowPictureModal(false);
          }}>
          <ShowPictureModalTouchable
            onPress={() => {
              setShowPictureModal(false);
            }}>
            <ShowPictureModalText>출퇴근 QR</ShowPictureModalText>
            <ShowPictureModalImage>
              <Image
                source={{uri: 'http://cuapi.shop-sol.com/' + QR}}
                style={{width: '100%', height: '100%'}}
                resizeMode={'contain'}
              />
            </ShowPictureModalImage>
          </ShowPictureModalTouchable>
        </Modal>
      </BackGround>
    );
  } else {
    return (
      <>
        <ActivityIndicator
          color="#642A8C"
          size="large"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            width: '100%',
            height: '100%',
          }}
        />
        <LoadingTextContainer>
          <LoadingText>로딩중</LoadingText>
        </LoadingTextContainer>
      </>
    );
  }
};
