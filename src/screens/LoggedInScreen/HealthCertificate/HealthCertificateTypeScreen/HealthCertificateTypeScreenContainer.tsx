import React, {useState, useEffect} from 'react';

import HealthCertificateTypeScreenPresenter from './HealthCertificateTypeScreenPresenter';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {setHEALTH_CERTIFICATE_DATA} from '../../../../redux/healthSlice';

export default () => {
  const dispatch = useDispatch();
  const {MEMBER_SEQ, STORE} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const {HEALTH_CERTIFICATE_DATA} = useSelector(
    (state: any) => state.healthReducer,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

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

  const fetchData = async () => {
    try {
      if (!HEALTH_CERTIFICATE_DATA) {
        dispatch(setSplashVisible(true));
      }
      const {data} = await api.getCertificate({
        STORE_SEQ,
        MEMBER_SEQ,
        STORE,
      });
      if (data.resultmsg === '1') {
        dispatch(setHEALTH_CERTIFICATE_DATA(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const dday = moment(HEALTH_CERTIFICATE_DATA.EDUCATION_DATA).diff(
    moment().subtract(1, 'year'),
    'days',
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HealthCertificateTypeScreenPresenter
      refreshing={refreshing}
      STORE={STORE}
      EDUCATION_CERTIFICATE={HEALTH_CERTIFICATE_DATA.EDUCATION_CERTIFICATE}
      HEALTH_CERTIFICATE_TARGET={
        HEALTH_CERTIFICATE_DATA.HEALTH_CERTIFICATE_TARGET
      }
      HEALTH_CERTIFICATE_APPLY={
        HEALTH_CERTIFICATE_DATA.HEALTH_CERTIFICATE_APPLY
      }
      HEALTH_DDAY={HEALTH_CERTIFICATE_DATA.HEALTH_DDAY}
      EDUCATION_DATA={HEALTH_CERTIFICATE_DATA.EDUCATION_DATA}
      explainModal={explainModal}
      onRefresh={onRefresh}
      dday={dday}
    />
  );
};
