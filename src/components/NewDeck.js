import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { addDeckTitle, getDeck } from '../utils/api';
import { white, black, red } from '../utils/colors';
import { addDeck } from '../actions/decks';

import NASBtn from './NASBtn';

class NewDeck extends Component {
  state = {
    title: '',
    underColorT: false,
  };

  submit = () => {
    const { title } = this.state;
    const { dispatch, navigation } = this.props;

    addDeckTitle(title).then(() => getDeck(title).then((deck) => {
      dispatch(addDeck({
        [deck.title]: deck,
      }));
      navigation.navigate(
        'Deck',
        { currentDeck: deck },
      );
    }));
  };

  render() {
    const { title, underColorT } = this.state;
    const charactersLeft = 27 - title.length;

    return (
      <View style={styles.container}>
        <View style={styles.formPage}>
          <TextInput
            value={title}
            selectionColor={black}
            underlineColorAndroid="rgba(0,0,0,0)"
            maxLength={27}
            onChangeText={title => this.setState({ title })}
            onFocus={() => this.setState({ underColorT: true })}
            style={underColorT === true ? styles.inputActive : styles.input}
          />
          <Text>TITLE</Text>
          {charactersLeft <= 22 && (
            <Text style={styles.inputIsGettingFull}>{charactersLeft}</Text>
          )}
        </View>
        <NASBtn tintColor={{ backgroundColor: red }} disabled={title === ''} onPress={this.submit}>
          Create Deck
        </NASBtn>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formPage: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 20,
    shadowOpacity: 0.8,
    marginBottom: 10,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  input: {
    fontSize: 20,
    paddingBottom: 2,
    borderBottomWidth: 2,
    borderColor: black,
  },
  inputActive: {
    fontSize: 20,
    borderBottomWidth: 4,
    borderColor: '#e6b800',
  },
  inputIsGettingFull: {
    color: red,
    fontSize: 16,
    opacity: 0.9,
  },
});

export default connect()(NewDeck);
