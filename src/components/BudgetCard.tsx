import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/colors'; // Define your own color constants
import { ProgressBar } from './ProgressBar';



type BudgetCardProps = {
  category: string;
  spent: number;
  limit: number;
  warning?: boolean;
};

export const BudgetCard = ({
  category,
  spent,
  limit,
  warning = false,
}: BudgetCardProps) => {

  const remaining = Math.max(limit - spent, 0);
  const percentage = Math.min(spent / limit, 1);

  return (
    <View style={[styles.card, !warning && styles.warningCard]}>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.remaining}>Remaining ${remaining}</Text>

      <ProgressBar
        progress={percentage}
        color={!warning ? Colors.red100 : Colors.green100}
        style={styles.progressBar}
      />

      <Text style={styles.detail}>
        ${spent} of ${limit}
      </Text>

      {!warning && (
        <Text style={styles.warningText}>You’ve exceeded the limit!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    elevation: 2,
  },
  warningCard: {
    borderColor: 'red',
    borderWidth: 1,
  },
  category: {
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  remaining: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBar: {
    marginVertical: 8,
    height: 8,
    borderRadius: 6,
  },
  detail: {
    color: '#999',
  },
  warningText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
