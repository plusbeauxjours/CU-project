import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import api from '../../../../constants/LoggedInApi';
import HealthCertificateStoreDetailScreenPresenter from './HealthCertificateStoreDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {setHEALTH_STORE_DETAIL} from '../../../../redux/healthSlice';

export default () => {
  const dispatch = useDispatch();

  const {STORE_SEQ, EMP_SEQ} = useSelector((state: any) => state.storeReducer);
  const {HEALTH_STORE_DETAIL} = useSelector(
    (state: any) => state.healthReducer,
  );

  const [businesstype, setBusinesstype] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [storename, setStorename] = useState<string>('');
  const [REAL_NAME, setREAL_NAME] = useState<string>('');
  const [SETTIME, setSETTIME] = useState<string>('');
  const [CEO_HEALTH_SEQ, setCEO_HEALTH_SEQ] = useState<string>('');
  const [TESTING_CERTIFICATE, setTESTING_CERTIFICATE] = useState<any>(null);
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<string>('');
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<string>('online');
  const [selectindex, setSelectindex] = useState<any>(0);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);

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
      const {data} = await api.getAllCeoHealth({STORE_SEQ});
      if (data.resultmsg === '1') {
        setSelectindex(0);
        dispatch(setHEALTH_STORE_DETAIL(data.resultdata));
        setEDUCATION_DATE(data.resultdata[0].probationDATE);
        setEDUCATION_TYPE(data.resultdata[0].probationTYPE);
        setREAL_NAME(data.resultdata[0].NAME);
        setStorename(data.resultdata[0].storename);
        setOwner(data.resultdata[0].owner);
        setPosition(data.resultdata[0].position);
        setBusinesstype(data.resultdata[0].businesstype);
        setTESTING_CERTIFICATE(data.resultdata[0].IMG_LIST);
        setSETTIME(data.resultdata[0].CREATE_TIME);
        setCEO_HEALTH_SEQ(data.resultdata[0].CEO_HEALTH_SEQ);
      }
    } catch (e) {
      console.log(e);
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
    setSelectindex(selectindex - 1);
    setEDUCATION_DATE(HEALTH_STORE_DETAIL[selectindex - 1].probationDATE);
    setEDUCATION_TYPE(HEALTH_STORE_DETAIL[selectindex - 1].probationTYPE);
    setREAL_NAME(HEALTH_STORE_DETAIL[selectindex - 1].NAME);
    setStorename(HEALTH_STORE_DETAIL[selectindex - 1].storename);
    setOwner(HEALTH_STORE_DETAIL[selectindex - 1].owner);
    setPosition(HEALTH_STORE_DETAIL[selectindex - 1].position);
    setBusinesstype(HEALTH_STORE_DETAIL[selectindex - 1].businesstype);
    setTESTING_CERTIFICATE(HEALTH_STORE_DETAIL[selectindex - 1].IMG_LIST);
    setSETTIME(HEALTH_STORE_DETAIL[selectindex - 1].CREATE_TIME);
    setCEO_HEALTH_SEQ(HEALTH_STORE_DETAIL[selectindex - 1].CEO_HEALTH_SEQ);
  };

  const backdata = async () => {
    setSelectindex(selectindex + 1);
    setEDUCATION_DATE(HEALTH_STORE_DETAIL[selectindex + 1].probationDATE);
    setEDUCATION_TYPE(HEALTH_STORE_DETAIL[selectindex + 1].probationTYPE);
    setREAL_NAME(HEALTH_STORE_DETAIL[selectindex + 1].NAME);
    setStorename(HEALTH_STORE_DETAIL[selectindex + 1].storename);
    setOwner(HEALTH_STORE_DETAIL[selectindex + 1].owner);
    setPosition(HEALTH_STORE_DETAIL[selectindex + 1].position);
    setBusinesstype(HEALTH_STORE_DETAIL[selectindex + 1].businesstype);
    setTESTING_CERTIFICATE(HEALTH_STORE_DETAIL[selectindex + 1].IMG_LIST);
    setSETTIME(HEALTH_STORE_DETAIL[selectindex + 1].CREATE_TIME);
    setCEO_HEALTH_SEQ(HEALTH_STORE_DETAIL[selectindex + 1].CEO_HEALTH_SEQ);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HealthCertificateStoreDetailScreenPresenter
      onRefresh={onRefresh}
      nextdata={nextdata}
      backdata={backdata}
      alertModal={alertModal}
      EDUCATION_TYPE={EDUCATION_TYPE}
      TESTING_CERTIFICATE={TESTING_CERTIFICATE}
      REAL_NAME={REAL_NAME}
      EMP_SEQ={EMP_SEQ}
      STORE_SEQ={STORE_SEQ}
      position={position}
      owner={owner}
      storename={storename}
      businesstype={businesstype}
      SETTIME={SETTIME}
      selectindex={selectindex}
      HEALTH_STORE_DETAIL={HEALTH_STORE_DETAIL}
      EDUCATION_DATE={EDUCATION_DATE}
      CEO_HEALTH_SEQ={CEO_HEALTH_SEQ}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
    />
  );
};
