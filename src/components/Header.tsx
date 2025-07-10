import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ViewStyle,
  TextStyle,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import BellIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/colors';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showMore?: boolean;
  showRightIcon?: boolean;
  rightIcon?: string;
  onBackPress?: () => void;
  onMorePress?: () => void;
  onRightIconPress?: () => void;
  showProfileRow?: boolean;
  profileImage?: string;
  dropdownText?: string;
  onDropdownPress?: () => void;
  showBell?: boolean;
  showFilterRow?: boolean;
  filterBadgeCount?: number;
  filterDropdownText?: string;
  onFilterPress?: () => void;
  onFilterDropdownPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showBack,
  showMore,
  showRightIcon,
  rightIcon = 'bell',
  onBackPress,
  onMorePress,
  onRightIconPress,
  showProfileRow,
  profileImage,
  dropdownText = 'October',
  onDropdownPress,
  showBell,
  showFilterRow,
  filterBadgeCount,
  filterDropdownText = 'Month',
  onFilterPress,
  onFilterDropdownPress,
  style,
  textStyle,
}) => {
  return (
    <SafeAreaView>
      {/* Main Title Bar */}
      {title && (
        <View style={[styles.container, style]}>
          {showBack ? (
            <TouchableOpacity onPress={onBackPress}>
              <Icon
                name="arrow-left"
                size={24}
                color={textStyle ? Colors.light100 : Colors.dark100}
              />
            </TouchableOpacity>
          ) : (
            <View style={{width: 24}} />
          )}

          <Text style={[styles.title, textStyle]}>{title}</Text>

          {showMore ? (
            <TouchableOpacity onPress={onMorePress}>
              <Icon name="more-vertical" size={24} color="#000" />
            </TouchableOpacity>
          ) : showRightIcon ? (
            <TouchableOpacity onPress={onRightIconPress}>
              <Icon name={rightIcon} size={24} color={Colors.violet100} />
            </TouchableOpacity>
          ) : (
            <View style={{width: 24}} />
          )}
        </View>
      )}

      {/* Profile + Dropdown + Bell */}
      {showProfileRow && (
        <View style={styles.profileRow}>
          <Image
            source={{
              uri:
                profileImage ||
                'https://randomuser.me/api/portraits/women/1.jpg',
            }}
            style={styles.profileImage}
          />

          <TouchableOpacity style={styles.dropdown} onPress={onDropdownPress}>
            <Icon name="chevron-down" size={16} color={Colors.violet100} />
            <Text style={{marginLeft: 6, color: '#000'}}>{dropdownText}</Text>
          </TouchableOpacity>

          {showBell && (
            <TouchableOpacity onPress={onRightIconPress}>
              <BellIcon name="bell" size={24} color={Colors.violet100} />
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Filter Row */}
      {showFilterRow && (
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={onFilterDropdownPress}>
            <Icon name="chevron-down" size={16} color={Colors.violet100} />
            <Text style={{marginLeft: 6}}>{filterDropdownText}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterIcon} onPress={onFilterPress}>
            <Icon name="filter" size={20} color={Colors.dark25} />
            {filterBadgeCount ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{filterBadgeCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light100,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.violet100,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark25,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  filterIcon: {
    padding: 8,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.violet100,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
