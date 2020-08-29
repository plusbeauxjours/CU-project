import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {NewBoxIcon, PinIcon} from '../../../../constants/Icons';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface IsFavorite {
  isFavorite: boolean;
}

const Section = styled.View`
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  padding: 20px;
  flex-direction: row;
  background-color: white;
  background-color: green;
  margin-bottom: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ContentFont = styled.Text`
  margin-bottom: ${hp('1.5%')}px;
  margin-right: ${wp('20%')}px;
  color: #7b7b7b;
`;

const Image = styled.Image`
  width: ${wp('25%')}px;
  height: 100%;
  border-width: 1px;
  border-radius: 15px;
  border-color: #ddd;
`;
const Touchable = styled.TouchableOpacity``;

const NewBadge = styled.View`
  position: absolute;
  left: -10px;
  top: 10px;
`;

const PinTouchable = styled.TouchableOpacity<IsFavorite>`
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: ${(props) => (props.isFavorite == '1' ? '#000' : '#ddd')};
  z-index: 2;
`;

const InfoText = styled.Text`
  color: #c0c0c0;
`;

const GreyText = styled.Text`
  font-size: 12px;
  color: #aaa;
`;

const WhiteText = styled.Text`
  font-size: 11px;
  color: white;
`;

const ImageSection = styled.View`
  position: relative;
  align-items: center;
  padding: 15px 0;
`;

const Another = styled.View`
  position: absolute;
  bottom: 20px;
  right: 5px;
  align-items: center;
  justify-content: center;
`;

const AnotherBox = styled.View`
  padding: 5px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #000;
  opacity: 0.6;
`;

const AddressBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${hp('0.5%')}px;
`;

const ContentBox = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  padding-left: ${wp('5%')}px;
`;

export default ({
  key,
  COM_SEQ,
  MEMBER_SEQ,
  ME,
  STORE,
  NOTICE_SEQ,
  NOTI_TITLE,
  CONTENTS,
  CREATE_TIME,
  EMP_NAME,
  IMG_LIST,
  type,
  favorite,
  confirmModal,
  NoticeCheck_SEQ,
}) => {
  const navigation = useNavigation();

  var imgarr = [];
  var allimg = [];

  if (IMG_LIST != null) {
    allimg = IMG_LIST.split('@');
    imgarr.push(allimg[0]);
  }
  return (
    <Touchable
      key={key}
      onPress={() => {
        navigation.navigate('ChecklistShareItemScreen', {
          TITLE: `${type}`,
          COM_SEQ,
          MEMBER_SEQ,
          ME,
          STORE,
          NOTICE_SEQ,
          NOTI_TITLE,
          CONTENTS,
          CREATE_TIME,
          EMP_NAME,
          IMG_LIST,
          type,
          favorite,
          confirmModal,
          NoticeCheck_SEQ,
        });
      }}>
      <Section>
        {ME !== MEMBER_SEQ && NoticeCheck_SEQ == null && (
          <NewBadge>
            <NewBoxIcon />
          </NewBadge>
        )}
        <ContentBox>
          <Row>
            <ContentFont numberOfLines={1}>{NOTI_TITLE}</ContentFont>
            {type !== 'CU소식' && (
              <PinTouchable onPress={() => confirmModal(NOTICE_SEQ)}>
                <PinIcon size={16} color={favorite !== '1' && '#aaa'} />
              </PinTouchable>
            )}
          </Row>
          <Row>
            <ContentFont numberOfLines={1}>{CONTENTS}</ContentFont>
          </Row>
          {favorite == '1' && (
            <AddressBox>
              {type !== 'CU소식' && (
                <InfoText>{moment(CREATE_TIME).format('YYYY.MM.DD')}</InfoText>
              )}
            </AddressBox>
          )}
        </ContentBox>
        <ImageSection>
          {imgarr?.length > 0 ? (
            <Image
              source={{
                uri: 'http://cuapi.shop-sol.com/uploads/' + imgarr[0],
              }}
              resizeMode="cover"
            />
          ) : (
            <GreyText>사진 미등록</GreyText>
          )}
          {allimg?.length > 1 && (
            <Another>
              <AnotherBox>
                <WhiteText>+</WhiteText>
                <WhiteText>{allimg.length - 1}</WhiteText>
              </AnotherBox>
            </Another>
          )}
        </ImageSection>
      </Section>
    </Touchable>
  );
};
