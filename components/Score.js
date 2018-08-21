import React, { Component } from 'react';
import { Text, Easing, Animated } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class Score extends Component {
  state = {
    fill: 0
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => ({
        fill: this.props.percent
      }));
    }, 200);
  };

  colorPicker = (percent) => {
    if (percent <= 40) {
      return '#D71414';
    }
    if (percent <= 80) {
      return '#e3b505';
    }
    if (percent === 100) {
      return '#14D751';
    };
  };

  render() {
    const { textSize, size, width } = this.props;

    return (
      <AnimatedCircularProgress
      size={size}
      width={width}
      prefill={0}
      fill={this.state.fill}
      ref={(ref) => this.state.percentCircle = ref}
      tintColor={this.colorPicker(this.state.fill)}
      rotation={360}
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#f2f2f2" >
      {
          () => (
            <Text style={textSize}>
              {this.state.fill}%
            </Text>
          )
      }
    </AnimatedCircularProgress>
    );
  }
}

export default Score;
