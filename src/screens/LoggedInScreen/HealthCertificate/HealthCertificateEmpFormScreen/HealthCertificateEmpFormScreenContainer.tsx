import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import HealthCertificateEmpFormScreenPresenter from './HealthCertificateEmpFormScreenPresenter';
import utils from '../../../../constants/utils';
import api from '../../../../constants/LoggedInApi';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [cameraModalVisible, setCameraModalVisible] = useState<boolean>(false); // 사진 미리
  const [cameraRatioList, setCameraRatioList] = useState<any>([]);
  const [dateModdalVisible, setDateModalVisible] = useState<boolean>(false);
  const [markedDate, setMarkedDate] = useState<any>({});
  const [changeTestingCertificate, setChangeTestingCertificate] = useState<
    boolean
  >(false);
  const [cameraPictureFlash, setCameraPictureFlash] = useState<boolean>(false);
  const [cameraPicture, setCameraPicture] = useState<any>(null);
  const [EMP_SEQ, setEMP_SEQ] = useState<any>(params?.EMP_SEQ);
  const [NAME, setNAME] = useState<string>(''); // 교육이수자성명 / 성명
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<any>(
    moment().format('YYYY-MM-DD'),
  ); // 교육일시 / 검진일
  const [EDUCATION_HOUR, setEDUCATION_HOUR] = useState<any>(
    params?.EDUCATION_HOUR,
  ); // 교육시간
  const [TESTING_DAY, setTESTING_DAY] = useState<any>(params?.TESTING_DAY);
  const [TESTING_CERTIFICATE, setTESTING_CERTIFICATE] = useState<any>(
    params?.TESTING_CERTIFICATE,
  ); // 이미지 저장 유무
  const [REG_DT, setREG_DT] = useState<any>(params?.REG_DT);
  const [RESULT_COUNT, setRESULT_COUNT] = useState<any>(params?.RESULT_COUNT); // 회차
  const [STORE_SEQ, setSTORE_SEQ] = useState<any>(params?.STORE_SEQ);
  const [EMP_NAME, setEMP_NAME] = useState<any>(params?.EMP_NAME);
  const [STORE_HEALTH_SEQ, setSTORE_HEALTH_SEQ] = useState<any>(
    params?.STORE_HEALTH_SEQ,
  );
  const [date, setDate] = useState<any>(params?.date);

  const alertModal = (title, text) => {
    const params = {
      type: 'alert',
      title,
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

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

  const submit = async () => {
    if (TESTING_CERTIFICATE == undefined) {
      return alertModal(
        '',
        '보건증을 촬영하여 사진을 등록해주세요.\n\n사진촬영 시 인식실패 문구가 나와도 사진은 정상적으로 등록이 됩니다.',
      );
    }
    if (NAME.length === 0 || !NAME) {
      alertModal('', '성명을 입력해주세요.');
      return;
    }
    if (RESULT_COUNT.length === 0 || !RESULT_COUNT) {
      alertModal('', '회차를 입력해주세요.');
    }
    const reg = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    if (reg.test(EDUCATION_DATE) === false) {
      return alertModal(
        '검진일 날짜형식',
        '검진일 날짜형식은 "2020-01-01"과 같은 형식이어야 합니다. 사진이 인식되지 않는다면 항목을 눌러 날짜를 직접 선택해주세요.',
      );
    }
    try {
      dispatch(setSplashVisible(true));
      const cameraPicture = TESTING_CERTIFICATE;
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
      const {data} = await api.saveOcr({
        EMP_NAME: NAME,
        EMP_SEQ: EMP_SEQ,
        STORE_SEQ: STORE_SEQ,
        RESULT_DATE: EDUCATION_DATE,
        RESULT_COUNT: RESULT_COUNT,
        image: {
          uri: utils.isAndroid
            ? cameraPicture
            : cameraPicture.replace('file://', ''),
          name: fileName,
          type: fileType,
        },
      });
      if (data.result == '1') {
        alertModal('', '저장 완료');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  const checkorc = async () => {
    try {
      dispatch(setSplashVisible(true));
      const cameraPicture = TESTING_CERTIFICATE;
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
      const {data} = await api.checkOcr({
        image: {
          uri: utils.isAndroid
            ? cameraPicture
            : cameraPicture.replace('file://', ''),
          name: fileName,
          type: fileType,
        },
      });
      console.log('checkOcr', data);
      setCameraModalVisible(false);
      if (data.result == '0') {
        alertModal(
          '인식 실패',
          '촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
        );
        return;
      } else {
        alertModal('', '인식 완료');
        setNAME(data.name);
        setEDUCATION_DATE(data.resultdate);
        setRESULT_COUNT(data.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
      setCameraPicture(null);
      setChangeTestingCertificate(true);
      setTESTING_CERTIFICATE(cameraPicture);
    }
  };

  useEffect(() => {
    const markedDate = {};
    if (params?.EDUCATION_DATE) {
      markedDate[params?.EDUCATION_DATE.replace(/\./g, '-')] = {
        selected: true,
        selectedColor: '#5887F9',
      };
    }
    setMarkedDate(markedDate);
    //     this.defaultPictureUploadPath = FileSystem.documentDirectory + 'picture/';
    //     await FileSystem.makeDirectoryAsync(this.defaultPictureUploadPath, {
    //       intermediates: true,
    //     });
    //   }
    // }
    // getPermissionsAsync();
  }, []);

  return (
    <HealthCertificateEmpFormScreenPresenter
      submit={submit}
      cameraPicture={cameraPicture}
      setCameraPicture={setCameraPicture}
      checkorc={checkorc}
      cameraModalVisible={cameraModalVisible}
      setCameraModalVisible={setCameraModalVisible}
      dateModdalVisible={dateModdalVisible}
      setDateModalVisible={setDateModalVisible}
      NAME={NAME}
      setNAME={setNAME}
      RESULT_COUNT={RESULT_COUNT}
      setRESULT_COUNT={setRESULT_COUNT}
      EDUCATION_DATE={EDUCATION_DATE}
      setEDUCATION_DATE={setEDUCATION_DATE}
      cameraRatioList={cameraRatioList}
      setCameraRatioList={setCameraRatioList}
      cameraPictureFlash={cameraPictureFlash}
      setCameraPictureFlash={setCameraPictureFlash}
    />
  );
};
