import { AsyncStorage } from 'react-native';
import {
  getDecks,
  getDeck,
  addCardToDeck,
  addDeckTitle,
  removeDeck,
  recentActivityScore,
  getProfile,
  deleteProfile,
  addProfileImg,
  addProfileCover,
  addProfileName,
} from '../api';

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn(key => new Promise((resolve) => {
      resolve(JSON.stringify(mockStorage[key]));
    })),
    setItem: jest.fn(() => new Promise((resolve) => {
      resolve(null);
    })),
    mergeItem: jest.fn(() => new Promise((resolve) => {
      resolve(null);
    })),
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

let ogDateNow;

beforeEach(() => {
  ogDateNow = Date.now;
  Date.now = jest.fn(() => 1244333);
});

afterEach(() => {
  jest.clearAllMocks();
  Date.now = ogDateNow;
});

it('should get decks', async () => {
  const decks = await getDecks();
  expect(decks).toEqual(mockStorage['FlashCards:decks']);
});

it('should get a specific deck', async () => {
  const deck = await getDeck('React');
  expect(deck).toEqual(mockStorage['FlashCards:decks'].React);
});

it('should add card to a deck', async () => {
  const mockCard = {
    question: 'a',
    answer: 'b',
  };
  const mockQuestionsArr = [
    {
      question: 'What is React?',
      answer: 'A library for managing user interfaces',
    },
    {
      question: 'Where do you make Ajax requests in React?',
      answer: 'The componentDidMount lifecycle event',
    },
    {
      question: 'a',
      answer: 'b',
    },
  ];

  await addCardToDeck(mockCard, 'React');

  expect(AsyncStorage.getItem).toHaveBeenCalledWith('FlashCards:decks');
  expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.mergeItem).toHaveBeenCalledWith('FlashCards:decks', JSON.stringify({
    React: {
      questions: mockQuestionsArr,
    },
  }));
  expect(AsyncStorage.mergeItem).toHaveBeenCalledTimes(1);
});

it('should add a new deck', async () => {
  await addDeckTitle('HullaBullo');
  const timestamp = Date.now();

  expect(AsyncStorage.mergeItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.mergeItem).toHaveBeenCalledWith('FlashCards:decks', JSON.stringify({
    HullaBullo: {
      title: 'HullaBullo',
      timeStamp: timestamp,
      questions: [],
    },
  }));
});

it('should remove a specific deck', async () => {
  await removeDeck('React');

  expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.getItem).toHaveBeenCalledWith('FlashCards:decks');
  expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.setItem).toHaveBeenCalledWith('FlashCards:decks', JSON.stringify({
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
  }));
});

it('should add a recent score to a specific deck', async () => {
  const timestamp = Date.now();

  await recentActivityScore('React', 50, timestamp);

  expect(AsyncStorage.mergeItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.mergeItem).toHaveBeenCalledWith('FlashCards:decks', JSON.stringify({
    React: {
      recentScore: 50,
      timeStamp: timestamp,
    },
  }));
});

it('should get profile', async () => {
  const profile = await getProfile();
  expect(profile).toEqual(mockStorage['FlashCards:profile']);
});

it('should delete profile', async () => {
  const profile = await deleteProfile();

  expect(profile).toEqual({
    username: '',
    avatar: '',
    cover: '',
  });
});

it('should add a profile image', async () => {
  await addProfileImg('newImg.jpg');

  expect(AsyncStorage.mergeItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.mergeItem).toHaveBeenCalledWith('FlashCards:profile', JSON.stringify({
    avatar: 'newImg.jpg',
  }));
});

it('should add a cover image', async () => {
  await addProfileCover('newImg.jpg');

  expect(AsyncStorage.mergeItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.mergeItem).toHaveBeenCalledWith('FlashCards:profile', JSON.stringify({
    cover: 'newImg.jpg',
  }));
});

it('should add a userName', async () => {
  await addProfileName('Mr Coffe');

  expect(AsyncStorage.mergeItem).toHaveBeenCalledTimes(1);
  expect(AsyncStorage.mergeItem).toHaveBeenCalledWith('FlashCards:profile', JSON.stringify({
    username: 'Mr Coffe',
  }));
});
