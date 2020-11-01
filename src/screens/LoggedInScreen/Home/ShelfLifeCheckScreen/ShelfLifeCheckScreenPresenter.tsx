import React from 'react';
import {Agenda} from 'react-native-calendars';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

import {CheckMarkIcon, DownIcon} from '~/constants/Icons';
import moment from 'moment';
import Donut from '~/components/Donut';

interface IsChecked {
  isChecked: boolean;
}

const View = styled.View``;
const KnobIconContainer = styled.View`
  width: 70px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #aace36;
`;

const RenderEmpty = styled.View`
  flex: 1;
  margin-top: 30px;
  border-top-width: 1px;
  border-color: #ddd;
`;

const Item = styled.TouchableOpacity<IsChecked>`
  margin: 10px 0;
  background-color: ${(props) => (props.isChecked ? '#ddd' : '#fff')};
  border-radius: 5px;
  padding: 10px;
  margin-right: 10px;
  height: 150px;
`;

const IconContainer = styled.View<IsChecked>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isChecked ? '#ddd' : '#000')};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 12px;
`;

const Bold = styled(Text)`
  font-weight: bold;
`;

const TextContainer = styled.View`
  margin-top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  position: absolute;
  top: -10px;
  right: -10px;
  padding: 10px;
`;

const Name = styled.View`
  flex: 1;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 0.6px;
  background-color: #aaa;
`;

const Date = styled.View`
  margin-top: 10px;
  align-items: flex-end;
`;

const DateText = styled.Text`
  color: #aaa;
`;

export default ({
  SHELFLIFE_DATA,
  onDayPress,
  onRefresh,
  confirmModal,
  cancelModal,
  dayBefore,
  weekBefore,
  weeksBefore,
  monthBefore,
  loading,
}) => {
  const navigation = useNavigation();
  const renderEmptyDate = () => <RenderEmpty />;
  const rowHasChanged = (r1, r2) => r1 !== r2;
  const renderKnob = () => (
    <KnobIconContainer>
      <DownIcon />
    </KnobIconContainer>
  );

  const renderItem = (item: any) => {
    const {
      shelfLife_SEQ,
      shelfLifeName,
      shelfLifeDate,
      checkTime,
      checkEmpName,
      shelfLifeMemo,
      checkType,
    } = item;
    return (
      <Item
        isChecked={checkType !== '0'}
        onPress={() =>
          navigation.navigate('ShelfLifeUpdateScreen', {
            shelfLife_SEQ,
            shelfLifeName,
            shelfLifeDate,
            shelfLifeMemo,
          })
        }>
        <Name>
          <NameText>{shelfLifeName}</NameText>
          <Touchable
            onPress={() => {
              if (checkType == '0') {
                confirmModal(shelfLife_SEQ, shelfLifeDate);
              } else {
                cancelModal(shelfLife_SEQ, shelfLifeDate);
              }
            }}>
            <IconContainer isChecked={checkType == '0'}>
              <CheckMarkIcon
                size={12}
                color={checkType == '0' ? '#bbb' : 'yellow'}
              />
            </IconContainer>
          </Touchable>
        </Name>
        <Date>
          <DateText>
            {shelfLifeDate.slice(0, 4)}년 {shelfLifeDate.slice(5, 7)}월
            {shelfLifeDate.slice(8, 10)}일
          </DateText>
        </Date>
        {(checkType == '1' || shelfLifeMemo !== '') && <Line />}
        {shelfLifeMemo !== '0' && (
          <TextContainer>
            <Text>{shelfLifeMemo}</Text>
          </TextContainer>
        )}
        {checkType !== '0' && (
          <TextContainer>
            <Row>
              <Text>처리직원: </Text>
              <Bold>{checkEmpName}</Bold>
            </Row>
            <Row>
              <Text>처리시간: </Text>
              <Bold>{moment(checkTime).format('YYYY.MM.DD HH:mm:ss')}</Bold>
            </Row>
          </TextContainer>
        )}
      </Item>
    );
  };
  if (!loading) {
    return (
      <View>
        <Text>
          {dayBefore.length}개 중
          {dayBefore.filter((i) => i.checkType === '1').length}개 처리
          {Math.ceil(
            (dayBefore.filter((i) => i.checkType === '1').length /
              dayBefore.length) *
              100,
          )}
          %
        </Text>
        <Text>
          {weekBefore.length}개 중
          {weekBefore.filter((i) => i.checkType === '1').length}개 처리
          {Math.ceil(
            (weekBefore.filter((i) => i.checkType === '1').length /
              weekBefore.length) *
              100,
          )}
          %
        </Text>
        <Text>
          {weeksBefore.length}개 중
          {weeksBefore.filter((i) => i.checkType === '1').length}개 처리
          {Math.ceil(
            (weeksBefore.filter((i) => i.checkType === '1').length /
              weeksBefore.length) *
              100,
          )}
          %
        </Text>
        <Text>
          {monthBefore.length}개 중
          {monthBefore.filter((i) => i.checkType === '1').length}개 처리
          {Math.ceil(
            (monthBefore.filter((i) => i.checkType === '1').length /
              monthBefore.length) *
              100,
          )}
          %
        </Text>
        <Donut
          percentage={240}
          color={'red'}
          delay={500 + 100 * 20}
          max={500}
        />
      </View>
      // <Agenda
      //   items={SHELFLIFE_DATA}
      //   renderItem={renderItem}
      //   renderEmptyDate={renderEmptyDate}
      //   renderKnob={renderKnob}
      //   onDayPress={(date) => onDayPress(date)}
      //   theme={{
      //     agendaTodayColor: '#AACE36',
      //     selectedDayBackgroundColor: '#ddd',
      //     dotColor: '#642A8C',
      //     todayTextColor: '#AACE36',
      //   }}
      //   refreshControl={null}
      //   rowHasChanged={rowHasChanged}
      //   monthFormat={'yyyy년 M월'}
      //   onRefresh={onRefresh}
      // />
    );
  } else {
    return null;
  }
};
