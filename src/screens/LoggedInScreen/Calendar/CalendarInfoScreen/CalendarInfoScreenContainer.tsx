import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';

import CalendarInfoScreenPresenter from './CalendarInfoScreenPresenter';
import api from '../../../../constants/LoggedInApi';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';

export default ({route: {params}}) => {
  const vacation = {
    key: 'vacation',
    color: '#325CBE',
    selectedDotColor: '#325CBE',
  };
  const nowork = {key: 'nowork', color: '#B91C1B', selectedDotColor: '#B91C1B'};
  const jigark = {key: 'jigark', color: '#E8B12F', selectedDotColor: '#E8B12F'};

  const dispatch = useDispatch();
  const {STOREDATA, STORE} = params;
  const {STORE_SEQ} = useSelector((state: any) => state.userReducer);

  const [buffer, setBuffer] = useState<any>({});
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [markedDates, setMarkedDates] = useState<any>({});
  const [staticmarkedDates, setStaticmarkedDates] = useState<any>({});
  const [employee, setEmployee] = useState<any>([]);
  const [year, setYear] = useState<string>(moment().format('YYYY'));
  const [month, setMonth] = useState<string>(moment().format('MM'));
  const [day, setDay] = useState<string>(moment().format('DD'));
  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [isReady, setIsReady] = useState<boolean>(false);
  const [visibleSpinner, setVisibleSpinner] = useState<boolean>(false);

  const onChangeMonth = async (item) => {
    console.log('onChangeMonth', item);
    try {
      const {data} = await api.getAllSchedules(
        STORE_SEQ,
        item.year,
        item.month,
      );
      setMarkFn(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async (date) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getAllSchedules(
        STORE_SEQ,
        moment(date).format('YYYY'),
        moment(date).format('MM'),
      );
      console.log(data);
      let buffer = {};
      const iterator = Object.keys(data.result);
      for (const key of iterator) {
        buffer[key] = data.result[key]['EMP_LIST'];
        if (buffer[key].length !== 0) {
          for (let k = 0; k < buffer[key].length; k++) {
            buffer[key][k] = {...buffer[key][k], WORKDATE: key};
          }
        }
      }
      if (STORE == '0' && STOREDATA.CalendarEdit !== 1) {
        for (const key of iterator) {
          buffer[key] = buffer[key].filter(
            (info) => info.EMP_ID == STOREDATA.EMP_SEQ,
          );
        }
      }
      setBuffer(buffer);
      setDate(date);
      setMarkFn(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const setMarkFn = (data) => {
    let staticmarkedDates = {};
    let markedDates = {};

    const iterator = Object.keys(data.result);
    for (const key of iterator) {
      let nowork1 = false;
      let jigark1 = false;
      let vacation1 = false;

      if (STORE == '1' || STOREDATA.CalendarEdit == '1') {
        data.result[key]['EMP_LIST'].map((data) => {
          if (data.nowork == '1') {
            //  console.log('휴무')
            nowork1 = true;
          }
          if (data.jigark == '1') {
            //  console.log('휴무')
            jigark1 = true;
          }
          if (data.alear == '1') {
            //  console.log('휴무')
            jigark1 = true;
          }
          if (data.VACATION == '1') {
            //  console.log('휴무')
            vacation1 = true;
          }
          if (data.TYPE == '3') {
            //  console.log('휴무')
            vacation1 = true;
          }
        });
      } else {
        data.result[key]['EMP_LIST'].map((data) => {
          if (STOREDATA.EMP_SEQ == data.EMP_ID) {
            if (data.nowork == '1') {
              //  console.log('휴무')
              nowork1 = true;
            }
            if (data.jigark == '1') {
              //  console.log('휴무')
              jigark1 = true;
            }
            if (data.alear == '1') {
              //  console.log('조퇴')
              jigark1 = true;
            }
            if (data.VACATION == '1') {
              //  console.log('휴무')
              vacation1 = true;
            }
            if (data.TYPE == '3') {
              //  console.log('휴무')
              vacation1 = true;
            }
          } else {
            if (data.nowork == '1') {
              //  console.log('휴무')
              nowork1 = true;
            }
            if (data.jigark == '1') {
              //  console.log('휴무')
              jigark1 = true;
            }
            if (data.alear == '1') {
              //  console.log('조퇴')
              jigark1 = true;
            }
            if (data.VACATION == '1') {
              //  console.log('휴무')
              vacation1 = true;
            }
            if (data.TYPE == '3') {
              //  console.log('휴무')
              vacation1 = true;
            }
          }
        });
      }

      if (vacation1 == true && nowork1 == true && jigark1 == true) {
        staticmarkedDates[key] = {dots: [vacation, nowork, jigark]};
      } else {
        if (vacation1 == true) {
          staticmarkedDates[key] = {dots: [vacation]};
        }
        if (nowork1 == true) {
          staticmarkedDates[key] = {dots: [nowork]};
        }
        if (jigark1 == true) {
          staticmarkedDates[key] = {dots: [jigark]};
        }
        if (vacation1 == true && nowork1 == true) {
          staticmarkedDates[key] = {dots: [vacation, nowork]};
        }
        if (vacation1 == true && jigark1 == true) {
          staticmarkedDates[key] = {dots: [vacation, jigark]};
        }
        if (nowork1 == true && jigark1 == true) {
          staticmarkedDates[key] = {dots: [nowork, jigark]};
        }
      }
      markedDates = staticmarkedDates;
    }
    setStaticmarkedDates(staticmarkedDates);
    setMarkedDates(Object.assign(markedDates, markedDates));
  };

  const showalert = (params) => {
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const onDayPress = (date) => {
    fetchData(date.dateString);
  };

  const onRefresh = () => {
    fetchData(date);
  };

  useEffect(() => {
    fetchData(date);
    console.log(markedDates);
  }, []);

  useEffect(() => {
    setYear(moment(date).format('YYYY'));
    setMonth(moment(date).format('MM'));
    setDay(moment(date).format('DD'));
  }, [date]);

  return (
    <CalendarInfoScreenPresenter
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      STOREDATA={STOREDATA}
      year={year}
      month={month}
      date={date}
      day={day}
      employee={employee}
      showalert={showalert}
      onDayPress={onDayPress}
      onRefresh={onRefresh}
      fetchData={fetchData}
      onChangeMonth={onChangeMonth}
      markedDates={markedDates}
      buffer={buffer}
    />
  );
};
