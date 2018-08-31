import React from 'react';
import { createStore } from 'redux';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import { View, StatusBar } from 'react-native';
import reducer from './reducers';
import middleware from './middleware';
import { queenBlue } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

import { Stack } from './navigators/StackNavigator';

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <CardsStatusBar backgroundColor={queenBlue} barStyle="light-content" />
          <Stack />
        </View>
      </Provider>
    );
  }
}

export default App;
