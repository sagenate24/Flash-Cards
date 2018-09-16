import React from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function NASBtn({
  children, onPress, disabled, tintColor, textStyle,
}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.button, tintColor, disabled && { opacity: 0.6 }]}
      >
        <Text style={[styles.btnText, textStyle]}>{children}</Text>
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
    padding: 9,
    borderRadius: Platform.OS === 'ios' ? 26 : 2,
  },
  btnText: {
    fontSize: Platform.OS === 'ios' ? 21 : 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
