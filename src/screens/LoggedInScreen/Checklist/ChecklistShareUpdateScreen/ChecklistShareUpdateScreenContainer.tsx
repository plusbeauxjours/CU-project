import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ChecklistShareUpdateScreenPresenter from './ChecklistShareUpdateScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import utils from '../../../../constants/utils';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {ADDDATE, TITLE, IMG_LIST, NOTICE_SEQ, CONTENTS, NOTI_TITLE} = params;
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [checkpointInput, setCheckpointInput] = useState<any>(NOTI_TITLE);
  const [checkpointInput1, setCheckpointInput1] = useState<string>(CONTENTS);
  const [addDate, setAddDate] = useState<string>(ADDDATE);
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [CLOSE_FLAG, setCLOSE_FLAG] = useState<boolean>(false);

  const confirmModal = (title, text, cancel, okBtn) => {
    const params = {
      alertType: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => registerFn('close'),
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const deleteFn = () => {
    setCLOSE_FLAG(!CLOSE_FLAG);
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

  const registerFn = async (sign) => {
    if (sign == 'close') {
      setCLOSE_FLAG(true);
    }
    if (cameraPictureList.length > 0) {
      try {
        dispatch(setSplashVisible(true));
        const formData: any = new FormData();
        formData.append('TITLE', checkpointInput.toString());
        formData.append('CONTENTS', checkpointInput1.toString());
        formData.append('NOTICE_SEQ', NOTICE_SEQ.toString());
        formData.append('CLOSE_FLAG', CLOSE_FLAG ? '1' : '0');

        for (let i = 0; i < cameraPictureList.length; i++) {
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

        const {data} = await api.updateNoticeImg({formData});

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
        const {data} = await api.updateNotice({
          CLOSE_FLAG: CLOSE_FLAG,
          NOTICE_SEQ: NOTICE_SEQ.toString(),
          TITLE: checkpointInput.toString(),
          CONTENTS: checkpointInput1.toString(),
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
    const cameraPictureListed = cameraPictureList;
    {
      console.log('cameraPictureList@@@', cameraPictureList);
    }
    if (IMG_LIST) {
      var allimg = IMG_LIST.split('@');
      for (var i = 0; i < allimg.length; i++) {
        cameraPictureListed.push(
          'http://cuapi.shop-sol.com/uploads/' + allimg[i],
        );
      }
    }
    setCameraPictureList(cameraPictureListed);
    //     this.defaultPictureUploadPath = FileSystem.documentDirectory + 'picture/';
    //     await FileSystem.makeDirectoryAsync(this.defaultPictureUploadPath, {
    //       intermediates: true,
    //     });
    //   }
    // }
    // getPermissions();
  }, []);

  return (
    <ChecklistShareUpdateScreenPresenter
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
