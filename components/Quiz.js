import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { red, queenBlue } from '../utils/colors';

import Card from './Card';
import NASBtn from './NASBtn';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
  };

  correctAnswer = () => {
    const { deck } = this.props;
    const { questions } = deck;
    const { questionIndex, correctAnswers } = this.state;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('correct');
    } else {
      this.setState(() => ({
        correctAnswers: correctAnswers + 1,
        questionIndex: questionIndex + 1,
      }));
    }
  };

  incorrectAnswer = () => {
    const { deck } = this.props;
    const { questions } = deck;
    const { questionIndex } = this.state;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('incorrect');
    } else {
      this.setState(() => ({ questionIndex: questionIndex + 1 }));
    }
  };

  goToResults = (lastAnswer) => {
    const { correctAnswers } = this.state;
    const { navigation, deck } = this.props;

    navigation.navigate(
      'Results',
      {
        correctAnswers: lastAnswer === 'correct' ? correctAnswers + 1 : correctAnswers,
        currentDeck: deck,
      },
    );

    this.setState(() => ({
      questionIndex: 0,
      correctAnswers: 0,
    }));
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { questionIndex } = this.state;
    const questionsRemaining = questions.length - questionIndex;

    return (
      <View style={{ flex: 1, padding: 20 }}>
        <View style={{ flex: 4 }}>
          <Card
            question={questions[questionIndex].question}
            answer={questions[questionIndex].answer}
            questionsRemaining={questionsRemaining}
          />
        </View>
        <View style={{ flex: 1 }}>
          <NASBtn tintColor={{ backgroundColor: queenBlue }} onPress={this.correctAnswer}>
            Correct
          </NASBtn>
          <NASBtn tintColor={{ backgroundColor: red }} onPress={this.incorrectAnswer}>
            Incorrect
          </NASBtn>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params;

  return {
    deck: currentDeck,
  };
}

export default connect(mapStateToProps)(Quiz);
