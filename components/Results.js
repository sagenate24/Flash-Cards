import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { white, black, red } from '../utils/colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { recentActivityScore } from '../utils/api';
import { addScore } from '../actions/decks';
import Score from './Score';

class Results extends Component {
  componentDidMount() {
    const { currentDeck, correctAnswers } = this.props;
    let correctPercent = Math.round((correctAnswers / currentDeck.questions.length) * 100);
    let timeStamp = Date.now();

    recentActivityScore(currentDeck.title, correctPercent, timeStamp);

    this.props.dispatch(addScore(currentDeck.title, correctPercent, timeStamp));
  };

  handlePercent = () => {
    const { currentDeck, correctAnswers } = this.props;
    let correctPercent = Math.round((correctAnswers / currentDeck.questions.length) * 100);

    return correctPercent;
  };

  studyMore = () => {
    this.props.navigation.navigate(
      'Deck',
      {currentDeck: this.props.currentDeck}
    );
  };

  quizRetake = () => {
    this.props.navigation.navigate(
      'Quiz',
      {currentDeck: this.props.currentDeck}
    );
  };

  render() {
    const { currentDeck, correctAnswers } = this.props;
    const percent = this.handlePercent();

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Score
            percent={percent}
            width={10}
            size={150}
            textSize={{
              fontSize: 34,
              fontWeight: 'bold'
            }} />

          <View style={{ marginTop: 20 }}>
            {percent >= 80
              ? <Text style={styles.reviewText}>Great Job!</Text>
              : <Text style={styles.reviewText}>Study Time</Text>
            }
          </View>
          <View>
            <Text>You got {correctAnswers} out of {currentDeck.questions.length} correct.</Text>
          </View>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={this.quizRetake}>
            <Text style={styles.submitBtnText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={this.studyMore}>
            <Text style={styles.submitBtnText}>Study More</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    alignItems: 'center',
  },
  content: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    color: black,
    fontSize: 20,
  },
  percentText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: black,
  },
  iosSubmitBtn: {
    backgroundColor: red,
    borderRadius: 2,
    width: 200,
    padding: 10,
    height: 45,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: red,
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
});

function mapStateToProps(state, { navigation }) {
  const { correctAnswers, currentDeck } = navigation.state.params;

  return {
    correctAnswers: correctAnswers,
    currentDeck
  };
};

export default connect(mapStateToProps)(Results);
