import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import { View, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator, HeaderBackButton } from 'react-navigation';
import { white, spaceCadet, queenBlue } from './utils/colors';
import { Constants } from 'expo';

import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import Results from './components/Results';
import Profile from './components/Profile';
import Settings from './components/Settings';
import ProfilePic from './components/ProfilePic';
import OnLoad from './components/OnLoad';


// TODO: style stack and tab api https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
// TODO: Put Stack navigator inside tab navigator!!!

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    animationEnabled: true,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons size={35} name='ios-home' color={tintColor} />
    }
  },
  Profile: {
    screen: Profile,
    title: 'PROFILE',
    animationEnabled: true,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<ProfilePic tintColor={tintColor} />),
    },
  },
  Settings: {
    screen: Settings,
    animationEnabled: true,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-settings' size={40} color={tintColor} />
    },
  },
}, {
    backBehavior: 'none',
    animationEnabled: true,
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
    }
  });

const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
    animationEnabled: true,
    mode: 'card',
    headerBackImage: null,
    navigationOptions: ({ navigation }) => {
      const Titles = ['HOME', 'PROFILE', 'SETTINGS'];

      return {
        headerTintColor: white,
        title: Titles[navigation.state.index],
        headerStyle: {
          backgroundColor: queenBlue,
        },
      }
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => {
      console.log(navigation)
      return {
        headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Home') }} />),
        title: 'SET',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: queenBlue,
        }
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Deck') }} />),
        title: 'NEW CARD',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: queenBlue,
        }
      }
    }
  },
  NewDeck: {
    screen: NewDeck,
    mode: 'modal',
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Home') }} />),
        title: 'NEW DECK',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: queenBlue,
        }
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Deck') }} />),
        title: 'QUIZ',
        headerTintColor: white,
        headerStyle: {
          backgroundColor: queenBlue,
        }
      }
    }
  },
  Results: {
    screen: Results,
    mode: 'modal',
    navigationOptions: () => ({
      title: 'RESULTS',
      header: null
    })
  },
  OnLoad: {
    screen: OnLoad,
    mode: 'modal',
    navigationOptions: () => ({
      header: null
    })
  },
}, {
    initialRouteName: 'Home',
    mode: 'card',
    headerMode: 'float',
    headerTransitionPreset: 'uikit',
    headerLayoutPreset: 'center'
  });

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <CardsStatusBar backgroundColor={queenBlue} barStyle='light-content' />
          <Stack />
        </View>
      </Provider>
    );
  };
};

export default App;
