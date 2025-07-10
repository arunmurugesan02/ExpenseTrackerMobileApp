import React, {useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AttachmentButton from '../components/AttachmentButton';
import CustomButton from '../components/CustomButton';
import DateSelector from '../components/DateSelector';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ToggleItem from '../components/ToggleItem';
import Colors from '../constants/colors';
import {n} from '../constants/normalize';
import {Regular1, Small, Title2} from '../constants/Typography';
import RecurringBottomSheet from '../components/RecurringBottomSheet';

type AddTransactionScreenProps = {
  type: 'Income' | 'Expense' | 'Transfer';
};

const AddTransactionScreen: React.FC<AddTransactionScreenProps> = ({type}) => {
  const [name, setName] = useState<string>('');
  const [categoryValue, setCategoryValue] = useState<string>('');
  const [walletValue, setWalletValue] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [repeatModal, setRepeatModal] = useState<boolean>(false);
  const [attachment, setAttachment] = useState<{
    uri: string;
    type: 'image' | 'document';
    name?: string | null;
  } | null>(null);
  const [pickerInProgress, setPickerInProgress] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [walletOpen, setWalletOpen] = useState<boolean>(false);

  const categoryOption = [
    {label: 'Food & Dining', value: 'food'},
    {label: 'Transportation', value: 'transport'},
    {label: 'Shopping', value: 'shopping'},
    {label: 'Health & Fitness', value: 'health'},
    {label: 'Salary', value: 'salary'},
    {label: 'Utilities', value: 'utilities'},
    {label: 'Entertainment', value: 'entertainment'},
    {label: 'Other', value: 'other'},
  ];
  const walletOption = [
    {label: 'Cash', value: 'cash'},
    {label: 'Bank Account', value: 'bank'},
    {label: 'Credit Card', value: 'credit'},
    {label: 'Paytm', value: 'paytm'},
    {label: 'Google Pay', value: 'gpay'},
    {label: 'PhonePe', value: 'phonepe'},
    {label: 'Amazon Pay', value: 'amazonpay'},
  ];

  const getBackgroundColor = () => {
    switch (type) {
      case 'Income':
        return Colors.green120;
      case 'Expense':
        return Colors.red100;
      default:
        return Colors.blue100;
    }
  };

  const renderDropdown = (placeholder: string) => {
    const isWallet = placeholder === 'Wallet';

    return (
      <DropDownPicker
        open={isWallet ? walletOpen : categoryOpen}
        value={isWallet ? walletValue : categoryValue}
        items={isWallet ? walletOption : categoryOption}
        setOpen={isWallet ? setWalletOpen : setCategoryOpen}
        setValue={isWallet ? setWalletValue : setCategoryValue}
        placeholder={placeholder}
        containerStyle={styles.dropdown}
        style={styles.inputBox}
        dropDownContainerStyle={styles.dropDownContainer}
        placeholderStyle={{color: '#B0B0B0'}}
        zIndex={isWallet ? 5000 : 6000} // important
      />
    );
  };

  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return;
    }

    if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
      Alert.alert('Error', response.errorMessage);
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];
      if (asset.uri) {
        setAttachment({
          uri: asset.uri,
          type: 'image',
          name: asset.fileName || 'image.jpg',
        });
      }
    }
  };

  const openAttachment = async (name: string) => {
    if (pickerInProgress) return;

    setPickerInProgress(true);

    // Add a small delay to ensure modal closes properly on iOS
    setTimeout(
      async () => {
        setVisible(false);

        try {
          if (name === 'Camera') {
            const options: CameraOptions = {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 2000,
              maxWidth: 2000,
              quality: 0.8,
            };

            launchCamera(options, response => {
              handleImagePickerResponse(response);
              setPickerInProgress(false);
            });
          } else if (name === 'Image') {
            const options: ImageLibraryOptions = {
              mediaType: 'photo',
              includeBase64: false,
              maxHeight: 2000,
              maxWidth: 2000,
              quality: 0.8,
              selectionLimit: 1,
            };

            launchImageLibrary(options, response => {
              handleImagePickerResponse(response);
              setPickerInProgress(false);
            });
          } else if (name === 'Document') {
            try {
              const res = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.allFiles],
              });

              setAttachment({
                uri: res.uri,
                name: res.name,
                type: 'document',
              });
            } catch (err: any) {
              if (!DocumentPicker.isCancel(err)) {
                console.warn('DocumentPicker error:', err);
                Alert.alert('Error', 'Failed to pick document');
              }
            } finally {
              setPickerInProgress(false);
            }
          }
        } catch (error) {
          console.log('Error in openAttachment:', error);
          setPickerInProgress(false);
        }
      },
      Platform.OS === 'ios' ? 300 : 100,
    );
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const handleModalToggle = () => {
    if (pickerInProgress) return;
    setVisible(!visible);
  };

  const handleContinue = () => {
    if (isSwitchOn) {
      setRepeatModal(!repeatModal);
    }
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: getBackgroundColor()}]}
      edges={['top']}>
      <Header
        showBack
        title={type}
        style={{backgroundColor: getBackgroundColor()}}
        textStyle={{color: Colors.light100}}
      />

      <View style={styles.balanceWrapper}>
        <Title2 style={styles.balanceTitle}>Balance</Title2>
        <View style={styles.balanceRow}>
          <FontAwesome6
            name="indian-rupee-sign"
            size={50}
            color={Colors.light100}
          />
          <Text style={styles.balanceAmount}>00</Text>
        </View>
      </View>

      <View style={styles.contentWrapper}>
        <View style={{justifyContent: 'space-evenly'}}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          {type !== 'Transfer' && (
            <View style={{zIndex: 6000}}>{renderDropdown('Category')}</View>
          )}
          {type == 'Transfer' && <DateSelector />}
          <InputField
            placeholder="Description"
            value={name}
            onChangeText={setName}
            style={{paddingVertical: n(8)}}
            onPress={() => {}}
          />
          <View style={{marginBottom: n(10)}} />
          {type !== 'Transfer' && (
            <View style={{zIndex: 5000}}>{renderDropdown('Wallet')}</View>
          )}
          <AttachmentButton
            onPress={handleModalToggle}
            visible={visible}
            setVisible={setVisible}
            openAttachement={openAttachment}
            disabled={pickerInProgress}
          />
          {attachment && (
            <View style={styles.previewContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={removeAttachment}>
                <Feather name="x" size={16} color={Colors.dark100} />
              </TouchableOpacity>

              {attachment.type === 'image' ? (
                <FastImage
                  source={{uri: attachment.uri}}
                  style={styles.previewImage}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : (
                <View style={styles.docPreview}>
                  <Feather
                    name="file-text"
                    size={24}
                    color={Colors.violet100}
                  />
                  <Text style={styles.docName}>{attachment.name}</Text>
                </View>
              )}
            </View>
          )}
          {type !== 'Transfer' && (
            <View
              style={[
                styles.repeatRow,
                {marginBottom: !attachment ? n(25) : 0},
              ]}>
              <View style={{gap: n(5)}}>
                <Regular1 style={{fontWeight: 'bold'}}>Repeat</Regular1>
                <Small style={{color: Colors.grey20}}>
                  {isSwitchOn
                    ? 'Repeat transaction, set your own time'
                    : 'Repeat transaction'}
                </Small>
              </View>
              <ToggleItem
                type="switch"
                value={isSwitchOn}
                onValueChange={setIsSwitchOn}
              />
            </View>
          )}
        </View>
        {/* </ScrollView> */}
        <CustomButton
          text="Continue"
          size="large"
          onPress={handleContinue}
          style={styles.buttonPrimary}
        />
      </View>
      <RecurringBottomSheet visible={repeatModal} setVisible={setRepeatModal} />
    </SafeAreaView>
  );
};

