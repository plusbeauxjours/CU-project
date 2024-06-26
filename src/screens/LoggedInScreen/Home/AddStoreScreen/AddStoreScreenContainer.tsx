import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import AddStoreScreenPresenter from './AddStoreScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {setSplashVisible} from '~/redux/splashSlice';
import {getSTORELIST_DATA} from '~/redux/userSlice';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);

  const [CU_CODE, setCU_CODE] = useState<string>('');
  const [NAME, setNAME] = useState<string>('');
  const [ADDR1, setADDR1] = useState<string>(params?.addr || '');
  const [ADDR2, setADDR2] = useState<string>('');
  const [TYPE, setTYPE] = useState<number>(0);
  const [LATE_FLAG, setLATE_FLAG] = useState<string>('0');
  const [LATE_TIME, setLATE_TIME] = useState<number>(0);
  const [EARLY_FLAG, setEARLY_FLAG] = useState<string>('0');
  const [EARLY_TIME, setEARLY_TIME] = useState<number>(0);
  const [CALCULATE_DAY, setCALCULATE_DAY] = useState<string>('1');
  const [LAT, setLAT] = useState<number>(params?.lat || 0);
  const [LONG, setLONG] = useState<number>(params?.lng || 0);
  const [storeCategoryTypeEtc, setStoreCategoryTypeEtc] = useState<string>(
    null,
  ); // 사업장 분류 유형이 4(기타)인 경우 직접 입력 값
  const [sizeTypeCheck, setSizeTypeCheck] = useState<[boolean, boolean]>([
    false,
    true,
  ]); //1: 5인 이상, 0: 5인 미만
  const [commuteType, setCommuteType] = useState<number>(0); // 출퇴근방법 0: QR코드 출퇴근, 1: GPS 출퇴근

  const [storeCategoryType, setStoreCategoryType] = useState<number>(null); // 사업장 분류 유형, 0: 요식업, 1: 도,소매업, 2: 서비스업, 3: 일반회사, 4: 기타

  const [distance, setDistance] = useState<string>('150');
  const [timeCheck, setTimeCheck] = useState<boolean>(false);
  const [EARLYtimeCheck, setEARLYtimeCheck] = useState<boolean>(false);
  const [days, setDays] = useState<any>(new Array(30));
  const [dayCheck, setDayCheck] = useState<boolean>(false);
  const [modalVisible1, setModalVisible1] = useState<boolean>(false);
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
    navigation.navigate('SearchAddressScreen', {screen: 0});
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

  // 등록하기버튼
  const submit = async () => {
    const GPS = commuteType.toString();
    if (CU_CODE.length !== 5) {
      dispatch(setSplashVisible(false));
      alertModal('', '점포코드를 올바르게 입력해주세요.');
    } else if (NAME == '') {
      dispatch(setSplashVisible(false));
      alertModal('', '점포명을 입력해주세요.');
    } else if (ADDR1 == '') {
      dispatch(setSplashVisible(false));
      alertModal('', '기본주소를 입력해주세요.');
    } else if (ADDR2 == '') {
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
        dispatch(setSplashVisible(true));
        const {data} = await api.addStore({
          NAME,
          ADDR1,
          ADDR2,
          MEMBER_SEQ,
          LAT,
          LONG,
          CALCULATE_DAY,
          LATE_TIME,
          LATE_FLAG,
          EARLY_TIME,
          EARLY_FLAG,
          GPS,
          JULI: distance,
          TYPE,
          CATEGORY: storeCategoryType,
          other: storeCategoryTypeEtc,
          CU_CODE,
        });
        if (data.message == 'SUCCESS') {
          alertModal(
            '사업장 추가완료',
            '사업장을 클릭하신 후 직원을 초대하세요.',
          );
          dispatch(getSTORELIST_DATA());
          navigation.goBack();
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  useEffect(() => {
    setADDR1(params?.addr ?? '');
  }, [params]);

  return (
    <AddStoreScreenPresenter
      days={days}
      sizeTypeCheck={sizeTypeCheck}
      setTYPE={setTYPE}
      setDays={setDays}
      CALCULATE_DAY={CALCULATE_DAY}
      onPressLate={onPressLate}
      onPressEarly={onPressEarly}
      modalVisible1={modalVisible1}
      setModalVisible1={setModalVisible1}
      modalVisible2={modalVisible2}
      setModalVisible2={setModalVisible2}
      modalVisible3={modalVisible3}
      setModalVisible3={setModalVisible3}
      checkDirectInput={checkDirectInput}
      EARLY_TIME={EARLY_TIME}
      LATE_TIME={LATE_TIME}
      timeCheck={timeCheck}
      EARLYtimeCheck={EARLYtimeCheck}
      explainModal={explainModal}
      dayCheck={dayCheck}
      gotoSearchAddress={gotoSearchAddress}
      setADDR1={setADDR1}
      ADDR1={ADDR1}
      setADDR2={setADDR2}
      ADDR2={ADDR2}
      setSizeTypeCheck={setSizeTypeCheck}
      setCU_CODE={setCU_CODE}
      CU_CODE={CU_CODE}
      NAME={NAME}
      setNAME={setNAME}
      submit={submit}
    />
  );
};
