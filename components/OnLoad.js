import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  StatusBar
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

class OnLoad extends Component {
  state = {
    opacity: new Animated.Value(0),
    bounceValue: new Animated.Value(0.1),
  };

  componentDidMount() {
    const {
      opacity,
      bounceValue,
    } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
    }).start();
    Animated.sequence([
      Animated.delay(300),
      Animated.timing(bounceValue, {
        duration: 200,
        toValue: 1.04
      }),
      Animated.spring(bounceValue, {
        toValue: 1,
        friction: 4
      }),
    ]).start();
  };

  render() {
    const {
      opacity,
      bounceValue
    } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar hidden={true}/>
        <View>
          <AnimatedIcon
            size={100}
            name='cards-outline'
            style={[styles.logo, { opacity, transform: [{scale: bounceValue}] }]} />
        </View>
        <View>
          <Animated.Text
            style={[styles.textLogo, {
              opacity,
              transform: [{scale: bounceValue}],
            }]}>
            FlashCards
          </Animated.Text>
        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4e8098',
  },
  logo: {
    alignItems: 'center',
    color: '#fff'
  },
  textLogo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    alignItems: 'center',
  },
});

export default OnLoad;
