import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import ChecklistItemsScreenPresenter from './ChecklistItemsScreenPresenter';
export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {
    STOREDATA,
    STORE,
    STORE_SEQ,
    EMP_SEQ,
    STOREPAY_SHOW,
    ISMANAGER,
  } = params;

  const intended = {
    key: 'intended',
    color: '#0D4F8A',
    selectedDotColor: '#0D4F8A',
  }; // 체크 예정
  const clear = {key: 'clear', color: '#AACE36', selectedDotColor: '#AACE36'}; // 체크 정상
  const confused = {
    key: 'confused',
    color: '#984B19',
    selectedDotColor: '#984B19',
  }; // 체크 이상

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState<boolean>(
    false,
  );
  const [isChecklistModalVisible, setIsChecklistModalVisible] = useState<
    boolean
  >(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [storeID, setStoreID] = useState<string>(STORE_SEQ || '');
  const [checklist, setChecklist] = useState<any>([]);
  const [checklist2, setChecklist2] = useState<any>([]);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD') || '');
  const [dateToday, setDateToday] = useState<string>(
    moment().format('YYYY-MM-DD') || '',
  );
  const [defaultMonth, setDefaultMonth] = useState<string>(
    moment().format('YYYY-MM-DD') || '',
  );
  // 마크드 데이터 만들기
  const [today, setToday] = useState<string>(
    moment().format('YYYY-MM-DD') || '',
  );
  const [year, setYear] = useState<string>(moment().format('YYYY') || '');
  const [month, setMonth] = useState<string>(moment().format('MM') || '');
  const [day, setDay] = useState<string>(moment().format('DD') || '');
  const [staticmarkedDates, setStaticmarkedDates] = useState<any>({});
  const [markedDates, setMarkedDates] = useState<any>({});
  // QR체크
  const [selectChecklist, setSelectChecklist] = useState<any>([]);
  const [lat, setLat] = useState<number>(0);
  const [long, setLong] = useState<number>(0);
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [scanstore, setScanstore] = useState<boolean>(false);
  const [isCheckYes, setIsCheckYes] = useState<boolean>(false);
  const [isCheckNo, setIsCheckNo] = useState<boolean>(false);
  const [isWillCheck, setIsWillCheck] = useState<boolean>(false);

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

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };

    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const adviceModal = (title, text) => {
    const params = {
      alertType: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const fetchData = async (date = moment().format('YYYY-MM-DD')) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getChecklist2(STORE_SEQ, date);
      setChecklist(data.result);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const selectCheckListFn = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getChecklist(
        STORE_SEQ,
        moment().format('YYYY-MM-DD'),
      );
      setIsChecklistModalVisible(true);
      setSelectChecklist(data.result);
      setScanstore(data);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const monthChange = async (data) => {
    setDefaultMonth(data.dateString);
    marking(data.year, data.month, data.day);
  };

  const marking = async (y, m, d) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getChecklistAll(STORE_SEQ, y, m);
      const iterator = Object.keys(data.result);
      const staticmarkedDates = {};
      const markedDates = {};
      let today = new Date();
      for (const key of iterator) {
        staticmarkedDates[key] = '';
        markedDates[key] = '';
        let dots1 = [];
        let status1 = '0';
        let status2 = '0';
        let status3 = '0';

        let keyday = new Date(key);
        if (today.getTime() < keyday.getTime()) {
          continue;
        }
        for (let j = 0; j < data.result[key].length; j++) {
          if (data.result[key][j].EMP_CHECK == '0') {
            status1 = '1'; // 예정
          } else {
            if (data.result[key][j].CHECK_TYPE == '1') {
              status2 = '1'; // 이상
            } else {
              status3 = '1'; // 정상
            }
          }
        }
        if (data.result[key].length !== 0) {
          if (status1 == '1') {
            dots1.push(intended);
          } else if (status2 == '1') {
            dots1.push(confused);
          } else {
            dots1.push(clear);
          }
        }
        staticmarkedDates[key] = {
          dots: dots1,
        };
      }
      m < 10 ? (m = '0' + m) : m;
      d < 10 ? (d = '0' + d) : d;
      staticmarkedDates[y + '-' + m + '-' + d] = {
        ...staticmarkedDates[y + '-' + m + '-' + d],
        selected: true,
        selectedColor: '#ccc',
      };
      setStaticmarkedDates(staticmarkedDates);
      setMarkedDates(staticmarkedDates);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const select = (year, month, day) => {
    let markedDates = staticmarkedDates;
    let iterator = Object.keys(markedDates);
    for (const key of iterator) {
      markedDates[key] = {
        ...markedDates[key],
        selected: false,
      };
    }
    let m = month;
    let d = day;
    markedDates[year + '-' + m + '-' + d] = {
      ...markedDates[year + '-' + m + '-' + d],
      selected: true,
      selectedColor: '#ccc',
    };
    fetchData(year + '-' + m + '-' + d);
    setIsCalendarModalVisible(false);
    setMarkedDates(markedDates);
    setDate(year + '-' + m + '-' + d);
    setDefaultMonth(year + '-' + m + '-' + d);
  };

  const onDayPress = (data) => {
    select(
      moment(data.dateString).format('YYYY'),
      moment(data.dateString).format('MM'),
      moment(data.dateString).format('DD'),
    );
  };

  const checkdata = async (storeid, list) => {
    let flag = true;
    if (list.EMP_SEQ != null) {
      flag = false;
      let emparr = list.EMP_SEQ.split('@');
      for (let index = 0; index < emparr.length; index++) {
        if (emparr[index] == STOREDATA?.EMP_SEQ) {
          flag = true;
          break;
        }
      }
    }
    setIsScanned(false);
    setIsChecklistModalVisible(false);
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getCheckList({
        STORE_ID: STORE_SEQ,
        LAT: lat,
        LONG: long,
        MEMBER_SEQ,
      });
      if (flag == false) {
        alertModal('담당직원이 아닙니다.');
      } else {
        if (data.message == 'SUCCESS') {
          if (data.result.length > 0) {
            navigation.navigate('ChecklistSpecification', {
              checkType: '2', // 체크진행
              checkID: data.result[0]?.CHECK_SEQ,
              csID: data.result[0]?.CS_SEQ,
              checkpoint: data.result[0]?.TITLE,
              checklist: data.result[0]?.LIST,
              checktime: data.result[0]?.END_TIME,
              check: data.result[0]?.CHECK_LIST,
              checkEMP: data.result[0]?.EMP_NAME,
              checkEMPTime: data.result[0]?.CHECK_TIME,
              memo: data.result[0]?.CHCEK_TITLE,
              PHOTO_CHECK: data.result[0]?.PHOTO_CHECK,
              scan: '1',
              register: false,
              DATE: date,
              refresh: () => onRefresh(),
            });
          } else {
            alertModal('체크리스트를 추가해주세요.');
          }
        } else if (data.message == 'SCHEDULE_EXIST') {
          alertModal(data.result);
        } else if (data.message == 'EMP_ERROR') {
          alertModal(data.result);
        } else {
          alertModal(data.result);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const onPressAddChecklist = () => {
    if (
      Number(STOREDATA?.resultdata.CHECK_COUNT) <=
      Number(STOREDATA?.check_count)
    ) {
      alertModal(
        '체크리스트는 ' +
          STOREDATA?.resultdata.CHECK_COUNT +
          '개까지만 등록가능합니다.',
      );
    } else {
      gotoChecklistAdd();
    }
  };

  const gotoChecklistAdd = () => {
    navigation.navigate('ChecklistAddScreen', {
      STOREDATA,
      storeID,
      TITLE: '체크리스트 등록',
      type: '등록',
      onRefresh: () => onRefresh(),
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setYear(moment(date).format('YYYY'));
    setMonth(moment(date).format('MM'));
    setDay(moment(date).format('DD'));
  }, [date]);

  return (
    <ChecklistItemsScreenPresenter
      STORE={STORE}
      date={date}
      fetchData={fetchData}
      refreshing={refreshing}
      onRefresh={onRefresh}
      year={year}
      month={month}
      day={day}
      select={select}
      marking={marking}
      isCalendarModalVisible={isCalendarModalVisible}
      setIsCalendarModalVisible={setIsCalendarModalVisible}
      isChecklistModalVisible={isChecklistModalVisible}
      setIsChecklistModalVisible={setIsChecklistModalVisible}
      setDefaultMonth={setDefaultMonth}
      onPressAddChecklist={onPressAddChecklist}
      defaultMonth={defaultMonth}
      markedDates={markedDates}
      onDayPress={onDayPress}
      monthChange={monthChange}
      checklist={checklist}
      STORE_SEQ={STORE_SEQ}
      adviceModal={adviceModal}
      gotoChecklistAdd={gotoChecklistAdd}
      selectCheckListFn={selectCheckListFn}
      selectChecklist={selectChecklist}
      checkdata={checkdata}
      scanstore={scanstore}
    />
  );
};
