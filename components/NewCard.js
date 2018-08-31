import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { white, black } from '../utils/colors';
import { addCard } from '../actions/decks';
import { addCardToDeck } from '../utils/api';

import CreateBtn from './CreateBtn';

// add keyboard avoiding view

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
    backAction = NavigationActions.back({
      key: null,
    });

    this.props.navigation.dispatch(backAction);
  };

  render() {
    const {
      underColorA, underColorQ, question, answer,
    } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.item}>
          <TextInput
            selectionColor={black}
            value={this.state.question}
            underlineColorAndroid="rgba(0,0,0,0)"
            onFocus={() => this.changeUderlineColor('question')}
            onChangeText={question => this.setState({ question })}
            style={underColorQ === true ? styles.inputActive : styles.input}
          />
          <Text>QUESTION</Text>
          <TextInput
            selectionColor={black}
            value={this.state.answer}
            underlineColorAndroid="rgba(0,0,0,0)"
            onFocus={() => this.changeUderlineColor('answer')}
            onChangeText={answer => this.setState({ answer })}
            style={underColorA === true ? styles.inputActive : styles.input}
          />
          <Text>ANSWER</Text>
        </View>
        <CreateBtn disabled={question === '' || answer === ''} onPress={this.submit}>
          Create Card
        </CreateBtn>
      </KeyboardAvoidingView>
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
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params;

  return {
    currentDeck,
  };
}

export default connect(mapStateToProps)(NewCard);
