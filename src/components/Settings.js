import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ImageEditor,
  TouchableOpacity,
  Switch,
  Linking,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import { white, black, gray, red, yellow } from '../utils/colors';
import { askPermissionsAsync } from '../utils/helpers';
import { editCover, editAvatar, editUsername, receiveProfile, editParentControl } from '../actions/profile';
import { deleteProfile, addProfileImg, addProfileName, addProfileCover, editParentalControl } from '../utils/api';

import NASBtn from './NASBtn';

class Settings extends Component {
  state = {
    status: null,
    userName: '',
    showInput: false,
    underColorU: false,
    parentalControls: false,
  };

  componentDidMount() {
    const { parentalControl } = this.props;
    askPermissionsAsync().then((status) => {
      if (status === 'granted') {
        this.setState(() => ({ status }));
      }
      this.setState(() => ({ status }));
    });
    if (parentalControl === 'on') {
      this.setState(() => ({
        parentalControls: true,
      }));
    } else {
      this.setState(() => ({
        parentalControls: false,
      }));
    }
  }

  askPermission = (type) => {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.pickImage(type);
        }
        this.setState(() => ({ status }));
      }).catch(() => this.setState(() => ({ status: 'undetermined' })));
  };

  pickImage = (type) => {
    const { dispatch, navigation } = this.props;
    let aspectSize;
    if (type === 'cover') {
      aspectSize = [2, 1];
    } else {
      aspectSize = [1, 1];
    }

    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: aspectSize,
    }).then((result) => {
      if (result.cancelled) {
        return;
      }
      ImageEditor.cropImage(result.uri, {
        offset: { x: 0, y: 0 },
        size: { width: result.width, height: result.height },
        resizeMode: 'contain',
      }, () => {
        if (type === 'avatar') {
          addProfileImg(result.uri);
          dispatch(editAvatar(result.uri));
        } else if (type === 'cover') {
          addProfileCover(result.uri);
          dispatch(editCover(result.uri));
        }

        navigation.navigate('Profile');
      }, () => {});
    });
  };

  submitUserName = () => {
    const { userName } = this.state;
    const { dispatch } = this.props;

    addProfileName(userName);
    dispatch(editUsername(userName));

    this.setState(() => ({
      showInput: false,
      userName: '',
    }));

    this.goTo('Profile');
  };

  removeProfile = () => {
    const { dispatch } = this.props;

    deleteProfile()
      .then((results) => {
        dispatch(receiveProfile(results));
      }).then(() => {
        this.goTo('Profile');
      });
  };

  goTo = (view) => {
    const { navigation } = this.props;
    setTimeout(() => {
      navigation.navigate(view);
    }, 500);
  };

  showOrHideInput = () => {
    const { showInput } = this.state;

    if (showInput === false) {
      this.setState(() => ({
        showInput: true,
        underColorU: false,
        userName: '',
      }));
    } else {
      this.setState(() => ({ showInput: false }));
    }
  }

  handleToggleSwitch = () => {
    const { parentalControls } = this.state;
    const { dispatch } = this.props;

    if (!parentalControls) {
      dispatch(editParentControl('on'));
      editParentalControl('on');

      this.setState(() => ({
        parentalControls: true,
      }));
    } else if (parentalControls) {
      dispatch(editParentControl('off'));
      editParentalControl('off');

      this.setState(() => ({
        parentalControls: false,
      }));
    }
  }

  render() {
    const { status, showInput, userName, underColorU, parentalControls } = this.state;
    const { allEmptyValues, username } = this.props;
    const charactersLeft = 20 - userName.length;

    return (
      <View style={styles.container}>
        <View>
          <View style={[styles.item, { flexDirection: 'row' }]}>
            <Text style={[styles.itemText, { marginTop: 4, flex: 6 }]}>Edit Username</Text>
            <Switch
              value={showInput}
              onValueChange={this.showOrHideInput}
              style={{ flex: 1 }}
            />
          </View>
          {showInput
            ? (
              <View style={styles.inputName}>
                <TextInput
                  maxLength={20}
                  value={userName}
                  selectionColor="#000"
                  underlineColorAndroid="rgba(0,0,0,0)"
                  onFocus={() => this.setState({ underColorU: true })}
                  onChangeText={userName => this.setState({ userName })}
                  style={underColorU === true ? styles.inputIsActive : styles.input}
                />
                {charactersLeft <= 6 && (
                  <Text style={styles.inputIsGettingFull}>{charactersLeft}</Text>
                )}
                <NASBtn
                  onPress={this.submitUserName}
                  disabled={userName === '' || userName === username}
                  textStyle={{ color: red }}
                  tintColor={{ borderColor: red, borderWidth: 3, backgroundColor: white, marginRight: 80, marginLeft: 80 }}
                >
                  Submit
                </NASBtn>
              </View>
            )
            : null
          }
        </View>
        <View style={[styles.item, { flexDirection: 'row' }]}>
          <Text style={[styles.itemText, { marginTop: 4, flex: 6 }]}>Parental Control</Text>
          <Switch
            value={parentalControls}
            onValueChange={this.handleToggleSwitch}
            style={{ flex: 1 }}
          />
        </View>
        {status === 'granted' && (
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity style={styles.item} onPress={() => this.askPermission('avatar')}>
              <Text style={styles.itemText}>Edit Profile Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={() => this.askPermission('cover')}>
              <Text style={styles.itemText}>Edit Cover Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.item, { marginTop: 10 }]} disabled={allEmptyValues === true} onPress={() => this.removeProfile()}>
              <Text style={[styles.deleteText, allEmptyValues === true && { opacity: 0.7 }]}>Delete Profile</Text>
            </TouchableOpacity>
          </View>
        )}
        {status === 'denied' && (
          <View style={styles.center}>
            <Foundation name="alert" size={50} />
            <Text style={{ textAlign: 'center' }}>
              You denied access to your camera roll. You can fix this by visiting your settings and enableing access to camera roll for this app.
            </Text>
          </View>
        )}
        {status === 'undetermined' && (
          <View style={styles.center}>
            <Foundation name="alert" size={50} />
            <Text style={{ textAlign: 'center' }}>
              You need to enable access to your camera roll for this app.
            </Text>
            <TouchableOpacity onPress={this.askPermission} style={styles.button}>
              <Text style={styles.buttonText}>
                Enable
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          style={[styles.item, { marginTop: 10 }]}
          onPress={() => { Linking.openURL('https://s3.us-east-2.amazonaws.com/flashcardsprivacypolicy/privacy_policy.html'); }}
        >
          <Text style={[styles.itemText]}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  inputName: {
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: gray,
    borderBottomWidth: 1,
    backgroundColor: white,
  },
  deleteText: {
    color: red,
    fontSize: 20,
  },
  item: {
    backgroundColor: white,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: gray,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 20,
    color: black,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 40,
    fontSize: 20,
    color: black,
    borderBottomWidth: 2,
    paddingBottom: 2,
    borderColor: black,
    backgroundColor: white,
  },
  inputIsActive: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 40,
    marginLeft: 40,
    fontSize: 20,
    color: black,
    borderBottomWidth: 4,
    borderColor: yellow,
    backgroundColor: white,
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
  inputIsGettingFull: {
    color: red,
    marginLeft: 40,
    fontSize: 16,
    opacity: 0.9,
  },
});

function mapStateToProps({ profile }) {
  let allEmptyValues;
  if (profile.username === '' && profile.avatar === '' && profile.cover === '') {
    allEmptyValues = true;
  } else {
    allEmptyValues = null;
  }

  return {
    allEmptyValues,
    username: profile.username,
    parentalControl: profile.parentControl,
  };
}

export default connect(mapStateToProps)(Settings);
