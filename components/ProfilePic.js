import React from 'react';
import { Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';

class ProfilePic extends React.Component {
  render() {
    const {
      styles, borderColor, backUpSize, profile,
    } = this.props;

    if (this.props.backUp === false) {
      return <Image style={[styles, { borderColor }]} source={{ uri: profile.avatar }} />;
    }
    if (profile.avatar === '') {
      return <Entypo name="user" size={backUpSize} color={borderColor} />;
    }

    return <Image style={[styles, { borderColor }]} source={{ uri: profile.avatar }} />;
  }
}

function mapStateToProps({ profile }) {
  return {
    profile,
  };
}

export default connect(mapStateToProps)(ProfilePic);
