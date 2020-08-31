import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import AddStoreScreenPresenter from './AddStoreScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import {Keyboard} from 'react-native';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE, MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [CLOSE_FLAG, setCLOSE_FLAG] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [checkAuth, setCheckAuth] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [addr1, setAddr1] = useState<string>('');
  const [addr2, setAddr2] = useState<string>('');
  const [type, setType] = useState<number>(0);
  const [LATE_FLAG, setLATE_FLAG] = useState<string>('0');
  const [LATE_TIME, setLATE_TIME] = useState<number>(0);
  const [CALCULATE_DAY, setCALCULATE_DAY] = useState<string>('1');
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [STORE_SEQ, setSTORE_SEQ] = useState<number>(0);
  const [storeCategoryTypeEtc, setStoreCategoryTypeEtc] = useState<string>(
    null,
  ); // 사업장 분류 유형이 4(기타)인 경우 직접 입력 값
  const [sizeTypeCheck, setSizeTypeCheck] = useState<[boolean, boolean]>([
    true,
    false,
  ]); //1: 5인 이상, 0: 5인 미만
  const [commuteType, setCommuteType] = useState<number>(0); // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근
  const [commuteTypeCheck, setCommuteTypeCheck] = useState<[boolean, boolean]>([
    true,
    false,
  ]);
  const [storeCategoryType, setStoreCategoryType] = useState<number>(null); // 사업장 분류 유형, 0: 요식업, 1: 도,소매업, 2: 서비스업, 3: 일반회사, 4: 기타
  const [storeCategoryTypeCheck, setStoreCategoryTypeCheck] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, false, false]);
  const [distance, setDistance] = useState<string>('150');
  const [time, setTime] = useState<string>('');
  const [timeCheck, setTimeCheck] = useState<boolean>(true);
  const [day, setDay] = useState<string>('');
  const [days, setDays] = useState<any>(new Array(30));
  const [day1, setDay1] = useState<string>(''); // 정산일 선택했을 때 확인을 누르지않을 경우 일자 담아둠
  const [dayCheck, setDayCheck] = useState<boolean>(true);
  const [modalVisible2, setModalVisible2] = useState<boolean>(false);
  const [modalVisible3, setModalVisible3] = useState<boolean>(false);

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title,
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

  const submit = async () => {
    dispatch(setSplashVisible(true));

    const gps = commuteType.toString();

    if (code.length !== 5) {
      dispatch(setSplashVisible(false));
      alertModal('', '점포코드를 올바르게 입력해주세요.');
    } else if (name == '') {
      dispatch(setSplashVisible(false));
      alertModal('', '점포명을 입력해주세요.');
    } else if (addr1 == '') {
      dispatch(setSplashVisible(false));
      alertModal('', '기본주소를 입력해주세요.');
    } else if (addr2 == '') {
      dispatch(setSplashVisible(false));
      alertModal('', '상세주소를 입력해주세요.');
    } else if (timeCheck == false) {
      dispatch(setSplashVisible(false));
      alertModal('', '지각허용시간을 선택해주세요.');
    } else if (dayCheck == false) {
      dispatch(setSplashVisible(false));
      alertModal('', '급여정산일을 선택해주세요.');
    } else {
      try {
        const {data} = await api.addStore({
          NAME: name,
          ADDR1: addr1,
          ADDR2: addr2,
          MEMBER_SEQ: MEMBER_SEQ,
          LAT: lat,
          LONG: long,
          CALCULATE_DAY: CALCULATE_DAY,
          LATE_TIME: LATE_TIME,
          LATE_FLAG: LATE_FLAG,
          GPS: gps,
          JULI: distance,
          TYPE: type,
          CATEGORY: storeCategoryType,
          other: storeCategoryTypeEtc,
          CU_CODE: code,
        });
        dispatch(setSplashVisible(false));
        if (data.message == 'SUCCESS') {
          alertModal(
            '사업장 추가완료',
            '사업장을 클릭하신 후 직원을 초대하세요.',
          );
          navigation.goBack();
        }
      } catch (error) {
        dispatch(setSplashVisible(false));
        console.log(error);
      }
    }
  };

  return (
    <AddStoreScreenPresenter
      days={days}
      setDay1={setDay1}
      sizeTypeCheck={sizeTypeCheck}
      setType={setType}
      setDays={setDays}
      CALCULATE_DAY={CALCULATE_DAY}
      onPressLate={onPressLate}
      modalVisible2={modalVisible2}
      setModalVisible2={setModalVisible2}
      modalVisible3={modalVisible3}
      setModalVisible3={setModalVisible3}
      checkDirectInput={checkDirectInput}
      LATE_TIME={LATE_TIME}
      timeCheck={timeCheck}
      explainModal={explainModal}
      day={day}
      dayCheck={dayCheck}
      gotoSearchAddress={gotoSearchAddress}
      setAddr1={setAddr1}
      addr1={addr1}
      setAddr2={setAddr2}
      addr2={addr2}
      setSizeTypeCheck={setSizeTypeCheck}
      setCheckAuth={setCheckAuth}
      setCode={setCode}
      code={code}
      name={name}
      setName={setName}
      submit={submit}
    />
  );
};
