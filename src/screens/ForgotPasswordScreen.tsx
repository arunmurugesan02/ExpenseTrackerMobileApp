import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import InputField from '../components/InputField';
import {n, SCREEN_WIDTH} from '../constants/normalize';
import {Title2} from '../constants/Typography';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header showBack title="Forgot Password" />
      <View style={styles.container}>
        <Title2 style={styles.text}>
          Don’t worry.{'\n'}Enter your email and we’ll send you a link to reset
          your password.
        </Title2>
        <InputField
          placeholder="Email"
          onPress={() => {}}
          value={email}
          onChangeText={setEmail}
        />
        <CustomButton
          text="Login"
          size="large"
          onPress={() => {}}
          style={styles.buttonPrimary}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {
    paddingHorizontal:n(10)
  },
  text: {
    paddingTop: n(70),
    lineHeight: n(30),
    fontSize: 28,
    paddingBottom: n(46),
    width: SCREEN_WIDTH * 0.8,
  },
  buttonPrimary: {
    marginHorizontal: n(10),
    marginTop: n(33),
    paddingVertical: n(20),
  },
});
