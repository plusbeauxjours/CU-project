import {AsyncStorage} from 'react-native';
import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    isLoggedIn: 'LogOut',
    MEMBER_SEQ: '',
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
    sogIn(state, action) {
      const {payload: check} = action;
      console.log('sogIn', check);
      return {
        ...state,
        isLoggedIn: check,
      };
    },
    setLogOut(state, action) {
      const {payload: check} = action;
      console.log('sogOut', check);
      return {
        ...state,
        isLoggedIn: check,
        MEMBER_SEQ: '',
        STORE: '',
        mobileNo: '',
      };
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
  setUserName,
  setId,
  setLogOut,
  setUserProfile,
  setStoreName,
  setCalendarData,
  setCheckListData,
  setStoreEmpSeq,
} = userSlice.actions;

export const userLogin = (form: {}) => async (dispatch) => {
  try {
    console.log('on going');
  } catch (e) {
    alert('Wrong user/password');
  }
};

export const userLogout = () => async (dispatch) => {
  console.log('on going');
  AsyncStorage.clear();
};

export default userSlice.reducer;
