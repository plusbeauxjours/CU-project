import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from '../../../../constants/utils';
import {ActivityIndicator} from 'react-native';
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

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #642a8c;
`;
const Touchable = styled.TouchableOpacity``;
const ScrollView = styled.ScrollView``;
const ImageBackground = styled.ImageBackground``;
const Container = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 10px;
`;
const Text = styled.Text``;
const Image = styled.Image<IImage>`
  width: 100%;
  height: 100%;
  margin-left: ${(props) => props.isCheckListItems && '13px'};
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
  padding: 0 ${wp('3%')}px;
  padding-bottom: 15px;
  border-radius: 10px;
  background-color: white;
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
  flex-direction: row;
  padding: 0 ${wp('5%')}px;
  justify-content: flex-start;
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
const Bold = styled.Text`
  font-weight: 400;
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
export default ({
  notice,
  storeResult,
  NAME,
  STORE,
  MEMBER_SEQ,
  STORE_SEQ,
  STORE_NAME,
  EMPLOYEE,
  WORKINGLIST,
  pictureModalOpen,
  setPictureModalOpen,
  barcodeModalOpen,
  setBarcodeModalOpen,
  workingModalOpen,
  setWorkingModalOpen,
  modalRef,
  helpModal,
  goWork,
  leaveWork,
  handleBarCodeScanned,
  checkPermissions,
}) => {
  const navigation = useNavigation();
  const menuCnt = (selection, paging, state = 0) => (
    <MenuCnt
      onPress={() => {
        if (selection == 'QR보기') {
          setPictureModalOpen(true);
        }
        console.log(
          'storeResultstoreResultstoreResultstoreResultstoreResult',
          storeResult,
        );
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
        <ScrollView>
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
                  <StoreText>안</StoreText>
                  {/* <Icon name="help" size={20} color="white" /> */}
                </IconContainer>
              )}
              <IconContainer
                onPress={() => {
                  navigation.navigate('MyPageMainScreen');
                }}>
                <StoreText>녕</StoreText>
                {/* <Icon name="setting" size={24} color="white" /> */}
              </IconContainer>
            </MyPage>
            <StoreName>
              <StoreText>안녕하세요.</StoreText>
              <StoreText>{NAME}</StoreText>
              <StoreSubText style={{}}>님</StoreSubText>
            </StoreName>
            <StoreUpdate>
              <Row>
                <Text
                  style={{
                    color: '#AACE36',
                    fontSize: utils.isAndroid ? 14 : 18,
                  }}>
                  Nice to CU_
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
                  <Icon name="ios-arrow-forward" size={18} color="white" />
                </StoreUpdateBtn>
                <StoreUpdateBtn
                  onPress={() => {
                    navigation.navigate('UpdateStoreScreen', {
                      STOREDATA: storeResult,
                    });
                  }}>
                  <WhiteText>점포정보</WhiteText>
                  <Icon name="ios-arrow-forward" size={18} color="white" />
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
                <Icon name="qrcode-scan" size={36} color="#642A8C" />
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
                      {menuCnt('직원정보', 'PaymentInfoScreen')}
                      {storeResult?.PAY_SHOW == 1 &&
                        menuCnt('급여정보', 'EmpPaymentInfoScreen')}
                      {menuCnt('체크리스트', 'ChecklistItemsScreen')}
                      {menuCnt(
                        '업무일지',
                        'ChecklistShareMain',
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
        {/* <Modal
          ref={ref => (this.modalRef3 = ref)}
          isVisible={this.state.isModalVisible3}
          animationOutTiming={1}
          onBackdropPress={() => this.setState({ isModalVisible3: false })}
          style={{ margin: 0, justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white' }}>
            <View style={{ height: hp('8%'), borderBottomWidth: 1, borderColor: '#ddd' }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 22, color: '#333', fontWeight: 'bold' }}>출퇴근하기</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.workStartButton} onPress={() => this._goWork()}>
                <Text style={{ fontSize: 24, color: '#642A8C' }}>출근</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.workEndButton} onPress={() => this._leaveWork()}>
                <Text style={{ fontSize: 24, color: '#AACE36' }}>퇴근</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isModalVisible2 && !!this.state.hasCameraPermission}
          onBackdropPress={() => this.setState({ isModalVisible2: false })}
          onBackButtonPress={() => this.setState({ isModalVisible2: false })}
          style={{ margin: 0, justifyContent: 'flex-end' }}
          avoidKeyboard={true}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <BarCodeScanner onBarCodeScanned={this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}>
                <View style={styles.barcodeLayerTop} />
                <View style={styles.barcodeLayerCenter}>
                  <View style={styles.barcodeLayerLeft} />
                  <View style={styles.focused} />
                  <View style={styles.barcodeLayerRight} />
                </View>
                <View style={styles.barcodeLayerBottom} />
              </BarCodeScanner>
            </View>

            <View style={styles.work}>
              <TouchableOpacity
                style={styles.goWork}
                onPress={() => {
                  this.setState({ isModalVisible2: false });
                }}>
                <Text style={styles.workText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          isVisible={this.state.showPictureModal}
          style={{ position: 'relative', marginVertical: hp('5%') }}
          onBackdropPress={() => {
            this.setState({ showPictureModal: false });
          }}
          onBackButtonPress={() => {
            this.setState({ showPictureModal: false });
          }}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              this.setState({ showPictureModal: false });
            }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ paddingVertical: 10, fontSize: 30, color: 'white' }}>출퇴근 QR</Text>
              <View style={{ width: wp('90%'), height: wp('90%') }}>
                <Image source={{ uri: 'http://cuapi.shop-sol.com/' + this.state.QR }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
              </View>
            </View>
          </TouchableOpacity>
        </Modal> */}
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
