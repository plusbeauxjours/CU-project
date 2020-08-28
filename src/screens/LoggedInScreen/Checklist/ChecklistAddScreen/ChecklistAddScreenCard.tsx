import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 5px;
`;
const Text = styled.Text``;
const Image = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border-width: 1px;
  border-color: #ccc;
  margin-bottom: 5px;
`;

export default ({name, image}) => {
  return (
    <Container>
      <Image source={{uri: `http://133.186.209.113/uploads/${image}`}} />
      <Text>{name}</Text>
    </Container>
  );
};
