import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/colors';
import FastImage from 'react-native-fast-image';
import {n} from '../constants/normalize';

interface ButtonProps {
  text: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline';
  size?: 'large' | 'small';
  icon?: string;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  image?: any;
}

interface PillButtonProps {
  text: string;
  onPress: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({
  text,
  onPress,
  type = 'primary',
  size = 'large',
  icon,
  loading,
  style,
  textStyle,
  image,
}) => {
  const isPrimary = type === 'primary';
  const isSecondary = type === 'secondary';
  const isOutline = type === 'outline';

  const buttonStyles = [
    styles.base,
    isPrimary && {backgroundColor: Colors.violet100},
    isSecondary && {backgroundColor: Colors.violet20},
    isOutline && {
      borderColor: Colors.dark25,
      borderWidth: 1,
      backgroundColor: 'transparent',
    },
    size === 'small' && {paddingVertical: 6, paddingHorizontal: 12},
    style,
  ];

  const labelStyles: TextStyle[] = [
    {color: '#fff', fontWeight: '600'},
    isSecondary && {color: Colors.violet100},
    isOutline && {color: Colors.dark25},
    size === 'small' && {fontSize: 14},
    textStyle,
  ].filter(Boolean) as TextStyle[];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={loading}>
      {icon && (
        <Icon
          name={icon}
          size={16}
          color={
            isOutline ? Colors.dark25 : isSecondary ? Colors.violet100 : '#fff'
          }
          style={{marginRight: 6}}
        />
      )}
      {image && (
        <FastImage
          source={image}
          style={{marginRight: 6, width: n(20), height: n(20)}}
        />
      )}
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={labelStyles}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

export const PillButton: React.FC<PillButtonProps> = ({text, onPress}) => (
  <CustomButton
    text={text}
    onPress={onPress}
    type="secondary"
    size="small"
    style={{borderRadius: 20}}
  />
);

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
});
