import React, {useEffect} from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import NavController from './src/components/NavController';
import store, {persistor} from './src/redux/store';

export default function App() {
  useEffect(() => {}, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavController />
      </PersistGate>
    </Provider>
  );
}
