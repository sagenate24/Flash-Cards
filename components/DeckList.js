import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal
} from 'react-native';
import { receiveDecks } from '../actions/decks';
import { receiveProfile } from '../actions/profile';
import { gray, white, black, red } from '../utils/colors';
import { getInitialData } from '../utils/helpers';

import OnLoad from './OnLoad';

class DeckList extends Component {
  state = {
    ready: true,
    modalType: 'none',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    getInitialData().then(({ decks, profile }) => {
      dispatch(receiveDecks(decks));
      dispatch(receiveProfile(profile));
    }).then(() => {
      setTimeout(() => {
        this.setState(() => ({
          ready: true,
        }))
      }, 2500);
    });

    setTimeout(() => {
      this.setState(() => ({
        modalType: 'slide',
      }));
    }, 1000);
  };

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return (
        <Modal
          animationType={this.state.modalType}
          transparent={false}
          visible={!ready}>
          <OnLoad />
        </Modal>
      );
    };

    return (
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity style={styles.newDeck} onPress={() => this.props.navigation.navigate(
            'NewDeck'
          )}>
            <Text style={styles.btnText}>
              Create a new deck
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.deckListTitle}>Your Decks</Text>
        <View style={{ marginBottom: 57 }}>
          {this.props && this.props.decks
            ? Object.values(decks).map((deck) => {
              if (!deck.title) {
                return null;
              } else {
                return (
                  <View style={styles.item} key={deck.title}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate(
                        'Deck',
                        { currentDeck: deck }
                      )}>
                      <Text style={{ fontSize: 20 }}>
                        {deck.title}
                      </Text>
                      {deck.questions && deck.questions.length
                        ? <Text style={{ fontSize: 16, color: '#6ed3cf' }}>
                          {deck.questions.length > 1
                            ? deck.questions.length + ` Cards`
                            : deck.questions.length + ` Card`}
                        </Text>
                        :
                        <Text style={{ color: gray, fontSize: 16 }}>EMPTY</Text>
                      }
                    </TouchableOpacity>
                  </View>
                )
              }
            })
            : <Text style={styles.noCards}>You have no decks</Text>
          }
        </View>
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
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
  noCards: {
    fontSize: 22,
    alignSelf: 'center',
    marginTop: 20,
    opacity: .5,
  },
  remove: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: red,
  }
});

function mapStateToProps({ decks }) {
  return {
    decks: Object.values(decks).map((deck) => {

      return {
        ...deck,
      };
    }).sort((a, b) => b.timeStamp - a.timeStamp)
  };
};

export default connect(mapStateToProps)(DeckList);
