import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ForwardIcon} from '../../../../constants/Icons';
import {Avatar} from 'react-native-elements';

const Touchable = styled.TouchableOpacity`
  padding: 0 20px;
  height: ${hp('10%')}px;
  width: 100%;
  background-color: white;
  flex-direction: row;
  align-items: center;
`;

const ContentBox = styled.View`
  flex: 1;
  justify-content: center;
`;
const NameBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: ${hp('0.5%')}px;
`;
const NameText = styled.Text`
  font-size: 15px;
  margin-right: ${wp('2%')};
`;
const PositionText = styled.Text`
  font-size: 13px;
`;
const WorkFromText = styled(PositionText)`
  color: grey;
`;
const DateText = styled.Text`
  color: gray;
  font-size: 12px;
`;
export default ({
  key,
  name,
  isManager,
  image,
  startDay,
  data,
  STORE,
  STOREDATA,
  NUMBER,
  LAST,
  onRefresh,
}) => {
  const navigation = useNavigation();
  return (
    <Touchable
      key={key}
      activeOpacity={1}
      onPress={() => {
        navigation.navigate('EmployeeInfoScreen', {
          data: data,
          STORE: STORE,
          STORE_SEQ: STOREDATA.resultdata.STORE_SEQ,
          CALCULATE_DAY: STOREDATA.resultdata.CALCULATE_DAY,
          onRefresh,
        });
      }}>
      <Avatar
        rounded
        size={60}
        source={{
          uri: `http://133.186.209.113/uploads/${image}`,
        }}
        containerStyle={{borderWidth: 1, borderColor: '#ccc', marginRight: 10}}
      />
      <ContentBox>
        <NameBox>
          <NameText>{name}</NameText>
          <PositionText>[{isManager}]</PositionText>
        </NameBox>
        <WorkFromText>근무기간</WorkFromText>
        <DateText>
          {startDay} ~ {data.END != null ? data.END : '계속'}
        </DateText>
      </ContentBox>
      <ForwardIcon />
    </Touchable>
  );
};
