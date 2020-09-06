import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ChecklistShareUpdateScreenPresenter from './ChecklistShareUpdateScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import utils from '../../../../constants/utils';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {updateCHECKLIST_SHARE_DATA} from '../../../../redux/checklistshareSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [title, setTitle] = useState<string>(params?.NOTI_TITLE);
  const [content, setContent] = useState<string>(params?.CONTENTS);
  const [addDate, setAddDate] = useState<string>(params?.ADDDATE);
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);

  const confirmModal = (content, okButtonText, warning, okCallback) => {
    const params = {
      alertType: 'confirm',
      title: '',
      content,
      cancelButtonText: '취소',
      okButtonText,
      warning,
      okCallback,
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
    if (cameraPictureList.length > 0) {
      const formData: any = new FormData();
      formData.append('TITLE', title);
      formData.append('CONTENTS', content);
      formData.append('NOTICE_SEQ', params?.NOTICE_SEQ);
      formData.append('CLOSE_FLAG', sign == 'close' ? '1' : '0');

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
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.updateNoticeImg({
          formData,
        });
        console.log(formData.image);
        if (data.result === 'SUCCESS') {
          navigation.pop(2);
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
        // dispatch(
        //   updateCHECKLIST_SHARE_DATA({
        //     TITLE: params?.TITLE,
        //     title,
        //     content,
        //     NOTICE_SEQ: params?.NOTICE_SEQ,
        //     CLOSE_FLAG: CLOSE_FLAG ? '1' : '0',
        //     image,
        //     isFavorite: params?.isFavorite,
        //   }),
        // );
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.updateNotice({
          TITLE: title,
          CONTENTS: content,
          NOTICE_SEQ: params?.NOTICE_SEQ,
          CLOSE_FLAG: sign == 'close' ? '1' : '0',
        });
        if (data.result === 'SUCCESS') {
          dispatch(
            updateCHECKLIST_SHARE_DATA({
              TITLE: params?.TITLE,
              title,
              content,
              NOTICE_SEQ: params?.NOTICE_SEQ,
              CLOSE_FLAG: sign == 'close' ? '1' : '0',
              isFavorite: params?.isFavorite,
            }),
          );
          navigation.pop(2);
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
    if (cameraPictureList?.length === 0 && params?.IMG_LIST) {
      const allimg = params?.IMG_LIST.split('@');
      for (let i = 0; i < allimg.length; i++) {
        setCameraPictureList([
          ...cameraPictureList,
          'http://cuapi.shop-sol.com/uploads/' + allimg[i],
        ]);
      }
    }
    //     this.defaultPictureUploadPath = FileSystem.documentDirectory + 'picture/';
    //     await FileSystem.makeDirectoryAsync(this.defaultPictureUploadPath, {
    //       intermediates: true,
    //     });
    //   }
    // }
    // getPermissions();
    console.log('paramsparamsparamsparamsparamsparamsparams', params);
  }, []);

  return (
    <ChecklistShareUpdateScreenPresenter
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
      addDate={addDate}
      setAddDate={setAddDate}
      cameraPictureList={cameraPictureList}
      setCameraPictureList={setCameraPictureList}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      TITLE={params?.TITLE}
      registerFn={registerFn}
      openImagePickerFn={openImagePickerFn}
      confirmModal={confirmModal}
    />
  );
};
