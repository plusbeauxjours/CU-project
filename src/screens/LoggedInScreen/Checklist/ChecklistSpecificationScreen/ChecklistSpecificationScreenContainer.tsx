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
  const {NAME, STORE_SEQ, MEMBER_SEQ} = useSelector(
    (state: any) => state.userReducer,
  );
  const {
    STORE,
    scan,
    storeID,
    checkID,
    checkpoint,
    checklist = '',
    checktime,
    csID = '',
    check,
    checkEMP = '',
    checkEMPTime = '',
    memo,
    PHOTO_CHECK,
    IMAGE_LIST,
    checkSelectedEmp,
    checkSelectedEmpName,
    StoreEmpSeq,
    checkType,

    onRefresh,
  } = params;

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
  const [checkData, setCheckData] = useState<string>('');
  const [checklistData, setChecklistData] = useState<any>([]);
  const [checklistGoodState, setChecklistGoodState] = useState<any>([]);
  const [checklistBadState, setChecklistBadState] = useState<any>([]);
  const [memoInput, setMemoInput] = useState<string>(memo || '');
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [imgModalIdx, setImgModalIdx] = useState<string>('');

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

  const gotoChecklistAdd = () => {
    navigation.navigate('ChecklistAddScreen', {
      storeID,
      checkID,
      csID,
      checkpoint,
      checklist,
      checktime,
      check,
      checkEMP,
      checkEMPTime,
      memo: memoInput,
      scan,
      register: false,
      TITLE: '체크리스트 수정',
      type: '수정',
      PHOTO_CHECK,
      checkSelectedEmp,
      checkSelectedEmpName,
      StoreEmpSeq,
      onRefresh,
    });
  };

  const initialize = async () => {
    let checklistGoodStated = new Array(checklist.length);
    let checklistBadStated = new Array(checklist.length);
    let checked;
    let checklisted;
    checklistGoodStated.fill(false);
    checklistBadStated.fill(false);

    if (check) {
      checklisted = check.split('@');

      const size = checklist.length / 2;
      checklisted = new Array();
      checked = check.split('@');

      for (var i = 0; i < size; i++) {
        var checktemp = 2 * i;
        checklisted[i] = checked[checktemp];

        var temp = 2 * i + 1;

        if (checked[temp] === '1') {
          checklistGoodStated[i] = true;
        }

        if (checked[temp] === '2') {
          checklistBadStated[i] = true;
        }
      }
    } else {
      checklisted = checklist.split('@@');
      checklisted[checklisted.length - 1] = checklisted[
        checklisted.length - 1
      ].replace('@', '');
    }

    setChecklistGoodState(checklistGoodStated);
    setChecklistBadState(checklistBadStated);

    const cameraPictureListed = cameraPictureList;
    const modalImgarred = modalImgarr;
    const imageListed = (IMAGE_LIST || '').split('@');
    if (imageListed && Array.isArray(imageListed) && imageListed[0] != '') {
      for (const imageName of imageListed) {
        cameraPictureListed.push(
          `http://cuapi.shop-sol.com/uploads/${imageName}`,
        );
        modalImgarred.push({
          uri: `http://cuapi.shop-sol.com/uploads/${imageName}`,
        });
      }
    }
    setCheckData(checked);
    setChecklistData(checklisted);
    setModalImgarr(modalImgarred);
    setCameraPictureList(cameraPictureListed);
  };

  const register = async () => {
    let newList = [];
    let memostr;
    let badflag = false;

    if (memoInput == '') {
      memostr = null;
    } else {
      memostr = memoInput;
    }

    for (let i = 0; i < checklist.length; i++) {
      newList.push(checklist[i]);
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
      formData.append('CHECK_SEQ', checkID.toString());
      formData.append('NAME', NAME.toString());
      formData.append('CS_SEQ', csID.toString());

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
          onRefresh();
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
          CHECK_SEQ: checkID,
          NAME,
          CS_SEQ: csID,
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
          onRefresh();
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setSplashVisible(false));
      }
    }
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
      gotoChecklistAdd={gotoChecklistAdd}
      checkType={checkType}
      memoInput={memoInput}
      STORE={STORE}
      PHOTO_CHECK={PHOTO_CHECK}
      isCameraModalVisible={isCameraModalVisible}
      setIsCameraModalVisible={setIsCameraModalVisible}
      cameraPictureList={cameraPictureList}
      setCameraPictureList={setCameraPictureList}
      imgModalIdx={imgModalIdx}
      setImgModalIdx={setImgModalIdx}
      checkEMPTime={checkEMPTime}
      checkpoint={checkpoint}
      checktime={checktime}
      checklistData={checklistData}
      checkEMP={checkEMP}
      checkData={checkData}
      checklistGoodState={checklistGoodState}
      setChecklistGoodState={setChecklistGoodState}
      checklistBadState={checklistBadState}
      setChecklistBadState={setChecklistBadState}
    />
  );
};
