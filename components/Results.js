import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux';
import { white, black } from '../utils/colors';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationActions } from 'react-navigation';


class Results extends Component {

  handlePercent = () => {
    const { questions, correctAnswers } = this.props;
    let correctPercent = Math.round((correctAnswers / questions.length) * 100);

    return correctPercent;
  }

  studyMore = () => {
    console.log(this.props.navigation)
    const backAction = NavigationActions.back({
      key: null,
    });

    this.props.navigation.dispatch(backAction)
  }

  goToHome = () => {
    this.props.navigation.navigate(
      'Home'
    )
  }

  render() {
    console.log(this.props)

    const { questions, correctAnswers } = this.props;
    let percent = this.handlePercent()

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
            <Text>You got {correctAnswers} out of {questions.length} correct.</Text>
          </View>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={this.studyMore}>
            <Text style={styles.submitBtnText}>Study More</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={this.goToHome}>
            <Text style={styles.submitBtnText}>View All Decks</Text>
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

export default connect()(Results);