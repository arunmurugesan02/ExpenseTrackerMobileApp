import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  Modal as RNModal,
  FlatList,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Colors from '../constants/colors';
import {n} from '../constants/normalize';
import CustomButton from './CustomButton';

import {
  dayOptions,
  endOptions,
  frequencyOptions,
  monthOptions,
} from '../data/mockData';

type FrequencyOption = 'yearly' | 'monthly' | 'weekly' | 'daily';
type EndOption = 'date' | 'indefinitely';

interface RecurringBottomSheetProps {
  visible?: boolean;
  setVisible: (visible: boolean) => void;
}

interface PickerOption {
  label: string;
  value: string;
}

const RecurringBottomSheet: React.FC<RecurringBottomSheetProps> = ({
  visible,
  setVisible,
}) => {
  const [frequency, setFrequency] = useState<FrequencyOption | null>(null);
  const [endType, setEndType] = useState<EndOption | null>(null);
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [step, setStep] = useState<1 | 2>(1);

  const [showDatePicker, setShowDatePicker] = useState(false);

  // Custom picker modal states
  const [showCustomPicker, setShowCustomPicker] = useState(false);
  const [pickerType, setPickerType] = useState<
    'frequency' | 'end' | 'month' | 'day' | null
  >(null);
  const [pickerData, setPickerData] = useState<PickerOption[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNext = () => {
    if (frequency && endType) {
      setStep(2);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event?.type === 'set' && selectedDate) {
      setEndDate(selectedDate);
    }

    if (Platform.OS === 'ios' && event?.type === 'dismissed') {
      setShowDatePicker(false);
    }
  };

  const openCustomPicker = (type: 'frequency' | 'end' | 'month' | 'day') => {
    setPickerType(type);
    let data: PickerOption[] = [];

    switch (type) {
      case 'frequency':
        data = frequencyOptions;
        break;
      case 'end':
        data = endOptions;
        break;
      case 'month':
        data = monthOptions;
        break;
      case 'day':
        data = dayOptions;
        break;
    }

    setPickerData(data);
    setSearchQuery('');
    setShowCustomPicker(true);
  };

  const selectPickerValue = (value: string) => {
    if (pickerType === 'frequency') {
      setFrequency(value as FrequencyOption);
    } else if (pickerType === 'end') {
      setEndType(value as EndOption);
    } else if (pickerType === 'month') {
      setMonth(value);
    } else if (pickerType === 'day') {
      setDay(value);
    }
    setShowCustomPicker(false);
    setPickerType(null);
  };

  const getSelectedLabel = (options: PickerOption[], value: string | null) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : 'Select';
  };

  const getPickerTitle = (type: 'frequency' | 'end' | 'month' | 'day') => {
    switch (type) {
      case 'frequency':
        return 'Select Frequency';
      case 'end':
        return 'Select End Option';
      case 'month':
        return 'Select Month';
      case 'day':
        return 'Select Day';
      default:
        return 'Select';
    }
  };

  const getSearchPlaceholder = (
    type: 'frequency' | 'end' | 'month' | 'day',
  ) => {
    switch (type) {
      case 'frequency':
        return 'Search frequency...';
      case 'end':
        return 'Search options...';
      case 'month':
        return 'Search months...';
      case 'day':
        return 'Search days...';
      default:
        return 'Search...';
    }
  };

  const filteredPickerData = pickerData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderPickerItem = ({item}: {item: PickerOption}) => (
    <TouchableOpacity
      style={styles.pickerItem}
      onPress={() => selectPickerValue(item.value)}>
      <Text style={styles.pickerItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="down"
      style={styles.modal}
      onBackdropPress={() => setVisible(false)}>
      <View style={styles.modalContent}>
        <View style={styles.handleBar} />

        <ScrollView
          style={{marginTop: n(20)}}
          contentContainerStyle={{paddingBottom: 40}}
          showsVerticalScrollIndicator={false}>
          {step === 1 ? (
            <>
              <Text style={styles.label}>Frequency</Text>
              <TouchableOpacity
                onPress={() => openCustomPicker('frequency')}
                style={styles.inputBox}>
                <Text
                  style={[
                    styles.pickerText,
                    !frequency && styles.placeholderText,
                  ]}>
                  {getSelectedLabel(frequencyOptions, frequency)}
                </Text>
              </TouchableOpacity>

              <Text style={styles.label}>End After</Text>
              <TouchableOpacity
                onPress={() => openCustomPicker('end')}
                style={styles.inputBox}>
                <Text
                  style={[
                    styles.pickerText,
                    !endType && styles.placeholderText,
                  ]}>
                  {getSelectedLabel(endOptions, endType)}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Frequency</Text>
                  <TouchableOpacity
                    onPress={() => openCustomPicker('frequency')}
                    style={styles.inputBox}>
                    <Text
                      style={[
                        styles.pickerText,
                        !frequency && styles.placeholderText,
                      ]}>
                      {getSelectedLabel(frequencyOptions, frequency)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.column}>
                  <Text style={styles.label}>Month</Text>
                  <TouchableOpacity
                    onPress={() => openCustomPicker('month')}
                    style={styles.inputBox}>
                    <Text
                      style={[
                        styles.pickerText,
                        !month && styles.placeholderText,
                      ]}>
                      {getSelectedLabel(monthOptions, month)}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.column}>
                  <Text style={styles.label}>Day</Text>
                  <TouchableOpacity
                    onPress={() => openCustomPicker('day')}
                    style={styles.inputBox}>
                    <Text
                      style={[
                        styles.pickerText,
                        !day && styles.placeholderText,
                      ]}>
                      {getSelectedLabel(dayOptions, day)}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>End After</Text>
                  <TouchableOpacity
                    onPress={() => openCustomPicker('end')}
                    style={styles.inputBox}>
                    <Text
                      style={[
                        styles.pickerText,
                        !endType && styles.placeholderText,
                      ]}>
                      {getSelectedLabel(endOptions, endType)}
                    </Text>
                  </TouchableOpacity>
                </View>

                {endType === 'date' && (
                  <View style={styles.column}>
                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity
                      onPress={() => setShowDatePicker(true)}
                      style={styles.inputBox}>
                      <Text style={styles.dateText}>
                        {moment(endDate).format('DD MMM YYYY')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </>
          )}

          <CustomButton
            text="Next"
            size="large"
            onPress={handleNext}
            style={styles.buttonPrimary}
          />
        </ScrollView>

        {/* Custom Picker Modal */}
        <RNModal
          visible={showCustomPicker}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCustomPicker(false)}>
          <View style={styles.pickerModalOverlay}>
            <View style={styles.pickerModalContent}>
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowCustomPicker(false)}>
                  <Text style={styles.pickerHeaderButton}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.pickerTitle}>
                  {pickerType ? getPickerTitle(pickerType) : 'Select'}
                </Text>
                <View style={{width: 50}} />
              </View>

              <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder={
                    pickerType ? getSearchPlaceholder(pickerType) : 'Search...'
                  }
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <FlatList
                data={filteredPickerData}
                renderItem={renderPickerItem}
                keyExtractor={item => item.value}
                style={styles.pickerList}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </RNModal>

        {/* Date Picker */}
        {showDatePicker && (
          <>
            {Platform.OS === 'ios' ? (
              <RNModal
                transparent
                animationType="slide"
                visible={showDatePicker}>
                <View style={styles.dateModal}>
                  <View style={styles.dateModalContent}>
                    <View style={styles.datePickerHeader}>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}>
                        <Text style={styles.cancel}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}>
                        <Text style={styles.ok}>Done</Text>
                      </TouchableOpacity>
                    </View>
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="spinner"
                      onChange={handleDateChange}
                      style={styles.iosDatePicker}
                    />
                  </View>
                </View>
              </RNModal>
            ) : (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {justifyContent: 'flex-end', margin: 0},
  modalContent: {
    backgroundColor: Colors.light100,
    padding: n(20),
    borderTopLeftRadius: n(16),
    borderTopRightRadius: n(16),
    maxHeight: '90%',
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: Colors.violet40,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: n(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: n(14),
  },
  column: {flex: 1, marginHorizontal: n(5)},
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: Colors.dark75,
  },
  inputBox: {
    borderRadius: 12,
    borderColor: Colors.grey20,
    borderWidth: 1,
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: Colors.light100,
  },
  dropDownContainer: {
    borderRadius: 12,
    borderColor: Colors.grey20,
    backgroundColor: Colors.light100,
  },
  pickerText: {
    fontSize: 16,
    color: Colors.dark100,
  },
  placeholderText: {
    color: Colors.grey20,
  },
  dateText: {
    fontSize: 16,
    color: Colors.dark100,
  },
  buttonPrimary: {
    paddingVertical: n(20),
    marginTop: n(15),
  },

  // Custom Picker Modal Styles
  pickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerModalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    width: '85%',
    maxHeight: '70%',
    paddingVertical: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerHeaderButton: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark100,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Colors.grey20,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  pickerList: {
    paddingHorizontal: 20,
  },
  pickerItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pickerItemText: {
    fontSize: 16,
    color: Colors.dark100,
  },

  // Date Picker Styles
  dateModal: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  dateModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  iosDatePicker: {
    height: 200,
  },
  cancel: {color: '#007AFF', fontWeight: '600', fontSize: 16},
  ok: {color: '#007AFF', fontWeight: '600', fontSize: 16},
});

export default RecurringBottomSheet;
