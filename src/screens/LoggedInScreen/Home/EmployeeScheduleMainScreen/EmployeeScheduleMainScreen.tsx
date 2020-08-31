import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

import api from '../../../../constants/LoggedInApi';
import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import {
  HelpCircleIcon,
  RadioBtnOnIcon,
  RadioBtnOffIcon,
} from '../../../../constants/Icons';

const WhiteSpace = styled.View`
  height: 30px;
`;

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;

const Section = styled.View`
  width: 100%;
  margin-top: 20px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
`;

const NameText = styled.Text`
  font-size: 18px;
`;
const GreySmallText = styled.Text`
  color: #aaa;
  font-size: 13px;
  margin-top: 5px;
`;
const GreyText = styled.Text`
  color: #aaa;
`;

const Bold = styled.Text`
  font-weight: bold;
  margin-left: 5px;
  font-size: 15px;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const Line = styled.View`
  width: 100%;
  border-bottom-width: 2px;
  border-color: #e5e5e5;
  margin: 20px 0;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    CALCULATE_DAY,
    image,
    name,
    EMP_SEQ,
    STORE_SEQ,
    STORE_NAME,
    START,
    END,
    POSITION,
    PAY_TYPE,
    PAY,
  } = params;

  const [workTypeCheck, setWorkTypeCheck] = useState<[boolean, boolean]>([
    false,
    false,
  ]); //  [ 일정이 있는 직원, 자율출퇴근 직원 ]
  const [regist, setRegist] = useState<boolean>(false);

  const explainModal = (text) => {
    const params = {
      alertType: 'explain',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const alertModal = (title, text) => {
    const params = {
      alertType: 'alert',
      title: title || '',
      content: text || '',
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const changeModeFn = async (workTypeCheck) => {
    try {
      const {data} = await api.toggleCalendar({
        CALENDAR: workTypeCheck,
        EMP_SEQ: EMP_SEQ.toString(),
      });
    } catch (error) {
      console.log(error);
      alertModal('', '통신이 원활하지 않습니다.');
    }
  };

  const WorkType = ({selection, text}) => {
    let value = JSON.parse(JSON.stringify(workTypeCheck));
    return (
      <React.Fragment>
        <Row>
          <RowTouchable
            onPress={() => {
              value.fill(false); // ES6
              value[selection] = true;
              setWorkTypeCheck(value);
              setRegist(true);
            }}>
            {workTypeCheck[selection] ? (
              <RadioBtnOnIcon size={22} />
            ) : (
              <RadioBtnOffIcon size={22} />
            )}
            <Bold>{text}</Bold>
          </RowTouchable>
          <RowTouchable
            onPress={() => {
              if (selection == 0) {
                explainModal(
                  '1. 근무일정 설정 후 사용이 가능합니다.\n2. 근태관리가 가능합니다. (지각, 조퇴, 결근 확인 및 휴무설정 가능)\n3. 근무일정 기준으로 급여가 산출됩니다.',
                );
              } else {
                explainModal(
                  '1. 근무일정 설정없이 사용이 가능합니다.\n2. 출퇴근 확인만 가능합니다.\n3. 출퇴근 시간 기준으로 급여가 산출됩니다.\n4. 주휴수당 계산이 안됩니다.',
                );
              }
            }}>
            <HelpCircleIcon />
          </RowTouchable>
        </Row>
        <Row style={{marginTop: 10, paddingLeft: 20}}>
          {text == '일정이 있는 직원' ? (
            <GreyText>
              정해진 일정으로 출퇴근하며 캘린더에 근무일정이 표시됩니다.
            </GreyText>
          ) : (
            <GreyText>
              정해진 일정없이 출퇴근이 가능하며 출근하였을 때만 캘린더에
              표시됩니다.
            </GreyText>
          )}
        </Row>
      </React.Fragment>
    );
  };
  return (
    <BackGround>
      <Container>
        <Section>
          <NameText>근무유형 선택</NameText>
          <GreySmallText>
            추후 직원정보 설정에서 변경이 가능합니다.
          </GreySmallText>
          <Line />
          <WorkType selection={0} text={'일정이 있는 직원'} />
          <WhiteSpace />
          <WorkType selection={1} text={'자율출퇴근 직원'} />
        </Section>
      </Container>
      <SubmitBtn
        text={'선택 완료'}
        onPress={() => {
          changeModeFn(workTypeCheck[0] === true ? '1' : '0');
          navigation.navigate('EmployeeScheduleInfoScreen', {
            CALCULATE_DAY,
            EMP_SEQ,
            STORE_SEQ,
            PAY,
            PAY_TYPE,
          });
        }}
        isRegisted={regist}
      />
    </BackGround>
  );
};
