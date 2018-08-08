import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { white, richRed, lightBlue, softPurp, grey } from './colors';
import { Notifications, Permissions } from 'expo';

export function timeToString(time = Date.now()) {
  const date = new Date(time);
  const todayDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return todayDate.toISOString().split('T')[0];
}

export function getDeckMetaInfo(deck) {
  const info = {
    React: {
      title: 'React',
      timeStamp: '2018-02-04',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      timeStamp: '2018-02-08',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical enviornment with in which that function was declared.'
        }
      ]
    }
  }

  return typeof deck === 'undefined'
    ? info
    : info[deck]
}