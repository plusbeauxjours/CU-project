import React, {useEffect, useState} from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import EmpPayInfoScreenPresenter from './EmpPayInfoScreenPresenter';

export default ({route: {params}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    STORE_SEQ,
    EMP_SEQ,
    STORE,
    STOREPAY_SHOW,
    NAME,
    IMAGE,
    ISMANAGER,
  } = params;
  const {NAME: NAMEreducer} = useSelector((state: any) => state.userReducer);
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [boxButton, setBoxButton] = useState<boolean>(true);
  const [boxButton2, setBoxButton2] = useState<boolean>(
    STORE !== '1' || STOREPAY_SHOW !== '1' ? false : true,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [cardShow, setCardShow] = useState<boolean>(false);
  const [click1, setClick1] = useState<boolean>(false);
  const [click2, setClick2] = useState<boolean>(false);
  const [click3, setClick3] = useState<boolean>(false);
  const [click4, setClick4] = useState<boolean>(false);
  const [click5, setClick5] = useState<boolean>(false);
  const [maindata, setMaindata] = useState<any>({});
  const [data2, setData2] = useState<any>([]);
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

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData(year, month);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
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

  const numberComma = (num) => {
    let result = num;
    if (isNaN(num)) {
      result = Number(num);
    }
    let resultArray = result.toString().split('.');
    resultArray[0] = resultArray[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return resultArray.join('.');
  };

  const pressGroup = (locationY) => {
    const screenHeight = hp('15%');
  };

  const replaceAll = (text) => {
    const RA = text?.split('-').join('.');
    return RA?.slice(5);
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
      const {data} = await api.monthLists(STORE_SEQ, EMP_SEQ, year, month);
      console.log('nextpay', data);
      setMaindata(data.message);
      setYear(year);
      setMonth(month);
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
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
      const {data} = await api.monthLists(STORE_SEQ, EMP_SEQ, year, month);
      console.log('backpay', data);
      setMaindata(data.message);
      setYear(year);
      setMonth(month);
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    }
  };

  const fetchData = async (year, month) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.monthLists(STORE_SEQ, EMP_SEQ, year, month);
      console.log('fetchData', data);
      setMaindata(data.message);
      setYear(year);
      setMonth(month);
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
      navigation.goBack();
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    let DAY_FROM = new Date();
    let YEAR = DAY_FROM.getFullYear();
    let MONTH = DAY_FROM.getMonth() + 1;
    if (MONTH < 10) {
      MONTH = Number('0' + MONTH);
    }
    console.log(YEAR, MONTH);
    fetchData(YEAR, MONTH);
  }, []);

  return (
    <EmpPayInfoScreenPresenter
      NAME={NAME || NAMEreducer}
      maindata={maindata}
      PAY_TYPE={maindata.PAY_TYPE}
      backpay={backpay}
      replaceAll={replaceAll}
      nextpay={nextpay}
      STORE={STORE}
      STOREPAY_SHOW={STOREPAY_SHOW}
      IMAGE={IMAGE}
      ISMANAGER={ISMANAGER}
      boxButton={boxButton}
      setBoxButton={setBoxButton}
      boxButton2={boxButton2}
      setBoxButton2={setBoxButton2}
      onRefresh={onRefresh}
    />
  );
};
