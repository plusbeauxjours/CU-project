import React from 'react';
import {StatusBar} from 'react-native';
import styled from 'styled-components/native';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 20px;
  color: red;
`;

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View>
        <Text>Hello World</Text>
      </View>
    </>
  );
};

export default App;
