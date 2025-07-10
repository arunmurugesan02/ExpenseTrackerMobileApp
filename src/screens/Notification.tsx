import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import {notify} from '../data/mockData';
import {Regular1, Regular3, Small} from '../constants/Typography';
import {n, SCREEN_HEIGHT} from '../constants/normalize';
import Colors from '../constants/colors';

const ITEM_HEIGHT = 90;

const Notification = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const contentHeight = notify.length * ITEM_HEIGHT;
  const scrollEnabled = contentHeight > SCREEN_HEIGHT * 0.7;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TouchableWithoutFeedback
        onPress={() => modalVisible && setModalVisible(false)}>
        <View style={{flex: 1}}>
          <Header
            showBack
            title="Notification"
            showMore
            onMorePress={() => setModalVisible(prev => !prev)}
          />

          <FlatList
            data={notify}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={scrollEnabled}
            contentContainerStyle={
              notify.length === 0 ? styles.flatListContentContainer : undefined
            }
            renderItem={({item}) => (
              <>
                <View style={styles.notificationItemContainer}>
                  <View style={styles.textGroup}>
                    <Regular1 style={styles.titleText} numberOfLines={1}>
                      {item.title}
                    </Regular1>
                    <Small style={styles.descriptionText} numberOfLines={1}>
                      {item.desc}
                    </Small>
                  </View>
                  <Small style={styles.timeText}>{item.time}</Small>
                </View>
                <View style={styles.itemSeparator} />
              </>
            )}
            ListEmptyComponent={
              <View style={styles.emptyStateContainer}>
                <Regular1 style={styles.emptyText}>
                  There is no notification for now
                </Regular1>
              </View>
            }
          />

          {modalVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity onPress={() => console.log('Mark all read')}>
                <Regular3>Mark all read</Regular3>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Remove all')}>
                <Regular3>Remove all</Regular3>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light100,
  },
  notificationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: n(16),
    marginVertical: n(10),
  },
  textGroup: {
    gap: n(8),
    flex: 1,
  },
  titleText: {
    fontWeight: 'bold',
  },
  descriptionText: {
    color: Colors.grey20,
  },
  timeText: {
    color: Colors.grey20,
    marginLeft: n(10),
  },
  itemSeparator: {
    borderBottomWidth: 1,
    borderColor: Colors.light20,
  },
  dropdownMenu: {
    position: 'absolute',
    top: n(45),
    right: n(16),
    backgroundColor: Colors.light100,
    padding: n(10),
    borderRadius: 10,
    gap: n(10),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 1000,
  },
  emptyText: {
    color: Colors.grey20,
    textAlign: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT * 0.7,
  },
  flatListContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
