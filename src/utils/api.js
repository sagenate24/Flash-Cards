import { AsyncStorage } from 'react-native';
import {
  formatDeckResults,
  formatNewDeck,
  STORAGE_KEY,
  PROFILE_KEY,
  formatProfileResults,
} from './data';

// deck APIs.
export const getDecks = async () => {
  try {
    const decks = formatDeckResults(await AsyncStorage.getItem(STORAGE_KEY));

    return decks;
  } catch (error) {
    return error;
  }
};

export const getDeck = async (deckTitle) => {
  try {
    const decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));

    return decks[deckTitle];
  } catch (error) {
    return error;
  }
};

export const addCardToDeck = async (card, deckTitle) => {
  try {
    const data = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    const questionsArr = data[deckTitle].questions;
    questionsArr.push(card);

    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckTitle]: {
        questions: questionsArr,
      },
    }));
  } catch (error) {
    return error;
  }
};

export const addDeckTitle = async (title) => {
  try {
    await AsyncStorage.mergeItem(STORAGE_KEY, formatNewDeck(title));
  } catch (error) {
    return error;
  }
};

export const removeDeck = async (key) => {
  try {
    const data = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    data[key] = undefined;
    delete data[key];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    return error;
  }
};

export const recentActivityScore = async (deckTitle, score, timeStamp) => {
  try {
    await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckTitle]: {
        recentScore: score,
        timeStamp,
      },
    }));
  } catch (error) {
    return error;
  }
};

// profile APIs.
export const getProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(PROFILE_KEY)
      .then(results => formatProfileResults(results));

    return profile;
  } catch (error) {
    return error;
  }
};

export const deleteProfile = async () => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      avatar: '',
      username: '',
      cover: '',
    }));

    const profile = await AsyncStorage.getItem(PROFILE_KEY)
      .then(results => formatProfileResults(results));

    return profile;
  } catch (error) {
    return error;
  }
};

export const addProfileImg = async (image) => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      avatar: image,
    }));
  } catch (error) {
    return error;
  }
};

export const addProfileCover = async (image) => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      cover: image,
    }));
  } catch (error) {
    return error;
  }
};

export const addProfileName = async (username) => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      username,
    }));
  } catch (error) {
    return error;
  }
};

export const editParentalControl = async (status) => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      parentControl: status,
    }));
  } catch (error) {
    return error;
  }
};
