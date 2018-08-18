import { ImageEditor } from 'react-native';
import { getDecks, getProfile } from './api';
import { editCover, editAvatar } from '../actions/profile';

import { addProfileCover, addProfileImg } from './api';
import { ImagePicker, Permissions } from 'expo';

export const getInitialData = () => {
  return Promise.all([
    getDecks(),
    getProfile(),
  ]).then(([decks, profile]) => ({
    decks,
    profile
  }));
}

export function timeToString(timestamp) {
  const date = new Date(timestamp)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

  return todayUTC.toDateString().substring(4);
}
