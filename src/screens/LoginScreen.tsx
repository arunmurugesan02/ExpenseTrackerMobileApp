import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import InputField from '../components/InputField';
import {Regular2, Title3} from '../constants/Typography';
import Colors from '../constants/colors';
import {n, SCREEN_WIDTH} from '../constants/normalize';

const LoginScreen = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Header showBack title="Login" />
      <View style={styles.container}>
        <InputField
          placeholder="Name"
          onPress={() => {}}
          value={name}
          onChangeText={setName}
        />
        <InputField
          placeholder="Password"
          secureToggle
          showEyeIcon
          onPress={() => {}}
          value={password}
          onChangeText={setPassword}
        />

        <CustomButton
          text="Login"
          size="large"
          onPress={() => {}}
          style={styles.buttonPrimary}
        />
        <TouchableOpacity>
          <Title3 style={styles.forgotPasswordText}>Forgot Password?</Title3>
        </TouchableOpacity>

        <Regular2 style={styles.text3}>
          Don’t have an account yet?{' '}
          <Regular2 style={styles.signUpText}>Sign Up</Regular2>
        </Regular2>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {paddingHorizontal: n(16), marginTop: n(56)},
  text1: {width: SCREEN_WIDTH * 0.7},
  forgotPasswordText: {
    textAlign: 'center',
    color: Colors.violet100,
    textDecorationLine: 'underline',
    paddingVertical: n(33),
  },
  termText: {color: Colors.violet100},
  text3: {
    textAlign: 'center',
    color: Colors.dark25,
  },
  signUpText: {color: Colors.violet100, textDecorationLine: 'underline'},
  buttonPrimary: {
    marginHorizontal: n(10),
    marginTop: n(33),
    paddingVertical: n(20),
  },
});
