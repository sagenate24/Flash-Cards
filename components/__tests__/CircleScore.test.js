import 'react-native';
import React from 'react';
import { shallow } from 'enzyme';
import { lightBlue, yellow, red } from '../../utils/colors';

import CircleScore, { colorPicker } from '../CircleScore';

it('should render snapshot', () => {
  const wrapper = shallow(<CircleScore textSize={{ fontSize: 34 }} width={5} size={130} percent={50} />);
  expect(wrapper).toMatchSnapshot();
});

it('Should return the correct color', () => {
  expect(colorPicker(20)).toEqual(red);
  expect(colorPicker(60)).toEqual(yellow);
  expect(colorPicker(100)).toEqual(lightBlue);
});
