import React from 'react';
import { Text, Easing } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

function colorPicker(percent) {
  let color;

  if (percent <= 40) {
    color = 'red'
  } else if (percent <= 80) {
    color = '#eded0f'
  } else if (percent === 100) {
    color = '#0fed7a'
  }

  return color;
}

export default function Score({ size, percent, width, textSize }) {

  return (
    <AnimatedCircularProgress
      size={size}
      width={width}
      prefill={0}
      fill={percent}
      tintColor={colorPicker(percent)}
      rotation={360}
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor="#f2f2f2" >
      {

          (fill) => (
            <Text style={textSize}>
              {percent}%
              </Text>
          )
      }
    </AnimatedCircularProgress>
  )
}