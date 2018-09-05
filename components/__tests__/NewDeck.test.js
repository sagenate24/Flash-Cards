import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { addDeckTitle, getDeck } from '../../utils/api';
import { addDeck } from '../../actions/decks';

import NewDeck from '../NewDeck';

jest.mock('../../utils/api');

it('should match Snapshot', (done) => {
  const snap = renderer.create(
    <NewDeck.WrappedComponent />,
  ).toJSON();

  expect(snap).toMatchSnapshot();

  done();
});

// it('Should submit a new deck', (done) => {
//   const mockDispatch = jest.fn();
//   const mockNavigation = {
//     navigate: jest.fn(),
//   };

//   const wrapper = shallow(<NewDeck.WrappedComponent dispatch={mockDispatch} navigation={mockNavigation} />).instance();
//   wrapper.setState({ title: 'React', underColorT: false });

//   wrapper.submit();

//   expect(addDeckTitle).toHaveBeenCalledTimes(1);

//   done();
// });
