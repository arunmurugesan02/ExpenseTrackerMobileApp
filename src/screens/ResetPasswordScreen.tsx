import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import InputField from '../components/InputField';
import {n} from '../constants/normalize';

const ResetPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [retype, setRetype] = useState('');

  const handleContinue = () => {
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Header showBack title="Reset Password" />

      <View style={styles.container}>
        <InputField
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          onPress={() => {}}
        />

        <View style={styles.spacer} />

        <InputField
          placeholder="Retype New Password"
          value={retype}
          onChangeText={setRetype}
          onPress={() => {}}
        />

        <CustomButton
          text="Continue"
          onPress={handleContinue}
          size="large"
          style={styles.buttonPrimary}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: n(10),
    paddingTop: n(56),
  },
  spacer: {
    marginTop: n(10),
  },
  buttonPrimary: {
    marginHorizontal: n(10),
    marginTop: n(33),
    paddingVertical: n(20),
  },
});
