import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';
import {n} from '../constants/normalize';
import {Regular1, Title3} from '../constants/Typography';
const PinSetUpScreen = () => {
  const [pin, setPin] = useState<string>('');
  const [confirmedPin, setConfirmedPin] = useState<string>('');
  const [isTrue, setIsTrue] = useState<boolean>(false);

  const handlePress = async (val: string) => {
    if (val === 'back') {
      !isTrue
        ? setPin(pin?.slice(0, -1))
        : setConfirmedPin(confirmedPin.slice(0, -1));
    } else {
      if (!isTrue) {
        const updatedPin = pin + val;
        setPin(updatedPin);
        if (updatedPin?.length == 4) setTimeout(() => setIsTrue(!isTrue), 100);
      } else {
        const updatedPin = confirmedPin + val;
        setConfirmedPin(updatedPin);
        if (updatedPin?.length == 4) {
          if (pin === updatedPin) console.log('Correct Pin');
          else console.log('InCorrect Pin');
        }
      }
    }
  };

  const numKeyPads: string[][] = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['back', '0', 'next'],
  ];
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <Title3 style={styles.title}>
        {!isTrue ? 'Let’s setup your PIN' : 'Ok. Re type your PIN again.'}
      </Title3>
      <View style={styles.dotContainer}>
        {[0, 1, 2, 3].map((_, index) => {
          const lengthToCheck = isTrue ? confirmedPin.length : pin.length;
          return (
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index < lengthToCheck ? Colors.light100 : Colors.violet100,
                  borderWidth: index < lengthToCheck ? 0 : 2,
                  borderColor:
                    index < lengthToCheck
                      ? Colors.light100
                      : Colors.violetLight,
                },
              ]}
              key={index}></View>
          );
        })}
      </View>
      <View style={styles.keyPadContainer}>
        {numKeyPads.map((row: string[], rowIndex: number) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                onPress={() => {
                  if (item === 'next' && pin.length === 4) {
                    console.log('Pin =>', pin);
                    setIsTrue(!isTrue);
                  } else {
                    handlePress(item);
                  }
                }}
                style={styles.numberText}>
                {item === 'back' ? (
                  <Icon
                    name="backspace-outline"
                    size={30}
                    color={Colors.light100}
                  />
                ) : item === 'next' ? (
                  <Icon
                    name="arrow-forward"
                    size={30}
                    color={Colors.light100}
                  />
                ) : (
                  <Regular1
                    style={{
                      color: Colors.light100,
                      fontWeight: '700',
                      fontSize: 20,
                    }}>
                    {item}
                  </Regular1>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default PinSetUpScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.violet100,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {color: Colors.light100},
  dotContainer: {
    flexDirection: 'row',
    paddingTop: n(20),
  },
  dot: {
    width: n(20),
    height: n(20),
    borderRadius: 50,
    marginHorizontal: n(10),
  },
  keyPadContainer: {
    marginTop: n(30),
    width: '80%',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  numberText: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: n(30),
  },
});
