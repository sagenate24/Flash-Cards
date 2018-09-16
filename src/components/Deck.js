import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { removeDeck } from '../utils/api';
import { addDeck } from '../actions/decks';
import { black, white, lightBlue, red, queenBlue } from '../utils/colors';
import { profanityDetector } from '../utils/helpers';

import DeckOption from './DeckOption';

class Deck extends Component {
  handleRemoveDeck = () => {
    const { remove, goBack, deck } = this.props;

    goBack();
    remove();
    removeDeck(deck.title);
  }

  generateKeyID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

  cardLength = (questions) => {
    if (questions && questions.length) {
      if (questions.length > 1) {
        return `${questions.length} Cards  |`;
      }
      return `${questions.length} Card  |`;
    }
    return '0 Cards  |';
  }

  render() {
    const { deck, navigation, parentalControl } = this.props;

    if (deck === null) {
      return null;
    }

    const { title, questions } = deck;

    return (
      <ScrollView>
        {deck !== null
          ? (
            <View style={styles.container}>
              <View style={styles.deckTitleAndDelete}>
                <Text style={styles.cardCount}>
                  {this.cardLength(questions)}
                </Text>
                <TouchableOpacity onPress={this.handleRemoveDeck}>
                  <Text style={[styles.removeText, { marginRight: 10 }]}>DELETE</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>
                {parentalControl === 'on' ? profanityDetector(title) : title}
              </Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  disabled={questions.length === 0}
                  style={[styles.navOption, questions.length === 0 && { opacity: 0.6 }]}
                  onPress={() => navigation.navigate(
                    'Quiz',
                    {
                      currentDeck: deck,
                      parentalControl,
                    },
                  )}
                >
                  <DeckOption
                    size={34}
                    name="pencil-box-outline"
                    iconStyle={{ color: queenBlue }}
                    subHeaderColor={{ color: lightBlue }}
                  >
                    TAKE QUIZ
                  </DeckOption>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navOption}
                  onPress={() => navigation.navigate(
                    'NewCard',
                    {
                      currentDeck: deck,
                      parentalControl,
                    },
                  )}
                >
                  <DeckOption
                    size={34}
                    name="cards-outline"
                    iconStyle={{ color: queenBlue }}
                    subHeaderColor={{ color: lightBlue }}
                  >
                    ADD CARD
                  </DeckOption>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Cards</Text>
              {questions && questions.length
                ? questions.map(item => (
                  <View style={styles.cards} key={this.generateKeyID()}>
                    <Text>
                      {parentalControl === 'on' ? profanityDetector(item.question) : item.question}
                    </Text>
                  </View>
                ))
                : <Text style={styles.empty}>No Cards</Text>}
            </View>
          )
          : null}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
  deckTitleAndDelete: {
    flex: 1,
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    color: black,
    fontWeight: 'bold',
  },
  removeText: {
    fontSize: 14,
    color: red,
    opacity: 0.8,
    marginLeft: 7,
    marginTop: 0.5,
  },
  cardCount: {
    fontSize: 14,
    color: '#737373',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  navOption: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 4,
    borderColor: lightBlue,
    backgroundColor: white,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  cards: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  empty: {
    color: '#C0C0C0',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: 100,
  },
});

function mapStateToProps(state, { navigation }) {
  const { currentDeck, parentalControl } = navigation.state.params;

  return {
    parentalControl,
    deck: state.decks[currentDeck.title],
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { currentDeck } = navigation.state.params;

  return {
    remove: () => dispatch(addDeck({
      [currentDeck.title]: null,
    })),
    goBack: () => navigation.navigate(
      'Home',
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
