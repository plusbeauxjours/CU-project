import React from 'react';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';
import {HomeIcon} from '../../constants/Icons';

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
      <HomeIcon size={22} color="white" />
      <Text>HOME</Text>
    </Touchable>
  );
};