export default AddTransactionScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  balanceWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  balanceTitle: {
    color: Colors.light20,
    paddingBottom: n(10),
    paddingLeft: n(10),
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: n(5),
    paddingBottom: n(20),
    paddingLeft: n(10),
  },
  balanceAmount: {
    color: Colors.light100,
    fontSize: 55,
    fontWeight: '500',
  },
  contentWrapper: {
    backgroundColor: Colors.light100,
    borderTopLeftRadius: n(20),
    borderTopRightRadius: n(20),
    paddingVertical: n(30),
    paddingHorizontal: n(20),
    justifyContent: 'space-between',
  },
  dropdown: {
    height: 50,
    marginBottom: n(20),
  },
  inputBox: {
    borderRadius: 12,
    borderColor: Colors.light60,
  },
  dropDownContainer: {
    borderRadius: 12,
    borderColor: Colors.light60,
    zIndex: 999,
  },
  repeatRow: {
    flexDirection: 'row',
    marginTop: n(25),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonPrimary: {
    paddingVertical: n(20),
  },
  previewContainer: {
    marginTop: n(10),
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light60,
    padding: n(10),
    position: 'relative',
    backgroundColor: Colors.light20,
    width: '35%',
    height: '17%',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 10,
    backgroundColor: Colors.light100,
    borderRadius: 12,
    padding: 4,
  },
  previewImage: {
    width: '100%',
    height: 70,
    borderRadius: 8,
  },
  docPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  docName: {
    color: Colors.violet100,
    fontWeight: '600',
    flex: 1,
  },
});
