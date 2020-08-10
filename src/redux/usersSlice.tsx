import {AsyncStorage} from 'react-native';
import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLoggedIn: false,
    token: null,
    me: null,
  },
  reducers: {
    logIn(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.me = null;
    },
    setMe(state, action) {
      state.me = action.payload.data;
    },
  },
});

export const {logIn, logOut, setMe} = usersSlice.actions;

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
  dispatch(logOut());
};

export default usersSlice.reducer;
