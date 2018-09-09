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
    console.log(error.message);
  }
};

export const getDeck = async (deckTitle) => {
  try {
    const decks = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));

    return decks[deckTitle];
  } catch (error) {
    console.log(error.message);
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
    console.log('EERRRROORR OH MY GURD', error.message);
  }
};

export const addDeckTitle = async (title) => {
  try {
    await AsyncStorage.mergeItem(STORAGE_KEY, formatNewDeck(title));
  } catch (error) {
    console.log(error.message);
  }
};

export const removeDeck = async (key) => {
  try {
    const data = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    data[key] = undefined;
    delete data[key];

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
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
    console.log(error.message);
  }
};

// profile APIs.
export const getProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(PROFILE_KEY)
      .then(results => formatProfileResults(results));

    return profile;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProfile = async () => {
  try {
    const profile = await AsyncStorage.getItem(PROFILE_KEY)
      .then(() => formatProfileResults(null));

    return profile;
  } catch (error) {
    console.log(error.message);
  }
};

export const addProfileImg = async (image) => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      avatar: image,
    }));
  } catch (error) {
    console.log(error.message);
  }
};

export const addProfileCover = async (image) => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      cover: image,
    }));
  } catch (error) {
    console.log(error.message);
  }
};

export const addProfileName = async (username) => {
  try {
    await AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      username,
    }));
  } catch (error) {
    console.log(error.message);
  }
};
