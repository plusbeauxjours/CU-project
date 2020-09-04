import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import api from '../../../../constants/LoggedInApi';
import HealthCertificateEmpDetailScreenPresenter from './HealthCertificateEmpDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {setHEALTH_EMP_DETAIL} from '../../../../redux/healthSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);
  const {HEALTH_EMP_DETAIL} = useSelector((state: any) => state.healthReducer);

  const {data: {EMP_SEQ = null} = {}} = params;

  const [REAL_NAME, setREAL_NAME] = useState<any>(params?.data?.NAME);
  const [SETTIME, setSETTIME] = useState<any>(params?.data?.SETTIME);
  const [isImageViewVisible, setIsImageViewVisible] = useState<any>(false);
  const [STORE_HEALTH_SEQ, setSTORE_HEALTH_SEQ] = useState<any>(null);
  const [TESTING_DATE, setTESTING_DATE] = useState<any>(null);
  const [TESTING_COUNT, setTESTING_COUNT] = useState<any>(null);
  const [TESTING_CERTIFICATE, setTESTING_CERTIFICATE] = useState<any>(
    params?.data?.IMG_LIST,
  );
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<any>(
    params?.data?.EDUCATION_TYPE || 'online',
  );
  const [selectIndex, setSelectIndex] = useState<any>(0);

  const onRefresh = async () => {
    try {
      dispatch(setSplashVisible(true));
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async () => {
    try {
      const {data} = await api.storeHealthEmpDetail(EMP_SEQ);
      if (data.message === 'SUCCESS') {
        dispatch(setHEALTH_EMP_DETAIL(data.result));
        setSelectIndex(0);
        setSTORE_HEALTH_SEQ(data.result[0].STORE_HEALTH_SEQ);
        setTESTING_COUNT(data.result[0].RESULT_COUNT);
        setREAL_NAME(data.result[0].NAME);
        setTESTING_DATE(data.result[0].RESULT_DATE);
        setSETTIME(data.result[0].CREATE_TIME);
        setTESTING_CERTIFICATE(data.result[0].IMG_LIST);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const nextdata = async () => {
    setSelectIndex(selectIndex - 1);
    setSTORE_HEALTH_SEQ(HEALTH_EMP_DETAIL[selectIndex - 1].STORE_HEALTH_SEQ);
    setTESTING_COUNT(HEALTH_EMP_DETAIL[selectIndex - 1].RESULT_COUNT);
    setREAL_NAME(HEALTH_EMP_DETAIL[selectIndex - 1].NAME);
    setTESTING_DATE(HEALTH_EMP_DETAIL[selectIndex - 1].RESULT_DATE);
    setSETTIME(HEALTH_EMP_DETAIL[selectIndex - 1].CREATE_TIME);
    setTESTING_CERTIFICATE(HEALTH_EMP_DETAIL[selectIndex - 1].IMG_LIST);
  };

  const backdata = async () => {
    setSelectIndex(selectIndex + 1);
    setSTORE_HEALTH_SEQ(HEALTH_EMP_DETAIL[selectIndex + 1].STORE_HEALTH_SEQ);
    setTESTING_COUNT(HEALTH_EMP_DETAIL[selectIndex + 1].RESULT_COUNT);
    setREAL_NAME(HEALTH_EMP_DETAIL[selectIndex + 1].NAME);
    setTESTING_DATE(HEALTH_EMP_DETAIL[selectIndex + 1].RESULT_DATE);
    setSETTIME(HEALTH_EMP_DETAIL[selectIndex + 1].CREATE_TIME);
    setTESTING_CERTIFICATE(HEALTH_EMP_DETAIL[selectIndex + 1].IMG_LIST);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HealthCertificateEmpDetailScreenPresenter
      setIsImageViewVisible={setIsImageViewVisible}
      isImageViewVisible={isImageViewVisible}
      onRefresh={onRefresh}
      nextdata={nextdata}
      backdata={backdata}
      alertModal={alertModal}
      EDUCATION_TYPE={EDUCATION_TYPE}
      STORE_HEALTH_SEQ={STORE_HEALTH_SEQ}
      TESTING_CERTIFICATE={TESTING_CERTIFICATE}
      REAL_NAME={REAL_NAME}
      EMP_SEQ={EMP_SEQ}
      TESTING_COUNT={TESTING_COUNT}
      TESTING_DATE={TESTING_DATE}
      SETTIME={SETTIME}
      selectIndex={selectIndex}
      HEALTH_EMP_DETAIL={HEALTH_EMP_DETAIL}
    />
  );
};
