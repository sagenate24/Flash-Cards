import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import DeckList from '../DeckList';

const mockDecks = {
  React: {
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
};

it('should match Snapshot', () => {
  const snap = shallow(<DeckList.WrappedComponent decks={mockDecks} />);

  expect(snap).toMatchSnapshot();
});
