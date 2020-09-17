import React from 'react';
import moment from 'moment';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {Calendar} from 'react-native-calendars';
import {RefreshControl} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import utils from '../../../../constants/utils';

import {
  AddIcon,
  BackIcon,
  ReloadCircleIcon,
  CalendarIcon,
  ForwardIcon,
  CreateIcon,
} from '../../../../constants/Icons';
import ChecklistShareMainScreenCard from './ChecklistShareMainScreenCard';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;
const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const SmallWhiteSpace = styled.View`
  height: 10px;
`;

const NewCntViewContainer = styled.View`
  position: absolute;
  top: ${utils.isAndroid ? 0 : -3};
  right: -25px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const NewCntViewText = styled.Text`
  font-size: 10px;
  color: white;
  font-weight: bold;
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
  margin-left: 5px;
`;

const Section = styled.View`
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
`;

const Date = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
const GreyText = styled.Text`
  color: #999;
`;

const AddChecklistBox = styled.View`
  width: 100%;
  align-items: center;
`;

const AddCheckilistButton = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  border-width: 2px;
  border-color: #642a8c;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
`;

const WhiteSpace = styled.View`
  height: 30px;
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

const CalendarTitleText = styled.Text``;

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

const CheckPoint = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 10px;
  background-color: #000;
`;

const NewPoint = styled.View`
  margin-left: 10px;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

const AddButtonContainer = styled.View`
  position: absolute;
  z-index: 2;
  right: ${wp('5%')}px;
  bottom: ${hp('5%')}px;
`;

const AddButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
  box-shadow: 7px 7px 7px rgba(100, 100, 100, 0.4);
`;

const EmptyListContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const EmptyTitle = styled.View`
  align-items: center;
  flex-direction: row;
  margin-bottom: ${wp('5%')}px;
`;

const EmptyBox = styled.View`
  width: ${wp('80%')};
  align-items: center;
  padding: ${wp('10%')}px ${wp('5%')}px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 20px;
`;

