import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Text = styled.Text`
  font-weight: 200px;
  color: white;
  font-size: 16px;
`;

export default () => (
  <Container style={{flexDirection: 'row', alignItems: 'center'}}>
    <Text>점주</Text>
    <Icon name="arrows-h" size={16} color="white" />
    <Text>직원</Text>
  </Container>
);
