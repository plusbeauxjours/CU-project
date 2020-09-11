import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import ChecklistShareInsertScreenPresenter from './ChecklistShareInsertScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';
import {
  getCHECKLIST_SHARE_DATA1,
  getCHECKLIST_SHARE_DATA2,
} from '../../../../redux/checklistshareSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE, MEMBER_SEQ, MEMBER_NAME} = useSelector(
    (state: any) => state.userReducer,
  );
  const {STORE_SEQ} = useSelector((state: any) => state.storeReducer);

  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [date, setDate] = useState<string>(params?.date);
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
    if (cameraPictureList?.length > 0) {
      try {
        const image = [];
        dispatch(setSplashVisible(true));
        for (let i = 0; i < cameraPictureList.length; i++) {
          const cameraPicture = cameraPictureList[i];
          const fileInfoArr = cameraPicture.uri.split('/');
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
          image.push({
            uri: utils.isAndroid
              ? cameraPicture.uri
              : cameraPicture.uri.replace('file://', ''),
            name: fileName,
            type: fileType,
          });
        }
        const {data} = await api.setNoticeImg2({
          TITLE: title,
          CONTENTS: content,
          STORE_SEQ,
          STORE,
          EMP_NAME: MEMBER_NAME,
          MEMBER_SEQ,
          ADDDATE: date,
          image,
        });
        if (data.result === 'SUCCESS') {
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
        if (params.TITLE === '지시사항') {
          dispatch(getCHECKLIST_SHARE_DATA1(date));
        } else {
          dispatch(getCHECKLIST_SHARE_DATA2(date));
        }
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.setNotice2({
          TITLE: title,
          CONTENTS: content,
          STORE_SEQ,
          STORE,
          EMP_NAME: MEMBER_NAME,
          MEMBER_SEQ,
          ADDDATE: date,
        });
        if (data.result === 'SUCCESS') {
          navigation.goBack();
        } else {
          alertModal('연결에 실패하였습니다.');
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setSplashVisible(false));
        if (params.TITLE === '지시사항') {
          dispatch(getCHECKLIST_SHARE_DATA1(date));
        } else {
          dispatch(getCHECKLIST_SHARE_DATA2(date));
        }
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
      date={date}
      setDate={setDate}
      cameraPictureList={cameraPictureList}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      TITLE={params?.TITLE}
      registerFn={registerFn}
      onPressImageFn={onPressImageFn}
      launchImageLibraryFn={launchImageLibraryFn}
      launchCameraFn={launchCameraFn}
    />
  );
};
