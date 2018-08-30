import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageEditor,
  TouchableOpacity,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import {
  deleteProfile,
  addProfileImg,
  addProfileName,
  addProfileCover,
} from '../utils/api';
import { ImagePicker, Permissions } from 'expo';
import { white, black, gray, red } from '../utils/colors';
import { editCover, editAvatar, editUsername, receiveProfile } from '../actions/profile';

class Settings extends Component {
  state = {
    status: null,
    userName: '',
    showInput: false,
    underColorU: false
  };

  componentDidMount() {
    Permissions.getAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) => {
        if (status === 'granted') {
          this.setState(() => ({ status }));
        }
        this.setState(() => ({ status }));
      })
      .catch((error) => {
        console.warn('Error getting Location permission: ', error);
        this.setState(() => ({ status: 'undetermined' }));
      });
  };

  askPermission = (type) => {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.pickImage(type);
        }
        this.setState(() => ({ status }));
      }).catch((error) => {
        console.warn('Error getting camera roll permission: ', error);
        this.setState(() => ({ status: 'undetermined' }));
      });
  };

  pickImage = (type) => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1]
    }).then((result) => {
      if (result.cancelled) {
        return;
      };
      ImageEditor.cropImage(result.uri, {
        offset: { x: 0, y: 0 },
        size: { width: result.width, height: result.height },
      }, () => {
        if (type === 'avatar') {
          addProfileImg(result.uri);
          this.props.dispatch(editAvatar(result.uri));
        } else if (type === 'cover') {
          addProfileCover(result.uri);
          this.props.dispatch(editCover(result.uri));
        }

        this.props.navigation.navigate('Profile');
      },
        () => console.log('Error'));
    });
  };

  submitUserName = () => {
    const { userName } = this.state;
    const { dispatch } = this.props;
    addProfileName(userName);
    dispatch(editUsername(userName));

    this.setState(() => ({
      userName: '',
      showInput: false
    }));

    this.goTo('Profile');
  };

  removeProfile = () => {
    deleteProfile()
      .then((results) => {
        this.props.dispatch(receiveProfile(results));
      }).then(() => {
        this.goTo('Profile');
      });
  };

  goTo = (view) => {
    setTimeout(() => {
      this.props.navigation.navigate(view)
    }, 1000);
  };

  showOrHideInput = () => {
    if (this.state.showInput === false) {
      this.setState(() => ({
        showInput: true,
        underColorU: false,
        userName: ''
      }));
    } else {
      this.setState(() => ({ showInput: false }));
    }

  }

  render() {
    const { status, showInput, userName, underColorU } = this.state;

    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied your location. You can fix this by visiting your settings and enableing location services for this app.
          </Text>
        </View>
      );
    };

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
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.showOrHideInput()}>
          <Text style={styles.itemText}>Edit Username</Text>
          {showInput
            ? <View>
              <TextInput
                value={userName}
                selectionColor={'#000'}
                maxLength={16}
                style={underColorU === true ? styles.inputIsActive : styles.input}
                onFocus={() => this.setState({ underColorU: true })}
                underlineColorAndroid='rgba(0,0,0,0)'
                onChangeText={(userName) => this.setState({ userName })}
              />
              <TouchableOpacity
                style={styles.button}
                disabled={userName === ''}
                onPress={this.submitUserName}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
            : null
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => this.askPermission('avatar')}>
          <Text style={styles.itemText}>Edit Profile Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => this.askPermission('cover')}>
          <Text style={styles.itemText}>Edit Cover Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => this.removeProfile()}>
          <Text style={styles.deleteInfo}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: white,
  },
  deleteInfo: {
    color: red,
    fontSize: 22,
  },
  item: {
    padding: 10,
    borderColor: gray,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 21,
    color: black,
  },
  input: {
    margin: 10,
    fontSize: 18,
    borderBottomWidth: 2,
    paddingBottom: 2,
    borderColor: black,
    backgroundColor: white,
  },
  inputIsActive: {
    margin: 10,
    fontSize: 18,
    borderBottomWidth: 4,
    borderColor: '#e6b800',
    backgroundColor: white,
  },
  button: {
    padding: 10,
    backgroundColor: red,
    marginLeft: 40,
    marginTop: 10,
    marginRight: 40,
    borderRadius: 2,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonText: {
    paddingLeft: 10,
    fontSize: 18,
    alignSelf: 'center',
    color: white,
    fontWeight: 'bold'
  },
});

function mapStateToProps(decks) {
  return {
    decks
  };
};

export default connect(mapStateToProps)(Settings);
