import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import ChecklistShareMainScreenPresenter from './ChecklistShareMainScreenPresenter';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE_SEQ, MEMBER_SEQ, STORE, NAME} = useSelector(
    (state: any) => state.userReducer,
  );

  const [storeID, setStoreID] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [ShareList, setShareList] = useState<any>([]);
  const [ShareList2, setShareList2] = useState<any>([]);
  const [ShareList3, setShareList3] = useState<any>([]);
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<any>([]);
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [date1, setDate1] = useState<string>(moment().format('YYYY-MM-DD'));
  const [year, setYear] = useState<string>(moment().format('YYYY'));
  const [month, setMonth] = useState<string>(moment().format('MM'));
  const [day, setDay] = useState<string>(moment().format('DD'));
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState<boolean>(
    false,
  );
  const [markedDates, setMarkedDates] = useState<any>({});

  const onRefresh = async (page) => {
    try {
      dispatch(setSplashVisible(true));
      await fetchData(page, date);
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

  const fixControlFn = (noticeSeq, type) => {
    var TYPE;
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

  const registerFn = async (noticeSeq) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.setNoticeFavorite({NOTICE_SEQ: noticeSeq});
      fetchData(index, date);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(true));
    }
  };

  const onMonthChange = (date) => {
    setDate1(date);
    markingFn(year, date.month);
  };

  const onPressAddButtonFn = (TITLE) => {
    navigation.navigate('ChecklistShareInsertScreen', {
      TITLE,
      NAME,
      STORE,
      STORE_SEQ,
      ADDDATE: date,
    });
  };
  const onDayPress = (data) => {
    fetchData(index, moment(data).format('YYYY-MM-DD'));
    setIsCalendarModalVisible(false);
    setYear(moment(data).format('YYYY'));
    setMonth(moment(data).format('MM'));
    setDay(moment(data).format('DD'));
    setDate(moment(data).format('YYYY-MM-DD'));
  };

  const markingFn = async (year, month) => {
    const content = {key: 'content', color: '#000'};
    try {
      const {data} = await api.getNoticeAll(
        STORE_SEQ,
        year,
        Number(month),
        MEMBER_SEQ,
        index == 0 ? '1' : '0',
      );
      console.log('markingFn', data);
      const iterator = Object.keys(data.result);
      const markedDates = {};
      var dots1 = [];
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
      for (var i = 0; i < data.result.length; i++) {}
      setMarkedDates(markedDates);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async (page, date) => {
    markingFn(moment(date1).format('YYYY'), moment(date1).format('M'));

    var newCnt1 = 0;
    var newCnt2 = 0;
    var newCnt3 = 0;
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getNotice31(STORE_SEQ, MEMBER_SEQ, date);
      for (var a = 0; a < data.basic.length; a++) {
        if (data.basic[a].NoticeCheck_SEQ == null) {
          newCnt1 = newCnt1 + 1;
        }
      }
      for (var b = 0; b < data.favorite.length; b++) {
        if (data.favorite[b].NoticeCheck_SEQ == null) {
          newCnt1 = newCnt1 + 1;
        }
      }
      setShareList(data);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getNotice30(STORE_SEQ, MEMBER_SEQ, date);
      for (var a = 0; a < data.basic.length; a++) {
        if (data.basic[a].NoticeCheck_SEQ == null) {
          newCnt2 = newCnt2 + 1;
        }
      }
      for (var b = 0; b < data.favorite.length; b++) {
        if (data.favorite[b].NoticeCheck_SEQ == null) {
          newCnt2 = newCnt2 + 1;
        }
      }
      setShareList2(data);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
    if (STORE == '1') {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.getCuNotice(STORE_SEQ, MEMBER_SEQ);
        for (var a = 0; a < data.message.length; a++) {
          if (data.message[a].cu_notice_check_SEQ == null) {
            newCnt3 = newCnt3 + 1;
          }
        }
        setRoutes([
          {key: 'first', title: '지시사항', newCnt1: newCnt1},
          {key: 'second', title: '특이사항', newCnt2: newCnt2},
          {key: 'third', title: 'CU소식', newCnt3: newCnt3},
        ]);
        setIndex(page ? Number(page) : params?.notice == '1' ? 2 : 0);
        setShareList3(data);
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      setRoutes([
        {key: 'first', title: '지시사항', newCnt1: newCnt1},
        {key: 'second', title: '특이사항', newCnt2: newCnt2},
      ]);
      setIndex(page ? Number(page) : params?.notice == '1' ? 2 : 0);
    }
  };

  useEffect(() => {
    fetchData(index, date);
  }, []);

  useEffect(() => {
    setYear(moment(date).format('YYYY'));
    setMonth(moment(date).format('MM'));
    setDay(moment(date).format('DD'));
  }, [date]);

  return (
    <ChecklistShareMainScreenPresenter
      refreshing={refreshing}
      onRefresh={onRefresh}
      STORE={STORE}
      onDayPress={onDayPress}
      onMonthChange={onMonthChange}
      onPressAddButtonFn={onPressAddButtonFn}
      markedDates={markedDates}
      date={date}
      setDate={setDate}
      date1={date1}
      setDate1={setDate1}
      ShareList={ShareList}
      ShareList2={ShareList2}
      ShareList3={ShareList3}
      markingFn={markingFn}
      fixControlFn={fixControlFn}
      fetchData={fetchData}
      index={index}
      MEMBER_SEQ={MEMBER_SEQ}
      year={year}
      month={month}
      day={day}
      isCalendarModalVisible={isCalendarModalVisible}
      setIsCalendarModalVisible={setIsCalendarModalVisible}
    />
  );
};
