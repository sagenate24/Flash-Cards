import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ProfilePic from '../ProfilePic';

const mockProfile = {
  username: '',
  avatar: '',
  cover: '',
}

test('ProfilePic snapshot', () => {
  const snap = renderer.create(
    <ProfilePic.WrappedComponent backUpSize={30} styles={{width: 40, height: 40,}} borderColor='#fff' profile={mockProfile}/>
  ).toJSON();

  expect(snap).toMatchSnapshot();
})

