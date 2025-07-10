// components/ToggleItem.tsx
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';

type ToggleType = 'checkbox' | 'radio' | 'switch';

interface ToggleItemProps {
  type: ToggleType;
  value: boolean;
  onValueChange: (val: boolean) => void;
}

const ToggleItem: React.FC<ToggleItemProps> = ({
  type,
  value,
  onValueChange,
}) => {
  const handlePress = () => onValueChange(!value);

  let icon;
  switch (type) {
    case 'checkbox':
      icon = value ? (
        <Ionicons name="checkbox" size={24} color={Colors.violet100} />
      ) : (
        <Ionicons name="square-outline" size={24} color={Colors.violet100} />
      );
      break;

    case 'radio':
      icon = value ? (
        <FontAwesome name="dot-circle-o" size={24} color={Colors.violet100} />
      ) : (
        <FontAwesome name="circle-thin" size={24} color={Colors.violet100} />
      );
      break;

    case 'switch':
      icon = value ? (
        <FontAwesome name="toggle-on" size={34} color={Colors.violet100} />
      ) : (
        <FontAwesome name="toggle-off" size={34} color={Colors.violet20} />
      );
      break;

    default:
      icon = null;
  }

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ToggleItem;
