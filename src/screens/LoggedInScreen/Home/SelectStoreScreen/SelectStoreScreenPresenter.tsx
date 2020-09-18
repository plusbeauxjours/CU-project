import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Ripple from 'react-native-material-ripple';

import SelectStoreCard from './SelectStoreCard';
import {AddCircleIcon} from '~/constants/Icons';

const BackGround = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;

const EmptyListWrapper = styled.View`
  margin-top: 100px;
  padding: ${hp('5%')}px ${wp('5%')}px;
  width: ${wp('100%') - 40}px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ddd;
  border-radius: 10px;
`;

const EmptyListText = styled.Text`
  color: #999;
`;

const EmptyListTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const AddStoreButtonText = styled.Text`
  color: #642a8c;
  font-weight: bold;
`;

const AddStoreButton = styled(Ripple)`
  margin-top: 35px;
  width: ${wp('100%') - 40}px;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 30px;
  background-color: transparent;
  border-width: 2px;
  border-color: #642a8c;
  align-self: center;
`;

const WhiteSpace = styled.View`
  height: 30px;
`;
export default ({
  STORE,
  STORELIST_DATA,
  refreshing,
  onRefresh,
  gotoAddStore,
  gotoHomeScreen,
}) => {
  const StoreList = () => {
    if (STORELIST_DATA && STORELIST_DATA.length !== 0) {
      return STORELIST_DATA?.map((data, index) => (
        <SelectStoreCard
          key={index}
          data={data}
          name={data.NAME}
          address1={data.ADDR1}
          address2={data.ADDR2}
          employee={data.emplist}
          STORE={STORE}
          TYPE={data.TYPE}
          MANAGER={data.IS_MANAGER == 1 ? '[점장]' : '[스태프]'}
          workinglist={data.workinglist}
          gotoHomeScreen={gotoHomeScreen}
        />
      ));
    } else {
      if (STORE == '1') {
        return (
          <EmptyListWrapper>
            <EmptyListText>점포를 등록하시면 입력하신 주소로</EmptyListText>
            <EmptyListText>
              출퇴근이 가능한 QR키트를 송부해 드립니다.
            </EmptyListText>
            <EmptyListText>(영업일 기준 2~3일 소요)</EmptyListText>
          </EmptyListWrapper>
        );
      } else {
        return (
          <EmptyListWrapper>
            <EmptyListTitle>합류된 점포가 없습니다!</EmptyListTitle>
            <EmptyListText>점주님에게 직원초대를 요청하세요</EmptyListText>
            <EmptyListText>
              그 후 로그인하여 생성된 매장을 확인하게 되면
            </EmptyListText>
            <EmptyListText>
              점주님이 직원합류를 완료할 수 있습니다.
            </EmptyListText>
          </EmptyListWrapper>
        );
      }
    }
  };
  return (
    <BackGround>
      {STORE == '1' && (
        <AddStoreButton
          onPress={() => gotoAddStore()}
          rippleColor={'#642a8c'}
          rippleDuration={600}
          rippleSize={1200}
          rippleContainerBorderRadius={30}
          rippleOpacity={0.1}>
          <AddStoreButtonText>점포 등록하기</AddStoreButtonText>
          <AddCircleIcon />
        </AddStoreButton>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        conte
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <StoreList />
        <WhiteSpace />
      </ScrollView>
    </BackGround>
  );
};
