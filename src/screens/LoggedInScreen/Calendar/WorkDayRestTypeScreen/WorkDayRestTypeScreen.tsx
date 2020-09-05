import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {setSplashVisible} from '../../../../redux/splashSlice';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import api from '../../../../constants/LoggedInApi';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Text = styled.Text``;

const Container = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const Section = styled.View`
  width: 100%;
  border-radius: 20px;
  margin-top: 20px;
  padding: 20px;
  background-color: white;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: baseline;
`;

const RowSpace = styled(Row)`
  justify-content: space-between;
`;

const TextWrapper = styled(RowSpace)`
  width: ${wp('75%')}px;
  height: 30px;
`;

const MidText = styled.Text`
  flex: 1;
  font-size: 15px;
  margin: 0 5px;
  text-align: right;
`;

const BigText = styled.Text`
  font-size: 26px;
  margin-bottom: 20px;
`;

const GreyText = styled.Text`
  color: #aaa;
  margin: 40px;
`;

const ContentsBoxLine = styled.View`
  width: ${wp('75%') - 20}px;
  border-bottom-width: 2px;
  border-color: #e5e5e5;
  margin-top: 10px;
`;

const ElementsBox = styled.View`
  border-width: 1px;
  border-radius: 10px;
  border-color: #cccccc;
  padding: 20px;
`;

const ModalContainer = styled.View`
  height: 280px;
  background-color: white;
`;

const ModalBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const ModalYesButton = styled.TouchableOpacity`
  height: 60px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #642a8c;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {data, STORE_SEQ, date} = params;
  const {EMP_ID, NAME, YEAR} = data;

  const [isHelpModalVisible, setisHelpModalVisible] = useState<boolean>(false);
  const [totalVacation, setTotalVacation] = useState<string>('');
  const [useVacation, setUseVacation] = useState<string>('');
  const [remainderVacation, setRemainderVacation] = useState<string>('');
  const [restType, setRestType] = useState<string>('0');
  const [restTypeCheck, setRestTypeCheck] = useState<[boolean, boolean]>([
    true,
    false,
  ]); //  [무급휴가, 유급휴가]

  const fetchData = async () => {
    const {data} = await api.getEmpAnnual(EMP_ID, YEAR);
    if (Array.isArray(data.message) && data.message.length > 0) {
      const annual = data.message[0];
      let totalVacationed = totalVacation;
      let useVacationed = useVacation;
      let remainderVacationed = remainderVacation;

      totalVacationed = annual.ANNUAL || '';
      useVacationed = annual.USE_ANNUAL || '';

      if (!totalVacationed && !useVacationed) {
        remainderVacationed = '';
      } else {
        remainderVacationed = (
          Number(totalVacationed || 0) - Number(useVacationed || 0)
        ).toString();
      }
      setTotalVacation(totalVacationed);
      setUseVacation(useVacationed);
      setRemainderVacation(remainderVacationed);
    }
  };

  const alertModal = (text) => {
    const params = {
      alertType: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const registerFn = async () => {
    if (!restType) {
      return alertModal('휴무유형을 선택해주세요.');
    } else if (totalVacation && isNaN(Number(totalVacation))) {
      return alertModal('총 연차 값이 올바르지 않습니다.');
    } else if (useVacation && isNaN(Number(useVacation))) {
      return alertModal('사용 연차 값이 올바르지 않습니다.');
    } else if (remainderVacation && isNaN(Number(remainderVacation))) {
      return alertModal('남은 연차 값이 올바르지 않습니다.');
    }

    try {
      dispatch(setSplashVisible(true));
      const {data: Data} = await api.createScheduleVacation2({
        EMP_SEQ: EMP_ID,
        STORE_ID: STORE_SEQ,
        EMP_NAME: NAME,
        DATE: date,
        TYPE: restType,
        START: data.START ? data.START : '',
        END: data.END ? data.END : '',
      });
      if (Data.message === 'SUCCESS') {
        navigation.goBack();
        alertModal('휴무설정이 완료되었습니다.');
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

  const Vacation = ({key, title}) => (
    <TextWrapper>
      <Text style={{marginLeft: 10}}>{title}</Text>
      <MidText>{[key]}</MidText>
      <Text style={{marginRight: 20}}>일</Text>
    </TextWrapper>
  );

  const RestType = ({selection, text}) => {
    let value = JSON.parse(JSON.stringify(restTypeCheck));
    return (
      <Row>
        <Touchable
          onPress={() => {
            value.fill(false);
            value[selection] = true;
            if (selection === 0) {
              setRestTypeCheck(value);
              setRestType('0');
            } else if (selection === 1) {
              setRestTypeCheck(value);
              setRestType('1');
            }
          }}>
          <BigText>{text}</BigText>
        </Touchable>
        {isHelpModalVisible && (
          <Modal
            onBackdropPress={() => setisHelpModalVisible(false)}
            isVisible={isHelpModalVisible}
            style={{margin: 0, justifyContent: 'flex-end'}}>
            <ModalContainer>
              <ModalBox>
                <Text style={{fontSize: 30, color: '#642A8C'}}>
                  도움말 입니다.
                </Text>
                <WhiteSpace />
                <Text style={{fontSize: 15, color: '#707070'}}>
                  세부 도움말이 작성될 공간입니다.
                </Text>
              </ModalBox>
              <Row>
                <ModalYesButton onPress={() => setisHelpModalVisible(false)}>
                  <Text style={{fontSize: 16, color: 'white'}}>확인</Text>
                </ModalYesButton>
              </Row>
            </ModalContainer>
          </Modal>
        )}
      </Row>
    );
  };

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <BigText>
              {data.WORKDATE.slice(0, 4)}년 {data.WORKDATE.slice(5, 7)}
              월&nbsp;
              {data.WORKDATE.slice(8, 10)}일
            </BigText>
            <BigText style={{fontSize: 26}}>
              <Text
                style={{
                  color: '#642A8C',
                  fontWeight: 'bold',
                  fontSize: 30,
                }}>
                {data.NAME}
              </Text>
              직원의 근무를
            </BigText>
            <RestType selection={0} text={'무급휴무로 진행합니다.'} />
            {restType === '1' && (
              <>
                <RowSpace>
                  <ElementsBox>
                    <Vacation key={'totalVacation'} title={'총 연차'} />
                    <Vacation key={'useVacation'} title={'사용한 연차'} />
                    <ContentsBoxLine />
                    <Vacation key={'remainderVacation'} title={'남은 연차'} />
                  </ElementsBox>
                </RowSpace>
                <GreyText>
                  * 직원정보의 연차설정에 입력된 값으로 셋팅이 됩니다.
                </GreyText>
              </>
            )}
          </Section>
          <SubmitBtn
            text={'휴무 적용'}
            onPress={() => registerFn()}
            isRegisted={true}
          />
        </Container>
      </ScrollView>
    </BackGround>
  );
};
