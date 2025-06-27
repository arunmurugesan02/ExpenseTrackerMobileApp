import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const AttachmentButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon name="paperclip" size={18} color="#9E9E9E" />
      <Text style={styles.text}>Add attachment</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
  },
  text: {
    marginLeft: 8,
    color: '#9E9E9E',
    fontSize: 14,
  },
});

export default AttachmentButton;
