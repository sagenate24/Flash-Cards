import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Easing,
  TouchableWithoutFeedback,
  Platform,
  Animated,
} from 'react-native';
import { white, black, red } from '../utils/colors';

class Card extends Component {
  state = {
    bounceValue: new Animated.Value(0.1),
    animatedValue: new Animated.Value(0),
  };

  componentDidMount() {
    this.animateBounce();
  }

  componentDidUpdate() {
    this.animateBounce();
    this.flipBack();
  }

  flipCard() {
    const { animatedValue } = this.state;
    if (this.value >= 90) {
      this.flipBack();
    } else {
      Animated.timing(animatedValue, {
        toValue: 180,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }

  flipBack() {
    const { animatedValue } = this.state;
    Animated.timing(animatedValue, {
      toValue: 0,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }

  animateBounce() {
    const { bounceValue } = this.state;

    Animated.sequence([
      Animated.timing(bounceValue, {
        duration: 200,
        toValue: 0.1,
        useNativeDriver: true,
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { question, answer, questionsRemaining } = this.props;
    const { bounceValue, animatedValue } = this.state;

    this.value = 0;
    animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.frontScreen = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    if (Platform.OS === 'ios') {
      this.backScreen = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '0deg'],
      });
    } else {
      this.backScreen = animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg'],
      });
    }

    this.frontOpacity = animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0],
    });
    this.backOpacity = animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1],
    });

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontScreen },
      ],
    };
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backScreen },
      ],
    };

    const cardsLeft = (
      <View>
        <Animated.Text
          style={[
            questionsRemaining === 1 ? styles.lastCard : styles.cardsRemaining,
            { transform: [{ scale: bounceValue }] },
          ]}>
          {questionsRemaining} Left
        </Animated.Text>
      </View>
    );

    return (
      <TouchableWithoutFeedback onPress={() => this.flipCard()}>
        <View>
          <Animated.View style={[styles.card, frontAnimatedStyle, { opacity: this.frontOpacity }]}>
            {cardsLeft}
            <Text style={styles.cardHeader}>Question</Text>
            <View style={styles.content}>
              <Text style={styles.cardText}>{question}</Text>
            </View>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.card, styles.flipCardBack, { opacity: this.backOpacity }]}>
            {cardsLeft}
            <Text style={styles.cardHeader}>Answer</Text>
            <View style={styles.content}>
              <Text style={styles.cardText}>{answer}</Text>
            </View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    padding: 20,
    height: '100%',
    backfaceVisibility: 'hidden',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  content: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    alignSelf: 'center',
    opacity: 0.6,
    fontSize: 16,
  },
  flipCardBack: {
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
  cardText: {
    color: black,
    fontSize: 20,
    textAlign: 'center',
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

export default Card;
