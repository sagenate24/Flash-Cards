import { AsyncStorage } from 'react-native';
import { formatDeckResults, STORAGE_KEY } from './_data';

export const getDecks = async () => {
  try {
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
      .then((results) => formatDeckResults(results))
    return decks;
  } catch (error) {
    console.log(error.message);
  }
}

export const getDeck = async (deckID) => {
  try {
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
      .then((results) => formatDeckResults(results))
    return JSON.parse(decks[deckID]);
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
