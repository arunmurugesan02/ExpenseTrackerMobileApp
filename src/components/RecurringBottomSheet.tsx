import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type FrequencyOption = 'yearly' | 'monthly' | 'weekly' | 'daily';
type EndOption = 'date' | 'indefinitely';

const RecurringBottomSheet = () => {
  const [frequency, setFrequency] = useState<FrequencyOption | null>(null);
  const [endType, setEndType] = useState<EndOption | null>(null);

  const [frequencyOpen, setFrequencyOpen] = useState<boolean>(false);
  const [endOpen, setEndOpen] = useState<boolean>(false);

  const frequencyOptions = [
    {label: 'Yearly', value: 'yearly'},
    {label: 'Monthly', value: 'monthly'},
    {label: 'Weekly', value: 'weekly'},
    {label: 'Daily', value: 'daily'},
  ];

  const endOptions = [
    {label: 'Date', value: 'date'},
    {label: 'Indefinitely', value: 'indefinitely'},
  ];

  return (
    <View style={styles.sheet}>
      <View style={styles.dragBar} />
      <DropDownPicker
        open={frequencyOpen}
        value={frequency}
        items={frequencyOptions}
        setOpen={setFrequencyOpen}
        setValue={setFrequency}
        placeholder="Frequency"
        containerStyle={styles.dropdown}
        style={styles.inputBox}
        dropDownContainerStyle={styles.dropDownContainer}
      />

      <DropDownPicker
        open={endOpen}
        value={endType}
        items={endOptions}
        setOpen={setEndOpen}
        setValue={setEndType}
        placeholder="End After"
        containerStyle={styles.dropdown}
        style={styles.inputBox}
        dropDownContainerStyle={styles.dropDownContainer}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          {frequency === 'daily' ? 'Primary' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  dragBar: {
    alignSelf: 'center',
    height: 4,
    width: 50,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 16,
  },
  dropdown: {
    height: 50,
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  inputBox: {
    borderRadius: 12,
    borderColor: '#ccc',
  },
  dropDownContainer: {
    borderRadius: 12,
    borderColor: '#ccc',
  },
});

export default RecurringBottomSheet;
