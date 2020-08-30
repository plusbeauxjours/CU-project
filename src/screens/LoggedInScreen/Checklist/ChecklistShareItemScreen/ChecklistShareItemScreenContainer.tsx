import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import ChecklistShareItemScreenPresenter from './ChecklistShareItemScreenPresenter';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    IMG_LIST,
    TITLE,
    NOTICE_SEQ,
    EMP_NAME,
    NOTI_TITLE,
    CREATE_TIME,
    CONTENTS,
    IS_MANAGER,
    ME,
    COM_SEQ,
    MEMBER_SEQ,
  } = params;

  const {STORE_SEQ} = useSelector((state: any) => state.userReducer);
  const [memoInput, setMemoInput] = useState<string>('');
  const [clickComment, setClickComment] = useState<boolean>(false);
  const [memoUpdate, setMemoUpdate] = useState<string>('');
  const [clickCommentUpdate, setClickCommentUpdate] = useState<boolean>(false);
  const [comment, setComment] = useState<any>([]);
  const [selectedCOM_SEQ, setSelectedCOM_SEQ] = useState<string>('');
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [imgarr, setImgarr] = useState<any>([]);
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [imgModalIdx, setImgModalIdx] = useState<number>(0);

  const alertModal = (title, text) => {
    const params = {
      type: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const editFn = async () => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.editNoticeComment(selectedCOM_SEQ, memoUpdate);
      setMemoUpdate('');
      setClickCommentUpdate(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const deleteFn = async (COM_SEQ) => {
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.delNoticeComment(COM_SEQ);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const registFn = async () => {
    if (memoInput == '') {
      return alertModal('', '댓글을 입력해주세요.');
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.setNoticeComment(
        NOTICE_SEQ,
        EMP_NAME,
        MEMBER_SEQ,
        memoInput,
      );
      setMemoUpdate('');
      setClickCommentUpdate(false);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const fetchData = async () => {
    let title;
    if (TITLE == 'CU소식') {
      title = '1';
    } else {
      title = '0';
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.getNoticeComment(
        NOTICE_SEQ,
        MEMBER_SEQ,
        STORE_SEQ,
        title,
      );
      setComment(data.message);
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    let imgarr = [];
    let modalImgarr = [];
    if (IMG_LIST != null) {
      let allimg = IMG_LIST.split('@');
      for (let i = 0; i < allimg.length; i++) {
        imgarr.push(allimg[i]);
        modalImgarr.push({
          uri: 'http://cuapi.shop-sol.com/uploads/' + allimg[i],
        });
      }
      setModalImgarr(modalImgarr);
      setImgarr(imgarr);
    }
    fetchData();
  }, []);

  return (
    <ChecklistShareItemScreenPresenter
      NOTI_TITLE={NOTI_TITLE}
      CREATE_TIME={CREATE_TIME}
      EMP_NAME={EMP_NAME}
      TITLE={TITLE}
      CONTENTS={CONTENTS}
      IS_MANAGER={IS_MANAGER}
      imgarr={imgarr}
      setIsImageViewVisible={setIsImageViewVisible}
      setImgModalIdx={setImgModalIdx}
      modalImgarr={modalImgarr}
      imgModalIdx={imgModalIdx}
      isImageViewVisible={isImageViewVisible}
      ME={ME}
      MEMBER_SEQ={MEMBER_SEQ}
      clickComment={clickComment}
      setClickComment={setClickComment}
      clickCommentUpdate={clickCommentUpdate}
      setClickCommentUpdate={setClickCommentUpdate}
      memoInput={memoInput}
      setMemoInput={setMemoInput}
      registFn={registFn}
      deleteFn={deleteFn}
      editFn={editFn}
      comment={comment}
      setMemoUpdate={setMemoUpdate}
      setSelectedCOM_SEQ={setSelectedCOM_SEQ}
      COM_SEQ={COM_SEQ}
      IMG_LIST={IMG_LIST}
      MEMBER_SEQ={MEMBER_SEQ}
    />
  );
};
