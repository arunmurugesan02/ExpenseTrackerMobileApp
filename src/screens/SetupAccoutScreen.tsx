import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import {n} from '../constants/normalize';
import {Regular2, Title1} from '../constants/Typography';

const SetupAccoutScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Title1 style={styles.title}>Let’s setup your account!</Title1>
          <Regular2 style={styles.desc}>
            Account can be your bank, credit card or your wallet.
          </Regular2>
        </View>
        <CustomButton
          text="Let’s go"
          onPress={() => {}}
          style={styles.buttonPrimary}
        />
      </View>
    </SafeAreaView>
  );
};

export default SetupAccoutScreen;

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    marginTop: n(100),
    height: '20%',
    justifyContent: 'space-between',
    margin: n(20),
  },
  title: {
    fontSize: 36,
    textAlign: 'left',
  },
  desc: {
    fontSize: 20,
    paddingRight: n(50),
  },
  buttonPrimary: {
    marginHorizontal: n(10),
    marginTop: n(33),
    paddingVertical: n(20),
  },
});
