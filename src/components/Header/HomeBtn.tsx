import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import styled from 'styled-components/native';

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
  const route = useRoute();
  console.log('route on HomeBtn', route);
  // type은 redux로
  // if (type !== '합류전') {
  return (
    <Touchable
      onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        });
      }}>
      <Icon name="home" size={22} color="white" />
      <Text>HOME</Text>
    </Touchable>
  );
  // } else {
  //   return null;
  // }
};