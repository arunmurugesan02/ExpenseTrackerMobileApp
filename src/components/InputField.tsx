import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../constants/colors';
import {n} from '../constants/normalize';

interface Props extends TextInputProps {
  secureToggle?: boolean;
  showEyeIcon?: boolean;
  onPress: () => void;
}

const InputField: React.FC<Props> = ({
  secureToggle = false,
  showEyeIcon = false,
  onPress,
  ...props
}) => {
  const [secure, setSecure] = useState(secureToggle);

  return (
    <Pressable style={[styles.container, props.style]} onPress={onPress}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#B0B0B0"
        secureTextEntry={secure}
        {...props}
      />
      {showEyeIcon && (
        <TouchableOpacity onPress={() => setSecure(!secure)}>
          <Icon name={secure ? 'eye' : 'eye-off'} size={20} color="#9E9E9E" />
        </TouchableOpacity>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    marginBottom: n(10),
    borderWidth: 1,
    borderColor: Colors.light60,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingHorizontal: 7,
    paddingVertical: 7,
  },
});

export default InputField;
