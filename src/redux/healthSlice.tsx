import {createSlice} from '@reduxjs/toolkit';

const healthSlice = createSlice({
  name: 'health',
  initialState: {
    HEALTH_CERTIFICATE_DATA: {},
    HEALTH_EMP_LIST: [],
    HEALTH_EMP_DETAIL: [],
    HEALTH_STORE_DETAIL: [],
  },
  reducers: {
    setHEALTH_CERTIFICATE_DATA(state, action) {
      const {payload: HEALTH_CERTIFICATE_DATA} = action;
      return {
        ...state,
        HEALTH_CERTIFICATE_DATA,
      };
    },
    setHEALTH_EMP_LIST(state, action) {
      const {payload: HEALTH_EMP_LIST} = action;
      return {
        ...state,
        HEALTH_EMP_LIST,
      };
    },
    setHEALTH_EMP_DETAIL(state, action) {
      const {payload: HEALTH_EMP_DETAIL} = action;
      return {
        ...state,
        HEALTH_EMP_DETAIL,
      };
    },
    setHEALTH_STORE_DETAIL(state, action) {
      const {payload: HEALTH_STORE_DETAIL} = action;
      return {
        ...state,
        HEALTH_STORE_DETAIL,
      };
    },
  },
});

export const {
  setHEALTH_CERTIFICATE_DATA,
  setHEALTH_EMP_LIST,
  setHEALTH_EMP_DETAIL,
  setHEALTH_STORE_DETAIL,
} = healthSlice.actions;

export default healthSlice.reducer;
