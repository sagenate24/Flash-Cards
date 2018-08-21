import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { handleInitialData } from '../actions/shared';
import { gray, white, lightBlue, black, honeydew, red } from '../utils/colors';
import OnLoad from './OnLoad';


class DeckList extends Component {
  state = {
    ready: true,
    modalType: 'none',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    setTimeout(() => {
      this.setState(() => ({
        modalType: 'slide',
      }));
    }, 1000);

    dispatch(handleInitialData()).then(() =>
      setTimeout(() => {
        this.setState(() => ({
          ready: true,
        }));
      }, 4000));
  };

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return (
        <Modal
          animationType={this.state.modalType}
          transparent={false}
          visible={!ready}>
          <OnLoad />
        </Modal>
      );
    };

    return (
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity style={styles.newDeck} onPress={() => this.props.navigation.navigate(
            'NewDeck'
          )}>
            <Text style={styles.btnText}>
              Create a new study deck
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.deckListTitle}>Your Decks</Text>
        {Object.keys(decks).map((deck) => {

          return (
            <View style={styles.item} key={deck}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'Deck',
                { currentDeck: decks[deck] }
              )}>
                <Text style={{ fontSize: 20 }}>
                  {decks[deck].title}
                </Text>
                {decks[deck].questions && decks[deck].questions.length
                  ?
                  <Text style={{ fontSize: 16, color: lightBlue }}>
                    {decks[deck].questions.length > 1
                      ? decks[deck].questions.length + ` Cards`
                      : decks[deck].questions.length + ` Card`}
                  </Text>
                  :
                  <Text style={{ color: gray, fontSize: 16 }}>EMPTY</Text>
                }
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  newDeck: {
    backgroundColor: red,
    borderRadius: 2,
    padding: 24,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 17,
    justifyContent: 'center',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  deckListTitle: {
    fontSize: 20,
    color: black,
    fontWeight: 'bold',
    paddingTop: 47,
    paddingBottom: 30,
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
});

function mapStateToProps({ decks }) {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(DeckList);
