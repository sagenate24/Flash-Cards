import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { getDecks, getProfile } from '../utils/api';
import { receiveDecks, receiveProfile } from '../actions';
import { AppLoading } from 'expo';
import { gray, white, lightBlue, black } from '../utils/colors';

// TODO: Add TimeStamp to each deck listed

class DeckList extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    const { dispatch } = this.props;

    getProfile()
      .then((results) => dispatch(receiveProfile(results)))

    getDecks()
      .then((results) => dispatch(receiveDecks(results)))
      .then(() => this.setState(() => ({
        ready: true,
      })))
  }

  render() {
    const { decks, profile } = this.props;
    const { ready } = this.state;

    console.log(profile)

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <ScrollView style={styles.container}>
        <View>
        <TouchableOpacity style={styles.newDeck} onPress={() => this.props.navigation.navigate(
              'NewDeck'
            )}>
              <Text style={styles.btnText}>
                Create a new study deck
            </Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.deckListTitle}>Your Decks</Text>
        {Object.keys(decks).map((deck) => {

          return (
            <View style={styles.item} key={deck}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Deck',
                { currentDeck: deck }
              )}>
                <Text style={{ fontSize: 20 }}>
                  {decks[deck].title}
                </Text>
                {decks[deck].questions && decks[deck].questions.length
                  ?
                  <Text style={{ fontSize: 16, color: lightBlue }}>
                    {decks[deck].questions.length > 1
                      ? decks[deck].questions.length + ` Cards`
                      : decks[deck].questions.length + ` Card`}
                  </Text>
                  :
                  <Text style={{ color: gray, fontSize: 16 }}>EMPTY</Text>
                }
              </TouchableOpacity>
            </View>
          )
        })}
      </ScrollView>
    );
  }
}

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
    backgroundColor: lightBlue,
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
  }
});

function mapStateToProps(decks) {
  return {
    decks,
  }
}

export default connect(mapStateToProps)(DeckList);