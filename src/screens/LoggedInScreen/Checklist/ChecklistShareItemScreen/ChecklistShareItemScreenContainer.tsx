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

  const {IMG_LIST, TITLE, NOTICE_SEQ, EMP_NAME} = params;

  const {MEMBER_SEQ, STORE_SEQ} = useSelector(
    (state: any) => state.userReducer,
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);
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

  const onRefresh = async () => {
    try {
      dispatch(setSplashVisible(true));
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const alertModal = (title, text) => {
    const params = {
      type: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const EditFn = async () => {
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

  const DeleteFn = async (COM_SEQ) => {
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
  return <ChecklistShareItemScreenPresenter />;
};
