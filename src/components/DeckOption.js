import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DeckOption({
  size, name, iconStyle, subHeaderColor, children,
}) {
  return (
    <View>
      <Text style={styles.header}>
        <MaterialCommunityIcons
          size={size}
          name={name}
          style={iconStyle}
        />
      </Text>
      <Text style={[styles.subHeader, subHeaderColor]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
});
