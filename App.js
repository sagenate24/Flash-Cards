import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware/index';
import { View, Platform, StatusBar } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { lightBlue, white, softPurp } from './utils/colors';
import { Constants } from 'expo';

import DeckList from './components/DeckList';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import Results from './components/Results';

function CardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      style: {
        height: 56,
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
    navigationOptions: {
      header: null
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: () => ({
      headerTintColor: white,
      title: 'SET',
      headerStyle: {
        backgroundColor: '#1b1b7e',
      }
    })
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: () => ({
      tabBarLabel: 'NewCard',
      headerTintColor: white,
      title: 'NEW CARD',
      headerStyle: {
        backgroundColor: '#1b1b7e',
      }
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: () => ({
      headerTintColor: white,
      title: 'QUIZ',
      headerStyle: {
        backgroundColor: '#1b1b7e',
      }
    })
  },
  Results: {
    screen: Results,
    mode: 'modal',
    navigationOptions: () => ({
      header: null
    })
  },
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1 }}>
          <CardsStatusBar backgroundColor={'#1b1b7e'} barStyle='light-content' />
          <Stack />
        </View>
      </Provider>
    );
  }
}
