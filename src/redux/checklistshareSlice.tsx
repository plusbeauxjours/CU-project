import {createSlice} from '@reduxjs/toolkit';
import api from '../constants/LoggedInApi';
import {setSplashVisible} from './splashSlice';

const checklistshareSlice = createSlice({
  name: 'checklistshare',
  initialState: {
    CHECKLIST_SHARE_DATA1: [],
    NEW_CNT1: 0,
    CHECKLIST_SHARE_DATA2: [],
    NEW_CNT2: 0,
    CHECKLIST_SHARE_DATA3: [],
    NEW_CNT3: 0,
    CHECKLIST_SHARE_MARKED: {},
  },
  reducers: {
    setCHECKLIST_SHARE_DATA1(state, action) {
      const {payload: CHECKLIST_SHARE_DATA1} = action;
      return {
        ...state,
        CHECKLIST_SHARE_DATA1,
      };
    },
    setCHECKLIST_SHARE_DATA2(state, action) {
      const {payload: CHECKLIST_SHARE_DATA2} = action;
      return {
        ...state,
        CHECKLIST_SHARE_DATA2,
      };
    },
    setCHECKLIST_SHARE_DATA3(state, action) {
      const {payload: CHECKLIST_SHARE_DATA3} = action;
      return {
        ...state,
        CHECKLIST_SHARE_DATA3,
      };
    },
    setCHECKLIST_SHARE_MARKED(state, action) {
      const {payload: CHECKLIST_SHARE_MARKED} = action;
      return {
        ...state,
        CHECKLIST_SHARE_MARKED,
      };
    },
    increaseNEW_CNT1(state) {
      return {
        ...state,
        NEW_CNT1: state.NEW_CNT1 + 1,
      };
    },
    increaseNEW_CNT2(state) {
      return {
        ...state,
        NEW_CNT2: state.NEW_CNT2 + 1,
      };
    },
    increaseNEW_CNT3(state) {
      return {
        ...state,
        NEW_CNT3: state.NEW_CNT3 + 1,
      };
    },
  },
});

export const {
  setCHECKLIST_SHARE_DATA1,
  setCHECKLIST_SHARE_DATA2,
  setCHECKLIST_SHARE_DATA3,
  setCHECKLIST_SHARE_MARKED,
  increaseNEW_CNT1,
  increaseNEW_CNT2,
  increaseNEW_CNT3,
} = checklistshareSlice.actions;

export const getCHECKLIST_SHARE_DATA1 = (date) => async (
  dispatch,
  getState,
) => {
  const {
    userReducer: {MEMBER_SEQ},
  } = getState();
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    checklistshareReducer: {CHECKLIST_SHARE_DATA1},
  } = getState();
  if (CHECKLIST_SHARE_DATA1 && CHECKLIST_SHARE_DATA1?.length === 0) {
    dispatch(setSplashVisible(true));
  }
  try {
    const {data} = await api.getNotice31(STORE_SEQ, MEMBER_SEQ, date);
    console.log('getCHECKLIST_SHARE_DATA1', date, data);
    for (let a = 0; a < data.basic.length; a++) {
      if (data.basic[a].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT1());
      }
    }
    for (let b = 0; b < data.favorite.length; b++) {
      if (data.favorite[b].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT1());
      }
    }
    dispatch(setCHECKLIST_SHARE_DATA1(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export const getCHECKLIST_SHARE_DATA2 = (date) => async (
  dispatch,
  getState,
) => {
  const {
    userReducer: {MEMBER_SEQ},
  } = getState();
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    checklistshareReducer: {CHECKLIST_SHARE_DATA2},
  } = getState();
  if (CHECKLIST_SHARE_DATA2 && CHECKLIST_SHARE_DATA2?.length === 0) {
    dispatch(setSplashVisible(true));
  }
  try {
    const {data} = await api.getNotice30(STORE_SEQ, MEMBER_SEQ, date);
    console.log(date, data);
    for (let a = 0; a < data.basic.length; a++) {
      if (data.basic[a].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT2());
      }
    }
    for (let b = 0; b < data.favorite.length; b++) {
      if (data.favorite[b].NoticeCheck_SEQ == null) {
        dispatch(increaseNEW_CNT2());
      }
    }
    dispatch(setCHECKLIST_SHARE_DATA2(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export const getCHECKLIST_SHARE_DATA3 = () => async (dispatch, getState) => {
  const {
    userReducer: {MEMBER_SEQ},
  } = getState();
  const {
    storeReducer: {STORE_SEQ},
  } = getState();
  const {
    checklistshareReducer: {CHECKLIST_SHARE_DATA3},
  } = getState();
  if (!CHECKLIST_SHARE_DATA3) {
    dispatch(setSplashVisible(true));
  }
  try {
    const {data} = await api.getCuNotice(STORE_SEQ, MEMBER_SEQ);
    console.log(data);
    for (let a = 0; a < data.message.length; a++) {
      if (data.message[a].cu_notice_check_SEQ == null) {
        dispatch(increaseNEW_CNT3());
      }
    }
    dispatch(setCHECKLIST_SHARE_DATA3(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSplashVisible(false));
  }
};

export default checklistshareSlice.reducer;
