import {createSlice} from '@reduxjs/toolkit';

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
  },
});

export const {setCALENDAR_DATA, setCALENDAR_MARKED} = calendarSlice.actions;

export default calendarSlice.reducer;
