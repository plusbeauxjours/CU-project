import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import {setSplashVisible} from '../../../../redux/splashSlice';
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
  justify-content: space-around;
`;

const RestTime = styled.View`
  width: ${wp('80%')}px;
  align-items: flex-end;
  justify-content: flex-end;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;

const BigText = styled.Text`
  font-size: 24px;
`;

const TextInput = styled.TextInput`
  font-size: 24px;
  color: #642a8c;
  flex: 1;
  text-align: right;
  margin: 0 5px;
`;

const TextReadOnly = styled(BigText)`
  color: #642a8c;
  margin: 0 5px;
  text-align: right;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {REST_TIME, data: dataProps, STORE_SEQ, day} = params;
  const employeeID = dataProps.EMP_ID;

  const [prevRestTime, setPrevRestTime] = useState<string>('');
  const [restTime, setRestTime] = useState<string>('');

  const alertModal = (text) => {
    const params = {
      type: 'alert',
      title: '',
      content: text,
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const registerFn = async () => {
    setSplashVisible(true);
    if (!restTime) {
      setSplashVisible(false);
      return alertModal('수정할 휴게시간을 입력해주세요.');
    }

    try {
      dispatch(setSplashVisible(true));
      if (Object.prototype.hasOwnProperty.call(dataProps, 'SCH_ID')) {
        const {data} = await api.getScheduleRestTImeUpdate({
          STORE_ID: STORE_SEQ.toString(),
          EMP_SEQ: employeeID.toString(),
          SCH_ID: dataProps.SCH_ID.toString(),
          EMP_NAME: dataProps.NAME.toString(),
          NEW_REST_TIME: restTime,
          DATE: day.toString(),
        });
        if (data.message === 'SUCCESS') {
          navigation.goBack();
          alertModal('휴게시간이 변경되었습니다.');
        }
      } else {
        const {data} = await api.getScheduleRestTImeCreate({
          STORE_ID: STORE_SEQ.toString(),
          EMP_SEQ: employeeID.toString(),
          EMP_NAME: dataProps.NAME.toString(),
          NEW_REST_TIME: restTime,
          DATE: day.toString(),
          START: dataProps.ATTENDANCE_TIME.toString(),
          END: dataProps.WORK_OFF_TIME.toString(),
        });
        if (data.message === 'SUCCESS') {
          navigation.goBack();
          alertModal('휴게시간이 변경되었습니다.');
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSplashVisible(false));
    }
  };

  useEffect(() => {
    setPrevRestTime(REST_TIME);
  }, []);

  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}>
        <Container>
          <Section>
            <RowSpace>
              <RestTime>
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  현재 휴게시간 설정값
                </Text>
                <Row>
                  <TextReadOnly>{prevRestTime}</TextReadOnly>
                  <BigText>분</BigText>
                </Row>
              </RestTime>
              <WhiteSpace />
              <RestTime>
                <Text
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    fontSize: 22,
                    fontWeight: 'bold',
                  }}>
                  수정할 휴게시간
                </Text>
                <Row>
                  <TextInput
                    placeholder={'시간을 입력해주세요'}
                    placeholderTextColor={'#E5E5E5'}
                    selectionColor={'#642A8C'}
                    onChangeText={(text) => {
                      setRestTime(text);
                    }}
                    maxLength={3}
                    value={restTime}
                    keyboardType={'number-pad'}
                  />
                  <BigText>분</BigText>
                </Row>
              </RestTime>
            </RowSpace>
          </Section>
          <SubmitBtn
            text={'휴게시간 적용'}
            onPress={() => registerFn()}
            isRegisted={true}
          />
        </Container>
      </ScrollView>
    </BackGround>
  );
};
