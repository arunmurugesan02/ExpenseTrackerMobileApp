import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ProgressBar} from './ProgressBar';

type CategoryBarProps = {
  category: string;
  amount: number;
  max?: number;
};

export const CategoryBar = ({
  category,
  amount,
  max = 1000,
}: CategoryBarProps) => {
  const progress = Math.min(Math.abs(amount) / max, 1);
  const isPositive = amount > 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View
          style={styles.titleRow}>
          <View
            style={styles.circle}
          />

          <Text style={styles.label}>{category}</Text>
        </View>
        <Text style={[styles.amount, {color: isPositive ? 'green' : 'red'}]}>
          {isPositive ? '+' : '-'} ${Math.abs(amount)}
        </Text>
      </View>

      <ProgressBar
        progress={progress}
        color="#f5a623"
        style={styles.progress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    margin: 5,
    padding: 15,
    // backgroundColor: '#ffff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontWeight: '600',
  },
  amount: {
    fontWeight: 'bold',
  },
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  circle: {
    backgroundColor: 'gold',
    width: 15,
    height: 15,
    borderRadius: 25, // Half of width/height
  },
  titleRow: {
    backgroundColor: '#ffff',
    padding: 5,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
