import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { black, gray, white, softPurp, lightBlue } from '../utils/colors';
import { MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';

// TODO: Get decks from AsnyStorage

class Deck extends Component {
  render() {
    const { title, questions } = this.props.deck;
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.cardCount}>
            {questions && questions.length
              ? questions.length > 1
                ? questions.length + ' Cards'
                : questions.length + ' Card'
              : '0 Cards'
            }
          </Text>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.optionsContainer}>
            <TouchableOpacity style={styles.metric} onPress={() => this.props.navigation.navigate(
              'Quiz',
              { currentDeck: this.props.deck }
            )}>
              <Text style={styles.header}>
                <MaterialCommunityIcons
                  size={34}
                  name='pencil-box-outline'
                  style={{ color: '#262673' }} />
              </Text>
              <Text style={[styles.subHeader, { color: lightBlue }]}>
                QUIZ
            </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.metric} onPress={() => this.props.navigation.navigate(
              'NewCard',
              { currentDeck: this.props.deck }
            )}>
              <Text style={styles.header}>
                <MaterialCommunityIcons
                  size={34}
                  name='cards-outline'
                  style={{ color: '#262673' }} />
              </Text>
              <Text style={[styles.subHeader, { color: lightBlue }]}>
                ADD CARD
            </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Cards</Text>
          {questions && questions.length
            ? questions.map((item) => {
              return (
                <View style={styles.item} key={item.question}>
                  <Text>{item.question}</Text>
                </View>
              )
            })
            : <Text>No Cards</Text>
          }
          {}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
  },
  title: {
    fontSize: 20,
    color: black,
    fontWeight: 'bold',
  },
  header: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardCount: {
    fontSize: 14,
    color: '#737373',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  metric: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 4,
    borderColor: lightBlue,
    backgroundColor: white,
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  subHeader: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },
  item: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
});

function mapStateToProps(Decks, { navigation }) {
  const { currentDeck } = navigation.state.params;

  console.log(currentDeck)

  return {
    deck: Decks[currentDeck]
  }
}

export default connect(mapStateToProps)(Deck)