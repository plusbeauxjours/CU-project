import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';

import {CheckMarkIcon} from '../../../../constants/Icons';

const DataListItem = styled.TouchableOpacity`
  width: 100%;
  height: 150px;
  background-color: white;
  padding: 15px 10px;
  border-radius: 20px;
  margin-bottom: 20px;
`;
const DataListItemWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
`;

const DataListItemImageWrapper = styled.View`
  width: 45%;
  height: 100%;
`;

const DataListItemInfoWrapper = styled.View`
  width: 45%;
  height: 100%;
`;

const DataListItemInfoTopWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

const IconContainer = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

const TextBox = styled.View`
  justify-content: center;
  align-items: center;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const DataListItemInfoBottomWrapper = styled.View`
  height: 100px;
  flex-direction: row;
`;

const DataListItemInfoBottomText = styled.Text`
  flex: 1;
  flex-wrap: wrap;
`;

export default ({
  KEY,
  PDF_URL,
  IMG_URL2,
  CONTENTS2,
  PDF_SEQ,
  IMG_URL,
  PDF_YEAR,
  PDFCHECK_SEQ,
  CONTENTS,
}) => {
  const navigation = useNavigation();
  return (
    <DataListItem
      key={KEY}
      onPress={() => {
        navigation.navigate('MyCuMonthlyDetailScreen', {
          PDF_URL: `http://cuapi.shop-sol.com/uploads/pdf/${PDF_URL}`,
          IMG_URL2: `http://cuapi.shop-sol.com/uploads/pdf/${IMG_URL2}`,
          CONTENTS2,
          PDF_SEQ,
        });
      }}>
      <DataListItemWrapper>
        <DataListItemImageWrapper>
          <FastImage
            style={{width: '100%', height: 120}}
            source={{
              uri: `http://cuapi.shop-sol.com/uploads/pdf/${IMG_URL}`,
              headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.low,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </DataListItemImageWrapper>
        <DataListItemInfoWrapper>
          <DataListItemInfoTopWrapper>
            <TextBox>
              <Bold>{PDF_YEAR}</Bold>
            </TextBox>
            {PDFCHECK_SEQ && (
              <IconContainer>
                <CheckMarkIcon size={12} color={'yellow'} />
              </IconContainer>
            )}
          </DataListItemInfoTopWrapper>
          <DataListItemInfoBottomWrapper>
            <DataListItemInfoBottomText>{CONTENTS}</DataListItemInfoBottomText>
          </DataListItemInfoBottomWrapper>
        </DataListItemInfoWrapper>
      </DataListItemWrapper>
    </DataListItem>
  );
};
