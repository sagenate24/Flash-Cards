import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import Profile from '../Profile';

const mockDecks = [
  {
    title: 'React',
    timeStamp: 1534284894237,
    recentScore: 35,
    questions: [
      {
        question: 'What is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is ReactWhat is React?',
        answer: 'A library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfacesA library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  {
    title: 'JavaScript',
    timeStamp: 1534284869329,
    recentScore: 100,
    questions: [
      {
        question: 'What is a closure?The combination of a function and the lexical enviornment with in which that function was declaredThe combination of a functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona functiona function',
        answer: 'The combination of a function and the lexical enviornment with in which that function was declared.The combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declaredThe combination of a function and the lexical enviornment with in which that function was declared',
      },
    ],
  },
];

const mockProfile = {
  username: '',
  avatar: '',
  cover: '',
};

it('should match Snapshot', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const snap = shallow(<Profile.WrappedComponent decks={mockDecks} profile={mockProfile} navigation={mockNavigation} />);

  expect(snap).toMatchSnapshot();
});
