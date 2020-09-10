import React from 'react';
import styled from 'styled-components/native';
import {RefreshControl} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SelectStoreCard from './SelectStoreCard';
import {AddCircleIcon} from '../../../../constants/Icons';

const BackGround = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollView = styled.ScrollView``;
const Container = styled.View`
  padding: 20px;
  flex: 1;
`;

const EmptyListWrapper = styled.View`
  margin-top: ${hp('10%')}px;
  padding: ${hp('5%')}px ${wp('5%')}px;
  width: ${wp('90%')}px;
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

const AddStoreBox = styled.View`
  width: ${wp('100%')}px;
  align-items: center;
  margin-top: 10px;
  background-color: transparent;
`;

const AddStoreButton = styled.TouchableOpacity`
  padding: 15px;
  width: ${wp('100%') - 40}px;
  border-radius: 30px;
  border-width: 2px;
  border-color: #642a8c;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const AddStoreButtonText = styled.Text`
  color: #642a8c;
  font-weight: bold;
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
        <AddStoreBox>
          <AddStoreButton onPress={() => gotoAddStore()}>
            <AddStoreButtonText>점포 등록하기</AddStoreButtonText>
            <AddCircleIcon />
          </AddStoreButton>
        </AddStoreBox>
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
          paddingBottom: 0,
        }}>
        <StoreList />
      </ScrollView>
    </BackGround>
  );
};
