import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome6';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';
import InputField from '../components/InputField';
import Colors from '../constants/colors';
import {n} from '../constants/normalize';
import {Title2} from '../constants/Typography';
const NewAccount = () => {
  const [name, setName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const options = [{label: 'Bank', value: 'Bank'}];
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <Header
        showBack
        title="Add new account"
        style={{backgroundColor: Colors.violet100}}
        textStyle={{color: Colors.light100}}
      />
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Title2
          style={{
            color: Colors.light20,
            paddingBottom: n(10),
            paddingLeft: n(10),
          }}>
          Balance
        </Title2>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: n(5),
            paddingBottom: n(20),
            paddingLeft: n(10),
          }}>
          <Icon name="indian-rupee-sign" size={50} color={Colors.light100} />
          <Text
            style={{color: Colors.light100, fontSize: 55, fontWeight: '500'}}>
            00.00
          </Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.light100,
            borderTopLeftRadius: n(20),
            borderTopRightRadius: n(20),
            paddingVertical: n(30),
            paddingHorizontal: n(20),
          }}>
          <InputField
            placeholder="Name"
            onPress={() => {}}
            value={name}
            onChangeText={setName}
          />
          <DropDownPicker
            open={open}
            value={value}
            items={options}
            setOpen={setOpen}
            setValue={setValue}
            placeholder="Account Type"
            containerStyle={styles.dropdown}
            style={styles.inputBox}
            dropDownContainerStyle={styles.dropDownContainer}
          />
          <CustomButton
            text="Continue"
            size="large"
            onPress={() => {}}
            style={styles.buttonPrimary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewAccount;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.violet100,
  },
  dropdown: {
    height: 50,
    marginTop: n(20),
  },
  inputBox: {
    borderRadius: 12,
    borderColor: Colors.light60,
    color: 'red',
  },
  dropDownContainer: {
    borderRadius: 12,
    borderColor: Colors.light60,
  },
  buttonPrimary: {
    marginTop: n(33),
    paddingVertical: n(20),
  },
});
