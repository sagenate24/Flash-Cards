import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageEditor,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { addProfileName, getProfile, deleteProfile, removeDecks } from '../utils/api';
import { editCover, editAvatar, editUsername } from '../actions/profile';
import { addProfileCover, addProfileImg } from '../utils/api';
import { ImagePicker, Permissions } from 'expo';
import { connect } from 'react-redux';

class Settings extends Component {
  state = {
    showInput: false,
    status: null,
    userName: '',
  }

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
      })
  }

  askPermission = (type) => {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.pickImage(type);
        }

        this.setState(() => ({ status }));
      }).catch((error) => {
        console.warn('Error getting camera roll permission: ', error)

        this.setState(() => ({ status: 'undetermined' }))
      })
  }

  pickImage = (type) => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1]
    }).then((result) => {
      if (result.cancelled) {
        return
      }

      ImageEditor.cropImage(result.uri, {
        offset: { x: 0, y: 0 },
        size: { width: result.width, height: result.height },
        displaySize: { width: 300, height: 160, },
        resizeMode: 'contain',
      }, (uri) => {
        if (type === 'avatar') {
          addProfileImg(result.uri);
          this.props.dispatch(editAvatar(result.uri));
        } else if (type === 'cover') {
          addProfileCover(result.uri);
          this.props.dispatch(editCover(result.uri));
        }

        this.props.navigation.navigate(
          'Profile'
        )
      },
        () => console.log('Error'))
    });
  };

  showInput = () => {
    this.setState(() => ({
      showInput: true
    }))
  }

  submitUserName = () => {
    const { userName } = this.state;
    const { dispatch } = this.props;
    addProfileName(userName)
    dispatch(editUsername(userName));

    this.setState(() => ({
      userName: '',
      showInput: false
    }))

    setTimeout(() => {
      this.props.navigation.navigate(
        'Profile'
      )
    }, 1000)
  }


  render() {
    const { status, showInput, userName } = this.state;

    if (status === 'denied') {
      return (
        <View style={styles.center}>
          <Foundation name='alert' size={50} />
          <Text>
            You denied your location. You can fix this by visiting your settings and enableing location services for this app.
          </Text>
        </View>
      )
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
      )
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.item} onPress={() => this.showInput()}>
          <Text style={styles.itemText}>Edit Username</Text>
          {showInput
            ? <View>
              <TextInput
                value={userName}
                style={styles.userNameField}
                underlineColorAndroid='rgba(0,0,0,0)'
                onChangeText={(userName) => this.setState({ userName })}
                selectionColor={'#000'}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={this.submitUserName}
                disabled={userName === ''}>
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
        <TouchableOpacity style={styles.item} onPress={() => deleteProfile()}>
          <Text style={styles.deleteInfo}>Delete Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => removeDecks()}>
          <Text style={styles.deleteInfo}>Delete Decks</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  deleteInfo: {
    fontSize: 22,
    color: 'red',
  },
  item: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  itemText: {
    fontSize: 21,
    color: '#000',
  },
  userNameField: {
    margin: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#e6b800'
  },
  buttonText: {
    paddingLeft: 10,
  }
});

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(Settings);