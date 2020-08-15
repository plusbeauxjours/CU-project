import React, {useState} from 'react';
import MyPagePasswordSetScreenPresenter from './MyPagePasswordSetScreenPresenter';

export default ({route: {params}}) => {

  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
  const [isCheckVerifyCode, setIsCheckVerifyCode] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>('');
  next: false,
  timer: 100,
  const [mobileNo,setMobileNo] =useState<string>("")

  return <MyPagePasswordSetScreenPresenter />;
};
