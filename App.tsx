import React, {useEffect} from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import NavController from './src/components/NavController';
import store, {persistor} from './src/redux/store';

import styled from 'styled-components/native';

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: red;
`;

const Text = styled.Text`
  color: red;
  font-size: 40px;
`;

export default function App() {
  // useEffect(() => {}, []);
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
    //     <NavController />
    //   </PersistGate>
    // </Provider>
    <View>
      <Text>StartScreen</Text>
    </View>
  );
}
