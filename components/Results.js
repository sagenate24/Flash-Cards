import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addScore } from '../actions/decks';
import { recentActivityScore } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { white, black, red, queenBlue } from '../utils/colors';

import CircleScore from './CircleScore';
import NASBtn from './NASBtn';

// buttons in andriod need to be fixed.

class Results extends Component {
  componentDidMount() {
    const { deck, correctAnswers, dispatch } = this.props;
    const correctPercent = Math.round((correctAnswers / deck.questions.length) * 100);
    const timeStamp = Date.now();

    recentActivityScore(deck.title, correctPercent, timeStamp);
    dispatch(addScore(deck.title, correctPercent, timeStamp));

    clearLocalNotification().then(() => {
      setLocalNotification();
    });
  }

  handlePercent = () => {
    const { deck, correctAnswers } = this.props;
    const correctPercent = Math.round((correctAnswers / deck.questions.length) * 100);

    return correctPercent;
  }

  goTo = (view) => {
    const { navigation, deck } = this.props;

    navigation.navigate(
      view,
      { currentDeck: deck },
    );
  }

  render() {
    const { deck, correctAnswers } = this.props;
    const percent = this.handlePercent();

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Your Score</Text>
          <CircleScore
            percent={percent}
            width={5}
            size={130}
            textSize={{ fontSize: 34 }}
          />
          <View>
            {percent >= 80
              ? <Text style={styles.reviewText}>Great Job!</Text>
              : <Text style={styles.reviewText}>Study Time</Text>
            }
          </View>
          <View>
            <Text>You got {correctAnswers} out of {deck.questions.length} correct.</Text>
          </View>
          <NASBtn
            tintColor={[styles.button, { backgroundColor: red }]}
            onPress={() => this.goTo('Quiz')}
          >
            Retake
          </NASBtn>
          <NASBtn
            tintColor={[styles.button, { backgroundColor: queenBlue }]}
            onPress={() => this.goTo('Deck')}
          >
            Study more
          </NASBtn>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    alignItems: 'stretch',
    paddingLeft: 20,
    paddingRight: 20,
  },
  card: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 50,
    alignItems: 'center',
  },
  header: {
    paddingBottom: 30,
    fontSize: 26,
    color: black,
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  },
  reviewText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: black,
  },
  button: {
    width: 200,
    padding: 10,
    marginTop: 20,
  },
});

function mapStateToProps(state, { navigation }) {
  const { correctAnswers, currentDeck } = navigation.state.params;

  return {
    correctAnswers,
    deck: currentDeck,
  };
}

export default connect(mapStateToProps)(Results);
