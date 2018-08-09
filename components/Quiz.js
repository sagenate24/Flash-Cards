import React, { Component } from 'react'
import { Text, View, Modal, StyleSheet, Button, TouchableOpacity, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux';
import { white } from '../utils/colors';
import Results from './Results';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    showAnswer: false,
  }

  correctAnswer = () => {
    const { questionIndex, correctAnswers } = this.state;

    this.setState(() => ({
      correctAnswers: correctAnswers + 1,
      questionIndex: questionIndex + 1,
      showAnswer: false
    }))
  }

  wrongAnswer = () => {
    const { questionIndex } = this.state;

    this.setState(() => ({
      questionIndex: questionIndex + 1,
      showAnswer: false,
    }))
  }

  showAnswer = () => {
    const { showAnswer } = this.state;
    if (showAnswer === false) {
      this.setState(() => ({
        showAnswer: true
      }))
    } else {
      this.setState(() => ({
        showAnswer: false
      }))
    }
  }

  render() {
    const { questions } = this.props.currentDeck;
    const { questionIndex, showAnswer, correctAnswers } = this.state;

    let index = questionIndex + 1;

    if (index > questions.length) {
      return (
          <Results
            correctAnswers={correctAnswers}
            questions={questions}
            navigation={this.props.navigation}
          />
      )
    }

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.showAnswer}
      >
        <View style={styles.card}>
          <Text style={{ alignSelf: 'flex-start', justifyContent: 'flex-start' }}>{questionIndex + 1} / {questions.length}</Text>
          <View style={styles.content}>
            {showAnswer
              ? <Text style={[styles.cardText, { textAlign: 'center' }]}>{questions[questionIndex].answer}</Text>
              : <Text style={[styles.cardText, { textAlign: 'center' }]}>{questions[questionIndex].question}</Text>
            }
          </View>
          <View>
            <Button
              onPress={this.correctAnswer}
              title='Correct'
              color='green'
            />
            <Button
              onPress={this.wrongAnswer}
              title='Incorrect'
              color='red'
            />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    padding: 20,
  },
  card: {
    backgroundColor: white,
    padding: 20,
    height: '100%',
  },
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: '#000',
    fontSize: 20,
  },
})

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params

  return {
    currentDeck
  }
}

export default connect(mapStateToProps)(Quiz);