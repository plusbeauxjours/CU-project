import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'react-native-elements';

import {ForwardIcon} from '../../../../constants/Icons';

const Touchable = styled.TouchableOpacity`
  margin-top: 10px;
  padding: 10px 0;
  width: ${wp('85%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px;
  background-color: white;
`;

const ImageArea = styled.View`
  margin: 0 10px;
  flex-direction: row;
  align-items: center;
`;

const TitleArea = styled.View`
  margin-left: 10px;
  flex-direction: row;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
`;

const SubText = styled.Text`
  margin-left: 3px;
  font-size: 12px;
`;

export default ({
  key,
  name,
  isManager,
  image,
  data,
  STORE,
  STORE_SEQ,
  STOREPAY_SHOW,
}) => {
  const navigation = useNavigation();
  const payInfo = () => {
    navigation.navigate('EmpPayInfoScreen', {
      STORE_SEQ,
      EMP_SEQ: data.EMP_SEQ,
      STORE,
      STOREPAY_SHOW,
      NAME: name,
      ISMANAGER: isManager,
    });
  };
  return (
    <Touchable key={key} onPress={() => payInfo()}>
      <ImageArea>
        <Avatar
          rounded
          size={60}
          source={{
            uri: `http://133.186.209.113/uploads/${image}`,
          }}
          containerStyle={{
            borderWidth: 1,
            borderColor: '#ccc',
          }}
        />
        <TitleArea>
          <NameText>{name}</NameText>
          <SubText>[{isManager}]</SubText>
        </TitleArea>
      </ImageArea>
      <ForwardIcon size={22} color={'black'} />
    </Touchable>
  );
};
