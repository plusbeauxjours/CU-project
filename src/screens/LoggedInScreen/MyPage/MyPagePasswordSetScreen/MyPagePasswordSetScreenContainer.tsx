import React from 'react';
import MyPagePasswordSetScreenPresenter from './MyPagePasswordSetScreenPresenter';

export default ({route: {params}}) => {

  password: '',
  passwordCheck: '',
  isPasswordSeen: false,
  checkAuth: false,
  auth: '',
  next: false,
  timer: 100,
  phone: '',
  
  return <MyPagePasswordSetScreenPresenter />;
};
