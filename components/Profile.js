import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { black } from '../utils/colors';
import { timeToString } from '../utils/helpers';
import Score from './Score';

class Profile extends Component {

  render() {
    const { decks, profile } = this.props;

    return (
      <ScrollView style={styles.container}>
        <View>
          {profile.cover.length > 1
            ? <Image style={styles.topContent} source={{ uri: profile.cover }} />
            : <View style={styles.topContent}>
              <Text style={{ fontSize: 16, alignSelf: 'center', marginTop: 10 }}>Choose cover photo</Text>
            </View>
          }
        </View>
        <View style={styles.profileHeader}>
          {profile.avatar.length > 1
            ? <View>
              <Image style={[styles.img]} source={{ uri: profile.avatar }} />
            </View>
            : <View style={styles.img}>
              <Text style={styles.cameraIcon}><Feather name='user-plus' color='#000' size={40} /></Text>
            </View>
          }
          {profile.username.length > 1
            ? <Text style={[styles.text, { fontSize: 30, padding: 20 }]}>{profile.username}</Text>
            : <Text style={[styles.text, { fontSize: 30, padding: 20 }]}>Create Username</Text>
          }
        </View>
        <View style={styles.itemContainer}>
          <Text style={[styles.text, { fontSize: 20 }]}>Lastest Quiz Scores</Text>
          {decks.map((deck) => {

            return (
              deck.recentScore || deck.recentScore === 0
                ? <View style={styles.item} key={deck.timeStamp}>
                  <View style={[styles.itemBox, { alignItems: 'flex-start', flex: 3 }]}>
                    <Text style={{ fontSize: 20 }}>
                      {deck.title}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#6ed3cf' }}>
                      {deck.questions.length > 1
                        ? deck.questions.length + ` Cards`
                        : deck.questions.length + ` Card`}
                    </Text>
                  </View>
                  <View style={[styles.itemBox, { alignItems: 'center', flex: 4 }]}>
                    <Score style={{ margin: 10 }} percent={deck.recentScore} width={3} size={45} />
                  </View>
                  <View style={[styles.itemBox, { alignItems: 'flex-end', flex: 3 }]}>
                    <Text style={[styles.text, { fontSize: 15 }]}>{timeToString(deck.timeStamp)}</Text>
                  </View>
                </View>
                : null
            )
          })}
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
    height: 150,
    backgroundColor: '#f7f7f7',
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
    marginTop: 50,
  },
  profileHeader: {
    alignItems: 'center'
  },
  img: {
    width: 140,
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: -70,
  },
  text: {
    color: black,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#1b1b7e',
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  itemContainer: {
    padding: 20,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  itemBox: {
    width: 50,
  }
});

function mapStateToProps({ decks, profile }) {
  return {
    profile,
    decks: Object.values(decks).map((deck) => {
      const { timeStamp } = deck;

      return {
        ...deck,
        timeStamp,
      }
    }).sort((a, b) => b.timeStamp - a.timeStamp)
  }
}

export default connect(mapStateToProps)(Profile);