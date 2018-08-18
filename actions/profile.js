export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const EDIT_USERNAME = 'EDIT_USERNAME';
export const EDIT_COVER = 'EDIT_COVER';
export const EDIT_AVATAR = 'EDIT_AVATAR';

export function receiveProfile(profile) {
  return {
    type: RECEIVE_PROFILE,
    profile,
  }
}

export function editUsername(username) {
  return {
    type: EDIT_USERNAME,
    username,
  }
}

export function editCover(image) {
  return {
    type: EDIT_COVER,
    image,
  }
}

export function editAvatar(image) {
  return {
    type: EDIT_AVATAR,
    image,
  }
}