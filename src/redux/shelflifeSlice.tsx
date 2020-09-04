import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import moment from 'moment';

const shelflifetSlice = createSlice({
  name: 'shelflife',
  initialState: {
    SHELFLIFE_DATA: null,
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

    updateSHELFLIFE_DATA(state, action) {
      const {
        payload: {shelfLife_SEQ, shelfLifeName, shelfLifeDate, shelfLifeMemo},
      } = action;
      const item = state.SHELFLIFE_DATA[shelfLifeDate].find(
        (i) => i.shelfLife_SEQ === shelfLife_SEQ,
      );
      if (item) {
        item.shelfLifeName = shelfLifeName;
        item.shelfLifeDate = shelfLifeDate;
        item.shelfLifeMemo = shelfLifeMemo;
      }
    },
  },
});

export const {
  setSHELFLIFE_DATA,
  setSHELFLIFE_MARKED,
  updateSHELFLIFE_DATA,
} = shelflifetSlice.actions;

export const getSHELFLIFE_DATA = (
  YEAR: string = moment().format('YYYY'),
  MONTH: string = moment().format('MM'),
  DAY: string = moment().format('DD'),
) => async (dispatch, getState) => {
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  console.log('PING');
  try {
    const {data: SHELFLIFE_DATA} = await api.getShelfLifeData({
      STORE_SEQ,
      YEAR,
      MONTH,
      DAY,
    });
    console.log(SHELFLIFE_DATA);
    dispatch(setSHELFLIFE_DATA(SHELFLIFE_DATA.resultdata));
  } catch (e) {
    console.log(e);
  }
  try {
    const {data: SHELFLIFE_MARKED} = await api.getAllShelfLifeData({
      STORE_SEQ,
    });
    console.log(SHELFLIFE_MARKED);
    dispatch(setSHELFLIFE_MARKED(SHELFLIFE_MARKED.result));
  } catch (e) {
    console.log(e);
  }
};

export default shelflifetSlice.reducer;
