import React from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import RootContainer from './src/components/RootContainer';
import store, {persistor} from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootContainer />
      </PersistGate>
    </Provider>
  );
}
