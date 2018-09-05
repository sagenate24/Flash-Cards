import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import ProfilePic from '../ProfilePic';

const mockProfile = {
  username: '',
  avatar: '',
  cover: '',
};

it('should match Snapshot', (done) => {
  const snap = renderer.create(
    <ProfilePic.WrappedComponent backUpSize={30} styles={{ width: 40, height: 40 }} borderColor='#fff' profile={mockProfile} />,
  ).toJSON();

  expect(snap).toMatchSnapshot();

  done();
});
