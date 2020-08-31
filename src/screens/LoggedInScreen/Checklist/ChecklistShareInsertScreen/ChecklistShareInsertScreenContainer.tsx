import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ChecklistShareInsertScreenPresenter from './ChecklistShareInsertScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {ADDDATE, checkpoint, TITLE, STORE_SEQ, STORE, NAME} = params;
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [checkpointInput, setCheckpointInput] = useState<any>(checkpoint);
  const [checkpointInput1, setCheckpointInput1] = useState<string>('');
  const [addDate, setAddDate] = useState<string>(ADDDATE);
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
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
