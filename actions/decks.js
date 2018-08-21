export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const ADD_SCORE = 'ADD_SCORE';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
};

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
};

export function addCard({ card, deckTitle }) {
  return {
    type: ADD_CARD,
    card,
    deckTitle
  };
};

export function addScore(deckTitle, score, timeStamp) {
  return {
    type: ADD_SCORE,
    deckTitle,
    score,
    timeStamp
  };
};
