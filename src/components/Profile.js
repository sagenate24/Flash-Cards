import React, { PureComponent } from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { timeToString, profanityDetector } from '../utils/helpers';
import { black, red, white } from '../utils/colors';
/* eslint-disable */

import ProfilePic from './ProfilePic';
import CircleScore from './CircleScore';

class Profile extends PureComponent {
  render() {
    const { decks, profile, navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View>
          {profile.cover.length > 1
            ? (
              <Image
                style={styles.topContent}
                source={{ uri: profile.cover }}
              />
            ) : (
              <TouchableOpacity
                style={styles.topContent}
                onPress={() => navigation.navigate('Settings')}
              >
                <Text style={{
                  fontSize: 16, alignSelf: 'center', fontWeight: 'bold', marginTop: 10, color: 'gray',
                }}
                >
                  Choose cover photo
                </Text>
              </TouchableOpacity>
            )
          }
        </View>
        <View style={styles.profileAvatar}>
          {profile.avatar.length > 1
            ? (
              <View>
                <ProfilePic borderColor={white} backUpSize={40} backUp={false} styles={styles.img} />
              </View>
            ) : (
              <TouchableOpacity style={[styles.img, { backgroundColor: white }]} onPress={() => navigation.navigate('Settings')}>
                <Text style={styles.cameraIcon}>
                  {Platform.OS === 'ios'
                    ? <Ionicons name='ios-person-add' style={{ color: 'gray' }} size={50} />
                    : <Ionicons name='md-person-add' style={{ color: 'gray' }} size={40} />
                  }
                </Text>
              </TouchableOpacity>
            )
          }
          {profile.username.length > 1
            ? (
              <Text style={[styles.text, { fontSize: 20, padding: 20 }]}>
                {profile.parentControl === 'on' ? profanityDetector(profile.username) : profile.username}
              </Text>
            ) : (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                <Text style={[styles.text, { fontSize: 18, padding: 20, color: 'gray' }]}>Create Username</Text>
              </TouchableOpacity>
            )
          }
        </View>
        <View style={styles.deckContainer}>
          <Text style={[styles.text, { fontSize: 20, marginBottom: 10 }]}>Lastest Quiz Scores</Text>
          {decks.length > 0
            ? decks.map(deck => (

              // Checks if the deck has a recent score.
              deck.recentScore || deck.recentScore === 0
                ? (
                  <TouchableOpacity
                    key={deck.timeStamp}
                    onPress={() => navigation.navigate(
                      'Deck',
                      {
                        currentDeck: deck,
                        parentalControl: profile.parentControl,
                      },
                    )}
                  >
                    <View style={styles.deck}>
                      <View>
                        <Text style={{ fontSize: 20 }}>
                          {profile.parentControl === 'on' ? profanityDetector(deck.title) : deck.title}
                        </Text>
                      </View>
                      <View style={styles.bottomCardContent}>
                        <View style={[styles.itemBox, { alignItems: 'flex-start', flex: 3 }]}>
                          <Text style={{
                            fontSize: 16, color: black, fontWeight: 'bold', marginTop: 10,
                          }}
                          >
                            {deck.questions.length > 1
                              ? `${deck.questions.length} Cards`
                              : `${deck.questions.length} Card`}
                          </Text>
                        </View>
                        <View style={[styles.itemBox, { alignItems: 'center', flex: 3 }]}>
                          <CircleScore style={{ marginTop: 10 }} percent={deck.recentScore} width={2} size={45} textSize={{ fontSize: 10 }} />
                        </View>
                        <View style={[styles.itemBox, { alignItems: 'flex-end', flex: 4 }]}>
                          <Text style={[styles.text, { fontSize: 15, marginTop: 10 }]}>{timeToString(deck.timeStamp)}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : null
            )) : <Text style={styles.empty}>You have no recent scores.</Text>
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    width: '100%',
    height: Platform.OS === 'ios' ? 150 : 120,
    backgroundColor: white,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  cameraIcon: {
    flex: 1,
    alignSelf: 'center',
    marginTop: 45,
  },
  profileAvatar: {
    alignItems: 'center',
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 5,
    borderColor: white,
    marginTop: -70,
  },
  text: {
    color: black,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: red,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: white,
    fontSize: 20,
  },
  deckContainer: {
    padding: 20,
  },
  deck: {
    backgroundColor: white,
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'column',
    justifyContent: 'space-between',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  bottomCardContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
  itemBox: {
    width: 50,
  },
  empty: {
    color: 'gray',
    flex: 1,
    fontWeight: 'bold',
    fontSize: 19,
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 100 : 40,
  },
});

function mapStateToProps({ decks, profile }) {
  const deckValuesArr = Object.values(decks);
  const newDeckArr = [];

  // only push objects that are not null and that have a recent score >= 0.
  for (let i = 0; i < deckValuesArr.length; i++) {
    if (deckValuesArr[i] !== null) {
      if (deckValuesArr[i] && deckValuesArr[i].recentScore >= 0) {
        newDeckArr.push(deckValuesArr[i]);
      }
    }
  }

  return {
    profile,
    decks: Object.values(newDeckArr).map((deck) => {
      const { timeStamp } = deck;

      return {
        ...deck,
        timeStamp,
      };
    }).sort((a, b) => b.timeStamp - a.timeStamp),
  };
}

export default connect(mapStateToProps)(Profile);