export default ({
  refreshing,
  onRefresh,
  notice,
  STORE,
  onDayPress,
  onMonthChange,
  onPressAddButtonFn,
  CHECKLIST_SHARE_MARKED,
  date,
  setDate,
  CHECKLIST_SHARE_DATA1,
  NEW_CNT1,
  CHECKLIST_SHARE_DATA2,
  NEW_CNT2,
  CHECKLIST_SHARE_DATA3,
  NEW_CNT3,
  markingFn,
  fixControlFn,
  fetchData,
  MEMBER_SEQ,
  IS_MANAGER,
  isCalendarModalVisible,
  setIsCalendarModalVisible,
}) => {
  const Tab = createMaterialTopTabNavigator();

  const NewCntView = ({route}) => {
    if (route.title == '지시사항' && NEW_CNT1 !== 0) {
      return (
        <NewCntViewContainer>
          <NewCntViewText>{NEW_CNT1 < 10 ? NEW_CNT1 : '9+'}</NewCntViewText>
        </NewCntViewContainer>
      );
    } else if (route.title == '특이사항' && NEW_CNT2 !== 0) {
      return (
        <NewCntViewContainer>
          <NewCntViewText>{NEW_CNT2 < 10 ? NEW_CNT2 : '9+'}</NewCntViewText>
        </NewCntViewContainer>
      );
    } else if (route.title == 'CU소식' && NEW_CNT3 !== 0) {
      return (
        <NewCntViewContainer>
          <NewCntViewText>{NEW_CNT3 < 10 ? NEW_CNT3 : '9+'}</NewCntViewText>
        </NewCntViewContainer>
      );
    } else {
      return null;
    }
  };

  const DateController = ({location, text}) => {
    const yesterday = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
    const tomorrow = moment(date).add(1, 'days').format('YYYY-MM-DD');
    return (
      <Section>
        <Date>
          <DateArrowLeft
            onPress={() => {
              setDate(yesterday);
              fetchData(location, yesterday);
            }}>
            <BackIcon size={22} color={'#000'} />
          </DateArrowLeft>
          <DateToday
            onPress={() => {
              setDate(moment(date).format('YYYY-MM-DD'));
              fetchData(location, date);
            }}>
            <ReloadCircleIcon size={22} />
          </DateToday>
          <DateTextArea>
            <DateText>{moment(date).format('YYYY.MM.DD')}</DateText>
          </DateTextArea>
          <CalendarOpenBtn
            onPress={() => {
              markingFn(moment(date).format('YYYY'), moment(date).format('M'));
              setIsCalendarModalVisible(true);
            }}>
            <CalendarIcon size={22} color={'black'} />
          </CalendarOpenBtn>
          <DateArrowRight
            onPress={() => {
              setDate(tomorrow);
              fetchData(location, tomorrow);
            }}>
            <ForwardIcon size={22} color={'#000'} />
          </DateArrowRight>
        </Date>
        <AddChecklistBox>
          <AddCheckilistButton disabled={true}>
            <AddChecklistButtonText>{text}</AddChecklistButtonText>
          </AddCheckilistButton>
        </AddChecklistBox>
      </Section>
    );
  };

  const FirstRoute = () => (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh('firstRoute')}
          />
        }>
        <Container>
          <DateController
            location={'firstRoute'}
            text={'점주가 직원들에게 전달하는 내용입니다.'}
          />
          {CHECKLIST_SHARE_DATA1?.basic?.length == 0 &&
          CHECKLIST_SHARE_DATA1?.favorite?.length == 0 ? (
            <EmptyList TITLE={'지시사항'} />
          ) : (
            <>
              {CHECKLIST_SHARE_DATA1?.favorite?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'지시사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'unFix', '지시사항')
                  }
                />
              ))}
              {CHECKLIST_SHARE_DATA1?.basic?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'지시사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'fix', '지시사항')
                  }
                />
              ))}
            </>
          )}
        </Container>
      </ScrollView>
      {(STORE == '1' || IS_MANAGER === true) && (
        <AddButtonContainer>
          <AddButton onPress={() => onPressAddButtonFn('지시사항')}>
            <AddIcon />
          </AddButton>
        </AddButtonContainer>
      )}
    </BackGround>
  );

  const SecondRoute = () => (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh('secondRoute')}
          />
        }>
        <Container>
          <DateController
            location={'secondRoute'}
            text={'직원이 점포 운영현황을 점주에게 전달합니다.'}
          />
          {CHECKLIST_SHARE_DATA2?.basic?.length == 0 &&
          CHECKLIST_SHARE_DATA2?.favorite?.length == 0 ? (
            <EmptyList TITLE={'특이사항'} />
          ) : (
            <>
              {CHECKLIST_SHARE_DATA2?.favorite?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'특이사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'unFix', '특이사항')
                  }
                />
              ))}
              {CHECKLIST_SHARE_DATA2?.basic?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'특이사항'}
                  confirmModal={(noticeSeq) =>
                    fixControlFn(noticeSeq, 'fix', '특이사항')
                  }
                />
              ))}
            </>
          )}
        </Container>
      </ScrollView>
      {STORE == '0' && (
        <AddButtonContainer>
          <AddButton onPress={() => onPressAddButtonFn('특이사항')}>
            <AddIcon />
          </AddButton>
        </AddButtonContainer>
      )}
    </BackGround>
  );

  const ThirdRoute = () => (
    <BackGround>
      <Container>
        <NewCntViewText>ThirdRoute</NewCntViewText>
        {CHECKLIST_SHARE_DATA3?.message?.length == 0 ? (
          <EmptyList TITLE={'CU소식'} />
        ) : (
          <>
            <AddCheckilistButton disabled={true}>
              <AddChecklistButtonText>
                CU본사 소식으로 점주님께만 보이는 내용입니다.
              </AddChecklistButtonText>
            </AddCheckilistButton>
            <ScrollView
              keyboardDismissMode="on-drag"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{alignItems: 'center', width: '100%'}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={() => onRefresh()}
                />
              }>
              <WhiteSpace />
              {CHECKLIST_SHARE_DATA3?.message?.map((data, index) => (
                <ChecklistShareMainScreenCard
                  key={index}
                  data={data}
                  ME={MEMBER_SEQ}
                  type={'CU소식'}
                  confirmModal={() => {}}
                />
              ))}
            </ScrollView>
          </>
        )}
      </Container>
    </BackGround>
  );

  const EmptyList = ({TITLE}) => (
    <EmptyListContainer>
      {STORE === '0' && TITLE == '특이사항' && (
        <Touchable onPress={() => onPressAddButtonFn(TITLE)}>
          <EmptyBox>
            <EmptyTitle>
              <CreateIcon size={22} color={'#999'} />
              <Text style={{marginLeft: 10}}>{TITLE}을 등록해주세요.</Text>
            </EmptyTitle>
            <GreyText>
              점포업무에 관련된 지침 등을 작성하는 업무일지로 직원이 작성하여
              공유합니다.
            </GreyText>
          </EmptyBox>
        </Touchable>
      )}
      {STORE === '0' && !IS_MANAGER && TITLE == '지시사항' && (
        <EmptyBox>
          <EmptyTitle>
            <CreateIcon size={22} color={'#999'} />
            <Text style={{marginLeft: 10}}>{TITLE}이 없습니다.</Text>
          </EmptyTitle>
          <GreyText>
            점포운영에 관련된 사항을 작성하는 업무일지로 점주가 작성하여
            공유합니다.
          </GreyText>
        </EmptyBox>
      )}
      {STORE === '1' && TITLE == '특이사항' && (
        <EmptyBox>
          <EmptyTitle>
            <CreateIcon size={22} color={'#999'} />
            <Text style={{marginLeft: 10}}>{TITLE}이 없습니다.</Text>
          </EmptyTitle>
          <GreyText>
            점포업무에 관련된 사항을 작성하는 업무일지로 직원이 작성하여
            공유합니다.
          </GreyText>
        </EmptyBox>
      )}
      {(STORE === '1' || IS_MANAGER) && TITLE == '지시사항' && (
        <Touchable onPress={() => onPressAddButtonFn(TITLE)}>
          <EmptyBox>
            <EmptyTitle>
              <CreateIcon size={22} color={'#999'} />
              <Text style={{marginLeft: 10}}>{TITLE}을 등록해주세요.</Text>
            </EmptyTitle>
            <GreyText>
              점포운영에 관련된 지침 등을 작성하는 업무일지로 점주님이 작성하여
              공유합니다.
            </GreyText>
          </EmptyBox>
        </Touchable>
      )}
      {TITLE == 'CU소식' && (
        <EmptyBox>
          <CreateIcon size={22} color={'#999'} />
          <GreyText>{TITLE}이 없습니다.</GreyText>
        </EmptyBox>
      )}
    </EmptyListContainer>
  );

  return (
    <>
      <Tab.Navigator
        initialRouteName={
          notice ? 'CU소식' : STORE === '1' ? '특이사항' : '지시사항'
        }
        tabBarOptions={{
          labelStyle: {fontSize: 14},
          indicatorStyle: {
            height: 4,
            borderRadius: 10,
            backgroundColor: '#AACE36',
          },
          style: {backgroundColor: '#fff'},
        }}>
        <Tab.Screen name="지시사항" component={FirstRoute} />
        <Tab.Screen name="특이사항" component={SecondRoute} />
        {STORE === '1' && <Tab.Screen name="CU소식" component={ThirdRoute} />}
      </Tab.Navigator>
      <Modal
        isVisible={isCalendarModalVisible}
        onBackdropPress={() => {
          setIsCalendarModalVisible(false);
          setDate(date);
        }}>
        <CalendarTitle>
          <CalendarTextBox>
            <RowSpace>
              <CalendarTitleText>게시글 표시</CalendarTitleText>
              <NewPoint
                style={{
                  backgroundColor: 'transparent',
                }}>
                <CalendarTitleText>1</CalendarTitleText>
                <CheckPoint />
              </NewPoint>
            </RowSpace>
            <SmallWhiteSpace />
            <RowSpace>
              <CalendarTitleText>읽지않은 게시글</CalendarTitleText>
              <NewPoint>
                <CalendarTitleText style={{color: 'white'}}>
                  1
                </CalendarTitleText>
              </NewPoint>
            </RowSpace>
          </CalendarTextBox>
          <CalendarTitleBox>
            <CalendarTitleText1>
              {moment(date).format('YYYY')}년
            </CalendarTitleText1>
            <CalendarTitleText2>
              {moment(date).format('M')}월 {moment(date).format('D')}일
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
          current={date}
          markedDates={CHECKLIST_SHARE_MARKED}
          onDayPress={(date) => onDayPress(date)}
          onMonthChange={(date) => onMonthChange(date)}
        />
      </Modal>
    </>
  );
};
