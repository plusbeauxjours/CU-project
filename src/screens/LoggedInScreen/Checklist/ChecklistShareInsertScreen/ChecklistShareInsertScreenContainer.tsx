import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';

import ChecklistShareInsertScreenPresenter from './ChecklistShareInsertScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';
import {useNavigation} from '@react-navigation/native';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    ADDDATE,
    checkpoint,
    checklist,
    checktime,
    PHOTO_CHECK,
    TITLE,
    STORE_SEQ,
    STORE,
    NAME,
  } = params;
  const [cameraRatioList, setCameraRatioList] = useState<any>([]);
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [cameraPictureFlash, setCameraPictureFlash] = useState<boolean>(false);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [checkpointInput, setCheckpointInput] = useState<any>(checkpoint);
  const [checkpointInput1, setCheckpointInput1] = useState<string>('');
  const [checklistInput, setChecklistInput] = useState<string>('');
  const [checklistData, setChecklistData] = useState<any>([]);
  const [noChecktime, setNoChecktime] = useState<boolean>(false);
  const [checkCamera, setCheckCamera] = useState<boolean>(false);
  const [customChecktime, setCustomChecktime] = useState<string>('');
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState<boolean>(
    false,
  );
  const [isTimeCheckModalVisible, setIsTimeCheckModalVisible] = useState<
    boolean
  >(false);
  const [hourCheck, setHourCheck] = useState<any>(new Array(24));
  const [minuteCheck, setMinuteCheck] = useState<
    [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
  >([false, false, false, false, false, false, false]);
  const [minuteDirectInput, setMinuteDirectInput] = useState<any>(null);
  const [addDate, setAddDate] = useState<string>(ADDDATE);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(
    false,
  );
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);

  const alertModal = (text) => {
    const params = {
      type: 'alert',
      title: '',
      content: text,
    };

    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // const getPermissions = async () => {
  //   const {status} = await Camera.requestPermissionsAsync();
  //   if (status !== 'granted') {
  //     alertModal(
  //       '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
  //     );
  //     return false;
  //   } else {
  //     setHasCameraPermission(status === 'granted');
  //   }
  //   return true;
  // };

  // const openCamera = async () => {
  //   const permission = await getPermissions();
  //   if (!permission) {
  //     return;
  //   }
  // };

  const openImagePickerFn = async () => {
    // let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    // if (permissionResult.granted === false) {
    //   return alertModal('보관함을 사용하기위해서 권한을 수락해주세요.');
    // }
    // let pickerResult = await ImagePicker.launchImageLibraryAsync();
    // const cameraPictureListed = cameraPictureList;
    // if (pickerResult.cancelled == false) {
    //   cameraPictureList.push(pickerResult.uri);
    //   setCameraPictureList(cameraPictureListed);
    // }
  };

  const checkDirectInput = () => {
    let valueH = JSON.parse(JSON.stringify(hourCheck));
    let valueM = JSON.parse(JSON.stringify(minuteCheck));
    if (
      minuteCheck[6] === true &&
      (minuteDirectInput < 0 || minuteDirectInput > 59)
    ) {
      return alertModal('0 ~ 59 사이의 수를 적어주세요.');
    }

    let hour = hourCheck.indexOf(true) + 0;
    if (hour < 10) {
      hour = `0${hour}`;
    }

    let minuteProps = '0';
    if (minuteCheck[6] === true) {
      minuteProps = minuteDirectInput;
      if (Number(minuteProps) < 10) {
        minuteProps = `0${minuteProps}`;
      }
    } else {
      minuteProps = (minuteCheck.indexOf(true) * 10).toString();
      if (Number(minuteProps) < 10) {
        minuteProps = `0${minuteProps}`;
      }
    }
    setIsTimeCheckModalVisible(false);
    setCustomChecktime(`${hour}:${minuteProps}`);
    setHourCheck(valueH);
    setMinuteCheck(valueM);
    setMinuteDirectInput('');
  };

  const registerFn = async () => {
    const {MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
    if (cameraPictureList?.length > 0) {
      try {
        dispatch(setSplashVisible(true));
        const formData: any = new FormData();

        formData.append('TITLE', checkpointInput.toString());
        formData.append('CONTENTS', checkpointInput1.toString());
        formData.append('ADDDATE', addDate.toString());
        formData.append('STORE_SEQ', STORE_SEQ.toString());
        formData.append('STORE', STORE.toString());
        formData.append('EMP_NAME', NAME.toString());
        formData.append('MEMBER_SEQ', MEMBER_SEQ);

        for (let i = 0; i < cameraPictureList?.length; i++) {
          const cameraPicture = cameraPictureList[i];
          const fileInfoArr = cameraPicture.split('/');
          const fileInfo = fileInfoArr[fileInfoArr.length - 1];
          const extensionIndex = fileInfo.indexOf('.');

          let fileName = fileInfo;
          let fileType = '';

          if (extensionIndex > -1) {
            fileName = fileInfo;
            fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;

            if (fileType === 'image/jpg') {
              fileType = 'image/jpeg';
            }
          }

          formData.append('image', {
            uri: utils.isAndroid
              ? cameraPicture
              : cameraPicture.replace('file://', ''),
            name: fileName,
            type: fileType,
          });
        }
        const {data} = await api.setNoticeImg2({formData});
        if (data.result === 'SUCCESS') {
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.setNoticeImg2({
          TITLE: checkpointInput.toString(),
          CONTENTS: checkpointInput1.toString(),
          STORE_SEQ,
          STORE,
          EMP_NAME: NAME,
          MEMBER_SEQ,
          ADDDATE: addDate,
        });
        if (data.result === 'SUCCESS') {
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  useEffect(() => {
    if (checktime == '' || checktime == undefined) {
      var noChecktime = true;
    } else {
      var noChecktime = false;
      var customChecktime = checktime;
    }
    if (checklist != undefined) {
      var newchecklist = checklist.split('@@');
      newchecklist[newchecklist.length - 1] = newchecklist[
        newchecklist.length - 1
      ].replace('@', '');
      var newlist = [];
      for (var i = 0; i < newchecklist.length; i++) {
        newlist.push(newchecklist[i]);
      }
      setChecklistData(newlist);
      setCustomChecktime(customChecktime);
      setNoChecktime(noChecktime);
      setCheckCamera(Number(PHOTO_CHECK || 0) === 1 ? true : false);
    }
    //     this.defaultPictureUploadPath = FileSystem.documentDirectory + 'picture/';
    //     await FileSystem.makeDirectoryAsync(this.defaultPictureUploadPath, {
    //       intermediates: true,
    //     });
    //   }
    // }
    // getPermissions();
  }, []);

  return (
    <ChecklistShareInsertScreenPresenter
      hourCheck={hourCheck}
      setHourCheck={setHourCheck}
      minuteCheck={minuteCheck}
      setMinuteCheck={setMinuteCheck}
      minuteDirectInput={minuteDirectInput}
      setMinuteDirectInput={setMinuteDirectInput}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      addDate={addDate}
      setAddDate={setAddDate}
      cameraPictureList={cameraPictureList}
      setCameraPictureList={setCameraPictureList}
      checkpointInput={checkpointInput}
      setCheckpointInput={setCheckpointInput}
      checkpointInput1={checkpointInput1}
      setCheckpointInput1={setCheckpointInput1}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      TITLE={TITLE}
      registerFn={registerFn}
      openImagePickerFn={openImagePickerFn}
    />
  );
};
