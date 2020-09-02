import {createSlice} from '@reduxjs/toolkit';

const healthSlice = createSlice({
  name: 'health',
  initialState: {
    HEALTH_CERTIFICATE_DATA: {},
  },
  reducers: {
    setHEALTH_CERTIFICATE_DATA(state, action) {
      const {payload: HEALTH_CERTIFICATE_DATA} = action;
      return {
        ...state,
        HEALTH_CERTIFICATE_DATA,
      };
    },
  },
});

export const {setHEALTH_CERTIFICATE_DATA} = healthSlice.actions;

export default healthSlice.reducer;
