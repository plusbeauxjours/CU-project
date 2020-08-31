import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PaymentInfoScreenPresenter from './PaymentInfoScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import {useNavigation} from '@react-navigation/native';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ, STOREPAY_SHOW} = params;

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [employeeNowOn, setEmployeeNowOn] = useState<any>([]);
  const [maindata, setMaindata] = useState<any>({});
  const [year, setYear] = useState<number>(0);
  const [month, setMonth] = useState<number>(0);
  const data = [
    {
      key: 1,
      day: '2019.10.16(월)',
      base: '12,524원',
      night: '12,524원',
      over: '12,524원',
      holi: '12,524원',
      late: '12,524원',
      total: '12,524원',
    },
    {
      key: 2,
      day: '2019.10.16(월)',
      base: '12,524원',
      night: '12,524원',
      over: '12,524원',
      holi: '12,524원',
      late: '12,524원',
      total: '12,524원',
    },
    {
      key: 3,
      day: '2019.10.16(월)',
      base: '12,524원',
      night: '12,524원',
      over: '12,524원',
      holi: '12,524원',
      late: '12,524원',
      total: '12,524원',
    },
  ];

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const explainModal = (title, text) => {
    const params = {
      alertType: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

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

  const nextpay = async () => {
    dispatch(setSplashVisible(true));
    let YEAR = year;
    let MONTH = month;
    if (MONTH == 12) {
      YEAR = YEAR + 1;
      MONTH = 1;
    } else {
      MONTH = Number(MONTH) + 1;
    }
    if (MONTH < 10) {
      MONTH = Number('0' + MONTH);
    }
    try {
      const {data} = await api.getWorkingEmpTotalPay(YEAR, MONTH, STORE_SEQ);
      setMaindata(data.result);
      setYear(YEAR);
      setMonth(MONTH);
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const backpay = async () => {
    dispatch(setSplashVisible(true));
    let YEAR = year;
    let MONTH = month - 1;
    if (MONTH == 0) {
      YEAR = YEAR - 1;
      MONTH = 12;
    }
    if (MONTH < 10) {
      MONTH = Number('0' + MONTH);
    }
    try {
      const {data} = await api.getWorkingEmpTotalPay(YEAR, MONTH, STORE_SEQ);
      setMaindata(data.result);
      setYear(YEAR);
      setMonth(MONTH);
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async () => {
    dispatch(setSplashVisible(true));
    let dayFrom = new Date();
    var YEAR = dayFrom.getFullYear();
    var MONTH = dayFrom.getMonth() + 1;
    if (MONTH < 10) {
      MONTH = Number('0' + MONTH);
    }
    try {
      const {data} = await api.getWorkingEmpTotalPay(YEAR, MONTH, STORE_SEQ);
      setMaindata(data.result);
      setYear(YEAR);
      setMonth(MONTH);
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    }
    try {
      const {data} = await api.getEmpLists(STORE_SEQ);
      if (data.message == 'SUCCESS') {
        setEmployeeNowOn(data?.workinglist);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PaymentInfoScreenPresenter
      refreshing={refreshing}
      onRefresh={onRefresh}
      nextpay={nextpay}
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      STOREPAY_SHOW={STOREPAY_SHOW}
      backpay={backpay}
      maindata={maindata}
      explainModal={explainModal}
      employeeNowOn={employeeNowOn}
    />
  );
};
