import {createSlice} from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    EMPLOYEE_LIST: [],
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
    setEMPLOYEE_LIST(state, action) {
      const {payload: EMPLOYEE_LIST} = action;
      return {
        ...state,
        EMPLOYEE_LIST,
      };
    },
  },
});

export const {setEMPLOYEE_INFO_DATA, setEMPLOYEE_LIST} = employeeSlice.actions;

export default employeeSlice.reducer;
