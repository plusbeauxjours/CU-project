import React, {useState, useEffect} from 'react';

import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import ChecklistDetailScreenPresenter from './ChecklistDetailScreenPresenter';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {checkType, checkID, DATE, onRefresh, scan} = params;

  const [data, setData] = useState<any>(null);
  const [isChangeModalVisible, setIsChangeModalVisible] = useState<boolean>(
    false,
  );
  const [isCameraModalVisible, setIsCameraModalVisible] = useState<boolean>(
    false,
  );
  const [csID, setCsID] = useState<string>('');
  const [showPictureModal, setShowPictureModal] = useState<boolean>(false);
  const [cameraPictureFlash, setCameraPictureFlash] = useState<boolean>(false);
  const [cameraRatioList, setCameraRatioList] = useState<any>([]);
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [cameraPictureLast, setCameraPictureLast] = useState<any>(null);
  const [check, setCheck] = useState<string>('');
  const [checkpoint, setCheckpoint] = useState<string>('');
  const [checklist, setChecklist] = useState<any>([]);
  const [checktime, setChecktime] = useState<string>('');
  const [checklistGoodState, setChecklistGoodState] = useState<any>([]);
  const [checklistBadState, setChecklistBadState] = useState<any>([]);
  const [memoInput, setMemoInput] = useState<string>('');
  const [checkSelectedEmp, setCheckSelectedEmp] = useState<string>('');
  const [checkEMP, setCheckEMP] = useState<string>('');
  const [checkEMPTime, setCheckEMPTime] = useState<string>('');
  const [PHOTO_CHECK, setPHOTO_CHECK] = useState<any>(null);
  const [pictureUri, setPictureUri] = useState<string>('');
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [imgModalIdx, setImgModalIdx] = useState<string>('');
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categoryList, setCategoryList] = useState<any>([]);

  const initialize = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getAllCheckSchedules({
        CHECK_SEQ: checkID,
        DATE,
      });
      var list = [];
      for (let index = 0; index < data.resultdata.length; index++) {
        var json: any = {};
        json.key = index;
        json.text = data.resultdata[index].EMP_NAME;
        list.push(json);
      }

      let checkpoint = data.checkdata[0].TITLE;
      let checklist = data.checkdata[0].LIST;
      let checktime = data.checkdata[0].END_TIME;
      let csID = data.resultdata[0].CS_SEQ;
      let check = data.resultdata[0].CHECK_LIST;
      let checkEMP = data.resultdata[0].EMP_NAME;
      let checkEMPTime = data.resultdata[0].CHECK_TIME;
      let memo = data.resultdata[0].CHECK_TITLE;
      let PHOTO_CHECK = data.checkdata[0].PHOTO_CHECK;
      let IMAGE_LIST = data.resultdata[0].IMAGE_LIST;

      let checklistGoodState = new Array(checklist.length);
      let checklistBadState = new Array(checklist.length);

      checklistGoodState.fill(false);
      checklistBadState.fill(false);

      if (check !== null) {
        checklist = check.split('@');

        const size = checklist.length / 2;
        checklist = new Array();
        check = check.split('@');

        for (var i = 0; i < size; i++) {
          var checktemp = 2 * i;
          checklist[i] = check[checktemp];

          var temp = 2 * i + 1;

          if (check[temp] === '1') {
            checklistGoodState[i] = true;
          }

          if (check[temp] === '2') {
            checklistBadState[i] = true;
          }
        }
      } else {
        checklist = checklist.split('@@');
        checklist[checklist.length - 1] = checklist[
          checklist.length - 1
        ].replace('@', '');
      }

      const cameraPictureListed = cameraPictureList;
      const modalImgarred = modalImgarr;
      const imageList = (IMAGE_LIST || '').split('@');
      if (imageList && Array.isArray(imageList)) {
        if (imageList[0] != '') {
          for (const imageName of imageList) {
            cameraPictureListed.push(
              `http://cuapi.shop-sol.com/uploads/${imageName}`,
            );
            modalImgarred.push({
              uri: `http://cuapi.shop-sol.com/uploads/${imageName}`,
            });
          }
        }
      }

      setData(data);
      setCheck(check);
      setCheckpoint(checkpoint);
      setChecklist(checklist);
      setChecktime(checktime === null ? '' : checktime);
      setCsID(csID === null ? '' : csID);
      setMemoInput(memo === null ? '' : memo);
      setCheckEMP(checkEMP === null ? '' : checkEMP);
      setCheckEMPTime(checkEMPTime === null ? '' : checkEMPTime);
      setChecklistGoodState(checklistGoodState);
      setChecklistBadState(checklistBadState);
      setPHOTO_CHECK(PHOTO_CHECK);
      setCameraPictureList(cameraPictureList);
      setModalImgarr(modalImgarr);

      setCategoryList(list);
      setSelectedCategory(data.resultdata[0].EMP_NAME);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <ChecklistDetailScreenPresenter
      checkEMPTime={checkEMPTime}
      selectedCategory={selectedCategory}
      cameraPictureList={cameraPictureList}
      modalImgarr={modalImgarr}
      imgModalIdx={imgModalIdx}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
      memoInput={memoInput}
      setMemoInput={setMemoInput}
      scan={scan}
      setImgModalIdx={setImgModalIdx}
      checkpoint={checkpoint}
      checktime={checktime}
      checkEMP={checkEMP}
      checklist={checklist}
      checklistGoodState={checklistGoodState}
      setChecklistGoodState={setChecklistGoodState}
      checklistBadState={checklistBadState}
      setChecklistBadState={setChecklistBadState}
    />
  );
};
