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

    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
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
    const newDeck = await AsyncStorage.mergeItem(STORAGE_KEY, formatNewDeck(title), () => {
      AsyncStorage.getItem(STORAGE_KEY);
    });

    return JSON.parse(newDeck);
  } catch (error) {
    console.log(error.message);
  }
};

export const removeDeck = async (key) => {
  try {
    const data = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    data[key] = undefined;
    delete data[key];

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
};

export const recentActivityScore = async (deckTitle, score, timeStamp) => {
  try {
    // const data = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckTitle]: {
        recentScore: score,
        timeStamp,
      },
    }));
  } catch (error) {
    console.log(error.message);
  }
}
//   AsyncStorage.getItem(STORAGE_KEY, () => {
//     AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
//       [deckTitle]: {
//         recentScore: score,
//         timeStamp,
//       },
//     }), () => {
//       AsyncStorage.getItem(STORAGE_KEY).then(results => console.log(JSON.parse(results)));
//     });
//   });
// }

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

export const addProfileImg = async (image) => {
  try {
    AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
      avatar: image,
    }));
  } catch (error) {
    console.log(error.message);
  }
  // AsyncStorage.getItem(PROFILE_KEY, () => {
  //   AsyncStorage.mergeItem(PROFILE_KEY, JSON.stringify({
  //     avatar: image,
  //   }), () => {
  //     AsyncStorage.getItem(PROFILE_KEY).then(results => console.log(JSON.parse(results)));
  //   });
  // });
};

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
