import React from 'react';
import styled from 'styled-components/native';
import {Avatar} from 'react-native-elements';

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
`;

export default ({name, image}) => {
  return (
    <Container>
      <Avatar
        rounded
        size={50}
        source={{
          uri: `http://133.186.209.113/uploads/${image}`,
        }}
        containerStyle={{marginBottom: 5}}
      />
      <Text>{name}</Text>
    </Container>
  );
};
