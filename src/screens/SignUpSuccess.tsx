import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/colors';
import {Regular1, Title2} from '../constants/Typography';
import {n} from '../constants/normalize';

const SignUpSuccess = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Icon name="check-circle" size={70} color={Colors.green120} />
      <Title2>You are set!</Title2>
    </SafeAreaView>
  );
};

export default SignUpSuccess;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: n(8),
  },
});
