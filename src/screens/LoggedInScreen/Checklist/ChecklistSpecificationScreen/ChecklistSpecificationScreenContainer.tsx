import React, {useState, useEffect} from 'react';
import ChecklistSpecificationScreenPresenter from './ChecklistSpecificationScreenPresenter';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {STORE, MEMBER_SEQ} = useSelector((state: any) => state.userReducer);
  const {STORE_SEQ, EMP_SEQ} = useSelector((state: any) => state.storeReducer);

  const {
    data: {
      CHECK_SEQ = null,
      TITLE = null,
      END_TIME = null,
      CS_SEQ = null,
      EMP_NAME = null,
      CHECK_TIME = null,
      CHECK_DATE = null,
      PHOTO_CHECK = null,
      NAME = null,
    } = {},
    scan,
  } = params;

  // FROM MODAL EDITABLE
  // {
  //   "scan": "1"
  //   "data": {
  //     "CHECK_DATE": "2020-09-08",
  //     "CHECK_LIST": "제품 유통기한 확인@2@빠진 제품 채우기@2@테이블 쳥결 유지@2@커피머신 확인(원두,찌꺼기통)@1@......",
  //     "CHECK_SEQ": "2677",
  //     "CHECK_TIME": "2020-09-08 01:20:49",
  //     "CHECK_TITLE": "Gigi",
  //     "CHECK_TYPE": "0",
  //     "CREATE_TIME": "2020-06-22 14:56:05",
  //     "CS_SEQ": "7165",
  //     "EMP_NAME": "직원5",
  //     "EMP_SEQ": null,
  //     "END_TIME": "20:00",
  //     "IMAGE_LIST": "af35a086-a003-4c72-a801-a8c221caa89e-1599495627189.jpg",
  //     "LIST": "제품 유통기한 확인@@빠진 제품 채우기@@테이블 쳥결 유지@@커피머신 확인(원두,찌꺼기통)@@택배 주변 정리@@.....",
  //     "NAME": null,
  //     "PHOTO_CHECK": "1",
  //     "QRURL": "",
  //     "QR_SEQ": "2",
  //     "START_DATE": "2020-06-22",
  //     "TITLE": "관리(1)",
  //     "UPDATE_TIME": "2020-07-02 21:16:06"
  //   },
  // }

  // FROM CARD NONEDITABLE
  // {
  //   "scan": 0
  //   "data": {
  //     "CHECK_DATE": null,
  //     "CHECK_LIST": null,
  //     "CHECK_SEQ": "2677",
  //     "CHECK_TIME": null,
  //     "CHECK_TITLE": null,
  //     "CHECK_TYPE": "0",
  //     "CREATE_TIME": "2020-06-22 14:56:05",
  //     "CS_SEQ": null,
  //     "EMP_NAME": null,
  //     "EMP_SEQ": null,
  //     "END_TIME": "20:00",
  //     "IMAGE_LIST": null,
  //     "LIST": "제품 유통기한 확인@@빠진 제품 채우기@@테이블 쳥결 유지@@커피머신 확인(원두,찌꺼기통)@@택배 주변 정리.....",
  //     "NAME": null,
  //     "PHOTO_CHECK": "1",
  //     "QRURL": "",
  //     "QR_SEQ": "2",
  //     "START_DATE": "2020-06-22",
  //     "TITLE": "관리(1)",
  //     "UPDATE_TIME": "2020-07-02 21:16:06"
  //   },
  // }

  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [isCameraPictureFlash, setIsCameraPictureFlash] = useState<boolean>(
    false,
  );
  const [hasCameraPermission, setHasCameraPermission] = useState<string>('');
  const [cameraRatioList, setCameraRatioList] = useState<any>([]);
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [LIST, setLIST] = useState<any>([]);
  const [checklistGoodState, setChecklistGoodState] = useState<any>([]);
  const [checklistBadState, setChecklistBadState] = useState<any>([]);
  const [CHECK_TITLE, setCHECK_TITLE] = useState<string>();
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [imgModalIdx, setImgModalIdx] = useState<string>('');
  const [CHECK_LIST, setCHECK_LIST] = useState<any>(null);

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  // const getPermissionsAsync = async () => {
  //   const {status} = await Camera.requestPermissionsAsync();

  //   if (status !== 'granted') {
  //     alertModal(
  //       '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
  //     );
  //     return false;
  //   } else {
  //     setHasCameraPermission('granted');
  //   }
  //   return true;
  // };

  // const openCamera = async () => {
  //   const permission = await getPermissionsAsync();
  //   if (!permission) {
  //     return;
  //   }
  // };

  const openImagePickerFn = () => {
    console.log('openImagePickerFn');
  };

  const gotoChecklistAdd = () => {
    navigation.navigate('ChecklistAddScreen', {
      CHECK_SEQ,
      PHOTO_CHECK,
      EMP_SEQ,
      NAME,
      DATE: CHECK_DATE,
      type: '수정',
      CHECK_LIST,
    });
  };

  const registerFn = async () => {
    let newList = [];
    let memostr;
    let badflag = false;

    for (let i = 0; i < LIST?.length; i++) {
      newList.push(LIST[i]);
      if (checklistGoodState[i]) {
        newList.push('1');
      }
      if (checklistBadState[i]) {
        newList.push('2');
        badflag = true;
      }
      if (checklistGoodState[i] === false && checklistBadState[i] === false) {
        return alertModal('체크리스트 항목을 모두 체크해주세요.');
      }
    }
    if (badflag === true && memostr == null) {
      return alertModal('체크리스트 항목에 이상이 있을시 메모를 입력해주세요.');
    }
    if (Number(PHOTO_CHECK || 0) === 1 && cameraPictureList.length === 0) {
      return alertModal('체크리스트 관련 사진을 등록해주세요.');
    }

    if (Number(PHOTO_CHECK || 0) === 1) {
      const formData: any = new FormData();

      formData.append('LIST', JSON.stringify(newList));
      formData.append('CHECK_TITLE', memostr);
      formData.append('CHECK_SEQ', CHECK_SEQ);
      formData.append('NAME', NAME);
      formData.append('CS_SEQ', CS_SEQ);

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
        const {data} = await api.setCheckListImg2({formData});
        if (data.result === 'SUCCESS') {
          // for (const cameraPicture of this.state.cameraPictureList) {
          //   if (!cameraPicture.startsWith('http')) {
          //     const info = await FileSystem.getInfoAsync(cameraPicture);
          //     if (info && info.exists) {
          //       await FileSystem.deleteAsync(cameraPicture);
          //     }
          //   }
          // }
          navigation.goBack();
          alertModal('체크가 완료되었습니다.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
      }
    } else {
      try {
        dispatch(setSplashVisible(true));
        const {data} = await api.setCheckList2({
          LIST: JSON.stringify(newList),
          CHECK_TITLE: memostr,
          CHECK_SEQ,
          NAME,
          CS_SEQ,
          STORE_SEQ,
          MEMBER_SEQ,
        });
        if (data.result === 'SUCCESS') {
          // for (const cameraPicture of this.state.cameraPictureList) {
          //   if (!cameraPicture.startsWith('http')) {
          //     const info = await FileSystem.getInfoAsync(cameraPicture);
          //     if (info && info.exists) {
          //       await FileSystem.deleteAsync(cameraPicture);
          //     }
          //   }
          // }
          navigation.goBack();
          alertModal('체크가 완료되었습니다.');
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
  };

  // 체크리스트 ON/OFF
  const initialize = async () => {
    let checklistGoodStat = new Array(params?.data.LIST.length);
    let checklistBadState = new Array(params?.data.LIST.length);
    let checklist = params?.data.CHECK_LIST;
    let list = params?.data.LIST;
    checklistGoodStat.fill(false);
    checklistBadState.fill(false);

    if (params?.data.CHECK_LIST) {
      checklist = params?.data.LIST.split('@');
      const size = checklist.length / 2;
      list = new Array();
      checklist = params?.data.CHECK_LIST.split('@');
      for (var i = 0; i < size; i++) {
        var checktemp = 2 * i;
        list[i] = checklist[checktemp];
        var temp = 2 * i + 1;
        if (checklist[temp] === '1') {
          checklistGoodStat[i] = true;
        }
        if (checklist[temp] === '2') {
          checklistBadState[i] = true;
        }
      }
    } else {
      list = params?.data.LIST.split('@@');
      list[list.length - 1] = list[list.length - 1].replace('@', '');
    }
    setChecklistGoodState(checklistGoodStat);
    setChecklistBadState(checklistBadState);
    setCHECK_LIST(checklist);
    setLIST(list);
  };

  useEffect(() => {
    initialize();
    //     this.defaultPictureUploadPath = FileSystem.documentDirectory + 'picture/';
    //     await FileSystem.makeDirectoryAsync(this.defaultPictureUploadPath, {
    //       intermediates: true,
    //     });
    //   }
    // }
    // getPermissionsAsync();
  }, []);

  return (
    <ChecklistSpecificationScreenPresenter
      scan={scan}
      hasCHECK_TITLE={params?.data.CHECK_TITLE}
      gotoChecklistAdd={gotoChecklistAdd}
      openImagePickerFn={openImagePickerFn}
      CHECK_TITLE={CHECK_TITLE}
      setCHECK_TITLE={setCHECK_TITLE}
      TITLE={TITLE}
      LIST={LIST}
      NAME={NAME}
      STORE={STORE}
      CHECK_TIME={CHECK_TIME}
      PHOTO_CHECK={PHOTO_CHECK}
      END_TIME={END_TIME}
      EMP_NAME={EMP_NAME}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      cameraPictureList={cameraPictureList}
      setCameraPictureList={setCameraPictureList}
      imgModalIdx={imgModalIdx}
      setImgModalIdx={setImgModalIdx}
      checklistGoodState={checklistGoodState}
      setChecklistGoodState={setChecklistGoodState}
      checklistBadState={checklistBadState}
      setChecklistBadState={setChecklistBadState}
    />
  );
};
