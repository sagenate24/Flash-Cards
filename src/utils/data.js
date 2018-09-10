import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'FlashCards:decks';
export const PROFILE_KEY = 'FlashCards:profile';

function getProfile(profile) {
  const info = {
    profile: {
      username: '',
      avatar: '',
      cover: '',
      parentControl: 'off',
    },
  };

  return typeof profile === 'undefined'
    ? info
    : info[profile];
}

function setDummyProfile() {
  const { profile } = getProfile();

  AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

  return profile;
}

export function formatProfileResults(results) {
  return results === null
    ? setDummyProfile()
    : JSON.parse(results);
}

export function formatDeckResults(results) {
  return results === null
    ? null
    : JSON.parse(results);
}

export function formatNewDeck(deckTitle) {
  const timestamp = Date.now();

  return JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      timeStamp: timestamp,
      questions: [],
    },
  });
}
