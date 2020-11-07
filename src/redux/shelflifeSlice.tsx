import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import moment from 'moment';
import {resultdata} from '../assets/dummy';
import {setSplashVisible} from '~/redux/splashSlice';

const shelflifetSlice = createSlice({
  name: 'shelflife',
  initialState: {
    SHELFLIFE_DATA: {},
  },
  reducers: {
    setSHELFLIFE_DATA(state, action) {
      const {payload: SHELFLIFE_DATA} = action;
      return {
        ...state,
        SHELFLIFE_DATA,
      };
    },
    udpateSHELFLIFE(state, action) {
      const {
        payload: {shelfLife_SEQ, shelfLifeDate, checkEmpName, checkTime},
      } = action;
      const item = resultdata[shelfLifeDate].find(
        (i) => i.shelfLife_SEQ === shelfLife_SEQ,
      );
      // const item = state.SHELFLIFE_DATA[shelfLifeDate].find(
      //   (i) => i.shelfLife_SEQ === shelfLife_SEQ,
      // );
      if (item) {
        item.checkType = '1';
        item.checkTime = checkTime;
        item.checkEmpName = checkEmpName;
      }
    },
    cancelSHELFLIFE(state, action) {
      const {
        payload: {shelfLife_SEQ, shelfLifeDate},
      } = action;
      const item = resultdata[shelfLifeDate].find(
        (i) => i.shelfLife_SEQ === shelfLife_SEQ,
      );
      // const item = state.SHELFLIFE_DATA[shelfLifeDate].find(
      //   (i) => i.shelfLife_SEQ === shelfLife_SEQ,
      // );
      if (item) {
        item.checkType = '0';
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
      console.log(
        shelfLife_SEQ,
        shelfLifeName,
        prevShelfLifeDate,
        shelfLifeDate,
        shelfLifeMemo,
      );
      // 데이터 구조 살피고 다시 구성한다.
      // const item = state.SHELFLIFE_DATA[prevShelfLifeDate].find(
      //   (i) => i.shelfLife_SEQ === shelfLife_SEQ,
      // );
      // if (item) {
      //   item.shelfLifeName = shelfLifeName;
      //   item.shelfLifeDate = shelfLifeDate;
      //   item.shelfLifeMemo = shelfLifeMemo;
      // }
    },
    removeSHELFLIFE_DATA(state, action) {
      const {
        payload: {shelfLife_SEQ, shelfLifeDate},
      } = action;
      console.log(shelfLife_SEQ, shelfLifeDate);
      // 데이터 구조 살피고 다시 구성한다.
      // const item = state.SHELFLIFE_DATA[shelfLifeDate].filter(
      //   (i) => i.shelfLife_SEQ !== shelfLife_SEQ,
      // );
      // return {
      //   ...state,
      //   SHELFLIFE_DATA: {
      //     ...state.SHELFLIFE_DATA,
      //     [shelfLifeDate]: item,
      //   },
      // };
    },
  },
});

export const {
  setSHELFLIFE_DATA,
  udpateSHELFLIFE,
  cancelSHELFLIFE,
  updateSHELFLIFE_DATA,
  removeSHELFLIFE_DATA,
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
    dispatch(setSplashVisible(true));
    const {data: SHELFLIFE_DATA} = await api.getShelfLifeData({
      STORE_SEQ,
      YEAR,
      MONTH,
      DAY,
    });
    dispatch(setSHELFLIFE_DATA(SHELFLIFE_DATA.resultdata));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export default shelflifetSlice.reducer;
