import { AsyncStorage } from 'react-native';
import { formatDeckResults, STORAGE_KEY } from './_data';

export const getDecks = async () => {
  try {
    console.log(AsyncStorage)
    const decks = await AsyncStorage.getItem(STORAGE_KEY)
      .then((results) => formatDeckResults(results))
    return decks;
  } catch (error) {
    console.log(error.message);
  }
}