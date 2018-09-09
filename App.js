import React from 'react';
import { createStore } from 'redux';
import { Constants, AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { View, StatusBar, Platform } from 'react-native';
import reducer from './reducers';
import middleware from './middleware';
import { queenBlue } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

import { Stack } from './navigators/StackNavigator';

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Platform.OS === 'ios' ? Constants.statusBarHeight : 0 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

class App extends React.Component {
  state = {
    isLoading: true,
  }

  componentDidMount() {
    setLocalNotification();
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <AppLoading />
        </View>
      );
    }
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
