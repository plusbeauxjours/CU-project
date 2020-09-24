import axios from 'axios';

const callApi = async (
  method: string,
  path: string,
  data?: any,
  params = {},
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://133.186.209.113:3003/api';
  const fullUrl = `${baseUrl}${path}`;
  console.log(method, fullUrl, data, params);
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers, params});
  } else {
    return axios[method](fullUrl, data, {headers});
  }
};

const oldApi = async (
  method: string,
  path: string,
  data?: any,
  params = {},
) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  const baseUrl = 'http://133.186.209.113:80/api/v2';
  const fullUrl = `${baseUrl}${path}`;
  console.log(method, fullUrl, data, params);
  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, {headers, params});
  } else {
    return axios[method](fullUrl, data, {headers});
  }
};

export default {
  logIn: (data: any) => callApi('post', '/auth/signin/', data),
  signUp: (data: any) => oldApi('post', '/Auth/signup3/', data),
  findPwd: (data: any) => callApi('post', '/auth/findPwd/', data),
  checkSMS: (data: any) => callApi('post', '/auth/checksms/', data),

  checkApp: (data: any) => callApi('post', '/auth/checkApp/', data), // SelectStoreScreen, HomeScreen, StartScreen
  getSMS: (data: any) => callApi('post', '/auth/getsms/', data), //MyPagePasswordSetScreen, FindPasswordScreen, VerificationScreen
  help: () => callApi('post', '/auth/help/'), // MyPageAppointmentScreen, StartScreen
};
