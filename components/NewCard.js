import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { softPurp, white, lightBlue, black } from '../utils/colors';

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
    backgroundColor: softPurp,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: softPurp,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
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
})

export default connect()(NewCard);