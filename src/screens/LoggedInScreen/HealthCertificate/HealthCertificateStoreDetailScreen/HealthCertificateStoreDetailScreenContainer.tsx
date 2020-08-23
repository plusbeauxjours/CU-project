import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import api from '../../../../constants/LoggedInApi';
import HealthCertificateStoreDetailScreenPresenter from './HealthCertificateStoreDetailScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const STORE_SEQ = params?.STORE_SEQ;
  const EMP_SEQ = params?.EMP_SEQ;
  const NAME = params?.NAME;

  const [businesstype, setBusinesstype] = useState<string>(
    params?.businesstype,
  );
  const [position, setPosition] = useState<string>(params?.position);
  const [owner, setOwner] = useState<string>(params?.owner);
  const [storename, setStorename] = useState<string>(params?.storename);
  const [alldata, setAlldata] = useState<any>();
  const [REAL_NAME, setREAL_NAME] = useState<any>(params?.NAME);
  const [SETTIME, setSETTIME] = useState<any>(params?.CREATE_TIME);
  const [modalVisible, setModalVisible] = useState<any>(false);
  const [STORE_HEALTH_SEQ, setSTORE_HEALTH_SEQ] = useState<any>(null);
  const [TESTING_DATE, setTESTING_DATE] = useState<any>(null);
  const [TESTING_COUNT, setTESTING_COUNT] = useState<any>(null);

  const [TESTING_CERTIFICATE, setTESTING_CERTIFICATE] = useState<any>(
    params?.IMG_LIST,
  );
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<string>('');
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<any>(
    params?.probationTYPE || 'online',
  );
  const [allData, setAllData] = useState<any>([]);
  const [selectindex, setSelectindex] = useState<any>(0);
  const [CEO_HEALTH_SEQ, setCEO_HEALTH_SEQ] = useState<string>('');

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
      console.log('==========================', data);

      if (data.resultmsg === '1') {
        setSelectindex(0);
        setAlldata(data.resultdata);
        setCEO_HEALTH_SEQ(data.resultdata[0].CEO_HEALTH_SEQ);
        setEDUCATION_DATE(data.resultdata[0].probationDATE);
        setEDUCATION_TYPE(data.resultdata[0].probationTYPE);
        setREAL_NAME(data.resultdata[0].NAME);
        setStorename(data.resultdata[0].storename);
        setOwner(data.resultdata[0].owner);
        setPosition(data.resultdata[0].position);
        setBusinesstype(data.resultdata[0].businesstype);
        setTESTING_CERTIFICATE(data.resultdata[0].IMG_LIST);
        setSETTIME(data.resultdata[0].CREATE_TIME);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const alertModal = (title, text) => {
    const params = {
      type: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const nextdata = async () => {
    setSelectindex(selectindex - 1);
    setCEO_HEALTH_SEQ(alldata[selectindex - 1].CEO_HEALTH_SEQ);
    setEDUCATION_DATE(alldata[selectindex - 1].probationDATE);
    setEDUCATION_TYPE(alldata[selectindex - 1].probationTYPE);
    setREAL_NAME(alldata[selectindex - 1].NAME);
    setStorename(alldata[selectindex - 1].storename);
    setOwner(alldata[selectindex - 1].owner);
    setPosition(alldata[selectindex - 1].position);
    setBusinesstype(alldata[selectindex - 1].businesstype);
    setTESTING_CERTIFICATE(alldata[selectindex - 1].IMG_LIST);
    setSETTIME(alldata[selectindex - 1].CREATE_TIME);
  };

  const backdata = async () => {
    setSelectindex(selectindex + 1);
    setCEO_HEALTH_SEQ(alldata[selectindex + 1].CEO_HEALTH_SEQ);
    setEDUCATION_DATE(alldata[selectindex + 1].probationDATE);
    setEDUCATION_TYPE(alldata[selectindex + 1].probationTYPE);
    setREAL_NAME(alldata[selectindex + 1].NAME);
    setStorename(alldata[selectindex + 1].storename);
    setOwner(alldata[selectindex + 1].owner);
    setPosition(alldata[selectindex + 1].position);
    setBusinesstype(alldata[selectindex + 1].businesstype);
    setTESTING_CERTIFICATE(alldata[selectindex + 1].IMG_LIST);
    setSETTIME(alldata[selectindex + 1].CREATE_TIME);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HealthCertificateStoreDetailScreenPresenter
      NAME={NAME}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onRefresh={onRefresh}
      onRefreshProps={params?.onRefresh}
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
      position={position}
      owner={owner}
      storename={storename}
      businesstype={businesstype}
      TESTING_DATE={TESTING_DATE}
      SETTIME={SETTIME}
      selectindex={selectindex}
      allData={allData}
      params={params}
      EDUCATION_DATE={EDUCATION_DATE}
      CEO_HEALTH_SEQ={CEO_HEALTH_SEQ}
    />
  );
};
