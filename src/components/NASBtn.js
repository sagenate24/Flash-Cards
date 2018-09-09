import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { white } from '../utils/colors';

// The name is formed from my name just in case projects
// That need to be shared between developers dont have matching names like Button
export default function NASBtn({
  children, onPress, disabled, tintColor,
}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, tintColor, disabled && { opacity: 0.8 }]}
      >
        <Text style={styles.btnText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    padding: 10,
    borderRadius: Platform.OS === 'ios' ? 0 : 2,
  },
  btnText: {
    color: white,
    fontSize: Platform.OS === 'ios' ? 22 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
