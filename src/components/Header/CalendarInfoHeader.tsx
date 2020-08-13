import React from 'react';
import styled from 'styled-components/native';
import HomeBtn from './HomeBtn';
import AddButtonClendarInfo from './AddClendarInfoBtn';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default () => (
  <Container>
    <AddButtonClendarInfo />
    <HomeBtn />
  </Container>
);
