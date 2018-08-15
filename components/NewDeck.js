import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux';
import { addDeckTitle, getDeck } from '../utils/api';
import { white, black } from '../utils/colors';
import { addDeck } from '../actions';

class NewDeck extends Component {
  state = {
    title: '',
  }

  onSubmit = () => {
    const { title } = this.state;

    console.log(this.props);


    addDeckTitle(title).then(() => getDeck(title).then((deck) => {
      console.log(deck)
      this.props.dispatch(addDeck(deck))
        this.props.navigation.navigate(
          'Deck',
          { currentDeck: title }
        )
    }))
  }
  render() {
    const { title } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.formPage}>
          <TextInput
            value={title}
            selectionColor={black}
            style={styles.textInput}
            underlineColorAndroid='rgba(0,0,0,0)'
            onChangeText={(title) => this.setState({ title })}
          />
          <Text>TITLE</Text>
        </View>
        <TouchableOpacity
          onPress={this.onSubmit}
          style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
        >
          <Text style={styles.btnText}>CREATE DECK</Text>
        </TouchableOpacity>
      </View>
    )
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
  qnaContainer: {
    marginTop: 20,
  },
  textInput: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: black,
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
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

export default connect()(NewDeck);
