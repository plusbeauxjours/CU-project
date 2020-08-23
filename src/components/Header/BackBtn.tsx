import React from 'react';
import styled from 'styled-components/native';
import {BackIcon} from '../../constants/Icons';

const Container = styled.View`
  padding-left: 20px;
`;

const BackBtn: React.FC = () => (
  <Container>
    <BackIcon size={28} color={'white'} />
  </Container>
);

export default BackBtn;
