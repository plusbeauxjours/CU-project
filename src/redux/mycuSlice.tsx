import {createSlice} from '@reduxjs/toolkit';

const mycuSlice = createSlice({
  name: 'mycu',
  initialState: {
    MYCU_MONTHLY: [],
    MYCU_MONTHLY_CATEGORY: [],
    MYCU_VIDEO: [],
    EDUCATION_VIDEO: [],
  },
  reducers: {
    setMYCU_MONTHLY(state, action) {
      const {payload: MYCU_MONTHLY} = action;
      return {
        ...state,
        MYCU_MONTHLY,
      };
    },
    setMYCU_MONTHLY_CATEGORY(state, action) {
      const {payload: MYCU_MONTHLY_CATEGORY} = action;
      return {
        ...state,
        MYCU_MONTHLY_CATEGORY,
      };
    },
    setMYCU_VIDEO(state, action) {
      const {payload: MYCU_VIDEO} = action;
      return {
        ...state,
        MYCU_VIDEO,
      };
    },
    setEDUCATION_VIDEO(state, action) {
      const {payload: EDUCATION_VIDEO} = action;
      return {
        ...state,
        EDUCATION_VIDEO,
      };
    },
  },
});

export const {
  setMYCU_MONTHLY,
  setMYCU_MONTHLY_CATEGORY,
  setMYCU_VIDEO,
  setEDUCATION_VIDEO,
} = mycuSlice.actions;

export default mycuSlice.reducer;
