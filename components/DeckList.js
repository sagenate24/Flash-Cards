import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api';
import { receiveDecks } from '../actions';
import { getDeckMetaInfo } from '../utils/helpers';
import { AppLoading } from 'expo';
import { gray, white, lightBlue } from '../utils/colors';

class DeckList extends Component {
  state = {
    ready: false,
  }
  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then((results) => dispatch(receiveDecks(results)))
      .then(() => this.setState(() => ({
        ready: true,
      })))
  }

  renderItem = ({ ...Decks }, key) => {
    <View>
      <Deck />
    </View>
  }

  render() {

    // Todo: Add TimeStamp to each deck listed

    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View>
        <Text style={styles.deckListTitle}>Your Decks</Text>
        {Object.keys(decks).map((deck) => {
          const { title, questions } = getDeckMetaInfo(deck);

          return (

            <View style={styles.item} key={deck}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Deck',
                { entryId: deck }
              )}>
                <Text style={{ fontSize: 20 }}>
                  {title}
                </Text>
                <Text style={{ fontSize: 16, color: lightBlue }}>
                  {questions.length > 1
                    ? questions.length + ` Cards`
                    : questions.length + ` Card`}
                </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  deckListTitle: {
    fontSize: 20,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
  }
});

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(DeckList);