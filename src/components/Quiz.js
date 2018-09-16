import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import { red, queenBlue, white } from '../utils/colors';

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
        <View style={Platform.OS === 'ios' ? { flex: 4.2 } : { flex: 3.2 }}>
          <Card
            questionsRemaining={questionsRemaining}
            answer={questions[questionIndex].answer}
            question={questions[questionIndex].question}
          />
        </View>
        <View style={{ flex: 1 }}>
          <NASBtn
            onPress={this.correctAnswer}
            textStyle={{ color: queenBlue }}
            tintColor={{ borderColor: queenBlue, borderWidth: 3, backgroundColor: white }}
          >
            Correct
          </NASBtn>
          <NASBtn
            onPress={this.incorrectAnswer}
            textStyle={{ color: red }}
            tintColor={{ borderColor: red, borderWidth: 3, backgroundColor: white }}
          >
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
