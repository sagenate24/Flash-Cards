import { formatDeckResults, formatNewDeck, formatProfileResults } from '../data';

const mockData = {
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
  },
  profile: {
    username: 'john doe',
    avatar: 'johnDoeAvatar.img',
    cover: 'johnDoeCover.img',
  },
};

it('should return the decks parsed', () => {
  const mockDecks = formatDeckResults(JSON.stringify(mockData.decks));

  expect(mockDecks).toEqual(mockData.decks);
});

it('should format a new deck', () => {
  const mockDecks = JSON.parse(formatNewDeck('Javascript'));
  const { title, questions } = mockDecks.Javascript;

  expect(title).toEqual('Javascript');
  expect(questions).toEqual([]);
});

it('should set a dummy profile', () => {
  const mockProfile = formatProfileResults(null);

  expect(mockProfile).toEqual({ username: '', avatar: '', cover: '' });
});

it('should return the profile parsed', () => {
  const mockProfile = formatProfileResults(JSON.stringify(mockData.profile));

  expect(mockProfile).toEqual(mockData.profile);
});
