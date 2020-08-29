import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import api from '../../../../constants/LoggedInApi';
import ShelfLifeCheckScreenPresenter from './ShelfLifeCheckScreenPresenter';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';

export default ({route: {params}}) => {
  let _year = moment().format('YYYY');
  let _month = moment().format('MM');
  let _day = moment().format('DD');

  const agendaRef = useRef(null);
  const dispatch = useDispatch();
  const {STORE_SEQ, STORE} = useSelector((state: any) => state.userReducer);

  const [items, setItems] = useState<any>({});
  const [marked, setMarked] = useState<any>({});
  const [selectDay, setSelectDay] = useState<string>(
    moment().format('YYYY-MM-DD'),
  );

  const confirmModal = (shelfLifeClear, shelfLifeDate) => {
    const params = {
      type: 'confirm',
      title: '',
      content: '상품의 유통기한 만료로 폐기 또는 처리 완료 체크합니다',
      cancelButtonText: '취소',
      okButtonText: '확인',
      okCallback: () => {
        updateShelfLife(shelfLifeClear, shelfLifeDate);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
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

  const onDayChange = (day) => {
    setSelectDay(day.dateString);
  };

  const onDayPress = (day) => {
    setSelectDay(day.dateString);
    fetchData(day.year, day.month, day.day, 'markCheck');
  };

  const onRefresh = () => {
    fetchData(_year, _month, _day, 'markCheck');
  };

  const fetchData = async (year, month, day, makeCheck) => {
    month = Number(month);
    day = Number(day);
    try {
      const {data} = await api.getShelfLifeData({
        STORE_SEQ: STORE_SEQ,
        YEAR: year.toString(),
        MONTH: month < 10 ? '0' + month : month,
        DAY: day < 10 ? '0' + day : day,
      });
      setItems(data.resultdata);
    } catch (error) {
      console.log(error);
    }
    try {
      const {data} = await api.getAllShelfLifeData({
        STORE_SEQ: STORE_SEQ,
      });
      setMarked(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const updateShelfLife = async (shelfLife_SEQ, shelfLifeDate) => {
    const {STOREDATA} = params;
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.checkShelfLifeData({
        STORE,
        EMP_SEQ: STOREDATA.EMP_SEQ,
        shelfLife_SEQ: shelfLife_SEQ,
      });
      alertModal('', '상품의 폐기 또는 처리 완료 체크합니다');
      fetchData(
        shelfLifeDate.substr(0, 4),
        shelfLifeDate.substr(5, 2),
        shelfLifeDate.substr(8, 2),
        'markCheck',
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData(_year, _month, _day, 'markCheck');
    agendaRef?.current?.chooseDay(selectDay);
  }, []);

  return (
    <ShelfLifeCheckScreenPresenter
      agendaRef={agendaRef}
      items={items}
      onDayChange={onDayChange}
      onDayPress={onDayPress}
      marked={marked}
      onRefresh={onRefresh}
      confirmModal={confirmModal}
      alertModal={alertModal}
    />
  );
};
