import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {CheckMarkIcon} from '~/constants/Icons';
import FastImage from 'react-native-fast-image';

interface IsChecked {
  isChecked?: boolean;
}

const Text = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? '#ccc' : '#333')};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
`;

const Bold = styled(Text)`
  font-weight: bold;
`;

const TextContainer = styled.View`
  margin-top: 10px;
`;

const Touchable = styled.TouchableOpacity`
  z-index: 30;
  background-color: #f6f6f6;
  padding: 3px 0;
`;

const Name = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const NameText = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? '#ccc' : '#333')};
  font-size: 16px;
  font-weight: bold;
`;

const Line = styled.View`
  margin-top: 5px;
  height: 0.6px;
  background-color: #ccc;
`;

const DateText = styled.Text<IsChecked>`
  color: ${(props) => (props.isChecked ? '#ccc' : '#333')};
`;

const Item = styled.TouchableOpacity`
  width: ${wp('100%') - 110}px;
  background-color: transparent;
  border-radius: 10px;
  padding: 10px;
  margin-top: 3px;
  margin-left: 10px;
  min-height: 60px;
`;

const WhiteItem = styled(Item)`
  background-color: #fff;
`;

const IconContainer = styled.View<IsChecked>`
  top: -5px;
  right: -5px;
  position: absolute;
  z-index: 10;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isChecked ? '#ccc' : '#000')};
`;

const BorderBox = styled.View`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 10px;
  border-width: 0.7px;
  border-color: #ccc;
  justify-content: center;
  align-items: center;
`;

const GreyText = styled.Text`
  font-size: 12px;
  color: #aaa;
`;

export default ({item, confirmModal, cancelModal}) => {
  const navigation = useNavigation();
  if (item.checkType === '0') {
    return (
      <Row style={{marginTop: 10, marginBottom: 10}}>
        <Touchable
          onPress={() => confirmModal(item.shelfLife_SEQ, item.shelfLifeDate)}>
          {item.images?.length > 0 ? (
            <FastImage
              style={{width: 60, height: 60, borderRadius: 10}}
              source={{
                uri: 'http://cuapi.shop-sol.com/uploads/' + item.images[0],
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <BorderBox style={{zIndex: 10}}>
              <GreyText>사진 미등록</GreyText>
            </BorderBox>
          )}

          <IconContainer isChecked={true}>
            <CheckMarkIcon size={12} color={'#fff'} />
          </IconContainer>
        </Touchable>
        <WhiteItem
          onPress={() =>
            navigation.navigate('ShelfLifeUpdateScreen', {
              shelfLife_SEQ: item.shelfLife_SEQ,
              shelfLifeName: item.shelfLifeName,
              shelfLifeDate: item.shelfLifeDate,
              shelfLifeMemo: item.shelfLifeMemo,
            })
          }>
          <Name>
            <NameText>{item.shelfLifeName}</NameText>
            <DateText>
              {item.shelfLifeDate.slice(0, 4)}년{' '}
              {item.shelfLifeDate.slice(5, 7)}월
              {item.shelfLifeDate.slice(8, 10)}일
            </DateText>
          </Name>
          {item.shelfLifeMemo.length !== 0 && <Line />}
          {item.shelfLifeMemo.length !== 0 && (
            <TextContainer>
              <Text>{item.shelfLifeMemo}</Text>
            </TextContainer>
          )}
        </WhiteItem>
      </Row>
    );
  } else {
    return (
      <Row style={{marginTop: 10, marginBottom: 10}}>
        <Touchable
          onPress={() => cancelModal(item.shelfLife_SEQ, item.shelfLifeDate)}>
          {item.images?.length > 0 ? (
            <FastImage
              style={{width: 60, height: 60, borderRadius: 10}}
              source={{
                uri: 'http://cuapi.shop-sol.com/uploads/' + item.images[0],
                headers: {Authorization: 'someAuthToken'},
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          ) : (
            <BorderBox style={{zIndex: 10}}>
              <GreyText>사진 미등록</GreyText>
            </BorderBox>
          )}
          <IconContainer isChecked={false}>
            <CheckMarkIcon size={12} color={'yellow'} />
          </IconContainer>
        </Touchable>
        <Item onPress={() => {}} disabled={true}>
          <Name>
            <NameText isChecked={true}>{item.shelfLifeName}</NameText>
            <DateText isChecked={true}>
              {item.shelfLifeDate.slice(0, 4)}년&nbsp;
              {item.shelfLifeDate.slice(5, 7)}월&nbsp;
              {item.shelfLifeDate.slice(8, 10)}일
            </DateText>
          </Name>
          <Line />
          {item.shelfLifeMemo.length !== 0 && (
            <TextContainer>
              <Text isChecked={true}>{item.shelfLifeMemo}</Text>
            </TextContainer>
          )}
          <TextContainer>
            <Row>
              <Text isChecked={true}>처리직원: </Text>
              <Bold isChecked={true}>{item.checkEmpName}</Bold>
            </Row>
            <Row>
              <Text isChecked={true}>처리시간: </Text>
              <Bold isChecked={true}>
                {moment(item.checkTime).format('YYYY.MM.DD HH:mm:ss')}
              </Bold>
            </Row>
          </TextContainer>
        </Item>
      </Row>
    );
  }
};
