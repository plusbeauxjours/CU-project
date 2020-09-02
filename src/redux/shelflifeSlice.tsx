import {createSlice} from '@reduxjs/toolkit';

const shelflifetSlice = createSlice({
  name: 'shelflife',
  initialState: {
    SHELFLIFE_DATA: {},
    SHELFLIFE_MARKED: {},
  },
  reducers: {
    setSHELFLIFE_DATA(state, action) {
      const {payload: SHELFLIFE_DATA} = action;
      return {
        ...state,
        SHELFLIFE_DATA,
      };
    },
    setSHELFLIFE_MARKED(state, action) {
      const {payload: SHELFLIFE_MARKED} = action;
      return {
        ...state,
        SHELFLIFE_MARKED,
      };
    },
  },
});

export const {setSHELFLIFE_DATA, setSHELFLIFE_MARKED} = shelflifetSlice.actions;

export default shelflifetSlice.reducer;
