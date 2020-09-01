import {createSlice} from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    STORE_SEQ: '',
    STORE_NAME: '',
    CALENDAR_DATA: '',
    CHECKLIST_DATA: '',
    EMP_SEQ: '',
    STORE_DATA: [],
    STOREPAY_SHOW: '',
    IS_MANAGER: '',
  },
  reducers: {
    setSTORE_SEQ(state, action) {
      const {payload: STORE_SEQ} = action;
      console.log('setSTORE_SEQ', STORE_SEQ);
      return {
        ...state,
        STORE_SEQ,
      };
    },
    setSTORE_NAME(state, action) {
      const {payload: STORE_NAME} = action;
      console.log('setSTORE_NAME', STORE_NAME);
      return {
        ...state,
        STORE_NAME,
      };
    },
    setCALENDAR_DATA(state, action) {
      const {payload: CALENDAR_DATA} = action;
      console.log('setCalendarData', CALENDAR_DATA);
      return {
        ...state,
        CALENDAR_DATA,
      };
    },
    setCHECKLIST_DATA(state, action) {
      const {payload: CHECKLIST_DATA} = action;
      console.log('setCHECKLIST_DATA', CHECKLIST_DATA);
      return {
        ...state,
        CHECKLIST_DATA,
      };
    },
    setEMP_SEQ(state, action) {
      const {payload: EMP_SEQ} = action;
      console.log('setEMP_SEQ', EMP_SEQ);
      return {
        ...state,
        EMP_SEQ,
      };
    },
    setSTORE_DATA(state, action) {
      const {payload: STORE_DATA} = action;
      console.log('setSTORE_DATA', STORE_DATA);
      return {
        ...state,
        STORE_DATA,
      };
    },
    setSTOREPAY_SHOW(state, action) {
      const {payload: STOREPAY_SHOW} = action;
      console.log('setSTOREPAY_SHOW', STOREPAY_SHOW);
      return {
        ...state,
        STOREPAY_SHOW,
      };
    },
    setIS_MANAGER(state, action) {
      const {payload: IS_MANAGER} = action;
      console.log('setIS_MANAGER', IS_MANAGER);
      return {
        ...state,
        IS_MANAGER: IS_MANAGER == 1 ? '점장' : '스태프',
      };
    },
  },
});

export const {
  setSTORE_SEQ,
  setSTORE_NAME,
  setCALENDAR_DATA,
  setCHECKLIST_DATA,
  setEMP_SEQ,
  setSTORE_DATA,
  setSTOREPAY_SHOW,
  setIS_MANAGER,
} = storeSlice.actions;

export default storeSlice.reducer;
