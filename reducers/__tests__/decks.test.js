import decks from '../decks';
import { receiveDecks, addDeck, addCard, addScore } from '../../actions/decks';

const mockDecks = {
  React: {
    title: 'React',
    timeStamp: 1534284894237,
    recentScore: 35,
    questions: [
      { question: 'What?', answer: 'Who knows' },
      { question: 'Cat?', answer: 'Dog' },
    ],
  },
};

it('should receive decks', () => {
  expect(decks(undefined, receiveDecks(mockDecks))).toEqual(mockDecks);
});

it('should add a new deck', () => {
  const newDeck = {
    NewDeck: {
      title: 'NewDeck',
      timeStamp: 123,
      questions: [],
    },
  };

  const addedDeck = {
    React: {
      title: 'React',
      timeStamp: 1534284894237,
      recentScore: 35,
      questions: [
        { question: 'What?', answer: 'Who knows' },
        { question: 'Cat?', answer: 'Dog' },
      ],
    },
    NewDeck: {
      title: 'NewDeck',
      timeStamp: 123,
      questions: [],
    },
  };

  expect(decks(mockDecks, addDeck(newDeck))).toEqual(addedDeck);
});

it('should add a new card to an exsiting deck', () => {
  const card = {
    question: 'Why?',
    answer: 'Because',
  };

  const addedCard = {
    React: {
      title: 'React',
      timeStamp: 1534284894237,
      recentScore: 35,
      questions: [
        { question: 'What?', answer: 'Who knows' },
        { question: 'Cat?', answer: 'Dog' },
        { question: 'Why?', answer: 'Because' },
      ],
    },
  };

  expect(decks(mockDecks, addCard({ card, deckTitle: mockDecks.React.title }))).toEqual(addedCard);
});

it('should add a new score to a deck', () => {
  const newScore = {
    React: {
      title: 'React',
      timeStamp: 12345,
      recentScore: 50,
      questions: [
        { question: 'What?', answer: 'Who knows' },
        { question: 'Cat?', answer: 'Dog' },
      ],
    },
  };

  expect(decks(mockDecks, addScore('React', 50, 12345))).toEqual(newScore);
});

it('should not modify state by default', () => {
  const action = {
    type: Math.random().toString(),
  };

  expect(decks(mockDecks, action)).toEqual(mockDecks);
});
