import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { queenBlue, white, gray, yellow } from '../utils/colors';

import ProfilePic from '../components/ProfilePic';
import DeckList from '../components/DeckList';
import Profile from '../components/Profile';
import Settings from '../components/Settings';

export const AndriodNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: DeckList,
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <ProfilePic
            borderColor={tintColor}
            backUpSize={30}
            styles={{
              borderRadius: 20, width: 35, height: 35, borderWidth: 2, marginBottom: -4,
            }}
          />
        ),
      },
    },
    Settings: {
      screen: Settings,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home';
        } else if (routeName === 'Settings') {
          iconName = 'md-settings';
        }

        return <Ionicons name={iconName} size={35} color={tintColor} />;
      },
    }),
    lazy: true,
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: white,
      inactiveTintColor: gray,
      showIcon: true,
      showLabel: false,
      iconStyle: {
        width: 40,
        height: 40,
      },
      indicatorStyle: {
        backgroundColor: yellow,
        height: 5,
      },
      style: {
        backgroundColor: queenBlue,
      },
    },
  },
);
