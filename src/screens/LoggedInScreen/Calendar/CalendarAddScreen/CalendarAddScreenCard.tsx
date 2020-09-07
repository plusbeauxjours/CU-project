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

export default ({name, image}) => {
  return (
    <Container>
      <Avatar
        rounded
        size={60}
        source={{
          uri: `http://133.186.209.113/uploads/${image}`,
        }}
        containerStyle={{borderWidth: 1, borderColor: '#ccc', marginBottom: 5}}
      />
      <Text>{name}</Text>
    </Container>
  );
};
