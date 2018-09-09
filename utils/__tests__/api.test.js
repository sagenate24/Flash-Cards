import { AsyncStorage } from 'react-native';
import { formatDeckResults, formatProfileResults } from '../data';

const mockStorage = {
  decks: {
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
  profile: {
    username: 'john doe',
    avatar: 'johnDoeAvatar.img',
    cover: 'johnDoeCover.img',
  },
};

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
  },
}));

it('should get decks', async () => {
  const decks = formatDeckResults(await AsyncStorage.getItem('decks'));

  expect(decks).toEqual(mockStorage.decks);
});

it('should get a specific deck', async () => {
  const decks = JSON.parse(await AsyncStorage.getItem('decks'));
  const deck = decks[decks.React.title];

  expect(deck).toEqual(mockStorage.decks.React);
});

it('should remove a deck', async () => {
  const decks = JSON.parse(await AsyncStorage.getItem('decks'));
  decks.React = undefined;
  delete decks.React;

  await AsyncStorage.setItem('decks', JSON.stringify(decks));

  expect(decks).toEqual({ JavaScript: mockStorage.decks.JavaScript });
});

it('should get the profile', async () => {
  const profile = formatProfileResults(await AsyncStorage.getItem('profile'));

  expect(profile).toEqual(mockStorage.profile);
});

it('should delete the profile', async () => {
  const profile = formatProfileResults(null);

  expect(profile).toEqual({ username: '', avatar: '', cover: '' });
});
