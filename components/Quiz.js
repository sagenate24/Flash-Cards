import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import { white } from '../utils/colors';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    showAnswer: false,
  }

  correctAnswer = () => {
    const { questionIndex, correctAnswers } = this.state;
    const { questions } = this.props.currentDeck;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('correct')
    } else {
      this.setState(() => ({
        correctAnswers: correctAnswers + 1,
        questionIndex: questionIndex + 1,
        showAnswer: false
      }))
    }


  }

  wrongAnswer = () => {
    const { questionIndex } = this.state;
    const { questions } = this.props.currentDeck;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('incorrect')
    } else {
      this.setState(() => ({
        questionIndex: questionIndex + 1,
        showAnswer: false,
      }))
    }
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

  goToResults = (lastAnswer) => {
    if (lastAnswer === 'correct') {
      this.props.navigation.navigate(
        'Results',
        {
          correctAnswers: this.state.correctAnswers + 1,
          currentDeck: this.props.currentDeck
        }
      )
    } else {
      this.props.navigation.navigate(
        'Results',
        {
          correctAnswers: this.state.correctAnswers,
          currentDeck: this.props.currentDeck
        }
      )
    }

    this.setState(() => ({
      questionIndex: 0,
      correctAnswers: 0,
      showAnswer: false,
    }))
  }

  render() {
    const { questions } = this.props.currentDeck;
    const { questionIndex, showAnswer } = this.state;
    const questionsRemaining = questions.length - questionIndex;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.showAnswer}
      >
        <View style={styles.card}>
          <Text style={questionsRemaining === 1 ? styles.lastCard : styles.cardsRemaining}>{questionsRemaining} Left</Text>
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
  cardsRemaining: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  lastCard: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    color: 'red',
  },
})

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params

  return {
    currentDeck
  }
}

export default connect(mapStateToProps)(Quiz);