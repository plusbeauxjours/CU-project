import {createSlice} from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    visible: false,
    alertType: null,
    title: '',
    content: '',
    attach: '',
    okButtonText: '확인',
    okCallback: null,
    cancelButtonText: '취소',
    cancelCallback: null,
    warning: 'no',
    close: null,
  },
  reducers: {
    setAlertVisible(state, action) {
      const {payload: visible} = action;
      return {
        ...state,
        visible,
      };
    },
    setAlertInfo(state, action) {
      const {
        payload: {
          alertType,
          height,
          title,
          content,
          attach,
          okButtonText,
          okCallback,
          cancelButtonText,
          cancelCallback,
          warning,
          close,
        },
      } = action;
      return {
        ...state,
        alertType,
        height,
        title,
        content,
        attach,
        okButtonText,
        okCallback,
        cancelButtonText,
        cancelCallback,
        warning,
        close,
      };
    },
  },
});

export const {setAlertVisible, setAlertInfo} = alertSlice.actions;

export default alertSlice.reducer;
