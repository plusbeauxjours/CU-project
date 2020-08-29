import React, {useState, useEffect} from 'react';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {RefreshControl} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setAlertInfo, setAlertVisible} from '../../../../redux/alertSlice';
import SubmitBtn from '../../../../components/Btn/SubmitBtn';
import {setSplashVisible} from '../../../../redux/splashSlice';
import api from '../../../../constants/LoggedInApi';
import ManageInviteEmployeeCard1 from './ManageInviteEmployeeCard1';
import ManageInviteEmployeeCard2 from './ManageInviteEmployeeCard2';
import {HelpCircleIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const Section = styled.View`
  width: 100%;
  padding-bottom: 20px;
  border-radius: 20px;
  margin-bottom: 20px;
  background-color: white;
`;

const BoxTitle = styled.TouchableOpacity`
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const EmployeeListBox = styled.View`
  align-items: center;
`;

const BoxTitleText = styled.Text`
  padding-left: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const GreyText = styled.Text`
  text-align: center;
  color: #aaa;
`;

export default ({route: {params}}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {STORE_SEQ, STOREDATA} = params;

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [responseEmployee, setResponseEmployee] = useState<any>([]);
  const [noResponseEmployee, setNoResponseEmployee] = useState<any>([]);

  const cancelJoin = async (join_emp_seq) => {
    try {
      const {data} = await api.cancelJoin({join_emp_seq});
      if (data.message == 'SUCCESS') {
        let list = noResponseEmployee;
        list = list.filter((data) => data.join_emp_seq !== join_emp_seq);
        setNoResponseEmployee(list);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const inviteEmployee = () => {
    navigation.navigate('InviteEmployeeScreen', {
      STORE_SEQ,
    });
  };

  const deleteModal = (title, text, cancel, okBtn, join_emp_seq) => {
    const params = {
      type: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => {
        cancelJoin(join_emp_seq);
      },
    };
    dispatch(setAlertInfo(params));
    dispatch(setAlertVisible(true));
  };

  const confirmModal = (title, text, cancel, okBtn, join_emp_seq) => {
    const params = {
      type: 'confirm',
      title: title,
      content: text,
      cancelButtonText: cancel,
      okButtonText: okBtn,
      warning: 'yes',
      okCallback: () => {
        cancelJoin(join_emp_seq);
      },
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

  const fetchData = async () => {
    try {
      const {data} = await api.getWaitEmpList(STORE_SEQ);
      if (data.message === 'SUCCESS') {
        setResponseEmployee(data.result);
        setNoResponseEmployee(data.result2);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{alignItems: 'center'}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container>
          <Section>
            <BoxTitle
              onPress={() =>
                explainModal('', 'App 설치 및 회원가입이 완료된 직원입니다.')
              }>
              <BoxTitleText style={{paddingRight: 5}}>
                초대에 응한 직원
              </BoxTitleText>
              <HelpCircleIcon />
            </BoxTitle>
            {responseEmployee.length === 0 && (
              <GreyText>초대에 응한 직원이 없습니다</GreyText>
            )}
            <EmployeeListBox>
              {responseEmployee?.map((data) => (
                <ManageInviteEmployeeCard1
                  key={data.MEMBER_SEQ}
                  name={data.EMP_NAME}
                  image={data.images[0].IMAGE}
                  EMP_SEQ={data.EMP_SEQ}
                  STORE_SEQ={STOREDATA.resultdata.STORE_SEQ}
                  STORE_NAME={STOREDATA.resultdata.NAME}
                  onRefresh={onRefresh}
                  handler1={() => dispatch(setSplashVisible(true))}
                  handler2={() => dispatch(setSplashVisible(false))}
                  PHONE={data.MobileNo}
                  CALCULATE_DAY={STOREDATA.resultdata.CALCULATE_DAY}
                  confirmModal={(a, b, c, d, e) => confirmModal(a, b, c, d, e)}
                />
              ))}
            </EmployeeListBox>
          </Section>
          <Section>
            <BoxTitle
              onPress={() => {
                explainModal(
                  '',
                  'App 설치가 완료되지 않은 직원입니다. 초대메시지 재전송을 눌러 다시한번 알려주세요.',
                );
              }}>
              <BoxTitleText style={{paddingRight: 5}}>
                초대 메시지 미열람 직원
              </BoxTitleText>
              <HelpCircleIcon />
            </BoxTitle>
            {noResponseEmployee.length === 0 && (
              <GreyText>초대 메시지 미열람 직원이 없습니다.</GreyText>
            )}
            <EmployeeListBox>
              {noResponseEmployee?.map((data) => (
                <ManageInviteEmployeeCard2
                  key={data.join_emp_seq}
                  join_emp_seq={data.join_emp_seq}
                  name={data.EMP_NAME}
                  STORE_SEQ={STORE_SEQ}
                  handler={(param) => dispatch(setSplashVisible(param))}
                  PHONE={data.PHONE}
                  deleteModal={(a, b, c, d, e) => deleteModal(a, b, c, d, e)}
                />
              ))}
            </EmployeeListBox>
          </Section>
          <SubmitBtn
            text={'직원초대'}
            onPress={() => inviteEmployee()}
            isRegisted={true}
          />
        </Container>
      </ScrollView>
    </BackGround>
  );
};
