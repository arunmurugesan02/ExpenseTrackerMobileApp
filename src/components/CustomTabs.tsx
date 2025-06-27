import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../constants/colors';

interface FilterTabsProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

interface SwitchTabsProps {
  leftText: string;
  rightText: string;
  selected: 'left' | 'right';
  onSelect: (side: 'left' | 'right') => void;
  style?: object;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.filterTabContainer}>
      {options.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            styles.filterTabButton,
            selected === option && {backgroundColor: Colors.yellow100},
          ]}
          onPress={() => onSelect(option)}>
          <Text
            style={{
              color: selected === option ? '#000' : Colors.dark25,
              fontWeight: '600',
            }}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const SwitchTabs: React.FC<SwitchTabsProps> = ({
  leftText,
  rightText,
  selected,
  onSelect,
  style,
}) => {
  return (
    <View style={[styles.switchContainer, style]}>
      <TouchableOpacity
        style={[
          styles.switchHalf,
          selected === 'left' && {backgroundColor: Colors.violet100},
        ]}
        onPress={() => onSelect('left')}>
        <Text style={{color: selected === 'left' ? '#fff' : Colors.dark25}}>
          {leftText}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.switchHalf,
          selected === 'right' && {backgroundColor: Colors.violet100},
        ]}
        onPress={() => onSelect('right')}>
        <Text style={{color: selected === 'right' ? '#fff' : Colors.dark25}}>
          {rightText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  filterTabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  switchContainer: {
    backgroundColor: Colors.light80,
    borderRadius: 30,
    flexDirection: 'row',
    overflow: 'hidden',
    marginVertical: 12,
  },
  switchHalf: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
