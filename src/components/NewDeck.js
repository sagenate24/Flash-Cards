import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions/decks';
import { addDeckTitle, getDeck } from '../utils/api';
import { white, black, red } from '../utils/colors';

import NASBtn from './NASBtn';

class NewDeck extends Component {
  state = {
    title: '',
    underColorT: false,
  };

  submit = () => {
    const { title } = this.state;
    const { dispatch, navigation, deckTitleList, parentalControl } = this.props;
    const matchedTitle = deckTitleList.find(deckTitle => deckTitle === title);

    if (matchedTitle !== title) {
      addDeckTitle(title).then(() => getDeck(title).then((deck) => {
        dispatch(addDeck({
          [deck.title]: deck,
        }));
        navigation.navigate(
          'Deck',
          {
            currentDeck: deck,
            parentalControl,
          },
        );
      }));

      this.setState(() => ({
        title: '',
      }));
    } else {
      Alert.alert(
        'Warning',
        'You already have a deck with this title. Please choose another.',
        [
          { text: 'OK' },
        ],
        { cancelable: false },
      );
    }
  };

  render() {
    const { title, underColorT } = this.state;
    const charactersLeft = 27 - title.length;

    return (
      <View style={styles.container}>
        <View style={styles.formPage}>
          <TextInput
            value={title}
            maxLength={27}
            selectionColor={black}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={title => this.setState({ title })}
            onFocus={() => this.setState({ underColorT: true })}
            style={underColorT === true ? styles.inputActive : styles.input}
          />
          <Text>TITLE</Text>
          {charactersLeft <= 22 && (
            <Text style={styles.inputIsGettingFull}>{charactersLeft}</Text>
          )}
        </View>
        <NASBtn
          onPress={this.submit}
          disabled={title === ''}
          tintColor={{ borderColor: red, borderWidth: 3, backgroundColor: white }}
          textStyle={{ color: red }}
        >
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

function mapStateToProps({ decks, profile }) {
  return {
    parentalControl: profile.parentControl,
    deckTitleList: Object.keys(decks),
  };
}

export default connect(mapStateToProps)(NewDeck);
