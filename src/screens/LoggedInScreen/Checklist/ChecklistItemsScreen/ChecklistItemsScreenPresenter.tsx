import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Calendar} from 'react-native-calendars';
import Modal from 'react-native-modal';

import {
  EllipseIcon,
  ForwardIcon,
  BackIcon,
  ReloadCircleIcon,
  CalendarIcon,
  CreateIcon,
  HelpCircleIcon,
  CheckMarkIcon,
} from '../../../../constants/Icons';
import moment from 'moment';
import {AddCircleIcon, CloseCircleIcon} from '../../../../constants/Icons';
import ChecklistItemsScreenCard from './ChecklistItemsScreenCard';

interface IsEmpName {
  isEmpName: string;
}
const Text = styled.Text``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled(Row)`
  width: 100%;
  justify-content: space-between;
`;
const SmallText = styled.Text`
  font-size: 11px;
  margin-right: 5px;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Date = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DateArrowLeft = styled.TouchableOpacity`
  width: ${wp('10%')}px;
  height: ${wp('10%')}px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const DateArrowRight = styled(DateArrowLeft)``;
const CalendarOpenBtn = styled(DateArrowLeft)`
  margin-right: 5px;
`;
const DateToday = styled(DateArrowLeft)`
  margin-right: 5px;
`;

const DateTextArea = styled.TouchableOpacity`
  flex: 1;
  height: ${wp('10%')}px;
  align-items: center;
  justify-content: center;
`;

const DateText = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const AddChecklistBox = styled.View`
  width: 100%;
  align-items: center;
`;

const AddCheckilistButton = styled.TouchableOpacity`
  padding: 15px;
  width: 100%;
  border-radius: 30px;
  border-width: 2px;
  border-color: #642a8c;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const AddChecklistButtonText = styled.Text`
  color: #642a8c;
  font-weight: bold;
`;

const CalendarTitle = styled.View`
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #642a8c;
`;

const CalendarTextBox = styled.View`
  padding: 10px 20px;
  background-color: white;
`;
const CalendarTitleBox = styled.View`
  align-items: flex-end;
`;
const CalendarTitleText1 = styled.Text`
  color: white;
  font-size: 18px;
`;
const CalendarTitleText2 = styled.Text`
  margin-left: 10px;
  color: white;
  font-size: 30px;
`;

const EmptyText = styled.Text`
  color: #aaa;
  margin-left: 5px;
`;

const QrTouchable = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #aace36;
  position: absolute;
  bottom: ${hp('5%')}px;
  right: ${wp('7%')}px;
  justify-content: center;
  align-items: center;
`;

const Empty = styled.TouchableOpacity`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${hp('4%')}px 0;
  border-width: 1px;
  border-color: #aaa;
  border-radius: 20px;
`;

const WhiteText = styled.Text`
  color: white;
`;

const ChecklistSectionText = styled.Text`
  color: #111;
  font-size: 16px;
  font-weight: bold;
`;

const ChecklistSection = styled.View`
  padding: 15px;
  width: 100%;
  border-color: #aaa;
`;
const IconContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
`;

const WhiteBigText = styled(WhiteText)`
  font-size: 20px;
`;

const ChecklistModalBox = styled.View`
  flex: 1;
  padding: 10px;
  background-color: white;
`;

const CheckNumberText = styled.Text`
  color: #333;
  font-size: 12px;
`;
const ChecklistTitleText = styled.Text`
  margin: 5px;
  font-size: 16px;
`;

const ChecklistIconContainer = styled.View<IsEmpName>`
  width: 40%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isEmpName ? '#642A8C' : '#ddd')};
`;
const ChecklistTypeText1 = styled.Text`
  align-self: flex-start;
  color: #642a8c;
  font-size: 11px;
`;
const ChecklistTypeText2 = styled.Text`
  flex: 1;
  padding-left: 10px;
  color: #7e7c7c;
  font-size: 12px;
