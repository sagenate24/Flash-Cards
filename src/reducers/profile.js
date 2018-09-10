import {
  RECEIVE_PROFILE,
  EDIT_AVATAR,
  EDIT_COVER,
  EDIT_USERNAME,
  EDIT_PARENTAL_CONTROL,
} from '../actions/profile';

export default function profile(state = {}, action) {
  switch (action.type) {
    case RECEIVE_PROFILE:
      return {
        ...state,
        ...action.profile,
      };
    case EDIT_AVATAR:
      return {
        ...state,
        avatar: action.image,
      };
    case EDIT_COVER:
      return {
        ...state,
        cover: action.image,
      };
    case EDIT_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case EDIT_PARENTAL_CONTROL:
      return {
        ...state,
        parentControl: action.status,
      };
    default:
      return state;
  }
}
