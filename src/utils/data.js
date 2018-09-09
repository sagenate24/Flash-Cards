import { AsyncStorage } from 'react-native';

export const STORAGE_KEY = 'FlashCards:decks';
export const PROFILE_KEY = 'FlashCards:profile';

function getDecks(deck) {
  const info = {
    React: {
      title: 'React',
      timeStamp: 1534284894237,
      recentScore: 35,
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event',
        },
      ],
    },
    JavaScript: {
      title: 'JavaScript',
      timeStamp: 1534284869329,
      recentScore: 100,
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical enviornment with in which that function was declared.',
        },
      ],
    },
  };

  return typeof deck === 'undefined'
    ? info
    : info[deck];
}

function getProfile(profile) {
  const info = {
    profile: {
      username: '',
      avatar: '',
      cover: '',
    },
  };

  return typeof profile === 'undefined'
    ? info
    : info[profile];
}

function setDummyData() {
  const {
    React,
    JavaScript,
  } = getDecks();
  let dummyData = {};

  dummyData = {
    React,
    JavaScript,
  };

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));

  return dummyData;
}

export function formatDeckResults(results) {
  return results === null
    ? setDummyData()
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
