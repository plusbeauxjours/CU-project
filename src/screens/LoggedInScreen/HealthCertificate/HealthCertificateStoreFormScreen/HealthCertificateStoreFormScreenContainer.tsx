import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';
import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import HealthCertificateStoreFormScreenPresenter from './HealthCertificateStoreFormScreenPresenter';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const STORE_SEQ = params?.STORE_SEQ;
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [cameraModalVisible, setCameraModalVisible] = useState<boolean>(false);
  const [cameraRatioList, setCameraRatioList] = useState<any>([]);
  const [cameraPictureFlash, setCameraPictureFlash] = useState<boolean>(false);
  const [cameraPicture, setCameraPicture] = useState<any>(null);
  const [NAME, setNAME] = useState<string>(''); // 교육이수자성명 / 성명
  const [owner, setOwner] = useState<string>(''); // 대표자성명
  const [storename, setStorename] = useState<string>(''); // 영업소 명칭
  const [businesstype, setBusinesstype] = useState<string>(''); // 영업의종류
  const [position, setPosition] = useState<string>(''); // 직책
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<any>(
    moment().format('YYYY-MM-DD'),
  ); // 교육일시 / 검진일
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<'online' | 'offline'>(
    'online',
  ); // 교육구분
  const [TESTING_CERTIFICATE, setTESTING_CERTIFICATE] = useState<any>(''); // 이미지 저장 유무

  // const getPermissionsAsync = async () => {
  //   const {status} = await Camera.requestPermissionsAsync();
  //   if (status !== 'granted') {
  //     alertModal(
  //       '',
  //       '앱을 사용하기 위해서는 반드시 권한을 허용해야 합니다.\n거부시 설정에서 "퇴근해씨유" 앱의 권한 허용을 해야 합니다.',
  //     );
  //     return false;
  //   }
  //   return true;
  // };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const toggleEducationType = () => {
    if (EDUCATION_TYPE === 'online') {
      return setEDUCATION_TYPE('offline');
    } else {
      return setEDUCATION_TYPE('online');
    }
  };

  const submitFn = async () => {
    const reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    if (reg.test(EDUCATION_DATE) === false) {
      return alertModal(
        '교육일시 날짜형식',
        '교육일시 날짜형식은 "2020-01-01"과 같은 형식이어야 합니다. 사진이 인식되지 않는다면 항목을 눌러 날짜를 직접 선택해주세요.',
      );
    }
    if (TESTING_CERTIFICATE == undefined) {
      return alertModal(
        '',
        '위생교육증을 촬영하여 사진을 등록해주세요.\n\n사진촬영 시 인식실패 문구가 나와도 사진은 정상적으로 등록이 됩니다.',
      );
    }
    if (NAME.length === 0 || !NAME) {
      return alertModal('', '교육이수자 성명을 입력해주세요.');
    }
    if (position.length === 0 || !position) {
      return alertModal('', '직책을 입력해주세요.');
    }
    if (owner.length === 0 || !owner) {
      return alertModal('', '대표자 성명을 입력해주세요.');
    }
    if (storename.length === 0 || !storename) {
      return alertModal('', '영업소 명칭을 입력해주세요.');
    }
    if (businesstype.length === 0 || !businesstype) {
      return alertModal('', '영업의 종류를 입력해주세요.');
    }
    if (EDUCATION_TYPE.length === 0 || !EDUCATION_TYPE) {
      return alertModal('', '교육구분을 선택해주세요.');
    }
    try {
      dispatch(setSplashVisible(true));
      const fileInfoArr = cameraPicture.split('/');
      const fileInfo = fileInfoArr[fileInfoArr.length - 1];
      const extensionIndex = fileInfo.indexOf('.');
      let fileName;
      let fileType;
      if (extensionIndex > -1) {
        fileName = fileInfo;
        fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;
        if (fileType === 'image/jpg') {
          fileType = 'image/jpeg';
        }
      }
      const {data} = await api.saveOcr1({
        businesstype,
        position,
        owner,
        storename,
        RESULT_DATE: EDUCATION_DATE,
        EDUCATION_TYPE,
        EMP_NAME: NAME,
        STORE_SEQ,
        image: {
          uri: utils.isAndroid
            ? cameraPicture
            : cameraPicture.replace('file://', ''),
          name: fileName,
          type: fileType,
        },
      });
      if (extensionIndex > -1) {
        fileName = fileInfo;
        fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;
        if (fileType === 'image/jpg') {
          fileType = 'image/jpeg';
        }
      }
      if (data.result == '1') {
        alertModal('', '저장 완료');
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const checkOrcFn = async () => {
    try {
      dispatch(setSplashVisible(true));
      const fileInfoArr = cameraPicture.split('/');
      const fileInfo = fileInfoArr[fileInfoArr.length - 1];
      const extensionIndex = fileInfo.indexOf('.');
      let fileName;
      let fileType;
      if (extensionIndex > -1) {
        fileName = fileInfo;
        fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;
        if (fileType === 'image/jpg') {
          fileType = 'image/jpeg';
        }
      }
      const {data} = await api.checkocr1({
        image: {
          uri: utils.isAndroid
            ? cameraPicture
            : cameraPicture.replace('file://', ''),
          name: fileName,
          type: fileType,
        },
      });
      if (data.result == '0') {
        return alertModal(
          '인식 실패',
          '촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
        );
      } else {
        var date = data.resultdate;
        var yearstr = date.split('년');
        var monthstr = yearstr[1].split('월');
        var daystr = monthstr[1].split('일');
        alertModal('', '인식 완료');
        setNAME(data.name);
        setPosition(data.position);
        setOwner(data.owner);
        setStorename(data.storename);
        setEDUCATION_DATE(
          yearstr[0] +
            '-' +
            monthstr[0].replace(' ', '') +
            '-' +
            daystr[0].replace(' ', ''),
        );
        setBusinesstype(data.businesstype);
        setEDUCATION_TYPE(data.EDUCATION_TYPE);
      }
    } catch (e) {
      alertModal(
        '인식 실패',
        '촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
      );
    } finally {
      dispatch(setSplashVisible(false));
      setCameraPicture(null);
      setTESTING_CERTIFICATE(cameraPicture);
    }
  };

  useEffect(() => {
    const markedDate = {};
    if (EDUCATION_DATE) {
      markedDate[EDUCATION_DATE.replace(/\./g, '-')] = {
        selected: true,
        selectedColor: '#5887F9',
      };
    }
    //     this.defaultPictureUploadPath = FileSystem.documentDirectory + 'picture/';
    //     await FileSystem.makeDirectoryAsync(this.defaultPictureUploadPath, {
    //       intermediates: true,
    //     });
    //   }
    // }
    // getPermissionsAsync();
  }, []);

  return (
    <HealthCertificateStoreFormScreenPresenter
      submitFn={submitFn}
      checkOrcFn={checkOrcFn}
      cameraModalVisible={cameraModalVisible}
      setCameraModalVisible={setCameraModalVisible}
      cameraPicture={cameraPicture}
      setCameraPicture={setCameraPicture}
      setCameraPictureFlash={setCameraPictureFlash}
      cameraPictureFlash={cameraPictureFlash}
      cameraRatioList={cameraRatioList}
      setCameraRatioList={setCameraRatioList}
      setNAME={setNAME}
      NAME={NAME}
      setPosition={setPosition}
      position={position}
      setOwner={setOwner}
      owner={owner}
      setStorename={setStorename}
      storename={storename}
      EDUCATION_DATE={EDUCATION_DATE}
      setEDUCATION_DATE={setEDUCATION_DATE}
      EDUCATION_TYPE={EDUCATION_TYPE}
      setEDUCATION_TYPE={setEDUCATION_TYPE}
      setBusinesstype={setBusinesstype}
      businesstype={businesstype}
      dateModalVisible={dateModalVisible}
      setDateModalVisible={setDateModalVisible}
      toggleEducationType={toggleEducationType}
    />
  );
};
