import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { white, black, red, lightBlue } from '../utils/colors';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    bounceValue: new Animated.Value(0.1)
  };

  componentWillMount() {
    this.animateBounce()

    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });
    if (Platform.OS === 'ios') {
      this.frontScreen = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      });
      this.backScreen = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '0deg'],
      });
    } else {
      this.frontScreen = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg'],
      });
      this.backScreen = this.animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
      });
      this.frontOpacity = this.animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [1, 0]
      })
      this.backOpacity = this.animatedValue.interpolate({
        inputRange: [89, 90],
        outputRange: [0, 1]
      })
    }

  };

  componentDidUpdate() {
    this.flipBack()
  }

  flipCard() {
    if (this.value >= 90) {
      this.flipBack()
    } else {
      Animated.timing(this.animatedValue, {
        toValue: 180,
        easing: Easing.linear,
        useNativeDriver: true
      }).start();
    }
  }

  flipBack() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      easing: Easing.linear,
      useNativeDriver: true
    }).start();
  }

  animateBounce() {
    const { bounceValue } = this.state;

    Animated.sequence([
      Animated.timing(bounceValue, {
        duration: 200,
        toValue: .1,
        useNativeDriver: true
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true
      }),
    ]).start();
  }

  correctAnswer = () => {
    const { questions } = this.props.currentDeck;
    const { questionIndex, correctAnswers } = this.state;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('correct');
    } else {
      this.animateBounce();
      this.flipBack();
      this.setState(() => ({
        correctAnswers: correctAnswers + 1,
        questionIndex: questionIndex + 1,
      }));
    };
  };

  wrongAnswer = () => {
    const { questionIndex } = this.state;
    const { questions } = this.props.currentDeck;

    if (questionIndex + 1 === questions.length) {
      this.goToResults('incorrect');
    } else {
      this.animateBounce();
      this.flipBack();
      this.setState(() => ({ questionIndex: questionIndex + 1 }));
    };
  };

  goToResults = (lastAnswer) => {
    const { correctAnswers } = this.state;

    this.props.navigation.navigate(
      'Results',
      {
        correctAnswers: lastAnswer === 'correct' ? correctAnswers + 1 : correctAnswers,
        currentDeck: this.props.currentDeck,
      }
    );

    this.setState(() => ({
      questionIndex: 0,
      correctAnswers: 0,
    }));
  };

  render() {
    const { questions } = this.props.currentDeck;
    const { questionIndex, bounceValue } = this.state;
    const questionsRemaining = questions.length - questionIndex;

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontScreen }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backScreen }
      ]
    }

    const cardsLeft = (
      <View>
        <Animated.Text
          style={[
            questionsRemaining === 1 ? styles.lastCard : styles.cardsRemaining,
            { transform: [{ scale: bounceValue }] }
          ]}>
          {questionsRemaining} Left
      </Animated.Text>
      </View>
    )

    return (
      <TouchableWithoutFeedback
        onPress={() => this.flipCard()}>
        <View style={styles.container}>
          <Animated.View style={[styles.card, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
            {cardsLeft}<Text style={styles.cardHeader}>Question</Text>
            <View style={styles.content}>
              <Text style={[styles.cardText, { textAlign: 'center' }]}>{questions[questionIndex].question}</Text>
            </View>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.card, styles.flipCardBack, {opacity: this.backOpacity}]}>
            {cardsLeft}<Text style={styles.cardHeader}>Answer</Text>
            <View style={styles.content}>
              <Text style={[styles.cardText, { textAlign: 'center' }]}>{questions[questionIndex].answer}</Text>
            </View>
          </Animated.View>
          <View style={styles.bottomContent}>
            <TouchableOpacity
              style={styles.correctBtn}
              onPress={this.correctAnswer}>
              <Text style={styles.btnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.incorrectBtn}
              onPress={this.wrongAnswer}>
              <Text style={styles.btnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    height: '80%',
    backfaceVisibility: 'hidden',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    alignSelf: 'center',
    opacity: .6,
    fontSize: 16,
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
  bottomContent: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 20,
  },
  correctBtn: {
    backgroundColor: lightBlue,
    padding: 10,
    marginTop: 20,
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
  }
});

function mapStateToProps(state, { navigation }) {
  const { currentDeck } = navigation.state.params;

  return {
    currentDeck,
  };
};

export default connect(mapStateToProps)(Quiz);
