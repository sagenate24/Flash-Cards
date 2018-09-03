import React, { PureComponent } from 'react';
import { Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

class ProfilePic extends PureComponent {
  render() {
    const { styles, borderColor, backUpSize, profile, backUp } = this.props;

    if (backUp === false) {
      return <Image style={[styles, { borderColor }]} source={{ uri: profile.avatar }} />;
    }
    if (profile.avatar === '') {
      return (
        Platform.OS === 'ios'
          ? <Ionicons name="ios-person" size={backUpSize + 15} color={borderColor} />
          : <Ionicons name="md-person" size={backUpSize} color={borderColor} />
      );
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
