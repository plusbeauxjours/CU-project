import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import {
  ForwardIcon,
  TimerIcon,
  CalendarTimesIcon,
} from '../../../../constants/Icons';

interface Icolor {
  color: string;
}
const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;
const Touchable = styled.TouchableOpacity``;

const ScrollView = styled.ScrollView``;

const Text = styled.Text<Icolor>`
  margin-left: 10px;
  font-size: 15px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
  height: 60px;
`;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data: SCH_ID, STORE_SEQ, date, addWork} = params;
  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text, cancel, okBtn) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => {
        deleteAddWorkFn();
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteAddWorkFn = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.deleteSchedule({SCH_ID});
      navigation.goBack();
      alertModal('추가일정 삭제완료');
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const Menu = ({menu, title}) => (
    <Touchable
      activeOpacity={1}
      onPress={() => {
        if (menu == '') {
          return confirmModal('', `추가일정을 삭제합니다`, '취소', '삭제');
        }
        navigation.navigate(menu, {
          data: SCH_ID,
          STORE_SEQ,
          date,
        });
      }}>
      <RowSpace>
        {menu == 'WorkDayRestTypeScreen' ? (
          <CalendarTimesIcon color={'#FF3D3D'} />
        ) : (
          menu !== '' && <TimerIcon color={'#642A8C'} />
        )}
        <Text color={menu == '' ? '#FF3D3D' : '#642A8C'}>{title}</Text>
        <ForwardIcon size={24} color={menu == '' ? '#FF3D3D' : '#642A8C'} />
      </RowSpace>
    </Touchable>
  );

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Menu menu={'WorkDayRestTypeScreen'} title={'휴무 설정'} />
          <Menu menu={'WorkDayRestTimeScreen'} title={'휴게시간 설정'} />
          {addWork == 'addWork' && <Menu menu={''} title={'추가일정 삭제'} />}
        </Container>
      </ScrollView>
    </BackGround>
  );
};
