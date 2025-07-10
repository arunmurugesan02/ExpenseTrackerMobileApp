import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import Colors from '../constants/colors';
import {n, SCREEN_WIDTH} from '../constants/normalize';
import {Regular1, Title1} from '../constants/Typography';

const OTPVerification = () => {
  const [code, setCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(300);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (): string => {
    const minutes = Math.floor(timer / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const resendCode = () => {
    setTimer(300);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Header showBack title="Verification" />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={n(80)}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={keyboardVisible} 
        >
          <Title1 style={styles.title}>Enter your Verification Code</Title1>

          <OTPInputView
            style={styles.otpContainer}
            pinCount={6}
            code={code}
            onCodeChanged={(val: string) => setCode(val)}
            autoFocusOnLoad
            keyboardType="number-pad"
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />

          <Text style={styles.timer}>{formatTime()}</Text>

          <Regular1 style={styles.infoText}>
            We sent a verification code to your email{' '}
            <Regular1 style={styles.emailText}>
              brajaoma*****@gmail.com
            </Regular1>
            . You can check your inbox.
          </Regular1>

          <TouchableOpacity onPress={resendCode} disabled={timer > 0}>
            <Text style={[styles.resendText, {opacity: timer > 0 ? 0.5 : 1}]}>
              I didn’t receive the code? Send again
            </Text>
          </TouchableOpacity>

          <CustomButton
            text="Verify"
            size="large"
            onPress={() => {
              // Verification logic
            }}
            style={styles.verifyButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPVerification;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.light100},
  content: {
    padding: n(20),
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  title: {
    textAlign: 'left',
    width: SCREEN_WIDTH * 0.7,
  },
  otpContainer: {
    width: '80%',
    height: n(100),
    marginTop: n(32),
  },
  underlineStyleBase: {
    width: n(40),
    height: n(45),
    borderBottomWidth: 1,
    borderColor: Colors.light20,
    fontSize: n(20),
    color: Colors.dark100,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.violet100,
  },
  timer: {
    textAlign: 'left',
    color: Colors.violet100,
    marginTop: n(16),
    fontSize: n(16),
  },
  infoText: {
    marginTop: n(16),
    color: Colors.dark50,
  },
  emailText: {
    color: Colors.violet100,
  },
  resendText: {
    color: Colors.violet100,
    marginTop: n(16),
    textDecorationLine: 'underline',
  },
  verifyButton: {
    marginTop: n(40),
    marginHorizontal: n(20),
    paddingVertical: n(20),
  },
});
