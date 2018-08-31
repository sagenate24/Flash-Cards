import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { white, red, lightBlue } from '../utils/colors';

// import IOSCard from './IOSCard';
// import AndriodCard from './AndriodCard';
import Card from './Card';
// import FlipTest from './FlipTest';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
  };

  correctAnswer = () => {
    const { currentDeck } = this.props;
    const { questions } = currentDeck;
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

  wrongAnswer = () => {
    const { currentDeck } = this.props;
    const { questionIndex } = this.state;
    const { questions } = currentDeck;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('incorrect');
    } else {
      this.setState(() => ({ questionIndex: questionIndex + 1 }));
    }
  };

  goToResults = (lastAnswer) => {
    const { correctAnswers } = this.state;
    const { navigation } = this.props;

    navigation.navigate(
      'Results',
      {
        correctAnswers: lastAnswer === 'correct' ? correctAnswers + 1 : correctAnswers,
        currentDeck: this.props.currentDeck,
      },
    );

    this.setState(() => ({
      questionIndex: 0,
      correctAnswers: 0,
    }));
  };

  render() {
    const { currentDeck } = this.props;
    const { questions } = currentDeck;
    const { questionIndex } = this.state;
    const questionsRemaining = questions.length - questionIndex;

    return (
      <View style={styles.container}>
        <View style={{ flex: 4 }}>
          <Card question={questions[questionIndex].question} answer={questions[questionIndex].answer} questionsRemaining={questionsRemaining} questionIndex={questionIndex} />
        </View>
        <View style={[styles.bottomContent, { flex: 1 }]}>
          <TouchableOpacity
            style={styles.correctBtn}
            onPress={this.correctAnswer}
          >
            <Text style={styles.btnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incorrectBtn}
            onPress={this.wrongAnswer}
          >
            <Text style={styles.btnText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bottomContent: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  correctBtn: {
    backgroundColor: lightBlue,
    padding: 10,
    borderRadius: 2,
  },
  incorrectBtn: {
    backgroundColor: red,
    padding: 10,
    marginTop: 20,
    borderRadius: 2,
  },
  btnText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: white,
    textAlign: 'center',
  },
});

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params;

  return {
    currentDeck,
  };
}

export default connect(mapStateToProps)(Quiz);
