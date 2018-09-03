import { AsyncStorage } from 'react-native';
import {
  formatDeckResults,
  formatNewDeck,
  STORAGE_KEY,
  PROFILE_KEY,
  formatProfileResults,
  formatNewProfile,
} from './_data';

// Deck APIs.
export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
      .then(results => formatDeckResults(results));

    return decks;
  } catch (error) {
    console.log(error.message);
  }
};

export const getDeck = async (deckTitle) => {
  try {
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
      .then(results => JSON.parse(results));

    return decks[deckTitle];
  } catch (error) {
    console.log(error.message);
  }
};

export function addCardToDeck(card, deckTitle) {
  AsyncStorage.getItem(STORAGE_KEY, (err, data) => {
    const newData = JSON.parse(data);

    const questionsArr = newData[deckTitle].questions;
    questionsArr.push(card);

    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckTitle]: {
        questions: questionsArr,
      },
    }), () => {
      AsyncStorage.getItem(STORAGE_KEY).then(results => console.log(JSON.parse(results)));
    });
  });
}

export const addDeckTitle = async (title) => {
  try {
    const newDeck = await AsyncStorage.mergeItem(STORAGE_KEY, formatNewDeck(title), () => {
      AsyncStorage.getItem(STORAGE_KEY);
    });

    return JSON.parse(newDeck);
  } catch (error) {
    console.log(error.message);
  }
};

export function removeDeck(key) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results);
      data[key] = undefined;
      delete data[key];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data)), () => {
        AsyncStorage.getItem(PROFILE_KEY).then(results => console.log(JSON.parse(results)));
      };
    });
}

export function recentActivityScore(deckTitle, score, timeStamp) {
  AsyncStorage.getItem(STORAGE_KEY, () => {
    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckTitle]: {
        recentScore: score,
        timeStamp,
      },
    }), () => {
      AsyncStorage.getItem(STORAGE_KEY).then(results => console.log(JSON.parse(results)));
    });
  });
}

// Profile APIs.
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
      .then(() => formatNewProfile());

    return profile;
  } catch (error) {
    console.log(error.message);
  }
};

export function addProfileImg(image) {
  AsyncStorage.getItem(PROFILE_KEY, () => {
    AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      avatar: image,
    }), () => {
      AsyncStorage.getItem(PROFILE_KEY).then(results => console.log(JSON.parse(results)));
    });
  });
}

export function addProfileCover(image) {
  AsyncStorage.getItem(PROFILE_KEY, () => {
    AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      cover: image,
    }), () => {
      AsyncStorage.getItem(PROFILE_KEY).then(results => console.log(JSON.parse(results)));
    });
  });
}

export function addProfileName(username) {
  AsyncStorage.getItem(PROFILE_KEY, () => {
    AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      username,
    }), () => {
      AsyncStorage.getItem(PROFILE_KEY).then(results => console.log(JSON.parse(results)));
    });
  });
}
