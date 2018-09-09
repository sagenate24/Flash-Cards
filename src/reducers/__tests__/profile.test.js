import profile from '../profile';
import { receiveProfile, editUsername, editCover, editAvatar } from '../../actions/profile';

const mockProfile = {
  username: 'john Doe',
  avatar: 'johnDoeAvatar.jpg',
  cover: 'johnDoeCover.jpg',
};

it('should receive profile', () => {
  expect(profile(undefined, receiveProfile(mockProfile))).toEqual(mockProfile);
});

it('should edit the username', () => {
  const editedUsername = {
    username: 'Bill',
    avatar: 'johnDoeAvatar.jpg',
    cover: 'johnDoeCover.jpg',
  };

  expect(profile(mockProfile, editUsername('Bill'))).toEqual(editedUsername);
});

it('should edit the cover image', () => {
  const editedCover = {
    username: 'john Doe',
    avatar: 'johnDoeAvatar.jpg',
    cover: 'BillJenkins.jpg',
  };

  expect(profile(mockProfile, editCover('BillJenkins.jpg'))).toEqual(editedCover);
});

it('should edit the cover image', () => {
  const editedAvatar = {
    username: 'john Doe',
    avatar: 'BillJenkins.jpg',
    cover: 'johnDoeCover.jpg',
  };

  expect(profile(mockProfile, editAvatar('BillJenkins.jpg'))).toEqual(editedAvatar);
});
