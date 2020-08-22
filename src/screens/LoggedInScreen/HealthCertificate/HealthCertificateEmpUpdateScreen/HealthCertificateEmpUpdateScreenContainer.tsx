import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
import HealthCertificateEmpUpdateScreenPresenter from './HealthCertificateEmpUpdateScreenPresenter';
import utils from '../../../../constants/utils';

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState<boolean>(false); // 사진 미리
  const [cameraRatioList, setCameraRatioList] = useState<any>([]);
  const [markedDate, setMarkedDate] = useState<any>({});
  const [changeTestingCertificate, setChangeTestingCertificate] = useState<
    boolean
  >(false);
  const [cameraPictureFlash, setCameraPictureFlash] = useState<boolean>(false);
  const [cameraPicture, setCameraPicture] = useState<any>(null);
  const [EMP_SEQ, setEMP_SEQ] = useState<any>(params?.EMP_SEQ);
  const [NAME, setNAME] = useState<string>(''); // 교육이수자성명 / 성명
  const [position, setPosition] = useState<any>(params?.position); // 직책
  const [owner, setOwner] = useState<any>(null); // 대표자성명
  const [storename, setStorename] = useState<any>(null); // 영업소 명칭
  const [businesstype, setBusinesstype] = useState<any>(null); // 영업의종류
  const [MANAGER, setMANAGER] = useState<any>(params?.MANAGER);
  const [EDUCATION_DATE, setEDUCATION_DATE] = useState<any>(
    params?.EDUCATION_DATE,
  ); // 교육일시 / 검진일
  const [EDUCATION_HOUR, setEDUCATION_HOUR] = useState<any>(
    params?.EDUCATION_HOUR,
  ); // 교육시간
  const [EDUCATION_TYPE, setEDUCATION_TYPE] = useState<string>('online'); // 교육구분
  const [TESTING_DATE, setTESTING_DATE] = useState<any>(params?.TESTING_DATE);
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
    try {
      if (TESTING_CERTIFICATE == undefined) {
        return alertModal(
          '',
          '보건증을 촬영하여 사진을 등록해주세요.\n\n사진촬영 시 인식실패 문구가 나와도 사진은 정상적으로 등록이 됩니다.',
        );
        return;
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

      const req = {
        url: null,
        params: null,
        config: null,
      };
      const formData = new FormData();
      const cameraPicture = TESTING_CERTIFICATE;
      const fileInfoArr = cameraPicture.split('/');
      const fileInfo = fileInfoArr[fileInfoArr.length - 1];
      const extensionIndex = fileInfo.indexOf('.');

      let fileName;
      let fileType = '';

      if (extensionIndex > -1) {
        fileName = fileInfo;
        fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;

        if (fileType === 'image/jpg') {
          fileType = 'image/jpeg';
        }
      }
      formData.append('EMP_NAME', NAME);
      formData.append('EMP_SEQ', EMP_SEQ);
      formData.append('STORE_SEQ', STORE_SEQ);
      formData.append('RESULT_DATE', EDUCATION_DATE);
      formData.append('RESULT_COUNT', RESULT_COUNT);
      formData.append('STORE_HEALTH_SEQ', STORE_HEALTH_SEQ);
      // formData.append('image', {
      //   uri: utils.isAndroid
      //     ? cameraPicture
      //     : cameraPicture.replace('file://', ''),
      //   name: fileName,
      //   type: fileType,
      // });
      req.url = 'http://133.186.209.113:3003/api/auth/updateocr';
      req.params = formData;
      req.config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      dispatch(setSplashVisible(true));
      const response = await axios.post(req.url, req.params, req.config);
      dispatch(setSplashVisible(false));

      if (response.data.result == '1') {
        alertModal('', '저장 완료');
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkorc = async () => {
    // const manipResult = await ImageManipulator.manipulateAsync(
    //   cameraPicture,
    //   [],
    //   {base64: true},
    // );

    let obj1;
    obj1.format = 'jpg';
    obj1.name = 'ocrimg';
    // obj1.data = manipResult.base64;

    let img;
    img.push(obj1);

    let obj2;
    obj2.lang = 'ko';
    obj2.timestamp = 0;
    obj2.requestId = '1';
    obj2.resultType = '1';
    obj2.version = 'V1';
    obj2.images = img;

    try {
      dispatch(setSplashVisible(true));
      const req = {
        url: null,
        params: null,
        config: null,
      };
      const formData = new FormData();
      const cameraPicture = TESTING_CERTIFICATE;
      const fileInfoArr = cameraPicture.split('/');
      const fileInfo = fileInfoArr[fileInfoArr.length - 1];
      const extensionIndex = fileInfo.indexOf('.');

      let fileName;
      let fileType = '';
      if (extensionIndex > -1) {
        fileName = fileInfo;
        fileType = `image/${fileInfo.substring(extensionIndex + 1)}`;
        if (fileType === 'image/jpg') {
          fileType = 'image/jpeg';
        }
      }
      // formData.append('image', {
      //   uri: utils.isAndroid
      //     ? cameraPicture
      //     : cameraPicture.replace('file://', ''),
      //   name: fileName,
      //   type: fileType,
      // });
      req.url = 'http://133.186.209.113:3003/api/auth/checkocr';
      req.params = formData;
      req.config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      setModalVisible(false);
      setCameraPicture(null);
      setChangeTestingCertificate(true);
      setTESTING_CERTIFICATE(cameraPicture);
      const response = await axios.post(req.url, req.params, req.config);
      if (response.data.result == '0') {
        alertModal(
          '인식 실패',
          '촬영 시 라인에 맞춰 정면에서 찍어주세요.\n\n* 인식이 불안정한 경우 직접입력하여 진행해 주세요.',
        );
        return;
      } else {
        alertModal('', '인식 완료');
        setNAME(response.data.name);
        setEDUCATION_DATE(response.data.resultdate);
        setRESULT_COUNT(response.data.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
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
    console.log('RESULT_COUNT', RESULT_COUNT);
    //     this.defaultPictureUploadPath = FileSystem.documentDirectory + 'picture/';

    //     await FileSystem.makeDirectoryAsync(this.defaultPictureUploadPath, {
    //       intermediates: true,
    //     });
    //   }
    // }
    // getPermissionsAsync();
  }, []);

  return (
    <HealthCertificateEmpUpdateScreenPresenter
      submit={submit}
      checkorc={checkorc}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      NAME={NAME}
      setNAME={setNAME}
      RESULT_COUNT={RESULT_COUNT}
      setRESULT_COUNT={setRESULT_COUNT}
      EDUCATION_DATE={EDUCATION_DATE}
      setEDUCATION_DATE={setEDUCATION_DATE}
    />
  );
};
