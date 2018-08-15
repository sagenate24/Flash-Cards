import React from 'react';
import { getProfile } from '../utils/api';
import { Image, StyleSheet } from 'react-native';

class ProfilePic extends React.Component {
  state = {
    profileImage: null
  }
  componentDidMount() {
    getProfile().then((results) => {
      if (results && results.avatar) {
        this.setState({ profileImage: results.avatar})
      }
    });
  }
  render() {
    const { profileImage } = this.state;

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