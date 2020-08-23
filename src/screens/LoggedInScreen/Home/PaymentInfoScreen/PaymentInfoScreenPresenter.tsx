import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import PaymentInfoScreenCard from './PaymentInfoScreenCard';
import utils from '../../../../constants/utils';
import {ForwardIcon, BackIcon} from '../../../../constants/Icons';

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
  align-items: center;
`;

const ScrollView = styled.ScrollView``;

const Container = styled.View`
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const Box = styled.View`
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DateBox = styled(Row)`
  padding: 20px 15px;
`;

const DateArrow = styled.TouchableOpacity`
  width: ${wp('10%')};
  height: ${wp('10%')};
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const Date = styled.View`
  flex: 1;
  align-items: center;
`;

const DateText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const DateReload = styled.TouchableOpacity`
  margin-right: 5px;
  width: ${wp('10%')}px;
  height: ${wp('10%')}px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background-color: #eee;
`;

const PayBox = styled.View`
  align-items: center;
  justify-content: center;
`;

const Line = styled.View`
  height: 2px;
  width: ${wp('80%')};
  margin-bottom: 10px;
  background-color: #f2f2f2;
`;

const EmployeeListBox = styled.View`
  margin: 20px 0;
`;

const Pay = styled.View`
  height: ${hp('4%')}px;
  width: ${wp('70%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitleText3 = styled.Text`
  font-size: 15px;
  color: #999999;
`;

export default ({
  refreshing,
  onRefresh,
  nextpay,
  STORE,
  STORE_SEQ,
  STOREPAY_SHOW,
  backpay,
  maindata,
  explainModal,
  employeeNowOn,
}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Container>
          <Box>
            <DateBox>
              <DateArrow onPress={() => backpay()}>
                <BackIcon size={22} color={'#bbb'} />
              </DateArrow>
              <Date>
                <DateText>
                  {maindata.start} ~ {maindata.end}
                </DateText>
              </Date>
              <DateReload onPress={() => onRefresh()}>
                <Icon name="reload-outline" size={26} />
              </DateReload>
              <DateArrow onPress={() => nextpay()}>
                <ForwardIcon size={22} color={'#bbb'} />
              </DateArrow>
            </DateBox>
            <PayBox>
              <Line />
              <Pay>
                <Row>
                  <BoxTitleText3>예상급여</BoxTitleText3>
                  <Touchable
                    style={{}}
                    onPress={() => {
                      explainModal(
                        '[ 예상급여 미포함 내역 ]',
                        '-자율출퇴근 급여\n-근무시간 수정(근무시간 연장시)\n-추가일정 급여\n\n*근무일정 삭제시 과거 예상급여는 차감됩니다',
                      );
                    }}>
                    <Icon name="help-circle" size={20} color="#bbb" />
                  </Touchable>
                </Row>
                <BoxTitleText3>{maindata.stackedpay}</BoxTitleText3>
              </Pay>
              <Pay>
                <BoxTitleText3>누적급여</BoxTitleText3>
                <BoxTitleText3>{maindata.total}</BoxTitleText3>
              </Pay>
              <Pay>
                <BoxTitleText3>주휴수당</BoxTitleText3>
                <BoxTitleText3>{maindata.weekpay}</BoxTitleText3>
              </Pay>
            </PayBox>
          </Box>
          <EmployeeListBox>
            {employeeNowOn?.map((data) => (
              <PaymentInfoScreenCard
                key={data.MEMBER_SEQ}
                name={data.EMP_NAME}
                isManager={data.IS_MANAGER == 0 ? '스태프' : '점장'}
                image={data.images.length == 0 ? '3.png' : data.images[0].IMAGE}
                data={data}
                STORE={STORE}
                STORE_SEQ={STORE_SEQ}
                STOREPAY_SHOW={STOREPAY_SHOW}
              />
            ))}
          </EmployeeListBox>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
