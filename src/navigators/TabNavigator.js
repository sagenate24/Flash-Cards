import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { queenBlue, white } from '../utils/colors';

import DeckList from '../components/DeckList';
import Profile from '../components/Profile';
import Settings from '../components/Settings';
import ProfilePic from '../components/ProfilePic';

export const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    animationEnabled: true,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons size={35} name="ios-home" color={tintColor} />,
    },
  },
  Profile: {
    screen: Profile,
    title: 'PROFILE',
    animationEnabled: true,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <ProfilePic
          borderColor={tintColor}
          backUpSize={35}
          styles={{
            borderRadius: 20, width: 40, height: 40, borderWidth: 2,
          }}
        />
      ),
    },
  },
  Settings: {
    screen: Settings,
    animationEnabled: true,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons size={35} name="ios-settings" color={tintColor} />,
    },
  },
}, {
  tabBarOptions: {
    showLabel: false,
    activeTintColor: queenBlue,
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
    },
  },
});
