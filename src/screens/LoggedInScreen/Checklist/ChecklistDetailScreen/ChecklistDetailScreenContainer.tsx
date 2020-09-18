import React, {useState, useEffect} from 'react';

import {useDispatch} from 'react-redux';

import ChecklistDetailScreenPresenter from './ChecklistDetailScreenPresenter';
import {setSplashVisible} from '~/redux/splashSlice';
import api from '~/constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const {CHECK_SEQ = null, DATE = null} = params;

  const [data, setData] = useState<any>();
  const [cameraPictureList, setCameraPictureList] = useState<any>([]);
  const [TITLE, setTITLE] = useState<string>('');
  const [checklist, setChecklist] = useState<any>([]);
  const [END_TIME, setEND_TIME] = useState<string>('');
  const [checklistGoodState, setChecklistGoodState] = useState<any>([]);
  const [checklistBadState, setChecklistBadState] = useState<any>([]);
  const [CHECK_TITLE, setCHECK_TITLE] = useState<string>('');
  const [EMP_NAME, setEMP_NAME] = useState<string>('');
  const [CHECK_TIME, setCHECK_TIME] = useState<string>('');
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [categoryList, setCategoryList] = useState<any>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);

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

        let checklist = data.checkdata[0].LIST;
        let check = data.resultdata[0].CHECK_LIST;

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
        const imageList = (data.resultdata[0].IMAGE_LIST || '').split('@');
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

        setChecklist(checklist);
        setTITLE(data.checkdata[0].TITLE);
        setEND_TIME(data.checkdata[0].END_TIME);
        setCHECK_TITLE(data.resultdata[0].CHECK_TITLE);
        setEMP_NAME(data.resultdata[0].EMP_NAME);
        setCHECK_TIME(data.resultdata[0].CHECK_TIME);
        setSelectedCategory(data.resultdata[0].MEMBER_SEQ1);
        setChecklistGoodState(checklistGoodState);
        setChecklistBadState(checklistBadState);
        setCameraPictureList(cameraPictureList);
        setModalImgarr(modalImgarr);

        setData(data);
        setCategoryList(list);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChecklistDetailScreenPresenter
      selectedCategory={selectedCategory}
      cameraPictureList={cameraPictureList}
      modalImgarr={modalImgarr}
      isImageViewVisible={isImageViewVisible}
      setIsImageViewVisible={setIsImageViewVisible}
      CHECK_TITLE={CHECK_TITLE}
      setCHECK_TITLE={setCHECK_TITLE}
      TITLE={TITLE}
      END_TIME={END_TIME}
      setEND_TIME={setEND_TIME}
      EMP_NAME={EMP_NAME}
      setEMP_NAME={setEMP_NAME}
      CHECK_TIME={CHECK_TIME}
      setCHECK_TIME={setCHECK_TIME}
      checklist={checklist}
      checklistGoodState={checklistGoodState}
      setChecklistGoodState={setChecklistGoodState}
      checklistBadState={checklistBadState}
      setChecklistBadState={setChecklistBadState}
      categoryList={categoryList}
      setSelectedCategory={setSelectedCategory}
      setChecklist={setChecklist}
      setCameraPictureList={setCameraPictureList}
      setModalImgarr={setModalImgarr}
      data={data}
      imageIndex={imageIndex}
      setImageIndex={setImageIndex}
    />
  );
};
