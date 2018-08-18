import React from 'react';
import { getProfile } from '../utils/api';
import { Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class ProfilePic extends React.Component {
  state = {
    profileImage: null
  }
  componentDidMount() {
    getProfile().then((results) => {
      if (results && results.avatar) {
        this.setState(() => ({
          profileImage: results.avatar
        }))
      } else {
        this.setState(() => ({
          profileImage: null
        }))
      }
    });
  }

  componentDidUpdate() {
    getProfile().then((results) => {
      if (results && results.avatar) {
        this.setState(() => ({
          profileImage: results.avatar
        }))
      } else {
        this.setState(() => ({
          profileImage: null
        }))
      }
    });
  }
  render() {
    const { profileImage } = this.state;

    if (profileImage === null) {
      return (
        <FontAwesome name='user-circle' size={40} color={this.props.tintColor} />
      )
    }

    return (
      profileImage && (
        <Image style={styles.image} source={{uri: this.state.profileImage}}/>
      )
    )
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
    width: 40,
    height: 40
  }
})

export default ProfilePic;