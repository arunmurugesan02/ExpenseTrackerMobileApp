import React from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/colors';
import {n} from '../constants/normalize';
import {Regular1} from '../constants/Typography';

interface AttachmentButtonProps {
  onPress: () => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  openAttachement: (name: string) => void;
  disabled?: boolean;
}

type AttachmentItem = {
  id: number;
  name: string;
  iconName: string;
  iconLibrary: 'FontAwesome' | 'Ionicons';
};

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
  onPress,
  visible,
  setVisible,
  openAttachement,
  disabled = false,
}) => {
  const attachments: AttachmentItem[] = [
    {id: 1, name: 'Camera', iconName: 'camera', iconLibrary: 'FontAwesome'},
    {id: 2, name: 'Image', iconName: 'image', iconLibrary: 'FontAwesome'},
    {id: 3, name: 'Document', iconName: 'document', iconLibrary: 'Ionicons'},
  ];

  const renderIcon = (library: string, name: string) => {
    const size = 30;
    const color = Colors.violet100;

    switch (library) {
      case 'FontAwesome':
        return <FontAwesome name={name} size={size} color={color} />;
      case 'Ionicons':
        return <Ionicons name={name} size={size} color={color} />;
      default:
        return null;
    }
  };

  const handleAttachmentPress = (itemName: string) => {
    // Close modal first, then open attachment
    setVisible(false);

    // Add a small delay to ensure modal closes properly, especially on iOS
    setTimeout(
      () => {
        openAttachement(itemName);
      },
      Platform.OS === 'ios' ? 200 : 100,
    );
  };

  const handleBackdropPress = () => {
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.container, disabled && styles.disabledContainer]}
        onPress={onPress}
        disabled={disabled}>
        <Feather
          name="paperclip"
          size={18}
          color={disabled ? Colors.grey20 : Colors.grey20}
        />
        <Text style={[styles.text, disabled && styles.disabledText]}>
          {disabled ? 'Loading...' : 'Add attachment'}
        </Text>
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        onSwipeComplete={handleBackdropPress}
        onBackdropPress={handleBackdropPress}
        swipeDirection="down"
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={300}
        useNativeDriver={true}
        hideModalContentWhileAnimating={false}
        propagateSwipe={true}>
        <View style={styles.modalContent}>
          <View style={styles.handleBar} />
          <FlatList
            data={attachments}
            numColumns={3}
            renderItem={({item}: {item: AttachmentItem}) => (
              <TouchableOpacity
                style={[styles.attachmentWrapper]}
                onPress={() => handleAttachmentPress(item.name)}
                activeOpacity={0.7}>
                {renderIcon(item.iconLibrary, item.iconName)}
                <Regular1 style={styles.title}>{item.name}</Regular1>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.attachmentContainer}
            scrollEnabled={false}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: n(18),
    paddingHorizontal: n(18),
    borderRadius: 14,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey20,
    borderStyle: 'dashed',
  },
  disabledContainer: {
    opacity: 0.6,
  },
  text: {
    marginLeft: n(8),
    color: Colors.grey20,
    fontSize: 14,
  },
  disabledText: {
    color: Colors.grey20,
  },
  attachmentContainer: {
    padding: n(20),
  },
  attachmentWrapper: {
    backgroundColor: Colors.violet20,
    padding: n(20),
    paddingVertical: n(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: n(12),
    margin: n(5),
    gap: n(10),
    flex: 1,
    marginVertical: n(20),
  },
  title: {
    color: Colors.violet100,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '120%',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: Colors.light100,
    paddingTop: n(16),
    borderTopLeftRadius: n(16),
    borderTopRightRadius: n(16),
    maxHeight: '50%',
  },
  handleBar: {
    width: 40,
    height: 5,
    backgroundColor: Colors.violet40,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: n(10),
  },
});

export default AttachmentButton;
