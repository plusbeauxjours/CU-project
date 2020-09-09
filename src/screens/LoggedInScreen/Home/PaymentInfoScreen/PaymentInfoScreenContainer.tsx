import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PaymentInfoScreenPresenter from './PaymentInfoScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ, STORE_DATA: {STOREPAY_SHOW = null} = {}} = useSelector(
    (state: any) => state.storeReducer,
  );

  const [employeeNowOn, setEmployeeNowOn] = useState<any>([]);
  const [maindata, setMaindata] = useState<any>({});
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));

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
      await fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  const nextpay = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getWorkingEmpTotalPay(
        Number(moment(date).add(1, 'month').format('YYYY')),
        Number(moment(date).add(1, 'month').format('MM')),
        STORE_SEQ,
      );
      if (data.message === 'SUCCESS') {
        setMaindata(data.result);
        setDate(moment(date).add(1, 'month').format('YYYY-MM-DD'));
      }
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const backpay = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getWorkingEmpTotalPay(
        Number(moment(date).subtract(1, 'month').format('YYYY')),
        Number(moment(date).subtract(1, 'month').format('MM')),
        STORE_SEQ,
      );
      if (data.message === 'SUCCESS') {
        setMaindata(data.result);
        setDate(moment(date).subtract(1, 'month').format('YYYY-MM-DD'));
      }
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getWorkingEmpTotalPay(
        Number(moment().format('YYYY')),
        Number(moment().format('MM')),
        STORE_SEQ,
      );
      if (data.message === 'SUCCESS') {
        setMaindata(data.result);
        setDate(moment().format('YYYY-MM-DD'));
      }
    } catch (e) {
      console.log(e);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    }
    try {
      const {data} = await api.getEmpLists(STORE_SEQ);
      if (data.message == 'SUCCESS') {
        setEmployeeNowOn(data?.workinglist);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PaymentInfoScreenPresenter
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
