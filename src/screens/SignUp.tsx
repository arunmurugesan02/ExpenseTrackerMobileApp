import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ToggleItem from '../components/ToggleItem';
import {Regular2, Regular3} from '../constants/Typography';
import Colors from '../constants/colors';
import imageConstants from '../constants/imageConstants';
import {n, SCREEN_WIDTH} from '../constants/normalize';

const SignUp = () => {
  const [checkbox, setCheckbox] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header showBack title="Sign Up" />

      <View style={styles.container}>
        <InputField
          placeholder="Name"
          onPress={() => {}}
          value={name}
          onChangeText={setName}
        />
        <InputField
          placeholder="Email"
          onPress={() => {}}
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Password"
          secureToggle
          showEyeIcon
          onPress={() => {}}
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.toggleContainer}>
          <ToggleItem
            type="checkbox"
            value={checkbox}
            onValueChange={setCheckbox}
          />
          <Regular3 style={styles.text1}>
            By signing up, you agree to the{' '}
            <Regular3 style={styles.termText}>
              Terms of Service and Privacy Policy
            </Regular3>
          </Regular3>
        </View>

        <CustomButton
          text="Sign Up"
          size="large"
          onPress={() => {}}
          style={styles.buttonPrimary}
        />

        <Regular3 style={styles.orWithText}>Or with</Regular3>

        <CustomButton
          text="Sign Up with Google"
          size="large"
          type="outline"
          onPress={() => {}}
          style={styles.buttonSecondary}
          image={imageConstants.google}
        />

        <Regular2 style={styles.text3}>
          Already have an account?{' '}
          <Regular2 style={styles.loginText}>Login</Regular2>
        </Regular2>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  buttonPrimary: {
    marginHorizontal: n(10),
    marginTop: n(33),
    paddingVertical: n(20),
  },
  buttonSecondary: {
    marginHorizontal: n(10),
    marginTop: n(16),
    paddingVertical: n(20),
  },
  container: {paddingHorizontal: n(16), marginTop: n(56)},
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: n(16),
    gap: n(10),
  },
  text1: {width: SCREEN_WIDTH * 0.7},
  termText: {color: Colors.violet100},
  orWithText: {
    color: Colors.dark25,
    textAlign: 'center',
    paddingTop: n(12),
  },
  text3: {
    textAlign: 'center',
    color: Colors.dark25,
    paddingTop: n(16),
  },
  loginText: {color: Colors.violet100, textDecorationLine: 'underline'},
});
