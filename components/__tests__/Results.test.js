import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Results from '../Results';

const mockCurrentDeck = {
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
}

test('Results snapShot', () => {
  const snap = renderer.create(
    <Results.WrappedComponent currentDeck={mockCurrentDeck} correctAnswers={1} dispatch={jest.fn()}/>
  ).toJSON();

  expect(snap).toMatchSnapshot();
});

it('should flip card', () => {
  let cardInstance = renderer.create(<Results.WrappedComponent currentDeck={mockCurrentDeck} correctAnswers={1} dispatch={jest.fn()}/>).getInstance();
  const handlePercent = cardInstance.handlePercent();

  expect(handlePercent).toEqual(50);
});