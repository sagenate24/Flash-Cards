import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ImageEditor,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { ImagePicker, Permissions } from 'expo';
import { addProfileImg, addProfileName, getProfile, addProfileCover } from '../utils/api';
import { connect } from 'react-redux';

class Settings extends Component {
  state = {
    image: null,
    userName: null,
    showInput: false,
    status: null,
  }

  componentDidMount() {
    getProfile()
      .then((results) => {
        if (results && results.avatar && results.name) {
          this.setState(() => ({
            image: results.avatar,
            userName: results.name
          }));
        } else {
          this.setState(() => ({
            image: null
          }));
        }
      })
  }

  askPermission = () => {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(({ status }) => {
        if (status === 'granted') {
          return this.pickImage();
        }

        this.setState(() => ({ status }));
      }).catch((error) => {
        console.warn('Error getting camera roll permission: ', error)

        this.setState(() => ({ status: 'undetermined' }))
      })
  }

  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [2, 1]
    }).then((result) => {
      console.log(result)
      if (result.cancelled) {
        return
      }



      ImageEditor.cropImage(result.uri, {
        offset: { x: 0, y: 0 },
        size: { width: result.width, height: result.height },
        displaySize: { width: 300, height: 160, },
        resizeMode: 'contain',
      }, (uri) => addProfileCover(result.uri),
        () => console.log('Error'))
    });
  };

  submitUserName = () => {
    const { userName } = this.state;
    this.setState(() => ({
      showInput: false
    }))
    addProfileName(userName)
  }

  render() {
    const { image, status, showInput, userName } = this.state;

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
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.topContent}>
        </View>

        {image && (
          <View>
            <Image style={styles.img} source={{ uri: image }} />
          </View>
        )}
        {userName && (
          <Text style={{ fontSize: 30, color: '#000' }}>{userName}</Text>
        )}
        <KeyboardAvoidingView style={styles.center} behavior='padding' enabled>
          <TouchableOpacity onPress={() => this.askPermission()}>
            <Text>Choose photo</Text>
            {showInput
              ? <View>
                <TextInput
                  value={this.state.userName}
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
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topContent: {
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
  img: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    borderRadius: 70,
    marginBottom: 20,
    marginTop: -70,
  },
  editPicIcon: {
    alignSelf: 'flex-end',
    marginTop: -40,
    marginLeft: -20,
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
});

function mapStateToProps(decks) {
  return { decks }
}

export default connect(mapStateToProps)(Settings);