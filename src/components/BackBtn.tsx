import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from '../constants/utils';

const Container = styled.View`
  padding-left: 20px;
`;

const BackBtn: React.FC = () => (
  <Container>
    <Icon
      name={utils.isAndroid ? 'md-arrow-down' : 'ios-arrow-down'}
      size={28}
      color={'white'}
    />
  </Container>
);

export default BackBtn;
