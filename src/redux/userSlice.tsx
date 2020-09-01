import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    MEMBER_SEQ: '',
    MEMBER_NAME: '',
    STORE: '',
    TYPE: '',
    MOBILE_NO: '',
    SERVICE_CODE: '',
    VERSION: '',
    STORELIST_DATA: [],
  },
  reducers: {
    setMEMBER_SEQ(state, action) {
      const {payload: MEMBER_SEQ} = action;
      console.log('setMember', MEMBER_SEQ);
      return {...state, MEMBER_SEQ};
    },
    setMEMBER_NAME(state, action) {
      const {payload: MEMBER_NAME} = action;
      console.log('setUserName', MEMBER_NAME);
      return {
        ...state,
        MEMBER_NAME,
      };
    },
    setMOBILE_NO(state, action) {
      const {payload: MOBILE_NO} = action;
      console.log('setMobileNo', MOBILE_NO);
      return {
        ...state,
        MOBILE_NO,
      };
    },
    setVERSION(state, action) {
      const {payload: version} = action;
      console.log('setVersion', version);
      return {
        ...state,
        version,
      };
    },
    sertSERVICE_CODE(state, action) {
      const {payload: serviceCode} = action;
      console.log('serviceCode', serviceCode);
      return {
        ...state,
        serviceCode,
      };
    },
    setSTORELIST_DATA(state, action) {
      const {payload: STORELIST_DATA} = action;
      console.log('setHomeCard', STORELIST_DATA);
      return {
        ...state,
        STORELIST_DATA,
      };
    },
    setUSER(state, action) {
      const {payload: userInfo} = action;
      console.log('setUser', userInfo);
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
  },
});

export const {
  setMEMBER_SEQ,
  setMEMBER_NAME,
  setMOBILE_NO,
  sertSERVICE_CODE,
  setVERSION,
  setSTORELIST_DATA,
  setUSER,
  setLOGIN,
  setLOGOUT,
} = userSlice.actions;

export const userLogin = () => async (dispatch) => {
  try {
    dispatch(setLOGIN());
    // const { data } = await api.user(uuid);
    // if (data) {
    //   dispatch(setMe({ data }));
    // }
  } catch (e) {
    console.log('Wrong user/password');
  }
};
export const userLogout = () => async (dispatch) => {
  console.log('userLogout');
  dispatch(setLOGOUT());
};

export default userSlice.reducer;
