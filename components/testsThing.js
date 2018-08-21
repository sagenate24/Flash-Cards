import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Animated } from 'react-native';

class Test extends Component {
  state = {
    rotateValue: new Animated.Value(0)
  }
  render() {
    return (
      <View>
        <View>
          <Text>FirstPage</Text>
        </View>
        <View>
          <Text>FirstPage</Text>
        </View>
      </View>
    );
  }
}

export default Test;