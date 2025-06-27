// components/ToggleItem.tsx
import React from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
        <Ionicons name="checkbox" size={24} color="#A259FF" />
      ) : (
        <Ionicons name="square-outline" size={24} color="#A259FF" />
      );
      break;

    case 'radio':
      icon = value ? (
        <FontAwesome name="dot-circle-o" size={24} color="#A259FF" />
      ) : (
        <FontAwesome name="circle-thin" size={24} color="#A259FF" />
      );
      break;

    case 'switch':
      icon = value ? (
        <FontAwesome name="toggle-on" size={34} color="#A259FF" />
      ) : (
        <FontAwesome name="toggle-off" size={34} color="#ccc" />
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
