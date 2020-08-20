import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from '../../../../constants/utils';

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

const Image = styled.Image`
  width: ${hp('7%')}px;
  height: ${hp('7%')}px;
  border-radius: 50px;
  border-color: #ccc;
  border-width: 1px;
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
    navigation.navigate('EmpPaymentInfoScreen', {
      STORE_SEQ,
      EMP_SEQ: data.EMP_SEQ,
      STORE,
      STOREPAY_SHOW,
      NAME: name,
      IMAGE: image,
      ISMANAGER: isManager,
    });
  };
  return (
    <Touchable key={key} onPress={() => payInfo()}>
      <ImageArea>
        <Image
          source={{
            uri: `${'http://133.186.209.113/uploads/' + image}`,
          }}
        />
        <TitleArea>
          <NameText>{name}</NameText>
          <SubText>[{isManager}]</SubText>
        </TitleArea>
      </ImageArea>
      <Icon
        name={
          utils.isAndroid
            ? 'md-chevron-forward-outline'
            : 'ios-chevron-forward-outline'
        }
        size={22}
        color="#bbb"
      />
    </Touchable>
  );
};
