import React from 'react';
import { Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { black, lightBlue, yellow, red } from '../utils/colors';

export const colorPicker = (percent) => {
  if (percent <= 40) {
    return red;
  }
  if (percent >= 41 && percent < 100) {
    return yellow;
  }
  if (percent === 100) {
    return lightBlue;
  }
};

export default function CircleScore({
  textSize, size, width, percent,
}) {
  return (
    <AnimatedCircularProgress
      size={size}
      duration={1000}
      width={width}
      prefill={0}
      arcSweepAngle={225}
      lineCap="round"
      fill={percent}
      tintColor={colorPicker(percent)}
      rotation={247.5}
      backgroundColor="#f2f2f2"
    >
      {
        () => (
          <Text style={[textSize, { color: black, fontWeight: 'bold' }]}>
            {percent}%
          </Text>
        )
      }
    </AnimatedCircularProgress>
  );
}
