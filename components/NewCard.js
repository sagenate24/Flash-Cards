import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { softPurp, white, lightBlue, black } from '../utils/colors';
import { addCard } from '../actions';
import { addCardToDeck, getDecks } from '../utils/api';
import { NavigationActions } from 'react-navigation';

// Todo: Add keyboard feature to zoom everything up.

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>Submit</Text>
    </TouchableOpacity>
  )
}

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    underColorQ: false,
    underColorA: false,
  }

  componentDidMount() {
    const { currentDeck } = this.props;

  }

  changeUderlineColor = (chosenInput) => {
    if (chosenInput === 'question') {
      this.setState(() => ({
        underColorQ: true,
        underColorA: false
      }))
    } else {
      this.setState(() => ({
        underColorA: true,
        underColorQ: false
      }))
    }
  }

  submit = () => {
    const { question, answer } = this.state;
    const { currentDeck } = this.props;
    const deckTitle = currentDeck.title;
    const card = {['question']: question, ['answer']: answer};

    this.props.dispatch(addCard({
      card,
      deckTitle
    }));

    this.toHome()

    addCardToDeck(card, deckTitle);
  }

  toHome = () => {
    backAction = NavigationActions.back({
      key: null,
    });

    this.props.navigation.dispatch(backAction)
  }

  render() {
    const { underColorA, underColorQ } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <TextInput
            value={this.state.question}
            style={underColorQ === true ? styles.inputActive : styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(question) => this.setState({ question })}
            selectionColor={black}
            onFocus={() => this.changeUderlineColor('question')}
          />
          <Text>TERM</Text>
          <TextInput
            value={this.state.answer}
            style={underColorA === true ? styles.inputActive : styles.input}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(answer) => this.setState({ answer })}
            selectionColor={black}
            onFocus={() => this.changeUderlineColor('answer')}
          />
          <Text>DEFINITION</Text>
        </View>
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: black,
  },
  inputActive: {

    fontSize: 20,
    borderBottomWidth: 4,
    borderColor: '#e6b800',
  },
  iosSubmitBtn: {
    backgroundColor: '#1b1b7e',
    padding: 10,
    height: 45,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: '#1b1b7e',
    padding: 10,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
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

function mapStateToProps (state, { navigation }) {
  // console.log(navigation)
  const { currentDeck } = navigation.state.params
  return {
    currentDeck
  }
}

export default connect(mapStateToProps)(NewCard);