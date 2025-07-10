import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState} from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {n} from '../constants/normalize';
import Colors from '../constants/colors';

type PickerType = 'from' | 'to' | null;

const DateSelector: React.FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<PickerType>(null);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  const openPicker = (type: PickerType) => {
    setTempDate(
      type === 'from' ? fromDate || new Date() : toDate || new Date(),
    );
    setShowPicker(type);
  };

  const confirmDate = () => {
    if (showPicker === 'from') setFromDate(tempDate);
    if (showPicker === 'to') setToDate(tempDate);
    setShowPicker(null);
  };

  const cancelPicker = () => {
    setShowPicker(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => openPicker('from')}>
          <Text style={styles.dateText}>
            {fromDate ? formatDate(fromDate) : 'From'}
          </Text>
        </TouchableOpacity>

        <Icon name="calendar" size={20} color="#999" style={styles.icon} />

        <TouchableOpacity
          style={styles.dateBox}
          onPress={() => openPicker('to')}>
          <Text style={styles.dateText}>
            {toDate ? formatDate(toDate) : 'To'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* iOS modal picker with spinner and buttons */}
      {Platform.OS === 'ios' && showPicker && (
        <Modal transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setTempDate(selectedDate);
                }}
              />
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={cancelPicker}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={confirmDate}>
                  <Text style={styles.buttonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Android picker with auto-close */}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={
            showPicker === 'from'
              ? fromDate || new Date()
              : toDate || new Date()
          }
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === 'dismissed') {
              setShowPicker(null);
              return;
            }
            if (selectedDate) {
              if (showPicker === 'from') setFromDate(selectedDate);
              if (showPicker === 'to') setToDate(selectedDate);
            }
            setShowPicker(null);
          }}
        />
      )}
    </View>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: n(20),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBox: {
    flex: 1,
    height: n(50),
    borderWidth: 1,
    borderColor: Colors.light20,
    borderRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: n(16),
    marginHorizontal: n(4),
  },
  dateText: {
    color: Colors.dark50,
  },
  icon: {
    marginHorizontal: n(4),
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  modalContainer: {
    backgroundColor: Colors.light100,
    paddingTop: n(16),
    borderTopLeftRadius: n(16),
    borderTopRightRadius: n(16),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: n(12),
  },
  button: {
    marginLeft: n(12),
    paddingHorizontal: n(12),
    paddingVertical: n(8),
  },
  buttonText: {
    fontSize: 16,
    color: Colors.blue100,
  },
});
