import {createSlice} from '@reduxjs/toolkit';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    STORE_SEQ: '',
    STORE_NAME: '',
    CALENDAR_DATA: '',
    CHECKLIST_DATA: '',
    STORE_EMP_SEQ: '',
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
    setSTORE_EMP_SEQ(state, action) {
      const {payload: STORE_EMP_SEQ} = action;
      console.log('setSTORE_EMP_SEQ', STORE_EMP_SEQ);
      return {
        ...state,
        STORE_EMP_SEQ,
      };
    },
  },
});

export const {
  setSTORE_SEQ,
  setSTORE_NAME,
  setCALENDAR_DATA,
  setCHECKLIST_DATA,
  setSTORE_EMP_SEQ,
} = storeSlice.actions;

export const setStoreInfo = () => async (dispatch) => {
  console.log('setStoreInfo');
};

export default storeSlice.reducer;

// {
//   "STORE_SEQ": "5562",
//   "NAME": "포",
//   "FIVETYPE": "0",
//   "CHECK_COUNT": "99",
//   "ADDR1": "서울 마포구 백범로 1 (노고산동)",
//   "ADDR2": "ㅎ",
//   "emplist": 0,
//   "workinglist": 0
// },
