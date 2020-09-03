import {createSlice} from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    STORE_SEQ: '',
    STORE_NAME: '',
    CALENDAR_DATA: '',
    CHECKLIST_DATA: '',
    EMP_SEQ: '',
    STORE_DATA: {},
    STOREPAY_SHOW: '',
    IS_MANAGER: '',
    WORKING_COUNT: 0,
    TOTAL_COUNT: 0,
    ADDR1: '',
    ADDR2: '',
    TYPE: 0,
    LATE_FLAG: '',
    LATE_TIME: 0,
    EARLY_FLAG: '',
    EARLY_TIME: 0,
    CALCULATE_DAY: '',
    CALENDAR_EDIT: '',
  },
  reducers: {
    setSTORE_SEQ(state, action) {
      const {payload: STORE_SEQ} = action;
      return {
        ...state,
        STORE_SEQ,
      };
    },
    setSTORE_NAME(state, action) {
      const {payload: STORE_NAME} = action;
      return {
        ...state,
        STORE_NAME,
      };
    },
    setCALENDAR_DATA(state, action) {
      const {payload: CALENDAR_DATA} = action;
      return {
        ...state,
        CALENDAR_DATA,
      };
    },
    setCHECKLIST_DATA(state, action) {
      const {payload: CHECKLIST_DATA} = action;
      return {
        ...state,
        CHECKLIST_DATA,
      };
    },
    setEMP_SEQ(state, action) {
      const {payload: EMP_SEQ} = action;
      return {
        ...state,
        EMP_SEQ,
      };
    },
    setSTORE_DATA(state, action) {
      const {payload: STORE_DATA} = action;
      return {
        ...state,
        STORE_DATA,
      };
    },
    setSTOREPAY_SHOW(state, action) {
      const {payload: STOREPAY_SHOW} = action;
      return {
        ...state,
        STOREPAY_SHOW,
      };
    },
    setCALENDAR_EDIT(state, action) {
      const {payload: CALENDAR_EDIT} = action;
      return {
        ...state,
        CALENDAR_EDIT,
      };
    },
    setIS_MANAGER(state, action) {
      const {payload: IS_MANAGER} = action;
      return {
        ...state,
        IS_MANAGER: IS_MANAGER == 1 ? '점장' : '스태프',
      };
    },
    selectSTORE(state, action) {
      const {
        payload: {STORE_SEQ, STORE_NAME, WORKING_COUNT, TOTAL_COUNT},
      } = action;
      return {
        ...state,
        STORE_SEQ,
        STORE_NAME,
        WORKING_COUNT,
        TOTAL_COUNT,
      };
    },
    updateSTORE_DATA(state, action) {
      const {
        payload: {
          NAME,
          ADDR1,
          ADDR2,
          TYPE,
          LATE_FLAG,
          LATE_TIME,
          EARLY_FLAG,
          EARLY_TIME,
          CALCULATE_DAY,
        },
      } = action;
      return {
        ...state,
        STORE_NAME: NAME,
        ADDR1,
        ADDR2,
        TYPE,
        LATE_FLAG,
        LATE_TIME,
        EARLY_FLAG,
        EARLY_TIME,
        CALCULATE_DAY,
        STORE_DATA: {
          ...state.STORE_DATA,
          STORE_NAME: NAME,
          ADDR1,
          ADDR2,
          TYPE,
          LATE_FLAG,
          LATE_TIME,
          EARLY_FLAG,
          EARLY_TIME,
          CALCULATE_DAY,
        },
      };
    },
    closeSTORE_DATA(state) {
      return {
        ...state,
        STORE_SEQ: '',
        STORE_NAME: '',
        CALENDAR_DATA: '',
        CHECKLIST_DATA: '',
        EMP_SEQ: '',
        STORE_DATA: {},
        STOREPAY_SHOW: '',
        IS_MANAGER: '',
        WORKING_COUNT: 0,
        TOTAL_COUNT: 0,
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
  setCALENDAR_EDIT,
  setIS_MANAGER,
  selectSTORE,
  updateSTORE_DATA,
  closeSTORE_DATA,
} = storeSlice.actions;

export default storeSlice.reducer;
