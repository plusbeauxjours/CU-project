import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import moment from 'moment';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    CALENDAR_DATA: {},
    CALENDAR_MARKED: {},
  },
  reducers: {
    setCALENDAR_DATA(state, action) {
      const {payload: CALENDAR_DATA} = action;
      return {
        ...state,
        CALENDAR_DATA,
      };
    },
    setCALENDAR_MARKED(state, action) {
      const {payload: CALENDAR_MARKED} = action;
      return {
        ...state,
        CALENDAR_MARKED,
      };
    },
    toggleVACATION(state, action) {
      const {
        payload: {VACATION, DATE, MEMBER_SEQ},
      } = action;
      const item = state.CALENDAR_DATA[DATE].find(
        (i) => i.MEMBER_SEQ === MEMBER_SEQ,
      );
      if (item) {
        item.VACATION = VACATION;
      }
    },
    updateREST_TIME(state, action) {
      console.log('[][][]][]][][][][]', action);
      const {
        payload: {REST_TIME, DATE, MEMBER_SEQ},
      } = action;
      const item = state.CALENDAR_DATA[DATE].find(
        (i) => i.MEMBER_SEQ === MEMBER_SEQ,
      );
      console.log(item);
      if (item) {
        item.REST_TIME = REST_TIME;
      }
    },
  },
});

export const {
  setCALENDAR_DATA,
  setCALENDAR_MARKED,
  toggleVACATION,
  updateREST_TIME,
} = calendarSlice.actions;

export const getCALENDAR_DATA = (date: string) => async (
  dispatch,
  getState,
) => {
  const {
    storeReducer: {
      STORE_SEQ,
      EMP_SEQ,
      STORE_DATA: {resultdata: {CALENDAR_EDIT = null} = {}} = {},
    },
  } = getState();
  const {
    userReducer: {STORE},
  } = getState();
  try {
    const {data} = await api.getAllSchedules(
      STORE_SEQ,
      moment(date).format('YYYY'),
      moment(date).format('M'),
    );
    if (data.message === 'SUCCESS') {
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
      if (STORE == '0' && CALENDAR_EDIT !== 1) {
        for (const key of iterator) {
          buffer[key] = buffer[key].filter((info) => info.EMP_ID == EMP_SEQ);
        }
      }
      dispatch(setCALENDAR_DATA(buffer));
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};
export default calendarSlice.reducer;
