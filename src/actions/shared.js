import { getInitialData } from '../utils/helpers';
import { receiveDecks } from './decks';
import { receiveProfile } from './profile';

export default function handleInitialData() {
  return dispatch => getInitialData().then(({ decks, profile }) => {
    dispatch(receiveDecks(decks));
    dispatch(receiveProfile(profile));
  });
}
