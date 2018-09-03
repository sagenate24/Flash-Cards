import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addCard } from '../actions/decks';
import { addCardToDeck } from '../utils/api';
import { white, black, red } from '../utils/colors';

import NASBtn from './NASBtn';

// add keyboard avoiding view.
// with scroll view just incase.

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    underColorQ: false,
    underColorA: false,
  };

  changeUderlineColor = (chosenInput) => {
    if (chosenInput === 'question') {
      this.setState(() => ({
        underColorQ: true,
        underColorA: false,
      }));
    } else {
      this.setState(() => ({
        underColorA: true,
        underColorQ: false,
      }));
    }
  };

  submit = () => {
    const { currentDeck, dispatch } = this.props;
    const deckTitle = currentDeck.title;
    const { question, answer } = this.state;

    const card = {
      question,
      answer,
    };

    dispatch(addCard({ card, deckTitle }));
    this.toHome();
    addCardToDeck(card, deckTitle);
  };

  toHome = () => {
    const { navigation } = this.props;

    const backAction = NavigationActions.back({
      key: null,
    });

    navigation.dispatch(backAction);
  };

  render() {
    const { underColorQ, underColorA, question, answer } = this.state;
    const charactersLeftQ = 180 - question.length;
    const charactersLeftA = 180 - answer.length;

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <TextInput
            value={question}
            maxLength={200}
            selectionColor={black}
            underlineColorAndroid="rgba(0,0,0,0)"
            onFocus={() => this.changeUderlineColor('question')}
            onChangeText={question => this.setState({ question })}
            style={underColorQ === true ? styles.inputActive : styles.input}
          />
          <Text>QUESTION</Text>
          {charactersLeftQ <= 22 && (
            <Text style={styles.inputIsGettingFull}>{charactersLeftQ}</Text>
          )}
          <TextInput
            value={answer}
            maxLength={200}
            selectionColor={black}
            underlineColorAndroid="rgba(0,0,0,0)"
            onFocus={() => this.changeUderlineColor('answer')}
            onChangeText={answer => this.setState({ answer })}
            style={underColorA === true ? styles.inputActive : styles.input}
          />
          <Text>ANSWER</Text>
          {charactersLeftA <= 22 && (
            <Text style={styles.inputIsGettingFull}>{charactersLeftA}</Text>
          )}
        </View>
        <NASBtn tintColor={{ backgroundColor: red }} disabled={question === '' || answer === ''} onPress={this.submit}>
          Create Card
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
  item: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 20,
    marginBottom: 10,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  inputIsGettingFull: {
    color: red,
    fontSize: 16,
    opacity: 0.9,
  },

});

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params;

  return {
    currentDeck,
  };
}

export default connect(mapStateToProps)(NewCard);
