import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import AddShelfLifeScreenPresenter from './AddShelfLifeScreenPresenter';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE_SEQ} = useSelector((state: any) => state.userReducer);
  const [shelfLifeName, setShelfLifeName] = useState<string>('');
  const [shelfLifeDate, setShelfLifeDate] = useState<string>('2020-09-10');
  const [shelfLifeMemo, setShelfLifeMemo] = useState<string>('');
  const [isDateModalVisible, setIsDateModalVisible] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);

  const alertModal = (title, text) => {
    const params = {
      type: 'alert',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const explainModal = (title, text) => {
    const params = {
      type: 'explain',
      title: title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const addFn = () => {
    if (shelfLifeName == '') {
      return alertModal('', '상품명을 입력해주세요.');
    }
    if (shelfLifeDate == '') {
      return alertModal('', '기한을 입력해주세요.');
    }
    for (let i = 0; i < list.length; i++) {
      if (shelfLifeName == list[i].NAME && shelfLifeDate == list[i].DATE) {
        return alertModal('', '같은 일자에 동일한 상품이 작성되어 있습니다.');
      }
    }
    let buffer = list;
    buffer.unshift({
      shelfLifeNAME: shelfLifeName,
      shelfLifeDATE: shelfLifeDate,
      shelfLifeMEMO: shelfLifeMemo,
    });
    setShelfLifeName('');
    setShelfLifeDate('');
    setShelfLifeMemo('');
    setList(buffer);
  };

  const deleteBuffer = (name, date) => {
    setList((buffer) =>
      buffer.filter(
        (item) => item.shelfLifeNAME !== name || item.shelfLifeDATE !== date,
      ),
    );
  };

  const submitFn = async () => {
    if (list.length == 0) {
      return alertModal(
        '',
        '등록하실 상품을 목록에 추가하신 후 등록을 해주세요.',
      );
    }
    try {
      dispatch(setSplashVisible(true));
      const {data} = await api.setShelfLifeData({STORE_SEQ, LIST: list});
      if (data.result == '1') {
        alertModal('', '등록이 완료되었습니다.');
        navigation.goBack();
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  return (
    <AddShelfLifeScreenPresenter
      addFn={addFn}
      explainModal={explainModal}
      deleteBuffer={deleteBuffer}
      submitFn={submitFn}
      list={list}
      shelfLifeName={shelfLifeName}
      setShelfLifeName={setShelfLifeName}
      shelfLifeMemo={shelfLifeMemo}
      setShelfLifeMemo={setShelfLifeMemo}
      shelfLifeDate={shelfLifeDate}
      setShelfLifeDate={setShelfLifeDate}
      isDateModalVisible={isDateModalVisible}
      setIsDateModalVisible={setIsDateModalVisible}
    />
  );
};
