import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { getProfile } from '../utils/api';
import { connect } from 'react-redux';
import { gray, black } from '../utils/colors';
import { timeToString } from '../utils/helpers';
import Score from './Score';

class Profile extends Component {
  state = {
    image: null,
    profileCover: null,
    userName: null,
    status: null,
  }

  componentDidMount() {
    getProfile()
      .then((results) => {
        console.log(results)
        if (results && results.avatar && results.name && results.profileCover ) {
          this.setState(() => ({
            image: results.avatar,
            userName: results.name,
            profileCover: results.profileCover
          }));
        } else {
          this.setState(() => ({
            image: null,
            userName: null,
            profileCover: null
          }));
        }
      })
  }

  render() {
    const { image, profileCover, status, userName } = this.state;
    const { decks } = this.props;

    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied your location. You can fix this by visiting your settings and enableing location services for this app.
          </Text>
        </View>
      );
    }

    if (status === 'undetermined') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You need to enable location services for this app.
          </Text>
          <TouchableOpacity onPress={this.askPermission} style={styles.button}>
            <Text style={styles.buttonText}>
              Enable
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View>
          {profileCover && (
            <Image style={styles.topContent} source={{ uri: profileCover }} />
          )}
        </View>
        <View style={styles.profileHeader}>
          {image && (
            <View>
              <Image style={styles.img} source={{ uri: image }} />
            </View>
          )}
          {userName && (
            <Text style={{ fontSize: 30, color: '#000', padding: 20 }}>{userName}</Text>
          )}
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.quizScoreTitle}>Lastest Quiz Scores</Text>
          {decks.map((deck) => {

            return (
              <View style={styles.item} key={deck.timeStamp}>
                <View style={[styles.itemBox, {alignItems: 'flex-start', flex: 3}]}>
                  <Text style={{ fontSize: 20 }}>
                    {deck.title}
                  </Text>
                  {deck.questions && deck.questions.length
                    ?
                    <Text style={{ fontSize: 16, color: '#6ed3cf' }}>
                      {deck.questions.length > 1
                        ? deck.questions.length + ` Cards`
                        : deck.questions.length + ` Card`}
                    </Text>
                    :
                    <Text style={{ color: gray, fontSize: 16 }}>EMPTY</Text>
                  }
                </View>
                <View style={[styles.itemBox, { alignItems: 'center', flex: 4}]}>
                  {deck && deck.recentScore
                    ? <Score style={{ margin: 10 }} percent={deck.recentScore} width={3} size={45} />
                    : null
                    }
                </View>
                <View style={[styles.itemBox, {alignItems: 'flex-end', flex: 3}]}>
                {deck && deck.recentScore
                    ? <Text style={{ color: '#1b1b7e', fontSize: 16 }}>{timeToString(deck.timeStamp)}</Text>
                    : <Text style={{ fontSize: 16 }}>Take quiz</Text>
                    }
                </View>
              </View>
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
    backgroundColor: 'white',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  profileHeader: {
    alignItems: 'center'
  },
  img: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: -70,
  },
  quizScoreTitle: {
    fontSize: 20,
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

function mapStateToProps(decks) {
  return {
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