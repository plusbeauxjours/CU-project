import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Avatar} from 'react-native-elements';

import {userLogout} from '../../../../redux/userSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {ForwardIcon, LogoutIcon} from '../../../../constants/Icons';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Info = styled.View`
  height: ${hp('15%')}px;
  width: ${wp('100%')}px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const BoxArea = styled.View`
  margin-top: 20px;
  padding: 20px 0;
  background-color: white;
`;

const PersonInfo = styled.View`
  margin-left: 20px;
  height: 80px;
  justify-content: center;
`;

const Name = styled.View`
  flex-direction: row;
  height: 30px;
  align-items: center;
`;

const NameText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #707070;
`;

const PositionText = styled.Text`
  font-size: 13px;
  margin-left: 5px;
  color: #707070;
`;

const Phone = styled.View`
  height: 30px;
  justify-content: center;
`;

const PhoneText = styled.Text`
  font-size: 13px;
  margin-left: 10px;
  color: #707070;
`;

const BoxTitle = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #212121;
  margin-left: 30px;
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

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE, version, NAME, mobileNo} = useSelector(
    (state: any) => state.userReducer,
  );

  const logOut = (title, text) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      okCallback: () => {
        dispatch(userLogout());
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoggedOutNavigation',
              state: {routes: [{name: 'StartScreen'}]},
            },
          ],
        });
      },
      okButtonText: '로그아웃',
      cancelButtonText: '취소',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const ArrowIcon = () => (
    <Arrow>
      <ForwardIcon size={22} />
    </Arrow>
  );

  return (
    <BackGround>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Info>
          <Avatar
            rounded
            size={60}
            source={{
              uri: `http://133.186.209.113/uploads/3.png`,
            }}
            containerStyle={{
              borderWidth: 1,
              borderColor: '#ccc',
              marginLeft: 40,
            }}
          />
          <PersonInfo>
            <Name>
              <NameText>{NAME}</NameText>
              <PositionText>{STORE == 1 ? '[점주]' : '[직원]'}</PositionText>
            </Name>

            <Phone>
              <PhoneText>{mobileNo}</PhoneText>
            </Phone>
          </PersonInfo>
        </Info>
        <BoxArea>
          <Card
            onPress={() => {
              navigation.navigate('MyPageAlarmSetScreen');
            }}>
            <CardText>알림 설정</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              navigation.navigate('MyPagePlaceSetScreen');
            }}>
            <CardText>
              {STORE == 1 ? '사업장관리 이력' : '근무종료 사업장'}
            </CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              navigation.navigate('MyPageAppointmentScreen');
            }}>
            <CardText>약관보기</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              navigation.navigate('ElectronicContractsScreen');
            }}>
            <CardText>전자근로계약서</CardText>
            <ArrowIcon />
          </Card>
          <Card
            onPress={() => {
              navigation.navigate('MyPageIdSetMainScreen', {
                mobileNo: mobileNo,
                STORE: STORE,
              });
            }}>
            <CardText>계정관리</CardText>
            <ArrowIcon />
          </Card>
          <Card>
            <CardText>앱버전</CardText>
            <Arrow>
              <BoxTitle>{version}</BoxTitle>
            </Arrow>
          </Card>
          <Card
            onPress={() => {
              logOut('', '로그아웃 하시겠습니까?');
            }}>
            <CardText>로그 아웃</CardText>
            <Arrow>
              <LogoutIcon size={24} />
            </Arrow>
          </Card>
        </BoxArea>
      </ScrollView>
    </BackGround>
  );
};
