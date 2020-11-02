import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import ShelfLifeCheckScreenPresenter from './ShelfLifeCheckScreenPresenter';
import {setAlertInfo, setAlertVisible} from '~/redux/alertSlice';
import {resultdata} from '~/assets/dummy';
import {
  getSHELFLIFE_DATA,
  udpateSHELFLIFE,
  cancelSHELFLIFE,
} from '~/redux/shelflifeSlice';

export default () => {
  const YEAR = moment().format('YYYY');
  const MONTH = moment().format('MM');
  const DAY = moment().format('DD');

  const dispatch = useDispatch();

  const {EMP_SEQ} = useSelector((state: any) => state.storeReducer);
  const {STORE, MEMBER_NAME} = useSelector((state: any) => state.userReducer);
  const {SHELFLIFE_DATA} = useSelector((state: any) => state.shelflifeReducer);

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>([]);
  const [dayBefore, setDayBefore] = useState<any>([]);
  const [weekBefore, setWeekBefore] = useState<any>([]);
  const [weeksBefore, setWeeksBefore] = useState<any>([]);
  const [monthBefore, setMonthBefore] = useState<any>([]);
  const confirmModal = (shelfLife_SEQ, shelfLifeDate) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품의 유통기한 만료로 폐기 또는 처리 완료 체크합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => updateShelfLife(shelfLife_SEQ, shelfLifeDate),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const cancelModal = (shelfLife_SEQ, shelfLifeDate) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content: '상품 처리완료를 취소합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => cancelShelfLife(shelfLife_SEQ, shelfLifeDate),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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

  const onDayPress = (day) => {
    dispatch(getSHELFLIFE_DATA(day.year, day.month, day.day));
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const cancelShelfLife = async (shelfLife_SEQ, shelfLifeDate) => {
    try {
      alertModal('상품의 처리완료를 취소하였습니다.');
      dispatch(cancelSHELFLIFE({shelfLife_SEQ, shelfLifeDate}));
      // const {data} = await api.cancelShelfLifeData({shelfLife_SEQ});
      // if (data.resultmsg !== '1') {
      //   alertModal('연결에 실패하였습니다.');
      // }
    } catch (e) {
      console.log(e);
    }
  };

  const updateShelfLife = async (shelfLife_SEQ, shelfLifeDate) => {
    try {
      alertModal('상품의 폐기 또는 처리 완료 하였습니다.');
      dispatch(
        udpateSHELFLIFE({
          shelfLife_SEQ,
          shelfLifeDate,
          checkEmpName: STORE === '1' ? '점주' : MEMBER_NAME,
          checkTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        }),
      );
      // const {data} = await api.checkShelfLifeData({
      //   STORE,
      //   EMP_SEQ,
      //   shelfLife_SEQ,
      // });
      // if (data.resultmsg !== '1') {
      //   alertModal('연결에 실패하였습니다.');
      // }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
    dispatch(getSHELFLIFE_DATA(YEAR, MONTH, DAY));
  }, []);

  const fetchData = () => {
    try {
      setLoading(true);
      const dayList = [];
      const weekList = [];
      const weeksList = [];
      const monthList = [];
      const day = moment();
      const dayDuration = moment().add(2, 'days');
      const weekDuration = moment().add(7, 'days').add(1, 'days');
      const weeksDuration = moment().add(14, 'days').add(1, 'days');
      const monthDuration = moment().add(1, 'months').add(1, 'days');
      while (monthDuration.diff(day, 'days') > 0) {
        resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
          monthList.push(...resultdata[day.format('YYYY-MM-DD')]);
        if (weeksDuration.diff(day, 'days') > 0) {
          resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
            weeksList.push(...resultdata[day.format('YYYY-MM-DD')]);
          if (weekDuration.diff(day, 'days') > 0) {
            resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
              weekList.push(...resultdata[day.format('YYYY-MM-DD')]);
            if (dayDuration.diff(day, 'days') > 0) {
              resultdata[day.format('YYYY-MM-DD')]?.length > 0 &&
                dayList.push(...resultdata[day.format('YYYY-MM-DD')]);
            }
          }
        }
        day.add(1, 'days');
      }
      setDayBefore(dayList);
      setWeekBefore(weekList);
      setWeeksBefore(weeksList);
      setMonthBefore(monthList);
      setData([
        {
          titleNumber: '1',
          titleWord: '일전',
          backgroundColor: 'white',
          textColor: 'red',
          radius: 100,
          totalQTY: dayList.length,
          doneQTY: dayList.filter((i) => i.checkType === '1').length,
          percentage: Number(
            Math.ceil(
              (dayList.filter((i) => i.checkType === '1').length /
                dayList.length) *
                100,
            ),
          ),
        },
        {
          titleNumber: '1',
          titleWord: '주전',
          backgroundColor: 'white',
          textColor: 'blue',
          radius: 80,
          totalQTY: weekList.length,
          doneQTY: weekList.filter((i) => i.checkType === '1').length,
          percentage: Number(
            Math.ceil(
              (weekList.filter((i) => i.checkType === '1').length /
                weekList.length) *
                100,
            ),
          ),
        },
        {
          titleNumber: '2',
          titleWord: '주전',
          backgroundColor: 'white',
          textColor: 'yellow',
          radius: 60,
          totalQTY: weeksList.length,
          doneQTY: weeksList.filter((i) => i.checkType === '1').length,
          percentage: Number(
            Math.ceil(
              (weeksList.filter((i) => i.checkType === '1').length /
                weeksList.length) *
                100,
            ),
          ),
        },
        {
          titleNumber: '1',
          titleWord: '달전',
          backgroundColor: 'white',
          textColor: 'green',
          radius: 40,
          totalQTY: monthList.length,
          doneQTY: monthList.filter((i) => i.checkType === '1').length,
          percentage: Number(
            Math.ceil(
              (monthList.filter((i) => i.checkType === '1').length /
                monthList.length) *
                100,
            ),
          ),
        },
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ShelfLifeCheckScreenPresenter
      SHELFLIFE_DATA={resultdata}
      onDayPress={onDayPress}
      onRefresh={onRefresh}
      confirmModal={confirmModal}
      cancelModal={cancelModal}
      dayBefore={dayBefore}
      weekBefore={weekBefore}
      weeksBefore={weeksBefore}
      monthBefore={monthBefore}
      loading={loading}
      data={data}
      refreshing={refreshing}
    />
  );
};
