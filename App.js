/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Appnavigation from './src/Appnavigation';
import { Provider } from 'react-redux';
import { store, persistor } from './src/Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  console.disableYellowBox = true
  return (
    <Fragment>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="dark-content" backgroundColor="black" />
          <SafeAreaView style={{ flex: 1 }}>
            <Appnavigation />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </Fragment>
  );
};

export default App;
