import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';

import ProfilePic from '../ProfilePic';

const mockProfile = {
  username: '',
  avatar: '',
  cover: '',
};

it('should match Snapshot', (done) => {
  const snap = shallow(<ProfilePic.WrappedComponent backUpSize={30} styles={{ width: 40, height: 40 }} borderColor='#fff' profile={mockProfile} />);

  expect(snap).toMatchSnapshot();

  done();
});
