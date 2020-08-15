import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import utils from '../../../../constants/utils';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Arrow = styled.View`
  color: #5887f9;
  font-size: 20px;
`;

const Card = styled.TouchableOpacity`
  padding: ${hp('2%')}px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardText = styled.Text`
  font-size: 15px;
  color: #212121;
`;

export default ({route: {params}}) => {
  const {mobileNo, STORE} = params;
  console.log(mobileNo, STORE);
  const navigation = useNavigation();
  const ArrowIcon = () => (
    <Arrow>
      <Icon
        name={utils.isAndroid ? 'md-chevron-back' : 'ios-chevron-back'}
        size={16}
        color="#642A8C"
      />
    </Arrow>
  );
  return (
    <BackGround>
      <Card
        onPress={() => {
          navigation.navigate('MyPageNameSetScreen');
        }}>
        <CardText>이름 변경</CardText>
        <ArrowIcon />
      </Card>
      <Card
        onPress={() => {
          navigation.navigate('MyPagePasswordSetScreen', {mobileNo: mobileNo});
        }}>
        <CardText>비밀번호 재설정</CardText>
        <ArrowIcon />
      </Card>
      <Card
        onPress={() => {
          navigation.navigate('MyPageDeleteSetScreen');
        }}>
        <CardText>회원 탈퇴</CardText>
        <ArrowIcon />
      </Card>
    </BackGround>
  );
};
