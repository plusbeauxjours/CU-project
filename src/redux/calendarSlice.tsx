import {createSlice} from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    CALENDAR_DATA: {},
  },
  reducers: {
    setCALENDAR_DATA(state, action) {
      const {payload: CALENDAR_DATA} = action;
      return {
        ...state,
        CALENDAR_DATA,
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
      const {
        payload: {REST_TIME, DATE, MEMBER_SEQ},
      } = action;
      const item = state.CALENDAR_DATA[DATE].find(
        (i) => i.MEMBER_SEQ === MEMBER_SEQ,
      );
      if (item) {
        item.REST_TIME = REST_TIME;
      }
    },
    removeAddWork(state, action) {
      const {
        payload: {DATE, MEMBER_SEQ},
      } = action;
      const item = state.CALENDAR_DATA[DATE].filter(
        (i) => i.MEMBER_SEQ !== MEMBER_SEQ,
      );
      return {
        ...state,
        CALENDAR_DATA: {
          ...state.CALENDAR_DATA,
          [DATE]: item,
        },
      };
    },
  },
});

export const {
  setCALENDAR_DATA,
  toggleVACATION,
  updateREST_TIME,
  removeAddWork,
} = calendarSlice.actions;

export default calendarSlice.reducer;
