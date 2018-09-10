import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { receiveDecks } from '../actions/decks';
import { getInitialData, profanityDetector } from '../utils/helpers';
import { receiveProfile } from '../actions/profile';
import { gray, white, black, red } from '../utils/colors';

class DeckList extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    getInitialData().then(({ decks, profile }) => {
      dispatch(receiveDecks(decks));
      dispatch(receiveProfile(profile));
    });
  }

  render() {
    const { decks, navigation, parentalControl } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.newDeck}
            onPress={() => navigation.navigate('NewDeck')}
          >
            <Text style={styles.btnText}>
              Create a new deck
            </Text>
          </TouchableOpacity>
        </View>
        {decks.length > 0
          ? <Text style={styles.deckListTitle}>Your Decks</Text>
          : null
        }
        <View style={{ marginBottom: 57 }}>
          {decks.length > 0
            ? Object.values(decks).map(deck => (
              <View style={styles.deck} key={deck.title}>
                <TouchableOpacity
                  onPress={() => navigation.navigate(
                    'Deck',
                    { currentDeck: deck,
                      parentalControl,
                    },
                  )}
                >
                  <Text style={{ fontSize: 20 }}>
                    {parentalControl === 'on' ? profanityDetector(deck.title) : deck.title}
                  </Text>
                  {deck.questions && deck.questions.length
                    ? (
                      <Text style={{ fontSize: 16, color: '#6ed3cf' }}>
                        {deck.questions.length > 1
                          ? `${deck.questions.length} Cards`
                          : `${deck.questions.length} Card`}
                      </Text>
                    ) : <Text style={{ color: gray, fontSize: 16 }}>EMPTY</Text>
                  }
                </TouchableOpacity>
              </View>
            )) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ borderBottomColor: gray, borderBottomWidth: 1 }}>
                  <Text style={[styles.emptyHeader]}>Welcome to FlashCards!</Text>
                </View>
                <Text style={[styles.emptyText]}>Get started by creating your own decks.</Text>
              </View>
            )
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  deck: {
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
  newDeck: {
    backgroundColor: red,
    borderRadius: 2,
    padding: 24,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 17,
    justifyContent: 'center',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  deckListTitle: {
    fontSize: 20,
    color: black,
    fontWeight: 'bold',
    paddingTop: 47,
    paddingBottom: 30,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  emptyHeader: {
    fontWeight: 'bold',
    color: black,
    fontSize: 23,
    marginTop: 100,
    textAlign: 'center',
  },
  emptyText: {
    opacity: 0.6,
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 20,
    textAlign: 'center',
  },
  remove: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: red,
  },
});

function mapStateToProps({ decks, profile }) {
  const deckValuesArr = Object.values(decks);
  const newDeckArr = [];

  for (let i = 0; i < deckValuesArr.length; i++) {
    if (deckValuesArr[i] !== null) {
      newDeckArr.push(deckValuesArr[i]);
    }
  }

  return {
    parentalControl: profile.parentControl,
    decks: Object.values(newDeckArr).map(deck => ({
      ...deck,
    })).sort((a, b) => b.timeStamp - a.timeStamp),
  };
}

export default connect(mapStateToProps)(DeckList);
