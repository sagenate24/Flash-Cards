import React from 'react';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import { white, queenBlue } from '../utils/colors';

import { Tabs } from './TabNavigator';
import Deck from '../components/Deck';
import NewCard from '../components/NewCard';
import NewDeck from '../components/NewDeck';
import Quiz from '../components/Quiz';
import Results from '../components/Results';
import OnLoad from '../components/OnLoad';

export const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
    headerBackImage: null,
    navigationOptions: ({ navigation }) => {
      const Titles = ['HOME', 'PROFILE', 'SETTINGS'];
      return {
        headerTintColor: white,
        title: Titles[navigation.state.index],
        headerRightContainerStyle: {
          padding: 5,
        },
        headerStyle: {
          backgroundColor: queenBlue,
        },
      }
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => {
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
