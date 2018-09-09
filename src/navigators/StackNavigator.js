import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator, HeaderBackButton } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import { white, queenBlue } from '../utils/colors';

import { Tabs } from './TabNavigator';
import Deck from '../components/Deck';
import NewCard from '../components/NewCard';
import NewDeck from '../components/NewDeck';
import Quiz from '../components/Quiz';
import Results from '../components/Results';

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
      };
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Home'); }} />),
      title: 'SET',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: queenBlue,
      },
    }),
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Deck'); }} />),
      title: 'NEW CARD',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: queenBlue,
      },
    }),
  },
  NewDeck: {
    screen: NewDeck,
    mode: 'modal',
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Home'); }} />),
      title: 'NEW DECK',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: queenBlue,
      },
    }),
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (<HeaderBackButton tintColor={white} onPress={() => { navigation.navigate('Deck'); }} />),
      title: 'QUIZ',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: queenBlue,
      },
    }),
  },
  Results: {
    screen: Results,
    navigationOptions: ({ navigation }) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => { navigation.navigate('DeckList'); }}>
          <Feather name='x' style={{ color: '#595959', marginLeft: 8, marginTop: -2 }} size={22} />
        </TouchableOpacity>
      ),
      title: 'QUIZ RESULTS',
      headerTintColor: '#595959',
      headerStyle: {
        backgroundColor: white,
        borderBottomWidth: 0,
      },
    }),
  },
}, {
  initialRouteName: 'Home',
  mode: 'card',
  headerMode: 'float',
  headerTransitionPreset: 'fade-in-place',
  headerLayoutPreset: 'center',
});
