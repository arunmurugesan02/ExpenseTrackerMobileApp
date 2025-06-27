import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Props extends TextInputProps {
  secureToggle?: boolean;
  showEyeIcon?: boolean;
}

const InputField: React.FC<Props> = ({
  secureToggle = false,
  showEyeIcon = false,
  ...props
}) => {
  const [secure, setSecure] = useState(secureToggle);

  return (
    <View style={styles.container}>
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
    </View>
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
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default InputField;
