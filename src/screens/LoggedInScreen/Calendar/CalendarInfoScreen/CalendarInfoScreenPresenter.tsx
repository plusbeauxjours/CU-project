import moment from 'moment';
import React from 'react';
import {Agenda} from 'react-native-calendars';
import styled from 'styled-components/native';

import {DownIcon} from '../../../../constants/Icons';
import CalendarInfoScreenCard from './CalendarInfoScreenCard';

interface IWeekend {
  weekend: string;
}

const GreyText = styled.Text`
  color: #aaa;
`;

const View = styled.View`
  align-items: center;
  padding-bottom: 5px;
`;

const Row = styled.View`
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;
  border-color: #aaa;
`;

const KnobIconContainer = styled.View`
  width: 70px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #aace36;
`;

const Bold = styled.Text<IWeekend>`
  font-weight: bold;
  padding: 0 15px;
  color: ${(props) =>
    props.weekend == '토'
      ? 'skyblue'
      : props.weekend == '일'
      ? 'red'
      : 'black'};
`;

export default ({
  STORE,
  STORE_SEQ,
  CALENDAR_EDIT,
  onDayPressFn,
  onChangeMonth,
  CALENDAR_MARKED,
  CALENDAR_DATA,
}) => {
  const rowHasChanged = (r1, r2) => false;
  const renderKnob = () => (
    <KnobIconContainer>
      <DownIcon />
    </KnobIconContainer>
  );

  const renderItem = (data, index) => (
    <>
      <CalendarInfoScreenCard
        index={index}
        data={data}
        SCH_ID={data.WORKDATE}
        VACATION={data.VACATION}
        TYPE={data.TYPE}
        STORE_SEQ={STORE_SEQ}
        NAME={data.NAME}
        date={data.WORKDATE}
        image={data.IMAGE}
        ICON={data.ICON}
        nowork={data.nowork}
        workoff={data.workoff}
        working={data.working}
        alear={data.alear}
        jigark={data.jigark}
        CHANGE_START={data.CHANGE_START}
        CHANGE_END={data.CHANGE_END}
        ATTENDANCE_TIME={data.ATTENDANCE_TIME}
        START={data.START}
        WORK_OFF_TIME={data.WORK_OFF_TIME}
        END={data.END}
        UPDATED_START={data.UPDATED_START}
        UPDATED_END={data.UPDATED_END}
        START_TIME={data.START_TIME}
        END_TIME={data.END_TIME}
        REST_TIME={data.REST_TIME}
      />
    </>
  );

  const renderEmptyDate = () => (
    <View>
      <GreyText>
        {STORE == '1' || (STORE == '0' && CALENDAR_EDIT)
          ? '일정근무 직원이 없습니다.'
          : '근무일정이 없습니다.'}
      </GreyText>
    </View>
  );
  return (
    <Agenda
      items={CALENDAR_DATA}
      renderItem={renderItem}
      onDayPress={onDayPressFn}
      renderEmptyDate={renderEmptyDate}
      renderKnob={renderKnob}
      markedDates={CALENDAR_MARKED}
      theme={{
        agendaTodayColor: '#AACE36',
        selectedDayBackgroundColor: '#ddd',
        todayTextColor: '#AACE36',
        'stylesheet.agenda.list': {
          container: {
            flexDirection: 'column',
          },
        },
      }}
      refreshControl={null}
      refreshing={false}
      monthFormat={'yyyy년 M월'}
      renderDay={(day, item) => {
        if (day !== undefined) {
          let DAY = '0';
          if (moment(day).format('M') == '0') {
            DAY = '일';
          } else if (moment(day).format('M') == '1') {
            DAY = '월';
          } else if (moment(day).format('M') == '2') {
            DAY = '화';
          } else if (moment(day).format('M') == '3') {
            DAY = '수';
          } else if (moment(day).format('M') == '4') {
            DAY = '목';
          } else if (moment(day).format('M') == '5') {
            DAY = '금';
          } else {
            DAY = '토';
          }
          if (item !== undefined) {
            return (
              <Row>
                <Bold weekend={day}>
                  {day.month}월 {day.day}일 {DAY}요일
                </Bold>
              </Row>
            );
          } else {
            if (day !== undefined) {
              return (
                <Row>
                  <Bold weekend={day}>
                    {day.month}월 {day.day}일 {DAY}요일
                  </Bold>
                </Row>
              );
            }
          }
        }
      }}
      rowHasChanged={rowHasChanged}
      loadItemsForMonth={(month) => onChangeMonth(month)}
      markingType={'multi-dot'}
    />
  );
};
