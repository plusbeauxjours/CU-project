import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import {setSplashVisible} from './splashSlice';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    MEMBER_SEQ: '',
    MEMBER_NAME: '',
    STORE: '',
    TYPE: '',
    MOBILE_NO: '',
    VERSION: '',
    STORELIST_DATA: [],
    PUSH_TOKEN: '',
    DEVICE_MODEL: '',
    DEVICE_PLATFORM: '',
    DEVICE_SYSTEM_VERSION: '',
  },
  reducers: {
    setMEMBER_SEQ(state, action) {
      const {payload: MEMBER_SEQ} = action;
      return {...state, MEMBER_SEQ};
    },
    setMEMBER_NAME(state, action) {
      const {payload: MEMBER_NAME} = action;
      return {
        ...state,
        MEMBER_NAME,
      };
    },
    setMOBILE_NO(state, action) {
      const {payload: MOBILE_NO} = action;
      return {
        ...state,
        MOBILE_NO,
      };
    },
    setVERSION(state, action) {
      const {payload: version} = action;
      return {
        ...state,
        version,
      };
    },
    setSTORELIST_DATA(state, action) {
      const {payload: STORELIST_DATA} = action;
      return {
        ...state,
        STORELIST_DATA,
      };
    },
    setUSER(state, action) {
      const {payload: userInfo} = action;
      return {
        ...state,
        MEMBER_SEQ: userInfo.MEMBER_SEQ,
        MEMBER_NAME: userInfo.NAME,
        STORE: userInfo.STORE,
        TYPE: userInfo.TYPE,
        MOBILE_NO: userInfo.mobileNo,
      };
    },
    setLOGIN(state) {
      state.isLoggedIn = true;
    },
    setLOGOUT(state) {
      state.isLoggedIn = false;
      state.MEMBER_SEQ = '';
      state.STORE = '';
      state.MOBILE_NO = '';
      state.STORELIST_DATA = [];
    },
    setDEVICE_INFO(state, action) {
      const {
        payload: {
          PUSH_TOKEN,
          DEVICE_MODEL,
          DEVICE_PLATFORM,
          DEVICE_SYSTEM_VERSION,
        },
      } = action;
      return {
        ...state,
        PUSH_TOKEN,
        DEVICE_MODEL,
        DEVICE_PLATFORM,
        DEVICE_SYSTEM_VERSION,
      };
    },
  },
});

export const {
  setMEMBER_SEQ,
  setMEMBER_NAME,
  setMOBILE_NO,
  setVERSION,
  setSTORELIST_DATA,
  setUSER,
  setLOGIN,
  setLOGOUT,
  setDEVICE_INFO,
} = userSlice.actions;

export const userLogin = () => async (dispatch) => {
  try {
    dispatch(setLOGIN());
  } catch (e) {
    console.log('Wrong user/password');
  }
};

export const userLogout = () => async (dispatch) => {
  dispatch(setLOGOUT());
};

export const getSTORELIST_DATA = () => async (dispatch, getState) => {
  const {
    userReducer: {STORELIST_DATA, MEMBER_SEQ, STORE},
  } = getState();
  try {
    if (STORELIST_DATA.length === 0) {
      dispatch(setSplashVisible(true));
    }
    const {data} = await api.storeList(MEMBER_SEQ, STORE);
    if (data.message === 'SUCCESS') {
      dispatch(setSTORELIST_DATA(data.result));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export default userSlice.reducer;
