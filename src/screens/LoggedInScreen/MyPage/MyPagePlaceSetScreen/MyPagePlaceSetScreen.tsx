import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';

import api from '~/constants/LoggedInApi';
import MyPagePlaceSetCard from './MyPagePlaceSetCard';
import {setCLOSED_STORE_DATA} from '~/redux/mypageSlice';
import {setSplashVisible} from '~/redux/splashSlice';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Box = styled.View`
  height: ${hp('7%')}px;
  width: ${wp('90%')}px;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin: 20px 0;
`;

const BoxText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #999999;
`;

const Section = styled.View`
  width: ${wp('100%') - 40}px;
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: white;
  margin: 20px 20px 0 20px;
`;

const ScrollView = styled.ScrollView``;

export default () => {
  const dispatch = useDispatch();
  const {MEMBER_SEQ, STORE} = useSelector((state: any) => state.userReducer);
  const {CLOSED_STORE_DATA} = useSelector((state: any) => state.mypageReducer);

  const fetchData = async () => {
    if (STORE == 1) {
      try {
        if (!CLOSED_STORE_DATA) {
          dispatch(setSplashVisible(true));
        }
        const {data} = await api.closeList(MEMBER_SEQ);
        if (data.message === 'SUCCESS') {
          dispatch(setCLOSED_STORE_DATA(data.result));
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        if (!CLOSED_STORE_DATA) {
          dispatch(setSplashVisible(true));
        }
        const {data} = await api.endList(MEMBER_SEQ);
        if (data.message === 'SUCCESS') {
          dispatch(setCLOSED_STORE_DATA(data.result));
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BackGround>
      <Section style={{alignItems: 'center'}}>
        <BoxText>
          {STORE == '1' ? '폐업 사업장 목록' : '종료 사업장 목록'}
        </BoxText>
      </Section>
      <ScrollView
        contentContainerStyle={{width: wp('100%'), alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        {CLOSED_STORE_DATA?.length === 0 && (
          <BoxText style={{marginTop: 30}}>
            {STORE == '1' ? '폐업 사업장' : '종료 사업장'}이 없습니다
          </BoxText>
        )}
        {CLOSED_STORE_DATA?.map((data: any, index) => (
          <MyPagePlaceSetCard
            key={index}
            name={data.NAME}
            addr={data.ADDR1 + data.ADDR2}
            data={data}
          />
        ))}
      </ScrollView>
    </BackGround>
  );
};
