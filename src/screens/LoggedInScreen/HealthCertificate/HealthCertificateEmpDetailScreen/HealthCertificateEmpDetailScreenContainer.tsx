import React, {useEffect, useState} from 'react';

import api from '../../../../constants/LoggedInApi';
import HealthCertificateEmpDetailScreenPresenter from './HealthCertificateEmpDetailScreenPresenter';
import {useDispatch} from 'react-redux';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState<any>(false);
  const [STORE_SEQ, setSTORE_SEQ] = useState<any>(null);
  const [STORE_HEALTH_SEQ, setSTORE_HEALTH_SEQ] = useState<any>(null);
  const [EMP_SEQ, setEMP_SEQ] = useState<any>(null);
  const [NAME, setNAME] = useState<any>(null);
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<any>('online');
  const [TESTING_DATE, setTESTING_DATE] = useState<any>(null);
  const [TESTING_COUNT, setTESTING_COUNT] = useState<any>(null);
  const [TESTING_CERTIFICATE, setTESTING_CERTIFICATE] = useState<any>(null);
  const [REAL_NAME, setREAL_NAME] = useState<any>(null);
  const [position, setPosition] = useState<any>(null);
  const [businesstype, setBusinesstype] = useState<any>(null);
  const [storename, setStorename] = useState<any>(null);
  const [owner, setOwner] = useState<any>(null);
  const [SETTIME, setSETTIME] = useState<any>(null);
  const [EDUCATION_CERTIFICATEDATA, setEDUCATION_CERTIFICATEDATA] = useState<
    any
  >(null);
  const [allData, setAllData] = useState<any>([]);
  const [selectindex, setSelectindex] = useState<any>(0);
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
      const {data} = await api.storeHealthEmpDetail(EMP_SEQ);

      setREAL_NAME(EDUCATION_CERTIFICATEDATA[0]?.NAME ?? params?.NAME);
      setPosition(EDUCATION_CERTIFICATEDATA[0]?.position ?? params?.position);
      setBusinesstype(
        EDUCATION_CERTIFICATEDATA[0]?.businesstype ?? params?.businesstype,
      );
      setStorename(
        EDUCATION_CERTIFICATEDATA[0]?.storename ?? params?.storename,
      );
      setOwner(EDUCATION_CERTIFICATEDATA[0]?.owner ?? params?.owner);
      setSETTIME(
        EDUCATION_CERTIFICATEDATA[0]?.CREATE_TIME ?? params?.CREATE_TIME,
      );
      setTESTING_CERTIFICATE(
        EDUCATION_CERTIFICATEDATA[0]?.IMG_LIST ?? params?.IMG_LIST,
      );
      setEDUCATION_TYPE(
        EDUCATION_CERTIFICATEDATA[0]?.probationTYPE ?? params?.probationTYPE,
      );
      setSTORE_HEALTH_SEQ;
      setTESTING_COUNT;
      setEMP_SEQ;
      setNAME;
      setSTORE_SEQ;
      setTESTING_DATE;
      setEDUCATION_CERTIFICATEDATA;
      setSelectindex(0);
      setAllData(data.result);

      // this.setState({
      //   selectindex: 0,
      //   allData: json.result,
      //   STORE_HEALTH_SEQ : json.result[0].STORE_HEALTH_SEQ,
      //   selectindex: 0,
      //   TESTING_COUNT: json.result[0].RESULT_COUNT,
      //   REAL_NAME: json.result[0].NAME,
      //   TESTING_DATE: json.result[0].RESULT_DATE,
      //   SETTIME: json.result[0].CREATE_TIME,
      //   TESTING_CERTIFICATE: json.result[0].IMG_LIST,
      // });
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
    setSTORE_HEALTH_SEQ(allData[selectindex - 1].STORE_HEALTH_SEQ);
    setSelectindex(selectindex - 1);
    setTESTING_COUNT(allData[selectindex - 1].RESULT_COUNT);
    setREAL_NAME(allData[selectindex - 1].NAME);
    setTESTING_DATE(allData[selectindex - 1].RESULT_DATE);
    setSETTIME(allData[selectindex - 1].CREATE_TIME);
    setTESTING_CERTIFICATE(allData[selectindex - 1].IMG_LIST);
  };

  const backdata = async () => {
    setSTORE_HEALTH_SEQ(allData[selectindex + 1].STORE_HEALTH_SEQ);
    setSelectindex(selectindex + 1);
    setTESTING_COUNT(allData[selectindex + 1].RESULT_COUNT);
    setREAL_NAME(allData[selectindex + 1].NAME);
    setTESTING_DATE(allData[selectindex + 1].RESULT_DATE);
    setSETTIME(allData[selectindex + 1].CREATE_TIME);
    setTESTING_CERTIFICATE(allData[selectindex + 1].IMG_LIST);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <HealthCertificateEmpDetailScreenPresenter
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
    />
  );
};
