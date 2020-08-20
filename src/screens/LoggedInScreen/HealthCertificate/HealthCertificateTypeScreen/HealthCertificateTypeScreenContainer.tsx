import React, {useState, useEffect} from 'react';

import HealthCertificateTypeScreenPresenter from './HealthCertificateTypeScreenPresenter';
import {useDispatch, useSelector} from 'react-redux';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const {STOREDATA, STORE} = params;
  const {STORE_SEQ} = STOREDATA?.resultdata;

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [EDUCATION_CERTIFICATE, setEDUCATION_CERTIFICATE] = useState<string>(
    '',
  );
  const [EDUCATION_DDAY, setEDUCATION_DDAY] = useState<string>('');
  const [HEALTH_CERTIFICATE_TARGET, setHEALTH_CERTIFICATE_TARGET] = useState<
    string
  >('');
  const [HEALTH_CERTIFICATE_APPLY, setHEALTH_CERTIFICATE_APPLY] = useState<
    string
  >('');
  const [HEALTH_DDAY, setHEALTH_DDAY] = useState<string>('');
  const [EDUCATION_DATA, setEDUCATION_DATA] = useState<string>('');

  const explainModal = (title, text) => {
    const params = {
      type: 'explain',
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
      const {data} = await api.getCertificate({
        STORE_SEQ,
        MEMBER_SEQ,
        STORE,
      });
      setEDUCATION_CERTIFICATE(data?.result.EDUCATION_CERTIFICATE);
      setEDUCATION_DATA(data?.result.EDUCATION_DATA);
      setEDUCATION_DDAY(data?.result.EDUCATION_DDAY);
      setHEALTH_CERTIFICATE_TARGET(data?.result.HEALTH_CERTIFICATE_TARGET);
      setHEALTH_CERTIFICATE_APPLY(data?.result.HEALTH_CERTIFICATE_APPLY);
      setHEALTH_DDAY(data?.result.HEALTH_DDAY);
    } catch (error) {
      console.log(error);
    }
  };

  const now = new Date();
  let pushday;
  if (STORE == '1') {
    pushday = new Date(EDUCATION_DDAY);
  } else {
    pushday = new Date(HEALTH_DDAY);
  }
  let dday = 0;
  dday = (pushday.getTime() - now.getTime()) / 1000 / 3600 / 24;

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <HealthCertificateTypeScreenPresenter
      refreshing={refreshing}
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      STOREDATA={STOREDATA}
      EDUCATION_CERTIFICATE={EDUCATION_CERTIFICATE}
      HEALTH_CERTIFICATE_TARGET={HEALTH_CERTIFICATE_TARGET}
      HEALTH_CERTIFICATE_APPLY={HEALTH_CERTIFICATE_APPLY}
      HEALTH_DDAY={HEALTH_DDAY}
      EDUCATION_DATA={EDUCATION_DATA}
      explainModal={explainModal}
      onRefresh={onRefresh}
      dday={dday}
    />
  );
};
