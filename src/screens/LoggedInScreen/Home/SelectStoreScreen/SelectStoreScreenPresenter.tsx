import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import SelectStoreCard from './SelectStoreCard';
import {AddCircleIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;
const ScrollView = styled.ScrollView``;
const Container = styled.View`
  flex: 1;
`;

const EmptyListWrapper = styled.View`
  margin-top: ${hp('10%')}px;
  padding: ${hp('5%')}px ${wp('5%')}px;
  width: ${wp('90%')}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
`;

const EmptyListText = styled.Text`
  color: #999;
`;

const EmptyListTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const AddStoreBox = styled.View`
  width: ${wp('100%')}px;
  align-items: center;
  margin: ${hp('2.5%')}px 0;
`;
const AddStoreButton = styled.TouchableOpacity`
  padding: ${hp('1.5%')}px;
  width: ${wp('85%')}px;
  border-radius: 30px;
  border-width: 2px;
  border-color: #642a8c;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AddStoreButtonText = styled.Text`
  color: #642a8c;
  font-weight: bold;
`;

const WorkingModalContainer = styled.View`
  height: 280px;
  background-color: white;
`;
const Row = styled.View`
  flex-direction: row;
`;

const ModalNoButton = styled.TouchableOpacity`
  height: ${hp('7%')}px;
  width: ${wp('50%')}px;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
`;
const ModalYesButton = styled(ModalNoButton)`
  background-color: #642a8c;
`;

const ModalNoButtonText = styled.Text`
  font-size: 18px;
  color: #642a8c;
`;
const ModalYesButtonText = styled.Text`
  font-size: 16px;
  color: white;
`;

const WorkingModalBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const WorkingModalText = styled.Text`
  font-size: 30px;
  color: #642a8c;
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
  color: #ffffff;
  font-size: 15px;
  margin: 15px 0;
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
const StoreText = styled.Text`
  font-size: 20px;
  margin-top: 40px;
`;
const ConfirmStoreText = styled.Text`
  font-size: 30px;
  color: #5887f9;
  margin-top: 40px;
`;
const BarcodeModalContainer = styled.View`
  height: 300px;
  background-color: white;
`;
const BarcodeModalBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default ({
  STORE,
  HomeCard,
  search,
  refreshing,
  onRefresh,
  addStore,
  storeName,
  openModal,
  setStoreEmpSeqFn,
  setStoreFn,
  setStoreNameFn,
  setCalendarDataFn,
  setCheckListDataFn,
  calendarData,
  checkListData,
  modalRef,
  workingModalOpen,
  setWorkingModalOpen,
  goWork,
  leaveWork,
  barcodeModalOpen,
  hasCameraPermission,
  handleBarCodeScanned,
  setBarcodeModalOpen,
  joinModalOpen,
  setJoinModalOpen,
  submit,
  setName,
  setAddress,
  alertModal,
}) => {
  const StoreList = () => {
    if (HomeCard?.length === 0) {
      if (STORE == '1') {
        return (
          <EmptyListWrapper>
            <EmptyListText>점포를 등록하시면 입력하신 주소로</EmptyListText>
            <EmptyListText>
              출퇴근이 가능한 QR키트를 송부해 드립니다.
            </EmptyListText>
            <EmptyListText>(영업일 기준 2~3일 소요)</EmptyListText>
          </EmptyListWrapper>
        );
      } else {
        return (
          <EmptyListWrapper>
            <EmptyListTitle>합류된 점포가 없습니다!</EmptyListTitle>
            <EmptyListText>점주님에게 직원초대를 요청하세요</EmptyListText>
            <EmptyListText>
              그 후 로그인하여 생성된 매장을 확인하게 되면
            </EmptyListText>
            <EmptyListText>
              점주님이 직원합류를 완료할 수 있습니다.
            </EmptyListText>
          </EmptyListWrapper>
        );
      }
    } else {
      return HomeCard?.map((data, index) => (
        <SelectStoreCard
          key={index}
          data={data}
          name={data.NAME}
          address1={data.ADDR1}
          address2={data.ADDR2}
          employee={data.emplist}
          STORE_SEQ={data.STORE_SEQ}
          STORE={STORE}
          EMP_SEQ={data.EMP_SEQ}
          search={false}
          JOIN={data.JOIN}
          TYPE={data.TYPE}
          MANAGER={data.IS_MANAGER == 1 ? '[점장]' : '[스태프]'}
          workinglist={data.workinglist}
          StoreEmpSeq={data.EMP_SEQ}
          setSES={(num) => {
            setStoreEmpSeqFn(num);
          }}
          setStep={(num) => {
            setStoreFn(num);
          }}
          setST={(num) => {
            setStoreNameFn(num);
          }}
          setCalendarData={(data) => {
            setCalendarDataFn(data);
          }}
          CalendarData={calendarData[index]}
          setCheckListData={(data) => {
            setCheckListDataFn(data);
          }}
          CheckListData={checkListData[index]}
          setName={setName}
          setAddress={setAddress}
          alertModal={alertModal}
          openModal={openModal}
        />
      ));
    }
  };

  return (
    <BackGround>
      {STORE == '1' && (
        <AddStoreBox>
          <AddStoreButton onPress={() => addStore()}>
            <AddStoreButtonText>점포 등록하기</AddStoreButtonText>
            <AddCircleIcon />
          </AddStoreButton>
        </AddStoreBox>
      )}
      {search == false ? (
        <Container>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingBottom: 20,
            }}>
            <StoreList />
          </ScrollView>
        </Container>
      ) : (
        <Container>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingBottom: 20,
            }}>
            {HomeCard?.map((data, index) => {
              return (
                <SelectStoreCard
                  key={index}
                  data={data}
                  name={data.NAME}
                  address1={data.ADDR1}
                  address2={data.ADDR2}
                  employee={data.emplist}
                  STORE_SEQ={data.STORE_SEQ}
                  STORE={STORE}
                  EMP_SEQ={data.EMP_SEQ}
                  JOIN={data.JOIN}
                  search={true}
                  workinglist={data.workinglist}
                  openModal={(a, b) => openModal(a, b)}
                  setStep={(num) => setStoreFn(num)}
                  setST={(num) => setStoreNameFn(num)}
                  setName={setName}
                  setAddress={setAddress}
                  alertModal={alertModal}
                />
              );
            })}
          </ScrollView>
        </Container>
      )}
      <Modal
        ref={modalRef}
        isVisible={workingModalOpen}
        animationOutTiming={1}
        onBackdropPress={() => setWorkingModalOpen(false)}
        onBackButtonPress={() => setWorkingModalOpen(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <WorkingModalContainer style={{height: 280, backgroundColor: 'white'}}>
          <WorkingModalBox>
            <WorkingModalText>출퇴근하기</WorkingModalText>
          </WorkingModalBox>
          <Row>
            <ModalNoButton onPress={() => goWork()}>
              <ModalNoButtonText>출근하기</ModalNoButtonText>
            </ModalNoButton>
            <ModalYesButton onPress={() => leaveWork()}>
              <ModalYesButtonText>퇴근하기</ModalYesButtonText>
            </ModalYesButton>
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
        isVisible={joinModalOpen}
        onBackdropPress={() => setJoinModalOpen(false)}
        style={{margin: 0, justifyContent: 'flex-end'}}
        avoidKeyboard={true}>
        <BarcodeModalContainer>
          <BarcodeModalBox>
            <ConfirmStoreText>합류요청을 하시겠습니까?</ConfirmStoreText>
            <StoreText>{storeName}</StoreText>
          </BarcodeModalBox>
          <SubmitBtn text={'확인'} onPress={() => submit()} isRegisted={true} />
        </BarcodeModalContainer>
      </Modal>
    </BackGround>
  );
};
