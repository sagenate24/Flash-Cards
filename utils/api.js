import { AsyncStorage } from 'react-native';
import { formatDeckResults, formatNewDeck, STORAGE_KEY } from './_data';

export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
      .then((results) => formatDeckResults(results))

    return decks;
  } catch (error) {
    console.log(error.message);
  }
}

export const getDeck = async (deckTitle) => {
  try {
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
      .then((results) => JSON.parse(results))

      return decks[deckTitle];
  } catch (error) {
    console.log(error.message);
  }


}

export function addCardToDeck(card, deckTitle) {
  AsyncStorage.getItem(STORAGE_KEY, (err, data) => {
    data = JSON.parse(data);

    const questionsArr = data[deckTitle].questions;
    questionsArr.push(card)

    AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
      [deckTitle]: {
        questions: questionsArr
      }
    }), () => {
      AsyncStorage.getItem(STORAGE_KEY).then((results) => console.log(JSON.parse(results)))
    })
  })
}

export const addDeckTitle = async (title) => {
  try {
    const newDeck = await AsyncStorage.mergeItem(STORAGE_KEY, formatNewDeck(title), () => {
      AsyncStorage.getItem(STORAGE_KEY)
        .then((results) => console.log(JSON.parse(results)))
    });

    return JSON.parse(newDeck);
  } catch (error) {
    console.log(error.message);
  }
}
