import {createSlice} from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    EMPLOYEE_INFO_DATA: {},
  },
  reducers: {
    setEMPLOYEE_INFO_DATA(state, action) {
      const {payload: EMPLOYEE_INFO_DATA} = action;
      return {
        ...state,
        EMPLOYEE_INFO_DATA,
      };
    },
  },
});

export const {setEMPLOYEE_INFO_DATA} = employeeSlice.actions;

export default employeeSlice.reducer;
