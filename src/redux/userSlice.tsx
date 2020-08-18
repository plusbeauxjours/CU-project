import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    // isLoggedIn: 'LogOut',
    isLoggedIn: true,
    MEMBER_SEQ: '',
    STORE_SEQ: '',
    STORE: '',
    mobileNo: '',
    serviceCode: '',
    version: '',
    STORE_NAME: '',
    CalendarData: '',
    checkListData: '',
    StoreEmpSeq: '',
  },
  reducers: {
    setVersion(state, action) {
      const {payload: version} = action;
      console.log('setVersion', version);
      return {
        ...state,
        version,
      };
    },
    setToken(state, action) {
      const {payload: token} = action;
      console.log('setToken', token);
      return {
        ...state,
        token,
      };
    },
    setUser(state, action) {
      const {payload: userInfo} = action;
      console.log('setUser', userInfo);
      return {
        ...state,
        MEMBER_SEQ: userInfo.MEMBER_SEQ,
        NAME: userInfo.NAME,
        STORE: userInfo.STORE,
        mobileNo: userInfo.mobileNo,
      };
    },
    setStore(state, action) {
      const {payload: STORE_SEQ} = action;
      console.log('setStore', STORE_SEQ);
      return {
        ...state,
        STORE_SEQ: STORE_SEQ,
      };
    },
    setUserName(state, action) {
      const {payload: name} = action;
      console.log('setUserName', name);
      return {
        ...state,
        NAME: name,
      };
    },
    setId(state, action) {
      const {payload: mobileNo} = action;
      console.log('setId', mobileNo);
      return {
        ...state,
        mobileNo: mobileNo,
      };
    },
    sertServiceCode(state, action) {
      const {payload: codes} = action;
      console.log('serviceCode', codes);
      return {
        ...state,
        serviceCode: codes,
      };
    },
    setLogIn(state) {
      state.isLoggedIn = true;
    },
    setLogOut(state) {
      state.isLoggedIn = false;
      state.MEMBER_SEQ = '';
      state.STORE = '';
      state.mobileNo = '';
    },
    setUserProfile(state, action) {
      const {payload: userProfile} = action;
      console.log('setUserProfile', userProfile);
      return {
        ...state,
        userProfile,
      };
    },
    setStoreName(state, action) {
      const {payload: name} = action;
      console.log('setStoreName', name);
      return {
        ...state,
        STORE_NAME: name,
      };
    },
    setCalendarData(state, action) {
      const {payload: data} = action;
      console.log('setCalendarData', data);
      return {
        ...state,
        CalendarData: data,
      };
    },
    setCheckListData(state, action) {
      const {payload: data} = action;
      console.log('setCheckListData', data);
      return {
        ...state,
        checkListData: data,
      };
    },
    setStoreEmpSeq(state, action) {
      const {payload: data} = action;
      console.log('setStoreEmpSeq', data);
      return {
        ...state,
        StoreEmpSeq: data,
      };
    },
  },
});

export const {
  setVersion,
  setToken,
  setUser,
  setStore,
  setUserName,
  setId,
  setLogIn,
  setLogOut,
  setUserProfile,
  setStoreName,
  setCalendarData,
  setCheckListData,
  setStoreEmpSeq,
} = userSlice.actions;

export const userLogin = () => async (dispatch) => {
  try {
    console.log('userLogin');
    // const {
    //   data: { uuid, token },
    // } = await api.login(form);
    dispatch(setLogIn());
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
  dispatch(setLogOut());
};

export default userSlice.reducer;
