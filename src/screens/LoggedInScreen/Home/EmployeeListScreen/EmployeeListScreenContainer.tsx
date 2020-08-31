import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import EmployeeListScreenPresenter from './EmployeeListScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STOREDATA} = params;
  const {STORE_SEQ} = STOREDATA.resultdata;
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [employeeNowOn, setEmployeeNowOn] = useState<any>([]);
  const [employeeNowOff, setEmployeeNowOff] = useState<any>([]);

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

  const adviceModal = (title, text, attach, height) => {
    const params = {
      alertType: 'explain',
      height: height,
      title: title,
      content: text,
      attach: attach,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const fetchData = async () => {
    dispatch(setSplashVisible(true));
    try {
      const {data} = await api.getEmpLists(STORE_SEQ);
      if (data.message == 'SUCCESS') {
        setEmployeeNowOn(data?.workinglist);
        setEmployeeNowOff(data?.endlist);
      }
      console.log(data);
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
    <EmployeeListScreenPresenter
      refreshing={refreshing}
      onRefresh={onRefresh}
      STORE={STORE}
      STOREDATA={STOREDATA}
      adviceModal={adviceModal}
      employeeNowOn={employeeNowOn}
      employeeNowOff={employeeNowOff}
    />
  );
};
