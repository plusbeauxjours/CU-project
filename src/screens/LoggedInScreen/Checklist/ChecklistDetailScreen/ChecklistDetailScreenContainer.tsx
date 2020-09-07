import React, {useState, useEffect} from 'react';

import {useDispatch} from 'react-redux';

import ChecklistDetailScreenPresenter from './ChecklistDetailScreenPresenter';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const {CHECK_SEQ = null, DATE = null} = params;

  const [data, setData] = useState<any>();
  const [csID, setCsID] = useState<string>('');
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [check, setCheck] = useState<string>('');
  const [checkpoint, setCheckpoint] = useState<string>('');
  const [checklist, setChecklist] = useState<any>([]);
  const [checktime, setChecktime] = useState<string>('');
  const [checklistGoodState, setChecklistGoodState] = useState<any>([]);
  const [checklistBadState, setChecklistBadState] = useState<any>([]);
  const [memoInput, setMemoInput] = useState<string>('');
  const [checkEMP, setCheckEMP] = useState<string>('');
  const [checkEMPTime, setCheckEMPTime] = useState<string>('');
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [imgModalIdx, setImgModalIdx] = useState<string>('');
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [categoryList, setCategoryList] = useState<any>([]);

  const fetchData = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getAllCheckSchedules({
        CHECK_SEQ,
        DATE,
      });

      if (data.resultmsg == '1') {
        var list = [];
        for (let index = 0; index < data.resultdata.length; index++) {
          var json: any = {};
          json.key = index;
          json.EMP_NAME = data.resultdata[index].EMP_NAME;
          json.MEMBER_SEQ1 = data.resultdata[index].MEMBER_SEQ1;
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

        const cameraPictureList = [];
        const modalImgarr = [];
        const imageList = (IMAGE_LIST || '').split('@');
        if (imageList && Array.isArray(imageList)) {
          if (imageList[0] != '') {
            for (const imageName of imageList) {
              cameraPictureList.push(
                `http://cuapi.shop-sol.com/uploads/${imageName}`,
              );
              modalImgarr.push({
                url: `http://cuapi.shop-sol.com/uploads/${imageName}`,
              });
            }
          }
        }

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
        setCameraPictureList(cameraPictureList);
        setModalImgarr(modalImgarr);

        setData(data);
        setCategoryList(list);
        setSelectedCategory(data.resultdata[0].MEMBER_SEQ1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
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
      setImgModalIdx={setImgModalIdx}
      checkpoint={checkpoint}
      checktime={checktime}
      checkEMP={checkEMP}
      checklist={checklist}
      checklistGoodState={checklistGoodState}
      setChecklistGoodState={setChecklistGoodState}
      checklistBadState={checklistBadState}
      setChecklistBadState={setChecklistBadState}
      categoryList={categoryList}
      setSelectedCategory={setSelectedCategory}
      setCheck={setCheck}
      setCheckpoint={setCheckpoint}
      setChecklist={setChecklist}
      setChecktime={setChecktime}
      setCsID={setCsID}
      setMemoInput={setMemoInput}
      setCheckEMP={setCheckEMP}
      setCheckEMPTime={setCheckEMPTime}
      setCameraPictureList={setCameraPictureList}
      setModalImgarr={setModalImgarr}
      data={data}
    />
  );
};
