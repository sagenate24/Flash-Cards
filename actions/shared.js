import { getInitialData } from '../utils/helpers';
import { receiveDecks } from './decks';
import { receiveProfile } from './profile';

export function handleInitialData() {
  return (dispatch) => {

    return getInitialData().then(({ decks, profile }) => {
      console.log(decks)
      dispatch(receiveDecks(decks));
      dispatch(receiveProfile(profile));
    });
  }
}
