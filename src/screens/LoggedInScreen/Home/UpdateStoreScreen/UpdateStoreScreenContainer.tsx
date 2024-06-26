import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import api from '~/constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {closeSTORE_DATA, updateSTORE} from '~/redux/storeSlice';
import {getSTORELIST_DATA} from '~/redux/userSlice';
import UpdateStoreScreenPresenter from './UpdateStoreScreenPresenter';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ, STORE_DATA} = useSelector(
    (state: any) => state.storeReducer,
  );

  const [CLOSE_FLAG, setCLOSE_FLAG] = useState<boolean>(
    STORE_DATA?.resultdata?.CLOSE_FLAG == '0' ? false : true || false,
  );
  const [CU_CODE, setCU_CODE] = useState<string>(
    STORE_DATA?.resultdata?.CU_CODE || '',
  );
  const [NAME, setNAME] = useState<string>(STORE_DATA?.resultdata?.NAME || '');
  const [ADDR1, setADDR1] = useState<string>(
    STORE_DATA?.resultdata?.ADDR1 || '',
  );
  const [ADDR2, setADDR2] = useState<string>(
    STORE_DATA?.resultdata?.ADDR2 || '',
  );
  const [TYPE, setTYPE] = useState<number>(STORE_DATA?.resultdata?.TYPE || 0);
  const [LATE_FLAG, setLATE_FLAG] = useState<string>(
    STORE_DATA?.resultdata?.LATE_FLAG || '0',
  );
  const [LATE_TIME, setLATE_TIME] = useState<number>(
    STORE_DATA?.resultdata?.LATE_TIME || 0,
  );
  const [EARLY_FLAG, setEARLY_FLAG] = useState<string>(
    STORE_DATA?.resultdata?.EARLY_FLAG || '0',
  );
  const [EARLY_TIME, setEARLY_TIME] = useState<number>(
    STORE_DATA?.resultdata?.EARLY_TIME || 0,
  );
  const [CALCULATE_DAY, setCALCULATE_DAY] = useState<string>(
    STORE_DATA?.resultdata?.CALCULATE_DAY || '1',
  );
  const [lat, setLat] = useState<number>(STORE_DATA?.resultdata?.LAT || 0);
  const [long, setLong] = useState<number>(STORE_DATA?.resultdata?.LONG || 0);
  const [storeCategoryTypeEtc, setStoreCategoryTypeEtc] = useState<string>(
    STORE_DATA?.resultdata?.other || null,
  ); // 사업장 분류 유형이 4(기타)인 경우 직접 입력 값
  const [sizeTypeCheck, setSizeTypeCheck] = useState<[boolean, boolean]>(
    STORE_DATA?.resultdata?.TYPE == 0
      ? [true, false]
      : [false, true] || [true, false],
  ); //1: 5인 이상, 0: 5인 미만
  const [commuteType, setCommuteType] = useState<number>(
    STORE_DATA?.resultdata?.GPS === '1' ? 1 : 0,
  ); // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근
  const [storeCategoryType, setStoreCategoryType] = useState<number>(
    STORE_DATA?.resultdata?.CATEGORY || null,
  ); // 사업장 분류 유형, 0: 요식업, 1: 도,소매업, 2: 서비스업, 3: 일반회사, 4: 기타
  const [storeCategoryTypeCheck, setStoreCategoryTypeCheck] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);
  const [distance, setDistance] = useState<string>(
    STORE_DATA?.distance || null,
  );
  const [EARLYtimeCheck, setEARLYtimeCheck] = useState<boolean>(
    STORE_DATA?.resultdata?.EARLY_TIME ? true : false,
  );
  const [timeCheck, setTimeCheck] = useState<boolean>(true);
  const [days, setDays] = useState<any>(new Array(30));
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

  // 정산일모달 확인버튼
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

  // 지각모달 분 선택
  const onPressLate = (LATE_TIME, LATE_FLAG) => {
    setModalVisible2(false);
    setLATE_TIME(LATE_TIME);
    setLATE_FLAG(LATE_FLAG);
    setTimeCheck(true);
  };

  // 조퇴모달 분 선택
  const onPressEarly = (EARLY_TIME, EARLY_FLAG) => {
    setModalVisible1(false);
    setEARLY_TIME(EARLY_TIME);
    setEARLY_FLAG(EARLY_FLAG);
    setEARLYtimeCheck(true);
  };

  // 수정하기버튼
  const submit = async (sign) => {
    if (sign == 'close') {
      alertModal('', '매장의 폐업처리가 완료되었습니다.');
      navigation.reset({
        index: 0,
        routes: [{name: 'SelectStoreScreen'}],
      });
      dispatch(closeSTORE_DATA());
      dispatch(getSTORELIST_DATA());
    } else {
      alertModal('', '수정이 완료됐습니다.');
      dispatch(
        updateSTORE({
          NAME,
          ADDR1,
          ADDR2,
          TYPE,
          LATE_FLAG,
          LATE_TIME,
          EARLY_FLAG,
          EARLY_TIME,
          CALCULATE_DAY,
        }),
      );
      navigation.goBack();
    }
    const gps = commuteType.toString();
    let CLOSE_FLAGProps = CLOSE_FLAG == false ? '0' : '1';
    if (sign == 'close') {
      CLOSE_FLAGProps = '1';
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.updateStore({
        CU_CODE,
        CLOSE_FLAG: CLOSE_FLAGProps,
        STORE_SEQ,
        NAME,
        ADDR1,
        ADDR2,
        LAT: lat,
        LONG: long,
        CALCULATE_DAY,
        LATE_TIME,
        LATE_FLAG,
        EARLY_TIME,
        EARLY_FLAG,
        GPS: gps,
        JULI: distance,
        TYPE: TYPE,
        CATEGORY: storeCategoryType,
        other: storeCategoryTypeEtc,
      });
      if (data.resultmsg !== '1') {
        alertModal('', '연결에 실패하였습니다.');
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    if (
      typeof STORE_DATA?.CATEGORY !== 'undefined' &&
      STORE_DATA?.CATEGORY !== null
    ) {
      const storeCategoryTypeCheckProps = storeCategoryTypeCheck;
      storeCategoryTypeCheckProps[Number(STORE_DATA?.CATEGORY)] = true;
      setStoreCategoryTypeCheck(storeCategoryTypeCheckProps);
    }
    STORE === '0' && navigation.setOptions({title: '점포 정보'});
  }, []);

  useEffect(() => {
    setADDR1(params?.addr ?? STORE_DATA?.resultdata?.ADDR1);
  }, [params]);

  return (
    <UpdateStoreScreenPresenter
      STORE={STORE}
      CU_CODE={CU_CODE}
      setNAME={setNAME}
      NAME={NAME}
      LATE_TIME={LATE_TIME}
      EARLY_TIME={EARLY_TIME}
      timeCheck={timeCheck}
      EARLYtimeCheck={EARLYtimeCheck}
      dayCheck={dayCheck}
      CALCULATE_DAY={CALCULATE_DAY}
      days={days}
      setDays={setDays}
      setADDR1={setADDR1}
      setADDR2={setADDR2}
      ADDR1={ADDR1}
      ADDR2={ADDR2}
      sizeTypeCheck={sizeTypeCheck}
      setSizeTypeCheck={setSizeTypeCheck}
      setTYPE={setTYPE}
      explainModal={explainModal}
      gotoSearchAddress={gotoSearchAddress}
      submit={submit}
      confirmModal={confirmModal}
      modalVisible1={modalVisible1}
      modalVisible2={modalVisible2}
      modalVisible3={modalVisible3}
      setModalVisible1={setModalVisible1}
      setModalVisible2={setModalVisible2}
      setModalVisible3={setModalVisible3}
      onPressLate={onPressLate}
      onPressEarly={onPressEarly}
      checkDirectInput={checkDirectInput}
    />
  );
};
