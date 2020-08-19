import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userLogout} from '../../redux/userSlice';
import utils from '../../constants/utils';

const Touchable = styled.TouchableOpacity`
  margin-right: 10px;
  align-items: center;
`;

const Text = styled.Text`
  margin-top: 2px;
  font-size: 11px;
  color: white;
  font-weight: bold;
`;

export default () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        console.log('logout');
        dispatch(userLogout());
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'LoggedOutNavigation',
              state: {routes: [{name: 'StartScreen'}]},
            },
          ],
        });
      }}>
      <Icon
        name={utils.isAndroid ? 'md-log-out-sharp' : 'ios-log-out-sharp'}
        size={20}
        color="white"
      />
      <Text>로그아웃</Text>
    </Touchable>
  );
};
