import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';
import utils from '../../constants/utils';

const Touchable = styled.TouchableOpacity`
  margin-right: 15px;
  align-items: center;
`;

const Text = styled.Text`
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

export default () => {
  const navigation = useNavigation();
  return (
    <Touchable
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      }}>
      <Icon
        name={utils.isAndroid ? 'md-home-outline' : 'ios-home-outline'}
        size={22}
        color="white"
      />
      <Text>HOME</Text>
    </Touchable>
  );
};
