import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import EmployeeListCard from './EmployeeListCard';
import {HelpCircleIcon} from '../../../../constants/Icons';

interface IEmployeeListBox {
  hasEmployeeNow?: boolean;
}

const BackGround = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.View`
  width: 100%;
  padding: 0 20px;
  align-items: center;
  margin-top: ${hp('5%')}px;
`;

const Section = styled.View`
  width: ${wp('90%')}px;
  justify-content: center;
  margin: ${hp('3%')}px 0;
  border-radius: 20px;
  background-color: #fff;
`;

const BoxTitle = styled.View`
  margin: 0 20px;
  padding: ${hp('2%')}px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const BoxTitleText = styled.Text`
  font-size: 20px;
  color: #7e7c7c;
`;

const StoreBox = styled.View`
  width: 100%;
  padding: 25px;
  border-radius: 50px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

const StoreBoxText = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;

const NumberText = styled.Text`
  color: #642a8c;
  font-size: 18px;
  font-weight: bold;
`;

const EmployeeListBox = styled.View<IEmployeeListBox>`
  width: 100%;
  align-items: center;
  border-radius: 20px;
  border-color: #f2f2f2;
  background-color: white;
  border-top-width: ${(props) => (props.hasEmployeeNow ? '1px' : 0)};
`;

export default ({
  refreshing,
  onRefresh,
  STORE,
  STOREDATA,
  adviceModal,
  employeeNowOn,
  employeeNowOff,
}) => {
  return (
    <BackGround>
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Container>
          <StoreBox>
            <StoreBoxText>{STOREDATA?.resultdata.NAME}의 직원목록</StoreBoxText>
          </StoreBox>

          <Section>
            <BoxTitle>
              <BoxTitleText>전체직원</BoxTitleText>
              <NumberText>{employeeNowOn?.length ?? 0}</NumberText>
            </BoxTitle>

            <EmployeeListBox hasEmployeeNow={employeeNowOn}>
              {employeeNowOn?.map((data, index) => (
                <EmployeeListCard
                  key={data.MEMBER_SEQ}
                  name={data.EMP_NAME}
                  isManager={data.IS_MANAGER == 0 ? '스태프' : '점장'}
                  image={
                    data.images.length == 0 ? '3.png' : data.images[0].IMAGE
                  }
                  startDay={data.START}
                  data={data}
                  STORE={STORE}
                  STOREDATA={STOREDATA}
                  NUMBER={index + 1}
                  LAST={employeeNowOn.length}
                  onRefresh={onRefresh}
                />
              ))}
            </EmployeeListBox>
          </Section>
          <Section>
            <BoxTitle>
              {STORE == '1' ? (
                <Touchable
                  onPress={() => {
                    adviceModal(
                      '',
                      '근무종료된 직원은 본인의 근무내역 확인이 불가능합니다.',
                    );
                  }}>
                  <BoxTitleText>근무종료</BoxTitleText>
                  <HelpCircleIcon size={20} />
                </Touchable>
              ) : (
                <BoxTitleText>근무종료</BoxTitleText>
              )}
              <NumberText>{employeeNowOff?.length ?? 0}</NumberText>
            </BoxTitle>
            <EmployeeListBox hasEmployeeNow={employeeNowOff}>
              {employeeNowOff?.map((data, index) => (
                <EmployeeListCard
                  key={data.MEMBER_SEQ}
                  name={data.EMP_NAME}
                  isManager={data.IS_MANAGER == 0 ? '스태프' : '점장'}
                  image={
                    data.images.length == 0 ? '3.png' : data.images[0].IMAGE
                  }
                  startDay={data.START}
                  data={data}
                  STORE={STORE}
                  STOREDATA={STOREDATA}
                  NUMBER={index + 1}
                  LAST={employeeNowOff.length}
                  onRefresh={onRefresh}
                />
              ))}
            </EmployeeListBox>
          </Section>
        </Container>
      </ScrollView>
    </BackGround>
  );
};
