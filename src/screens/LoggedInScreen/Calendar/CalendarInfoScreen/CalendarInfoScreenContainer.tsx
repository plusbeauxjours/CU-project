import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';

import CalendarInfoScreenPresenter from './CalendarInfoScreenPresenter';
import api from '../../../../constants/LoggedInApi';
import {
  setCALENDAR_MARKED,
  getCALENDAR_DATA,
} from '../../../../redux/calendarSlice';

export default () => {
  const vacation = {
    key: 'vacation',
    color: '#325CBE',
    selectedDotColor: '#325CBE',
  };
  const nowork = {key: 'nowork', color: '#B91C1B', selectedDotColor: '#B91C1B'};
  const jigark = {key: 'jigark', color: '#E8B12F', selectedDotColor: '#E8B12F'};

  const dispatch = useDispatch();

  const {STORE} = useSelector((state: any) => state.userReducer);
  const {CALENDAR_DATA, CALENDAR_MARKED} = useSelector(
    (state: any) => state.calendarReducer,
  );
  const {
    STORE_SEQ,
    EMP_SEQ,
    STORE_DATA: {resultdata: {CALENDAR_EDIT = null} = {}} = {},
  } = useSelector((state: any) => state.storeReducer);

  const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));

  const onChangeMonth = async (item) => {
    try {
      const {data} = await api.getAllSchedules(
        STORE_SEQ,
        item.year,
        item.month,
      );
      setMarkFn(data);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async (date) => {
    dispatch(getCALENDAR_DATA(date));
    setDate(date);
    setMarkFn(CALENDAR_DATA);
  };

  const setMarkFn = (data) => {
    let staticmarkedDated = {};
    let markedDate = {};

    const iterator = Object.keys(data.result);
    for (const key of iterator) {
      let nowork1 = false;
      let jigark1 = false;
      let vacation1 = false;

      if (STORE == '1' || CALENDAR_EDIT == '1') {
        data.result[key]['EMP_LIST'].map((data) => {
          if (data.nowork == '1') {
            nowork1 = true;
          }
          if (data.jigark == '1') {
            jigark1 = true;
          }
          if (data.alear == '1') {
            jigark1 = true;
          }
          if (data.VACATION == '1') {
            vacation1 = true;
          }
          if (data.TYPE == '3') {
            vacation1 = true;
          }
        });
      } else {
        data.result[key]['EMP_LIST'].map((data) => {
          if (EMP_SEQ == data.EMP_ID) {
            if (data.nowork == '1') {
              nowork1 = true;
            }
            if (data.jigark == '1') {
              jigark1 = true;
            }
            if (data.alear == '1') {
              jigark1 = true;
            }
            if (data.VACATION == '1') {
              vacation1 = true;
            }
            if (data.TYPE == '3') {
              vacation1 = true;
            }
          } else {
            if (data.nowork == '1') {
              nowork1 = true;
            }
            if (data.jigark == '1') {
              jigark1 = true;
            }
            if (data.alear == '1') {
              jigark1 = true;
            }
            if (data.VACATION == '1') {
              vacation1 = true;
            }
            if (data.TYPE == '3') {
              vacation1 = true;
            }
          }
        });
      }

      if (vacation1 == true && nowork1 == true && jigark1 == true) {
        staticmarkedDated[key] = {dots: [vacation, nowork, jigark]};
      } else {
        if (vacation1 == true) {
          staticmarkedDated[key] = {dots: [vacation]};
        }
        if (nowork1 == true) {
          staticmarkedDated[key] = {dots: [nowork]};
        }
        if (jigark1 == true) {
          staticmarkedDated[key] = {dots: [jigark]};
        }
        if (vacation1 == true && nowork1 == true) {
          staticmarkedDated[key] = {dots: [vacation, nowork]};
        }
        if (vacation1 == true && jigark1 == true) {
          staticmarkedDated[key] = {dots: [vacation, jigark]};
        }
        if (nowork1 == true && jigark1 == true) {
          staticmarkedDated[key] = {dots: [nowork, jigark]};
        }
      }
      markedDate = staticmarkedDated;
    }
    dispatch(setCALENDAR_MARKED(Object.assign(markedDate, CALENDAR_MARKED)));
  };

  const onDayPressFn = (date) => {
    fetchData(date.dateString);
  };

  useEffect(() => {
    fetchData(date);
  }, []);

  return (
    <CalendarInfoScreenPresenter
      STORE={STORE}
      STORE_SEQ={STORE_SEQ}
      CALENDAR_EDIT={CALENDAR_EDIT}
      onDayPressFn={onDayPressFn}
      onChangeMonth={onChangeMonth}
      CALENDAR_MARKED={CALENDAR_MARKED}
      CALENDAR_DATA={CALENDAR_DATA}
    />
  );
};
