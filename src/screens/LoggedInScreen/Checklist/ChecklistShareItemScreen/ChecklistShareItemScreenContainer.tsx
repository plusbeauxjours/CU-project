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

  const {
    TITLE,
    IMG_LIST,
    NOTICE_SEQ,
    EMP_NAME,
    NOTI_TITLE,
    CREATE_TIME,
    CONTENTS,
    ME,
    MEMBER_SEQ,
  } = params;

  const {STORE} = useSelector((state: any) => state.userReducer);
  const {CHECKLIST_SHARE_COMMENTS} = useSelector(
    (state: any) => state.checklistshareReducer,
  );

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const [commentInputBox, setCommentInputBox] = useState<boolean>(false);
  const [selectedCOM_SEQ, setSelectedCOM_SEQ] = useState<string>('');
  const [isImageViewVisible, setIsImageViewVisible] = useState<boolean>(false);
  const [imgarr, setImgarr] = useState<any>([]);
  const [modalImgarr, setModalImgarr] = useState<any>([]);

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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  const registFn = async () => {
    if (comment == '') {
      return alertModal('', '댓글을 입력해주세요.');
    }
    try {
      const {data} = await api.setNoticeComment(
        NOTICE_SEQ,
        EMP_NAME,
        MEMBER_SEQ,
        comment,
        STORE,
      );
      if (data.message === 'SUCCESS') {
        setComment('');
        dispatch(getCHECKLIST_COMMENTS(NOTICE_SEQ, TITLE));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    dispatch(getCHECKLIST_COMMENTS(NOTICE_SEQ, TITLE));
  };

  useEffect(() => {
    let imgarr = [];
    let modalImgarr = [];
    if (IMG_LIST != null) {
      let allimg = IMG_LIST.split('@');
      for (let i = 0; i < allimg.length; i++) {
        imgarr.push(allimg[i]);
        modalImgarr.push({
          url: 'http://cuapi.shop-sol.com/uploads/' + allimg[i],
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
      imgarr={imgarr}
      setIsImageViewVisible={setIsImageViewVisible}
      modalImgarr={modalImgarr}
      isImageViewVisible={isImageViewVisible}
      ME={ME}
      MEMBER_SEQ={MEMBER_SEQ}
      isEditMode={isEditMode}
      setIsEditMode={setIsEditMode}
      comment={comment}
      setComment={setComment}
      registFn={registFn}
      deleteFn={deleteFn}
      editFn={editFn}
      CHECKLIST_SHARE_COMMENTS={CHECKLIST_SHARE_COMMENTS}
      IMG_LIST={IMG_LIST}
      NOTICE_SEQ={NOTICE_SEQ}
      commentInputBox={commentInputBox}
      setCommentInputBox={setCommentInputBox}
      setSelectedCOM_SEQ={setSelectedCOM_SEQ}
    />
  );
};
