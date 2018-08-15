import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux';
import { white, black } from '../utils/colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationActions } from 'react-navigation';
import { recentActivityScore } from '../utils/api';
import Quiz from './Quiz';
import { addScore } from '../actions';
import { timestamp } from '../node_modules/rxjs/operator/timestamp';

// TODO: When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.

class Results extends Component {
  componentDidMount() {
    const { currentDeck, correctAnswers } = this.props;
    let correctPercent = Math.round((correctAnswers / currentDeck.questions.length) * 100);
    let timeStamp = Date.now()
    recentActivityScore(currentDeck.title, correctPercent, timeStamp);

    this.props.dispatch(addScore(currentDeck.title, correctPercent, timeStamp));

    console.log(this.props);
  }

  handlePercent = () => {
    const { currentDeck, correctAnswers } = this.props;
    let correctPercent = Math.round((correctAnswers / currentDeck.questions.length) * 100);

    return correctPercent;
  }

  studyMore = () => {
    this.props.navigation.navigate(
      'Deck',
      {currentDeck: this.props.currentDeck.title}
    )
  }

  quizRetake = () => {
    this.props.navigation.navigate(
      'Quiz',
      {currentDeck: this.props.currentDeck}
    )
  }

  render() {
    const { currentDeck, correctAnswers } = this.props;
    const percent = this.handlePercent();

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <AnimatedCircularProgress
            size={150}
            width={10}
            fill={this.handlePercent()}
            tintColor="#1b1b7e"
            rotation={360}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#f2f2f2" >
            {
              (fill) => (
                <Text style={styles.percentText}>
                  {percent}%
                </Text>
              )
            }
          </AnimatedCircularProgress>
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
    alignItems: 'center',
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
    backgroundColor: '#e6b800',
    borderRadius: 2,
    width: 200,
    padding: 10,
    height: 45,
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: '#6ed3cf',
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
})

function mapStateToProps(state, { navigation }) {
  const { correctAnswers, currentDeck } = navigation.state.params

  return {
    correctAnswers: correctAnswers,
    currentDeck
  }
}

export default connect(mapStateToProps)(Results);