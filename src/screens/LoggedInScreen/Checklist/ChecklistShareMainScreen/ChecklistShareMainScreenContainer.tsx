import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {
  getCHECKLIST_SHARE_DATA1,
  getCHECKLIST_SHARE_DATA2,
  getCHECKLIST_SHARE_DATA3,
  setCHECKLIST_SHARE_MARKED,
} from '../../../../redux/checklistshareSlice';
import ChecklistShareMainScreenPresenter from './ChecklistShareMainScreenPresenter';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE, MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ, STORE_NAME} = useSelector(
    (state: any) => state.storeReducer,
  );
  const {
    CHECKLIST_SHARE_DATA1,
    NEW_CNT1,
    CHECKLIST_SHARE_DATA2,
    NEW_CNT2,
    CHECKLIST_SHARE_DATA3,
    NEW_CNT3,
    CHECKLIST_SHARE_MARKED,
  } = useSelector((state: any) => state.checklistshareReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState<boolean>(
    false,
  );

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text, cancel, okBtn, noticeSeq) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      okCallback: () => {
        registerFn(noticeSeq);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // 해당 Route만 리로드
  const fixControlFn = (noticeSeq, type) => {
    let TYPE;
    type == 'fix' ? (TYPE = '고정은') : (TYPE = '고정해제는');
    if (STORE == '0') {
      return alertModal(`상단${TYPE} 점주만 가능합니다`);
    }
    if (type == 'fix') {
      return confirmModal(
        '상단고정',
        '게시글을 상단에 고정합니다\n최신 고정순으로 정렬됩니다',
        '취소',
        '고정',
        noticeSeq,
      );
    } else {
      return confirmModal(
        '고정해제',
        '작성일 기준으로 정렬됩니다',
        '취소',
        '해제',
        noticeSeq,
      );
    }
  };

  // 해당 Route만 리로드
  const onRefresh = async (location) => {
    try {
      setRefreshing(true);
      if (location === 'firstRoute') {
        dispatch(getCHECKLIST_SHARE_DATA1(date));
      } else if (location === 'secondRoute') {
        dispatch(getCHECKLIST_SHARE_DATA2(date));
      } else {
        dispatch(getCHECKLIST_SHARE_DATA3());
      }
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  // 캘린더에서 월을 이도하는 경우 해당 월의 Marking 로드
  const onMonthChange = (date) => {
    setDate(date.dateString);
    markingFn(date.year, date.month);
  };

  // 캘린더에서 날짜를 선택하는 경우 지시사항과 특이사항만 로드
  const onDayPress = (date) => {
    dispatch(getCHECKLIST_SHARE_DATA1(date.dateString));
    dispatch(getCHECKLIST_SHARE_DATA2(date.dateString));
    setIsCalendarModalVisible(false);
    setDate(date.dateString);
  };

  // 고정 & 고정해제
  const registerFn = async (noticeSeq) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.setNoticeFavorite({NOTICE_SEQ: noticeSeq});
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
      dispatch(getCHECKLIST_SHARE_DATA1(date));
      dispatch(getCHECKLIST_SHARE_DATA2(date));
    }
  };

  // 파라미터 확인 필요 =============================================
  const onPressAddButtonFn = (TITLE) => {
    navigation.navigate('ChecklistShareInsertScreen', {
      TITLE,
      NAME: STORE_NAME,
      STORE,
      STORE_SEQ,
      ADDDATE: date,
    });
  };

  // API 타입 확인 필요 =============================================
  const markingFn = async (YEAR, MONTH) => {
    const content = {key: 'content', color: '#000'};
    try {
      const {data} = await api.getNoticeAll(
        STORE_SEQ,
        YEAR,
        MONTH,
        MEMBER_SEQ,
        index == 0 ? '1' : '0',
      );
      console.log('markingFn', data);
      if (data.message === 'SUCCESS') {
        const iterator = Object.keys(data.result);
        const markedDates = {};
        let dots1 = [];
        dots1.push(content);
        for (const key of iterator) {
          markedDates[key] = '';
          if (data.result[key].COUNT !== 0) {
            markedDates[key] = {dots: dots1};
          }
          if (data.result[key].NEW !== 0) {
            markedDates[key] = {
              ...markedDates[key],
              selected: true,
              selectedColor: 'red',
            };
          }
        }
        for (let i = 0; i < data.result.length; i++) {}
        dispatch(setCHECKLIST_SHARE_MARKED(markedDates));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = (location, date) => {
    if (location === 'firstRoute') {
      dispatch(getCHECKLIST_SHARE_DATA1(date));
    } else if (location === 'secondRoute') {
      dispatch(getCHECKLIST_SHARE_DATA2(date));
    } else {
      dispatch(getCHECKLIST_SHARE_DATA1(date));
      dispatch(getCHECKLIST_SHARE_DATA2(date));
    }
  };

  const Init = async (page, date) => {
    markingFn(moment(date).format('YYYY'), moment(date).format('M'));
    fetchData('', date);
    if (STORE === '1') {
      dispatch(getCHECKLIST_SHARE_DATA3());
      setIndex(page ? Number(page) : params?.notice == '1' ? 2 : 0);
    } else {
      setIndex(page ? Number(page) : params?.notice == '1' ? 2 : 0);
    }
  };

  useEffect(() => {
    Init(index, moment().format('YYYY-M-DD'));
  }, []);

  return (
    <ChecklistShareMainScreenPresenter
      refreshing={refreshing}
      onRefresh={onRefresh}
      STORE={STORE}
      onDayPress={onDayPress}
      onMonthChange={onMonthChange}
      onPressAddButtonFn={onPressAddButtonFn}
      CHECKLIST_SHARE_MARKED={CHECKLIST_SHARE_MARKED}
      date={date}
      setDate={setDate}
      CHECKLIST_SHARE_DATA1={CHECKLIST_SHARE_DATA1}
      NEW_CNT1={NEW_CNT1}
      CHECKLIST_SHARE_DATA2={CHECKLIST_SHARE_DATA2}
      NEW_CNT2={NEW_CNT2}
      CHECKLIST_SHARE_DATA3={CHECKLIST_SHARE_DATA3}
      NEW_CNT3={NEW_CNT3}
      markingFn={markingFn}
      fixControlFn={fixControlFn}
      fetchData={fetchData}
      index={index}
      MEMBER_SEQ={MEMBER_SEQ}
      isCalendarModalVisible={isCalendarModalVisible}
      setIsCalendarModalVisible={setIsCalendarModalVisible}
    />
  );
};
