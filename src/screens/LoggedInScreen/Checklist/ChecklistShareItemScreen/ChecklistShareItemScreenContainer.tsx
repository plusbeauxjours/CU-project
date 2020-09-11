import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import ChecklistShareItemScreenPresenter from './ChecklistShareItemScreenPresenter';
import {
  getCHECKLIST_COMMENTS,
  editCHECKLIST_SHARE_COMMENTS,
  deleteCHECKLIST_SHARE_COMMENTS,
} from '../../../../redux/checklistshareSlice';

export default ({route: {params}}) => {
  const dispatch = useDispatch();

  const {TITLE, NOTICE_SEQ, isFavorite} = params;

  const {STORE, MEMBER_SEQ: ME} = useSelector(
    (state: any) => state.userReducer,
  );
  const {
    CHECKLIST_SHARE_COMMENTS,
    CHECKLIST_SHARE_DATA1,
    CHECKLIST_SHARE_DATA2,
    CHECKLIST_SHARE_DATA3,
  } = useSelector((state: any) => state.checklistshareReducer);

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [commentInputBox, setCommentInputBox] = useState<boolean>(false);
  const [selectedCOM_SEQ, setSelectedCOM_SEQ] = useState<string>('');
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [imgarr, setImgarr] = useState<any>([]);
  const [modalImgarr, setModalImgarr] = useState<any>([]);
  const [item, setItem] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const editFn = async () => {
    if (comment == '') {
      return alertModal('', '댓글을 입력해주세요.');
    }
    try {
      const {data} = await api.editNoticeComment(selectedCOM_SEQ, comment);
      if (data.message === 'SUCCESS') {
        dispatch(editCHECKLIST_SHARE_COMMENTS({selectedCOM_SEQ, comment}));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setCommentInputBox(false);
      setComment('');
      setSelectedCOM_SEQ('');
    }
  };

  const deleteFn = async (selectedCOM_SEQ) => {
    try {
      const {data} = await api.delNoticeComment(selectedCOM_SEQ);
      if (data.message === 'SUCCESS') {
        dispatch(deleteCHECKLIST_SHARE_COMMENTS(selectedCOM_SEQ));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const registFn = async () => {
    if (comment == '') {
      return alertModal('', '댓글을 입력해주세요.');
    }
    try {
      const {data} = await api.setNoticeComment(
        NOTICE_SEQ,
        item?.EMP_NAME,
        item?.MEMBER_SEQ,
        comment,
        STORE,
      );
      if (data.message === 'SUCCESS') {
        setComment('');
        dispatch(getCHECKLIST_COMMENTS(NOTICE_SEQ, TITLE));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchImage = (item) => {
    let imgarr = [];
    let modalImgarr = [];
    if (item?.IMG_LIST != null) {
      let allimg = item?.IMG_LIST.split('@');
      for (let i = 0; i < allimg.length; i++) {
        imgarr.push(allimg[i]);
        modalImgarr.push({
          url: 'http://cuapi.shop-sol.com/uploads/' + allimg[i],
        });
      }
      setModalImgarr(modalImgarr);
      setImgarr(imgarr);
    }
  };

  const fetchData = async () => {
    dispatch(getCHECKLIST_COMMENTS(NOTICE_SEQ, TITLE));

    if (TITLE === '지시사항') {
      if (isFavorite) {
        const item = CHECKLIST_SHARE_DATA1.favorite.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      } else {
        const item = CHECKLIST_SHARE_DATA1.basic.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      }
    } else if (TITLE === '특이사항') {
      if (isFavorite) {
        const item = CHECKLIST_SHARE_DATA2.favorite.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      } else {
        const item = CHECKLIST_SHARE_DATA2.basic.find(
          (i) => i.NOTICE_SEQ === NOTICE_SEQ,
        );
        fetchImage(item);
        setItem(item);
      }
    } else {
      const item = CHECKLIST_SHARE_DATA3.message.find(
        (i) => i.NOTICE_SEQ === NOTICE_SEQ,
      );
      fetchImage(item);
      setItem(item);
    }
  };

  useEffect(() => {
    fetchData();
    fetchImage(item);
  }, []);

  return (
    <ChecklistShareItemScreenPresenter
      NOTI_TITLE={item?.TITLE}
      CREATE_TIME={item?.CREATE_TIME}
      EMP_NAME={item?.EMP_NAME}
      TITLE={TITLE}
      CONTENTS={item?.CONTENTS}
      imgarr={imgarr}
      setIsImageViewVisible={setIsImageViewVisible}
      modalImgarr={modalImgarr}
      isImageViewVisible={isImageViewVisible}
      ME={ME}
      MEMBER_SEQ={item?.MEMBER_SEQ}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      comment={comment}
      setComment={setComment}
      registFn={registFn}
      deleteFn={deleteFn}
      editFn={editFn}
      IMG_LIST={item?.IMG_LIST}
      NOTICE_SEQ={NOTICE_SEQ}
      commentInputBox={commentInputBox}
      setCommentInputBox={setCommentInputBox}
      setSelectedCOM_SEQ={setSelectedCOM_SEQ}
      CHECKLIST_SHARE_COMMENTS={CHECKLIST_SHARE_COMMENTS}
      loading={loading}
      isFavorite={isFavorite}
    />
  );
};
