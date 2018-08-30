import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';
import { white, red } from '../utils/colors';

export default function CreateBtn({ children, onPress, disabled }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  iosSubmitBtn: {
    backgroundColor: red,
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
  btnText: {
    color: white,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
