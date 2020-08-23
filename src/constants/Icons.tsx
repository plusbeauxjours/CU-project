import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from './utils';

interface IProps {
  size?: number;
  color?: string;
}

export const ForwardIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={
      utils.isAndroid
        ? 'md-chevron-forward-outline'
        : 'ios-chevron-forward-outline'
    }
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);

export const BackIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={
      utils.isAndroid ? 'md-chevron-back-outline' : 'ios-chevron-back-outline'
    }
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);

export const CartIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={utils.isAndroid ? 'md-cart-outline' : 'ios-cart-outline'}
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);

export const HomeIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={utils.isAndroid ? 'md-home-outline' : 'ios-home-outline'}
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);
