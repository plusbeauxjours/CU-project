import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';

import {LocationIcon} from '../../../../constants/Icons';

const Touchable = styled.TouchableOpacity``;
const Container = styled.View`
  width: ${wp('90%')}px;
  padding: 20px;
  background-color: white;
  flex-direction: column;
  border-radius: 20px;
  margin-bottom: ${hp('3%')}px;
`;

const NameText = styled.Text`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: ${hp('1.5%')}px;
`;

const AddressBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${hp('0.5%')}px;
`;

const AddressText = styled.Text`
  font-size: 13px;
  color: grey;
`;

const IconContainer = styled.View`
  width: 20px;
  align-items: center;
  margin: 1px 3px 0 0;
`;

export default ({key, name, addr, data}) => (
  <Touchable key={key} disabled={true}>
    <Container>
      <NameText>{name}</NameText>
      <AddressBox>
        <IconContainer>
          <LocationIcon size={17} />
        </IconContainer>
        <AddressText>{addr ? addr : '주소 미등록'}</AddressText>
      </AddressBox>
    </Container>
  </Touchable>
);
