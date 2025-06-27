import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface ProgressProps {
  progress: number; // value between 0 - 1
  color?: string;
  height?: number;
  style?: ViewStyle;
}

export const ProgressBar = ({
  progress,
  color = 'green',
  height = 8,
  style,
}: ProgressProps) => {
  return (
    <View style={[styles.backgroundBar, {height}, style]}>
      <View
        style={[
          styles.fillBar,
          {width: `${progress * 100}%`, backgroundColor: color},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundBar: {
    width: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fillBar: {
    height: '100%',
    borderRadius: 4,
  },
});