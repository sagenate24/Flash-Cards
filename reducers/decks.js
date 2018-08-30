import {
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  ADD_SCORE,
} from '../actions/decks';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      return {
        ...state,
        ...action.deck,
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          questions: state[action.deckTitle].questions.concat([action.card]),
        },
      };
    case ADD_SCORE:
      return {
        ...state,
        [action.deckTitle]: {
          ...state[action.deckTitle],
          recentScore: action.score,
          timeStamp: action.timeStamp,
        },
      };
    default:
      return state;
  }
}
