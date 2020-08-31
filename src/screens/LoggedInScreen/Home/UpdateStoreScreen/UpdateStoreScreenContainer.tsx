import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import UpdateStoreScreenPresenter from './UpdateStoreScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setStore} from '../../../../redux/userSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STOREDATA} = params;

  const [CLOSE_FLAG, setCLOSE_FLAG] = useState<boolean>(
    STOREDATA?.resultdata.CLOSE_FLAG == '0' ? false : true || false,
  );
  const [CU_CODE, setCU_CODE] = useState<string>(
    STOREDATA?.resultdata.CU_CODE || '',
  );
  const [name, setName] = useState<string>(STOREDATA?.resultdata.NAME || '');
  const [addr1, setAddr1] = useState<string>(STOREDATA?.resultdata.ADDR1 || '');
  const [addr2, setAddr2] = useState<string>(STOREDATA?.resultdata.ADDR2 || '');
  const [type, setType] = useState<number>(STOREDATA?.resultdata.TYPE || 0);
  const [LATE_FLAG, setLATE_FLAG] = useState<string>(
    STOREDATA?.resultdata.LATE_FLAG || '0',
  );
  const [LATE_TIME, setLATE_TIME] = useState<number>(0);
  const [CALCULATE_DAY, setCALCULATE_DAY] = useState<string>(
    STOREDATA?.resultdata.CALCULATE_DAY || '1',
  );
  const [lat, setLat] = useState<number>(STOREDATA?.resultdata.LAT || 0);
  const [long, setLong] = useState<number>(STOREDATA?.resultdata.LONG || 0);
  const [STORE_SEQ, setSTORE_SEQ] = useState<number>(
    STOREDATA?.resultdata.STORE_SEQ || 0,
  );
  const [storeCategoryTypeEtc, setStoreCategoryTypeEtc] = useState<string>(
    STOREDATA?.resultdata.other || null,
  ); // 사업장 분류 유형이 4(기타)인 경우 직접 입력 값
  const [sizeTypeCheck, setSizeTypeCheck] = useState<[boolean, boolean]>(
    STOREDATA?.resultdata.TYPE == 0
      ? [true, false]
      : [false, true] || [true, false],
  ); //1: 5인 이상, 0: 5인 미만
  const [commuteType, setCommuteType] = useState<number>(
    STOREDATA?.resultdata.GPS === '1' ? 1 : 0,
  ); // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근
  const [storeCategoryType, setStoreCategoryType] = useState<number>(
    STOREDATA?.resultdata.CATEGORY || null,
  ); // 사업장 분류 유형, 0: 요식업, 1: 도,소매업, 2: 서비스업, 3: 일반회사, 4: 기타
  const [storeCategoryTypeCheck, setStoreCategoryTypeCheck] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);
  const [distance, setDistance] = useState<string>(STOREDATA?.distance || null);
  const [timeCheck, setTimeCheck] = useState<boolean>(true);
  const [day, setDay] = useState<string>('');
  const [days, setDays] = useState<any>(new Array(30));
  const [day1, setDay1] = useState<string>(''); // 정산일 선택했을 때 확인을 누르지않을 경우 일자 담아둠
  const [dayCheck, setDayCheck] = useState<boolean>(true);

  const [modalVisible1, setModalVisible1] = useState<boolean>(false);
  const [modalVisible2, setModalVisible2] = useState<boolean>(false);
  const [modalVisible3, setModalVisible3] = useState<boolean>(false);

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

  const confirmModal = (content) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content,
      okCallback: () => {
        submit('close');
      },
      okButtonText: '변경',
      cancelButtonText: '취소',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const checkDirectInput = () => {
    let value = JSON.parse(JSON.stringify(days));
    value.fill(false); // ES6
    let day = days.indexOf(true) + 1;
    let calculateDay = `${day + 1}`;
    if (day > 29) {
      calculateDay = '1';
    }
    setModalVisible3(false);
    setDayCheck(true);
    setCALCULATE_DAY(calculateDay);
  };

  const gotoSearchAddress = () => {
    navigation.navigate('SearchAddressScreen', {screen: 1});
  };

  const onPressLate = (LATE_TIME, LATE_FLAG) => {
    setModalVisible2(false);
    setLATE_TIME(LATE_TIME);
    setLATE_FLAG(LATE_FLAG);
    setTimeCheck(true);
  };

  const submit = async (sign) => {
    dispatch(setSplashVisible(true));
    const gps = commuteType.toString();
    let CLOSE_FLAGProps = CLOSE_FLAG == false ? '0' : '1';
    if (sign == 'close') {
      CLOSE_FLAGProps = '1';
    }
    try {
      const {data} = await api.updateStore({
        CU_CODE,
        CLOSE_FLAG: CLOSE_FLAGProps,
        STORE_SEQ,
        NAME: name,
        ADDR1: addr1,
        ADDR2: addr2,
        LAT: lat,
        LONG: long,
        CALCULATE_DAY,
        LATE_TIME,
        LATE_FLAG,
        GPS: gps,
        JULI: distance,
        TYPE: type,
        CATEGORY: storeCategoryType,
        other: storeCategoryTypeEtc,
      });
      if (data.message == 'SUCCESS') {
        const params = {
          alertType: 'alert',
          title: '',
          content: sign == 'close',
        };
        dispatch(setAlertInfo(params));
        dispatch(setAlertVisible(true));
        alertModal(
          '',
          sign === 'close'
            ? '매장의 폐업처리가 완료되었습니다'
            : '정보수정이 완료됐습니다.',
        );
        if (sign == 'close') {
          dispatch(setStore(''));
        } else {
          navigation.goBack();
        }
      }
    } catch (error) {
      console.log(error);
    }
    dispatch(setSplashVisible(false));
  };

  useEffect(() => {
    if (
      typeof STOREDATA?.CATEGORY !== 'undefined' &&
      STOREDATA?.CATEGORY !== null
    ) {
      const storeCategoryTypeCheckProps = storeCategoryTypeCheck;
      storeCategoryTypeCheckProps[Number(STOREDATA?.CATEGORY)] = true;
      setStoreCategoryTypeCheck(storeCategoryTypeCheckProps);
    }
  }, []);

  return (
    <UpdateStoreScreenPresenter
      STORE={STORE}
      setCU_CODE={setCU_CODE}
      CU_CODE={CU_CODE}
      setName={setName}
      name={name}
      LATE_TIME={LATE_TIME}
      timeCheck={timeCheck}
      dayCheck={dayCheck}
      CALCULATE_DAY={CALCULATE_DAY}
      days={days}
      setDay1={setDay1}
      setDays={setDays}
      setAddr1={setAddr1}
      setAddr2={setAddr2}
      addr1={addr1}
      addr2={addr2}
      sizeTypeCheck={sizeTypeCheck}
      setSizeTypeCheck={setSizeTypeCheck}
      setType={setType}
      explainModal={explainModal}
      gotoSearchAddress={gotoSearchAddress}
      submit={submit}
      confirmModal={confirmModal}
      modalVisible2={modalVisible2}
      modalVisible3={modalVisible3}
      setModalVisible2={setModalVisible2}
      setModalVisible3={setModalVisible3}
      onPressLate={onPressLate}
      checkDirectInput={checkDirectInput}
    />
  );
};
