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
    udpateSHELFLIFE(state, action) {
      const {
        payload: {shelfLife_SEQ, shelfLifeDate},
      } = action;
      console.log(shelfLife_SEQ, shelfLifeDate);
      console.log(state.SHELFLIFE_DATA[shelfLifeDate]);
      const item = state.SHELFLIFE_DATA[shelfLifeDate].find(
        (i) => i.shelfLife_SEQ === shelfLife_SEQ,
      );
      console.log(item);
      if (item) {
        item.checkType = '1';
      }
    },
    updateSHELFLIFE_DATA(state, action) {
      const {
        payload: {
          shelfLife_SEQ,
          shelfLifeName,
          prevShelfLifeDate,
          shelfLifeDate,
          shelfLifeMemo,
        },
      } = action;
      const item = state.SHELFLIFE_DATA[prevShelfLifeDate].find(
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
  udpateSHELFLIFE,
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
  try {
    const {data: SHELFLIFE_DATA} = await api.getShelfLifeData({
      STORE_SEQ,
      YEAR,
      MONTH,
      DAY,
    });
    dispatch(setSHELFLIFE_DATA(SHELFLIFE_DATA.resultdata));
  } catch (e) {
    console.log(e);
  }
  try {
    const {data: SHELFLIFE_MARKED} = await api.getAllShelfLifeData({
      STORE_SEQ,
    });
    dispatch(setSHELFLIFE_MARKED(SHELFLIFE_MARKED.result));
  } catch (e) {
    console.log(e);
  }
};

export default shelflifetSlice.reducer;
