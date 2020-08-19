import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useRoute, useNavigation} from '@react-navigation/native';
import utils from '../../constants/utils';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
  padding: 5px;
`;

const Text = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const STOREDATA = route?.params.STOREDATA;
  const STORE = route?.params.STORE;
  const handler = route?.params.handler;
  if (STOREDATA !== undefined) {
    if (STORE == '1' || STOREDATA.CalendarEdit == '1' || undefined) {
      return (
        <Touchable
          onPress={() => {
            navigation.navigate('CalendarAdd', {
              STOREDATA,
              handler,
            });
          }}>
          <Icon
            name={
              utils.isAndroid ? 'md-calendar-outline' : 'ios-calendar-outline'
            }
            size={20}
            color="white"
          />
          <Text>일정추가</Text>
        </Touchable>
      );
    }
  }
};
