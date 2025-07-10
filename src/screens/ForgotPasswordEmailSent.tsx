import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import imageConstants from '../constants/imageConstants';
import {n, SCREEN_HEIGHT, SCREEN_WIDTH} from '../constants/normalize';
import {Regular1, Title2} from '../constants/Typography';

const ForgotPasswordEmailSent = () => {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top', 'bottom', 'right', 'left']}>
      <View style={styles.container}>
        <View style={styles.content}>
          <FastImage
            source={imageConstants.variantEmail}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Title2>Your email is on the way</Title2>
          <Regular1 style={styles.desc}>
            Check your email test@test.com and follow the instructions to reset
            your password
          </Regular1>
        </View>
        <CustomButton
          text="Back to Login"
          size="large"
          onPress={() => {}}
          style={styles.buttonPrimary}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordEmailSent;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {flex: 1, justifyContent: 'space-between'},
  buttonPrimary: {
    marginHorizontal: n(10),
    marginTop: n(33),
    paddingVertical: n(20),
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: n(20),
  },
  image: {width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.4},
  desc: {
    paddingVertical: n(20),
    paddingHorizontal: n(50),
    lineHeight: n(20),
  },
});
