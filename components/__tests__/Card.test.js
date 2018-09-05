import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

import Card from '../Card';

// jest.mock('Animated', () => {
//   return {
//     createTimer: jest.fn(),
//     timing: jest.fn(() => {
//       return {
//         start: jest.fn(),
//       };
//     }),
//     Value: jest.fn(() => {
//       return {
//         interpolate: jest.fn(),
//       };
//     }),
//   };
// });

it('should match Snapshot', () => {
  const snap = renderer.create(
    <Card question='why?' answer='because' questionsRemaining={1} />,
  ).toJSON();

  expect(snap).toMatchSnapshot();
});

// it('should animate bounce in componentDidMount', () => {
//   const wrapper = (<Card.wrappedComponent question='how?' answer='because' questionsRemaining={1} />).instance();
//   wrapper.componentDidMount();
// });
