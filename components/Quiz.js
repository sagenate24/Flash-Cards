import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';
import { white, black, red } from '../utils/colors';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    showAnswer: false,
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    this.frontScreen = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backScreen = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        speed: 20,
        bounciness: 2
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        speed: 20,
        bounciness: 2
      }).start();
    }
  }

  correctAnswer = () => {
    const { questions } = this.props.currentDeck;
    const { questionIndex, correctAnswers } = this.state;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('correct');
    } else {
      this.setState(() => ({
        correctAnswers: correctAnswers + 1,
        questionIndex: questionIndex + 1,
        showAnswer: false
      }));
    };
  };

  wrongAnswer = () => {
    const { questionIndex } = this.state;
    const { questions } = this.props.currentDeck;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('incorrect');
    } else {
      this.setState(() => ({
        questionIndex: questionIndex + 1,
        showAnswer: false,
      }));
    };
  };

  showAnswer = () => {
    const { showAnswer } = this.state;
    if (showAnswer === false) {
      this.setState(() => ({
        showAnswer: true
      }));
    } else {
      this.setState(() => ({
        showAnswer: false
      }));
    };
  };

  goToResults = (lastAnswer) => {
    if (lastAnswer === 'correct') {
      this.props.navigation.navigate(
        'Results',
        {
          correctAnswers: this.state.correctAnswers + 1,
          currentDeck: this.props.currentDeck
        }
      );
    } else {
      this.props.navigation.navigate(
        'Results',
        {
          correctAnswers: this.state.correctAnswers,
          currentDeck: this.props.currentDeck
        }
      );
    };

    this.setState(() => ({
      questionIndex: 0,
      correctAnswers: 0,
      showAnswer: false,
    }));
  };

  render() {
    const { questions } = this.props.currentDeck;
    const { questionIndex, showAnswer } = this.state;
    const questionsRemaining = questions.length - questionIndex;

    const frontAnimatedStyle = {
      transform: [
        { rotateX: this.frontScreen }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backScreen }
      ]
    }
    const cardsLeft = <Text style={questionsRemaining === 1 ? styles.lastCard : styles.cardsRemaining}>{questionsRemaining} Left</Text>;

    const buttons = (
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
    )

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.flipCard()}
      >
        {/* <View style={[mirrorText, styles.card]}> */}

        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          {cardsLeft}
          <View style={styles.content}>
            <Text style={[styles.cardText, { textAlign: 'center' }]}>{questions[questionIndex].question}</Text>
          </View>
          {buttons}
        </Animated.View>
        <Animated.View style={[backAnimatedStyle, styles.card, styles.flipCardBack ]}>
          {cardsLeft}
          <View style={styles.content}>
            <Text style={[styles.cardText, { textAlign: 'center' }]}>{questions[questionIndex].answer}</Text>
          </View>
          {buttons}
        </Animated.View>

        {/* </View> */}
      </TouchableOpacity>
    );
  };
};

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
    backfaceVisibility: 'hidden'
  },
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardBack: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: '100%'
  },
  cardText: {
    color: black,
    fontSize: 20,
  },
  cardsRemaining: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
  },
  lastCard: {
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    color: red,
  },
});

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params;

  return {
    currentDeck
  };
};

export default connect(mapStateToProps)(Quiz);