`;

export default ({
  STORE,
  date,
  fetchData,
  refreshing,
  onRefresh,
  year,
  month,
  day,
  select,
  marking,
  isCalendarModalVisible,
  setIsCalendarModalVisible,
  isChecklistModalVisible,
  setIsChecklistModalVisible,
  setDefaultMonth,
  onPressAddChecklist,
  defaultMonth,
  markedDates,
  onDayPress,
  monthChange,
  checklist,
  STORE_SEQ,
  adviceModal,
  gotoChecklistAdd,
  selectCheckListFn,
  selectChecklist,
  checkdata,
  scanstore,
}) => {
  const CheckState = ({check}) => {
    let checkState;
    if (check !== null) {
      check = check.split('@');
      for (let i = 0; i < check.length / 2; i++) {
        let temp = 2 * i + 1;
        if (check[temp] === '1') {
          checkState = 'checkComplete';
        }
        if (check[temp] === '2') {
          checkState = 'checkIncomplete';
          break;
        }
      }
    } else {
      checkState = 'willCheck';
    }
    if (checkState == 'checkComplete') {
      return (
        <Row>
          <EllipseIcon color={'#AACE36'} />
          <SmallText>체크정상</SmallText>
        </Row>
      );
    } else if (checkState == 'checkIncomplete') {
      return (
        <Row>
          <EllipseIcon color={'#984B19'} />
          <SmallText>체크이상</SmallText>
          <EllipseIcon color={'#FEBF40'} />
          <SmallText>특이사항</SmallText>
        </Row>
      );
    } else {
      return (
        <Row>
          <EllipseIcon color={'#0D4F8A'} />
          <SmallText>체크예정</SmallText>
        </Row>
      );
    }
  };

  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container>
          <Section>
            <Date>
              <DateArrowLeft
                onPress={() => {
                  select(
                    moment(date).subtract(1, 'days').format('YYYY'),
                    moment(date).subtract(1, 'days').format('MM'),
                    moment(date).subtract(1, 'days').format('DD'),
                  );
                  fetchData(
                    moment(date).subtract(1, 'days').format('YYYY-MM-DD'),
                  );
                }}>
                <BackIcon size={22} color={'#000'} />
              </DateArrowLeft>
              <DateTextArea>
                <DateText>{date}</DateText>
              </DateTextArea>
              <DateToday
                onPress={() => {
                  select(
                    moment().format('YYYY'),
                    moment().format('MM'),
                    moment().format('DD'),
                  );
                  fetchData();
                }}>
                <ReloadCircleIcon size={22} />
              </DateToday>
              <CalendarOpenBtn
                onPress={() => {
                  marking(year, month, day);
                  setIsCalendarModalVisible(true);
                  setDefaultMonth(date);
                }}>
                <CalendarIcon size={22} color={'black'} />
              </CalendarOpenBtn>
              <DateArrowRight
                onPress={() => {
                  select(
                    moment(date).add(1, 'days').format('YYYY'),
                    moment(date).add(1, 'days').format('MM'),
                    moment(date).add(1, 'days').format('DD'),
                  );
                  fetchData(moment(date).add(1, 'days').format('YYYY-MM-DD'));
                }}>
                <ForwardIcon size={22} color={'#000'} />
              </DateArrowRight>
            </Date>
            {STORE === '1' && (
              <AddChecklistBox>
                <AddCheckilistButton onPress={() => onPressAddChecklist()}>
                  <AddChecklistButtonText>
                    체크리스트 추가하기
                  </AddChecklistButtonText>
                  <AddCircleIcon />
                </AddCheckilistButton>
              </AddChecklistBox>
            )}
          </Section>
          {checklist?.length == 0 ? (
            STORE == '1' ? (
              <Empty onPress={() => gotoChecklistAdd()}>
                <CreateIcon color={'#999'} />
                <EmptyText>체크리스트를 등록해주세요!</EmptyText>
              </Empty>
            ) : (
              <Empty disabled={true}>
                <CreateIcon color={'#999'} />
                <EmptyText>등록된 체크리스트가 없습니다!</EmptyText>
              </Empty>
            )
          ) : (
            <>
              <ChecklistSection>
                <RowTouchable
                  onPress={() => {
                    adviceModal(
                      '공통업무',
                      '기본가이드 내용으로 점포의 특징에 맞춰서 추가, 삭제가 가능합니다',
                    );
                  }}>
                  <ChecklistSectionText>공통업무</ChecklistSectionText>
                  <HelpCircleIcon />
                </RowTouchable>
              </ChecklistSection>
              {checklist
                .filter((info) => info.CHECK_TYPE == '0')
                .map((data, index) => {
                  return (
                    <ChecklistItemsScreenCard
                      key={index}
                      QR_SEQ={data.QR_SEQ}
                      STORE={STORE}
                      storeID={STORE_SEQ}
                      checkID={data.CHECK_SEQ}
                      csID={data.CS_SEQ}
                      checkpoint={data.TITLE}
                      checktime={data.END_TIME}
                      checklist={data.LIST}
                      check={data.CHECK_LIST}
                      checkEMP={data.EMP_NAME}
                      checkEMPTime={data.CHECK_TIME}
                      checkSelectedEmp={data.EMP_SEQ}
                      checkType={data.CHECK_TYPE}
                      checkSelectedEmpName={data.NAME}
                      memo={data.CHECK_TITLE}
                      PHOTO_CHECK={data.PHOTO_CHECK}
                      IMAGE_LIST={data.IMAGE_LIST}
                      DATE={date}
                      onRefresh={onRefresh}
                    />
                  );
                })}
              <ChecklistSection>
                <RowTouchable
                  onPress={() =>
                    adviceModal(
                      '점포업무',
                      '공통업무 외에 점포에 특징에 맞춰서 개별적인 체크리스트 작성이 가능합니다',
                    )
                  }>
                  <ChecklistSectionText>점포업무</ChecklistSectionText>
                  <HelpCircleIcon />
                </RowTouchable>
              </ChecklistSection>
              {checklist
                .filter((info) => info.CHECK_TYPE == '1')
                .map((data, index) => {
                  return (
                    <ChecklistItemsScreenCard
                      key={index}
                      QR_SEQ={data.QR_SEQ}
                      STORE={STORE}
                      storeID={STORE_SEQ}
                      checkID={data.CHECK_SEQ}
                      csID={data.CS_SEQ}
                      checkpoint={data.TITLE}
                      checktime={data.END_TIME}
                      checklist={data.LIST}
                      check={data.CHECK_LIST}
                      checkEMP={data.EMP_NAME}
                      checkEMPTime={data.CHECK_TIME}
                      checkSelectedEmp={data.EMP_SEQ}
                      checkType={data.CHECK_TYPE}
                      checkSelectedEmpName={data.NAME}
                      memo={data.CHECK_TITLE}
                      PHOTO_CHECK={data.PHOTO_CHECK}
                      IMAGE_LIST={data.IMAGE_LIST}
                      DATE={date}
                      onRefresh={onRefresh}
                    />
                  );
                })}
            </>
          )}
          {STORE == 0 && (
            <QrTouchable onPress={() => selectCheckListFn()}>
              <WhiteText>체크</WhiteText>
            </QrTouchable>
          )}
        </Container>
      </ScrollView>
      <Modal
        isVisible={isChecklistModalVisible}
        style={{marginTop: 60}}
        onBackdropPress={() => setIsChecklistModalVisible(false)}
        onBackButtonPress={() => setIsChecklistModalVisible(false)}>
        {selectChecklist?.length == 0 ? (
          <Row>
            <WhiteBigText>등록된 체크리스트가 없습니다</WhiteBigText>
          </Row>
        ) : (
          <Row>
            <WhiteBigText>체크항목를 선택해주세요.</WhiteBigText>
            <IconContainer onPress={() => setIsChecklistModalVisible(false)}>
              <CloseCircleIcon size={30} color={'white'} />
            </IconContainer>
          </Row>
        )}
        <ScrollView>
          {selectChecklist
            ?.sort(function (a, b) {
              return a.CHECK_TYPE - b.CHECK_TYPE;
            })
            .map((list, index) => {
              return (
                <RowTouchable
                  onPress={() => {
                    checkdata(scanstore + '-' + list.QR_SEQ, list);
                  }}>
                  <ChecklistModalBox>
                    <RowSpace>
                      {list.CHECK_TYPE == '0' ? (
                        <CheckNumberText>공통업무</CheckNumberText>
                      ) : (
                        <CheckNumberText>점포업무</CheckNumberText>
                      )}
                      <CheckState check={list.CHECK_LIST} />
                    </RowSpace>
                    <ChecklistTitleText
                      ellipsizeMode={'tail'}
                      numberOfLines={1}>
                      {list.TITLE}
                    </ChecklistTitleText>
                    {list.EMP_NAME ? ( // 체크한 상태
                      <>
                        <Row>
                          <ChecklistTypeText1>체크시간</ChecklistTypeText1>
                          <ChecklistTypeText2>
                            {list.CHECK_TIME}
                          </ChecklistTypeText2>
                        </Row>
                        {list.EMP_SEQ ? (
                          <Row>
                            <ChecklistTypeText1>담당직원</ChecklistTypeText1>
                            <ChecklistTypeText2>
                              {list.NAME.split('@').join(' / ')}
                            </ChecklistTypeText2>
                          </Row>
                        ) : (
                          <Row>
                            <ChecklistTypeText1>체크직원</ChecklistTypeText1>
                            <ChecklistTypeText2>
                              {list.EMP_NAME}
                            </ChecklistTypeText2>
                          </Row>
                        )}
                      </>
                    ) : (
                      // 미체크 상태
                      <>
                        <Row>
                          <ChecklistTypeText1>체크예정시간</ChecklistTypeText1>
                          <ChecklistTypeText2>
                            {list.END_TIME === '' ? '미사용' : list.END_TIME}
                          </ChecklistTypeText2>
                        </Row>
                        {list.EMP_SEQ && ( // 담당직원이 설정된 상태
                          <Row>
                            <ChecklistTypeText1>담당직원</ChecklistTypeText1>
                            <ChecklistTypeText2>
                              {list.NAME.split('@').join(' / ')}
                            </ChecklistTypeText2>
                          </Row>
                        )}
                      </>
                    )}
                  </ChecklistModalBox>
                  <ChecklistIconContainer>
                    <CheckMarkIcon size={34} color="white" />
                  </ChecklistIconContainer>
                </RowTouchable>
              );
            })}
        </ScrollView>
      </Modal>
      <Modal
        isVisible={isCalendarModalVisible}
        onBackdropPress={() => {
          setIsCalendarModalVisible(false);
          setDefaultMonth(date);
        }}>
        <CalendarTitle>
          <CalendarTextBox>
            <Row>
              <EllipseIcon color={'#0D4F8A'} />
              <Text style={{fontSize: 11, color: '#333'}}>미체크</Text>
            </Row>
            <Row>
              <EllipseIcon color={'#984B19'} />
              <Text style={{fontSize: 11, color: '#333'}}>체크이상</Text>
            </Row>
            <Row>
              <EllipseIcon color={'#AACE36'} />
              <Text style={{fontSize: 11, color: '#333'}}>체크정상</Text>
            </Row>
          </CalendarTextBox>
          <CalendarTitleBox>
            <CalendarTitleText1>{year}년</CalendarTitleText1>
            <CalendarTitleText2>
              {month}월 {day}일
            </CalendarTitleText2>
          </CalendarTitleBox>
        </CalendarTitle>
        <Calendar
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            paddingVertical: 10,
          }}
          theme={{
            arrowColor: '#000',
            todayTextColor: '#AACE36',
          }}
          markingType={'multi-dot'}
          hideExtraDays={true}
          monthFormat={'M월'}
          current={defaultMonth}
          markedDates={markedDates}
          onDayPress={(day) => {
            onDayPress(day);
          }}
          onMonthChange={(month) => {
            monthChange(month);
          }}
        />
      </Modal>
    </BackGround>
  );
};
