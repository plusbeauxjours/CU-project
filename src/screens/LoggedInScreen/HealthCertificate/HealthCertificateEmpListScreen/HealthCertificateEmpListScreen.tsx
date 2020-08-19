import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

import HealthCertificateEmpListCard from './HealthCertificateEmpListCard';
import api from '../../../../constants/LoggedInApi';
import utils from '../../../../constants/utils';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView`
  width: ${wp('100%')}px;
  align-items: center;
  padding-top: 30px;
  margin-bottom: 20px;
`;

const Bold = styled.Text`
  font-weight: bold;
  margin-left: 5px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Box = styled.View`
  margin-bottom: 20px;
`;

const GreyText = styled.Text`
  color: #aaa;
  font-size: 16px;
`;

export default ({route: {params}}) => {
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {STOREDATA, STORE, type} = params;
  const {STORE_SEQ} = STOREDATA.resultdata;

  const [dataList, setDataList] = useState<[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const fetchData = async () => {
    try {
      const {data} = await api.storeHealthEmpList(MEMBER_SEQ, STORE_SEQ, STORE);
      console.log(
        'data on healthCertificationEmpLIstScreen====================================================================================',
        data,
      );
      setDataList(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BackGround>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {STORE == '1' && (
          <Box>
            <Row>
              <Icon
                name={utils.isAndroid ? 'md-checkmark' : 'ios-checkmark;'}
                size={14}
                color="#642A8C"
              />
              <Bold>직원이 '조기경보'화면에서 직접 등록이 가능합니다.</Bold>
            </Row>
            <Row>
              <Icon
                name={utils.isAndroid ? 'md-checkmark' : 'ios-checkmark;'}
                size={14}
                color="#642A8C"
              />
              <Bold>직원은 본인 보건증만 확인이 가능합니다.</Bold>
            </Row>
          </Box>
        )}
        {dataList.length !== 0 ? (
          dataList.map((data: any, index) => {
            return (
              <HealthCertificateEmpListCard
                key={index}
                STOREDATA={STOREDATA}
                STORE_HEALTH_SEQ={data.STORE_HEALTH_SEQ}
                STORE_SEQ={STORE_SEQ}
                EMP_SEQ={data.EMP_SEQ}
                NAME={data.NAME}
                MANAGER={data.IS_MANAGER}
                EDUCATION_DATE={data.EDUCATION_DATE}
                EDUCATION_HOUR={data.EDUCATION_HOUR}
                EDUCATION_TYPE={data.EDUCATION_TYPE}
                TESTING_DATE={data.RESULT_DATE}
                TESTING_COUNT={data.RESULT_COUNT}
                TESTING_DAY={data.TESTING_DAY}
                PUSH_DAY={data.PUSH_DAY}
                TESTING_CERTIFICATE={data.IMG_LIST}
                REG_DT={data.REG_DT}
                REAL_NAME={data.REAL_NAME}
                SETTIME={data.SETTIME}
                IMG_LIST={data.IMG_LIST}
                type={type}
                onRefresh={onRefresh}
              />
            );
          })
        ) : (
          <Box>
            <GreyText>근무중인 직원이 없습니다</GreyText>
          </Box>
        )}
      </ScrollView>
    </BackGround>
  );
};
