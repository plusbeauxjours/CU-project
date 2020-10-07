import React, {useEffect} from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {RootSiblingParent} from 'react-native-root-siblings';

import RootContainer from './src/components/RootContainer';
import store, {persistor} from './src/redux/store';
import {NativeModules} from 'react-native';

const SharedStorage = NativeModules.SharedStorage;

export default function App() {
  useEffect(() => {
    SharedStorage.set(JSON.stringify({text: 'Hello World3'}));
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootSiblingParent>
          <RootContainer />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}
