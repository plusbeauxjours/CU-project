import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import moment from 'moment';

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

export const getSHELFLIFE_DATA = (
  YEAR: string = moment().format('YYYY'),
  MONTH: string = moment().format('MM'),
  DAY: string = moment().format('DD'),
) => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  try {
    const {data: SHELFLIFE_DATA} = await api.getShelfLifeData({
      STORE_SEQ,
      YEAR,
      MONTH: Number(MONTH) < 10 ? '0' + MONTH : MONTH,
      DAY: Number(DAY) < 10 ? '0' + DAY : DAY,
    });
    dispatch(setSHELFLIFE_DATA(SHELFLIFE_DATA.resultdata));
  } catch (e) {
    console.log(e);
  }
  try {
    const {data: SHELFLIFE_MARKED} = await api.getAllShelfLifeData({
      STORE_SEQ,
    });
    console.log('SHELFLIFE_MARKED', SHELFLIFE_MARKED);
    dispatch(setSHELFLIFE_MARKED(SHELFLIFE_MARKED.result));
  } catch (e) {
    console.log(e);
  }
};

export default shelflifetSlice.reducer;
