import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import utils from './utils';

interface IProps {
  size?: number;
  color?: string;
}

Icon.loadFont();

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

export const CloseIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'close-sharp'} size={size ?? 14} color={color ?? '#642A8C'} />
);

export const LocationIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={utils.isAndroid ? 'md-location' : 'ios-location'}
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);

export const LogoutIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'log-out-outline'} size={size ?? 14} color={color ?? '#642A8C'} />
);

export const CheckBoxIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={'checkbox-outline'}
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);

export const CheckMarkIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={utils.isAndroid ? 'md-checkmark' : 'ios-checkmark;'}
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);

export const RadioBtnOnIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={'radio-button-on-outline'}
    size={size ?? 14}
    color={color ?? '#642A8C'}
  />
);

export const RadioBtnOffIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={'radio-button-off-outline'}
    size={size ?? 14}
    color={color ?? '#F2F2F2'}
  />
);

export const HelpCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={'help-circle'}
    size={size ?? 22}
    color={color ?? '#bbb'}
    style={{marginLeft: 5}}
  />
);

export const AddCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name="add-circle-outline"
    size={size ?? 30}
    color={color ?? '#642A8C'}
  />
);

export const PersonCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={
      utils.isAndroid ? 'md-person-circle-outline' : 'ios-person-circle-outline'
    }
    size={size ?? 17}
    color={color ?? '#642A8C'}
  />
);

export const ReloadCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'reload-outline'} size={size ?? 26} color={color ?? 'black'} />
);

export const UpIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name="caret-up" size={size ?? 22} color={color ?? 'white'} />
);

export const DownIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'caret-down'} size={size ?? 22} color={color ?? 'white'} />
);

export const CloseCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={'close-circle-outline'}
    size={size ?? 22}
    color={color ?? 'black'}
  />
);

export const EllipseIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'ellipse-sharp'} size={size ?? 16} color={color ?? 'black'} />
);

export const HelpIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'help'} size={size ?? 24} color={color ?? 'white'} />
);

export const SettingIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'settings-sharp'} size={size ?? 24} color={color ?? 'white'} />
);

export const QrCodeIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name="qrcode-scan" size={size ?? 36} color={color ?? '#642A8C'} />
);

export const CalendarIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={utils.isAndroid ? 'md-calendar-outline' : 'ios-calendar-outline'}
    size={size ?? 20}
    color={color ?? 'white'}
  />
);

export const CameraIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'camera-outline'} size={size ?? 30} color={color ?? '#642A8C'} />
);

export const FlashOnIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'flash'} size={size ?? 20} color={color ?? '#FFF'} />
);

export const FlashOffIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'flash-off'} size={size ?? 20} color={color ?? '#FFF'} />
);

export const PersonAddIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={'person-add-outline'}
    size={size ?? 22}
    color={color ?? '#642A8C'}
  />
);

export const RemoveCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Icon
    name={'remove-circle-outline'}
    size={size ?? 30}
    color={color ?? '#B91C1B'}
  />
);

export const SearchIcon: React.FC<IProps> = ({size, color}) => (
  <Icon name={'search-outline'} size={size ?? 28} color={color ?? '#642A8C'} />
);
