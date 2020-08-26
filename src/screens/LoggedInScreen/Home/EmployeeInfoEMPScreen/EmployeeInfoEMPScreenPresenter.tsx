import React from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

import {BackIcon, ForwardIcon} from '../../../../constants/Icons';

interface IsSelected {
  isSelected: boolean;
  substract?: string;
  color?: string;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  margin-top: 20px;
  padding: 20px;
  align-items: center;
`;

const RenderDayListContainer = styled.View``;

const Section = styled.View`
  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px 0;
  background-color: white;
`;
const NameBox = styled.View``;
const EmployeeBox = styled.View`
  padding: 0 20px;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;

const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  border-color: #ccc;
  border-width: 1px;
  margin-right: 25px;
`;

const NameText = styled.Text`
  margin-right: 10px;
  color: #707070;
  font-size: 17px;
  margin-bottom: 5px;
`;

const DateText = styled.Text`
  color: #707070;
  font-size: 12px;
`;

const Bold = styled.Text`
  color: #642a8c;
  font-weight: bold;
`;
const NavigationButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  height: 60px;
  width: 60px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #642a8c;
  border-radius: 6px;
`;
const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SmallLine = styled.View`
  width: ${wp('50%')}px;
  height: 0.5px;
  margin: 10px 0;
  background-color: #f2f2f2;
`;
const WorkTypeAndSalaryBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 10px 20px 0 20px;
`;
const WorkTypeAndSalaryInfoBox = styled.View`
  align-items: flex-end;
  border-color: #f2f2f2;
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding: 10px 20px;
  margin: 10px 0;
`;
const WorkTypeAndSalaryBoxTitle = styled.Text`
  font-size: 17px;
  color: #642a8c;
`;
const WorkTypeCheckSection = styled.View`
  padding: 0 20px;
`;

const DateArrowLeft = styled.TouchableOpacity`
  margin-left: 5px;
  width: ${wp('10%')}px;
  height: ${wp('10%')}px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const GreyText = styled.Text`
  font-size: 15px;
  color: #7e7c7c;
`;
const FixedGreyText = styled(GreyText)`
  position: absolute;
  right: 100px;
`;

const RenderDayRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  padding: 10px 0;
  width: 100%;
`;
const RenderDayBox = styled.View<IsSelected>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
  background-color: ${(props) =>
    props.isSelected ? `${props.color}` : 'transparent'};
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;
const RenderDayBoxText = styled.Text<IsSelected>`
  color: ${(props) => (props.isSelected ? 'white' : '#CCCCCC')};
`;
const RenderDayTime = styled.View`
  margin-top: 10px;
  margin-left: 15px;
  width: 115px;
`;
const RenderDayTimeText = styled.Text<IsSelected>`
  font-size: 15px;
  color: ${(props) => (props.substract && props.isSelected ? '#000' : '#ddd')};
`;
const RenderDuration = styled.View`
  margin-top: 10px;
  margin-left: 5px;
  width: 85px;
`;
const RenderDurationText = styled.Text<IsSelected>`
  font-size: 15px;
  color: ${(props) => (props.isSelected ? '#000' : '#ddd')};
`;
const RenderScheduleTitle = styled.View`
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;
const TimeListBox = styled.TouchableOpacity<IsSelected>`
  border-color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
  border-width: 0.6px;
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TimeListRow = styled(Row)`
  margin: 20px;
`;
const TimeListBoxText = styled.Text<IsSelected>`
  font-weight: ${(props) => (props.isSelected ? '600' : '300')};
  color: ${(props) => (props.isSelected ? `${props.color}` : '#CCCCCC')};
`;
const TimeListBold = styled.Text`
  font-weight: bold;
  font-size: 15px;
  margin-left: 15px;
  margin: 0 20px;
`;
export default ({
  STORE,
  originalDayList,
  timeTableIndex,
  timeListIndex,
  timeList,
  refreshing,
  onRefresh,
  gotoPayInfo,
  EMP_SEQ,
  data,
  getPeriod,
  numberComma,
  workTypeCheck,
  timeTable,
  explainModal,
  setTimeTableIndex,
  setTimeListIndex,
  setTimeList,
  getNumberToday,
  CALCULATE_DAY,
}) => {
  let image;

  if (Object.keys(data).length != 0) {
    image = data.images[0].IMAGE;
  } else {
    image = '3.png';
  }

  const RenderDayList = () => {
    if (timeTable && timeTable.length !== 0) {
      return (
        <RenderDayListContainer>
          {originalDayList?.map((originalDay) => (
            <RenderDayListItem
              key={originalDay.day}
              originalDay={originalDay}
            />
          ))}
        </RenderDayListContainer>
      );
    } else {
      return null;
    }
  };

  const RenderDayListItem = ({originalDay, key}) => {
    const substractHour = (startTime, endTime) => {
      const startTimeArray = startTime.split(':');
      let startTimeHour = Number(startTimeArray[0]);
      let startTimeMinute = Number(startTimeArray[1]);
      const endTimeArray = endTime.split(':');
      let endTimeHour = Number(endTimeArray[0]);
      let endTimeMinute = Number(endTimeArray[1]);
      let resultTimeHour = 0;
      let resultTimeMinute = 0;
      if (
        startTimeHour > endTimeHour ||
        (startTimeHour === endTimeHour && startTimeMinute > endTimeMinute)
      ) {
        endTimeHour += 24;
      }
      if (startTimeMinute > endTimeMinute) {
        endTimeHour--;
        endTimeMinute += 60;
      }
      resultTimeMinute = endTimeMinute - startTimeMinute;
      resultTimeHour = endTimeHour - startTimeHour;
      return `(${resultTimeHour}h ${resultTimeMinute}m)`;
    };
    let startTime = '00:00';
    let endTime = '00:00';
    let flag = false;
    let color = null;
    if (timeTableIndex !== null) {
      const timeListed = timeList;
      for (let i = 0; i < timeListed.length; i++) {
        const time = timeListed[i];
        for (const day of time.dayList) {
          if (day.isChecked && originalDay.day === day.day) {
            startTime = time.startTime;
            endTime = time.endTime;
            flag = true;
            if (timeListIndex !== null && timeListIndex === i) {
              color = time.color;
            }
          }
        }
      }
    }
    const substract = flag ? substractHour(startTime, endTime) : '';
    const isSelected = color && flag;
    return (
      <RenderDayRow key={key}>
        <RenderDayBox isSelected={isSelected} color={color}>
          <RenderDayBoxText isSelected={isSelected}>
            {originalDay.text}
          </RenderDayBoxText>
        </RenderDayBox>
        <RenderDayTime>
          <RenderDayTimeText isSelected={isSelected} substract={substract}>
            {isSelected ? startTime : '00:00'} ~{' '}
            {isSelected ? endTime : '00:00'}
          </RenderDayTimeText>
        </RenderDayTime>
        <RenderDuration>
          <RenderDurationText isSelected={isSelected}>
            {isSelected && substract}
          </RenderDurationText>
        </RenderDuration>
      </RenderDayRow>
    );
  };

  const RenderScheduleList = () => {
    console.log(timeTable);
    if (timeTable.length == 0) {
      return (
        <RenderScheduleTitle style={{alignItems: 'center', marginTop: 20}}>
          <GreyText>등록된 일정이 없습니다</GreyText>
          <GreyText>일정을 추가해주세요</GreyText>
        </RenderScheduleTitle>
      );
    } else {
      return (
        <RenderScheduleTitle>
          {timeTable?.map((table, index) => {
            return (
              <React.Fragment key={index}>
                {timeTableIndex === index && (
                  <>
                    <TimeListRow>
                      {timeTableIndex > 0 && (
                        <TouchableHighlight
                          onPress={() => {
                            const timeTableIndexed = timeTableIndex - 1;
                            setTimeTableIndex(timeTableIndexed);
                            setTimeListIndex(null);
                            setTimeList(timeTable[timeTableIndex].data);
                          }}>
                          <BackIcon size={22} color={'#999'} />
                        </TouchableHighlight>
                      )}
                      <TimeListBold>
                        {table.startDate}&nbsp;~&nbsp;
                        {table.endDate ||
                          (getNumberToday() < getNumberToday(table.startDate)
                            ? ''
                            : '현재')}
                      </TimeListBold>
                      {timeTableIndex < timeTable.length - 1 && (
                        <TouchableHighlight
                          onPress={() => {
                            const timeTableIndexed = timeTableIndex + 1;
                            setTimeTableIndex(timeTableIndexed);
                            setTimeListIndex(null);
                            setTimeList(timeTable[timeTableIndex].data);
                          }}>
                          <ForwardIcon size={22} color={'#999'} />
                        </TouchableHighlight>
                      )}
                    </TimeListRow>
                    {table?.data?.map((data, index) => (
                      <TimeListBox
                        isSelected={timeListIndex === index}
                        color={data.color}
                        key={index}
                        onPress={() => {
                          if (timeListIndex === index) {
                            setTimeListIndex(null);
                          } else {
                            setTimeListIndex(index);
                          }
                        }}>
                        <TimeListBoxText isSelected={timeListIndex === index}>
                          {data.startTime} ~ {data.endTime}
                        </TimeListBoxText>
                        <TimeListBoxText isSelected={timeListIndex === index}>
                          보기
                        </TimeListBoxText>
                      </TimeListBox>
                    ))}
                  </>
                )}
              </React.Fragment>
            );
          })}
        </RenderScheduleTitle>
      );
    }
  };
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
          />
        }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Section>
              <EmployeeBox>
                <Image
                  source={{uri: `${'http://133.186.209.113/uploads/' + image}`}}
                />
                <NameBox>
                  <Row>
                    <NameText>{data.EMP_NAME}</NameText>
                    <DateText>
                      {data.IS_MANAGER === '1' ? '[점장]' : '[스태프]'}
                    </DateText>
                  </Row>
                  <DateText>근무기간</DateText>
                  <DateText>
                    {data.START} ~ {data.END ? data.END : '계속'}
                  </DateText>
                </NameBox>
              </EmployeeBox>
            </Section>
            <Section>
              <WorkTypeAndSalaryBox>
                <WorkTypeAndSalaryBoxTitle>급여</WorkTypeAndSalaryBoxTitle>
              </WorkTypeAndSalaryBox>
              <WorkTypeAndSalaryInfoBox>
                <GreyText style={{fontSize: 12}}>
                  {getPeriod(CALCULATE_DAY)}
                </GreyText>
                <SmallLine />
                <Row>
                  <FixedGreyText style={{marginRight: 50}}>
                    {data.PAY_TYPE == '0'
                      ? '시급'
                      : data.PAY_TYPE == '1'
                      ? '일급'
                      : '월급'}
                  </FixedGreyText>
                  <GreyText style={{marginRight: 20}}>
                    {numberComma(data.PAY)}
                  </GreyText>
                  <GreyText>원</GreyText>
                </Row>
              </WorkTypeAndSalaryInfoBox>
            </Section>
            <Section>
              <WorkTypeAndSalaryBox>
                <WorkTypeAndSalaryBoxTitle>근무일정</WorkTypeAndSalaryBoxTitle>
              </WorkTypeAndSalaryBox>
              {!workTypeCheck && (
                <WorkTypeCheckSection>
                  <RenderScheduleList />
                  <RenderDayList />
                </WorkTypeCheckSection>
              )}
            </Section>
          </Container>
        </TouchableWithoutFeedback>
      </ScrollView>
    </BackGround>
  );
};
