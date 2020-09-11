import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

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

  const onPressImageFn = (item) => {
    setCameraPictureList(
      cameraPictureList.filter(
        (cameraPictureItem) => cameraPictureItem.uri !== item.uri,
      ),
    );
  };

  const launchImageLibraryFn = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 720,
      cropperChooseText: '선택',
      cropperCancelText: '취소',
    }).then((images: any) => {
      images.map((i) => {
        console.log(cameraPictureList, i.path);
        setCameraPictureList((cameraPictureList) => [
          ...cameraPictureList,
          {uri: i.path},
        ]);
      });
    });
  };

  const launchCameraFn = () => {
    ImagePicker.openCamera({
      width: 600,
      height: 800,
      cropping: true,
      mediaType: 'photo',
      includeBase64: true,
      cropperToolbarTitle: '',
      cropperCircleOverlay: false,
      compressImageQuality: 0.8,
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 720,
      cropperChooseText: '선택',
      cropperCancelText: '취소',
    }).then((image) => {
      console.log(image);
    });
  };

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
    if (cameraPictureList?.length > 0) {
      try {
        dispatch(setSplashVisible(true));
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
        const {data} = await api.updateNoticeImg({formData});
        if (data.result === 'SUCCESS') {
          navigation.pop(2);
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
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
      } catch (e) {
        console.log(e);
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
          {uri: 'http://cuapi.shop-sol.com/uploads/' + allimg[i]},
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
  }, []);

  return (
    <ChecklistShareUpdateScreenPresenter
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
      onPressImageFn={onPressImageFn}
      launchImageLibraryFn={launchImageLibraryFn}
      launchCameraFn={launchCameraFn}
    />
  );
};
