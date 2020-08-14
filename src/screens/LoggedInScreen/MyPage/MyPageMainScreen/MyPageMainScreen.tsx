import React from 'react';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import {userLogout} from '../../../../redux/userSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';

const BackGround = styled.View`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const Info = styled.View`
  height: ${hp('15%')};
  width: ${wp('100%')};
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const BoxArea = styled.View`
  margin-top: 20px;
  padding: 20px 0;
  background-color: white;
`;

const Image = styled.Image`
  height: 70px;
  width: 70px;
  border-radius: 50px;
  border-width: 1px;
  border-color: #e0e0e0;
  background-color: white;
  margin-left: 40px;
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

const BoxContainer = styled.TouchableOpacity`
  width: ${wp('100%')};
  flex-direction: row;
  padding: 20px 0;
  justify-content: space-between;
  align-items: center;
  border-color: #bbb;
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
  margin-right: 30px;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE, version, NAME, mobileNo} = useSelector(
    (state: any) => state.userReducer,
  );

  const logOut = (title, text) => {
    const params = {
      type: 'confirm',
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

  const Box = ({onPress, title}) => (
    <BoxContainer onPress={() => onPress()}>
      <BoxTitle>{title}</BoxTitle>
      <Arrow>
        {title === '로그 아웃' ? (
          <Icon name="logout" size={20} color="#642A8C" />
        ) : title === '앱버전' ? (
          <BoxTitle>{version}</BoxTitle>
        ) : (
          <Icon name="right" size={16} color="#642A8C" />
        )}
      </Arrow>
    </BoxContainer>
  );

  return (
    <BackGround>
      <Phone>fsdafsadf</Phone>
      {/* <ScrollView>
        <Container>
          <Info>
            <Image source={{uri: `http://133.186.209.113/uploads/3.png`}} />

            <PersonInfo>
              <Name>
                <NameText>{NAME}</NameText>
                <PositionText>{STORE == 1 ? '[점주]' : '[직원]'}</PositionText>
              </Name>

              <Phone>
                <PhoneText>{mobileNo}</PhoneText>
              </Phone>
            </PersonInfo>
          </Info> */}
      {/* <BoxArea>
            <Box
              onPress={navigation.navigate('MyPageAlarmSetScreen')}
              title={'알림 설정'}
            />
            <Box
              onPress={navigation.navigate('MyPagePlaceSetScreen')}
              title={STORE == 1 ? '사업장관리 이력' : '근무종료 사업장'}
            />
            <Box
              onPress={navigation.navigate('MyPageAppointmentScreen')}
              title={'약관보기'}
            />
            {STORE == '1' && (
              <Box
                onPress={navigation.navigate('ElectronicContractsScreen2')}
                title={'전자근로계약서'}
              />
            )}
            <Box
              onPress={navigation.navigate('MyPageIdSetMainScreen', {
                mobileNo: mobileNo,
                STORE: STORE,
              })}
              title={'계정관리'}
            />
            <Box onPress={'MyPageAlarmSet'} title={'알림 설정'} />
            <Box onPress={() => {}} title={'알림 설정'} />
            <Box
              onPress={logOut('', '로그아웃 하시겠습니까?')}
              title={'로그 아웃'}
            />
          </BoxArea>
        </Container>
      </ScrollView> */}
    </BackGround>
  );
};
