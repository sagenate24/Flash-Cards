import { AsyncStorage } from 'react-native';
import { formatDeckResults, formatProfileResults, formatNewDeck } from '../data';
import { getDecks, getDeck, addCardToDeck } from '../api';

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn((key) => {
      return new Promise((resolve) => {
        resolve(JSON.stringify(mockStorage[key]));
      });
    }),
    setItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
    mergeItem: jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null);
      });
    }),
  },
}));

const mockStorage = {
  'FlashCards:decks': {
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
  },
  'FlashCards:profile': {
    username: 'john doe',
    avatar: 'johnDoeAvatar.img',
    cover: 'johnDoeCover.img',
  },
};

it('should get decks', async () => {
  const decks = await getDecks();
  expect(decks).toEqual(mockStorage['FlashCards:decks']);
});

it('should get a specific deck', async () => {
  const deck = await getDeck('React');
  expect(deck).toEqual(mockStorage['FlashCards:decks'].React);
});

// export const addCardToDeck = async (card, deckTitle) => {
//   try {
//     const data = JSON.parse(await AsyncStorage.getItem(STORAGE_KEY));
//     const questionsArr = data[deckTitle].questions;
//     questionsArr.push(card);

//     await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
//       [deckTitle]: {
//         questions: questionsArr,
//       },
//     }));
//   } catch (error) {
//     console.log('EERRRROORR OH MY GURD', error.message);
//   }
// };

it('should add card to a deck', async () => {
  const mockCard = {
    questions: 'a',
    answer: 'b',
  };

  const deck = await addCardToDeck(mockCard, 'React');
  expect(deck).toEqual(mockStorage['FlashCards:decks'].React);
});

// it('should remove a deck', async () => {
//   const decks = JSON.parse(await AsyncStorage.getItem('decks'));
//   decks.React = undefined;
//   delete decks.React;

//   await AsyncStorage.setItem('decks', JSON.stringify(decks));

//   expect(decks).toEqual({ JavaScript: mockStorage.decks.JavaScript });
// });

// it('should get the profile', async () => {
//   const profile = formatProfileResults(await AsyncStorage.getItem('profile'));

//   expect(profile).toEqual(mockStorage.profile);
// });

// it('should delete the profile', async () => {
//   const profile = formatProfileResults(null);

//   expect(profile).toEqual({ username: '', avatar: '', cover: '' });
// });
