import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import api from '../../../../constants/LoggedInApi';
import HealthCertificateEmpDetailScreenPresenter from './HealthCertificateEmpDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const STORE_SEQ = params?.STORE_SEQ;
  const EMP_SEQ = params?.EMP_SEQ;

  const [REAL_NAME, setREAL_NAME] = useState<any>(params?.NAME);
  const [SETTIME, setSETTIME] = useState<any>(params?.SETTIME);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [STORE_HEALTH_SEQ, setSTORE_HEALTH_SEQ] = useState<any>(null);
  const [TESTING_DATE, setTESTING_DATE] = useState<any>(null);
  const [TESTING_COUNT, setTESTING_COUNT] = useState<any>(null);

  const [TESTING_CERTIFICATE, setTESTING_CERTIFICATE] = useState<any>(
    params?.IMG_LIST,
  );
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<any>(
    params?.EDUCATION_TYPE || 'online',
  );
  const [allData, setAllData] = useState<any>([]);
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
        setAllData(data.result);
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
    setSTORE_HEALTH_SEQ(allData[selectIndex - 1].STORE_HEALTH_SEQ);
    setTESTING_COUNT(allData[selectIndex - 1].RESULT_COUNT);
    setREAL_NAME(allData[selectIndex - 1].NAME);
    setTESTING_DATE(allData[selectIndex - 1].RESULT_DATE);
    setSETTIME(allData[selectIndex - 1].CREATE_TIME);
    setTESTING_CERTIFICATE(allData[selectIndex - 1].IMG_LIST);
  };

  const backdata = async () => {
    setSelectIndex(selectIndex + 1);
    setSTORE_HEALTH_SEQ(allData[selectIndex + 1].STORE_HEALTH_SEQ);
    setTESTING_COUNT(allData[selectIndex + 1].RESULT_COUNT);
    setREAL_NAME(allData[selectIndex + 1].NAME);
    setTESTING_DATE(allData[selectIndex + 1].RESULT_DATE);
    setSETTIME(allData[selectIndex + 1].CREATE_TIME);
    setTESTING_CERTIFICATE(allData[selectIndex + 1].IMG_LIST);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HealthCertificateEmpDetailScreenPresenter
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onRefresh={onRefresh}
      nextdata={nextdata}
      backdata={backdata}
      alertModal={alertModal}
      EDUCATION_TYPE={EDUCATION_TYPE}
      STORE_HEALTH_SEQ={STORE_HEALTH_SEQ}
      TESTING_CERTIFICATE={TESTING_CERTIFICATE}
      REAL_NAME={REAL_NAME}
      EMP_SEQ={EMP_SEQ}
      STORE_SEQ={STORE_SEQ}
      TESTING_COUNT={TESTING_COUNT}
      TESTING_DATE={TESTING_DATE}
      SETTIME={SETTIME}
      selectIndex={selectIndex}
      allData={allData}
    />
  );
};
