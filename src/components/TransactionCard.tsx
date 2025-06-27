import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type TransactionCardProps = {
  title: string;
  subtitle: string;
  amount: number;
  time: string;
  currency?: string;
};

export const TransactionCard = ({
  title,
  subtitle,
  amount,
  time,
  currency = 'Rp',
}: TransactionCardProps) => {
  const isIncome = amount > 0;

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        {/* Replace with icon/image if needed */}
        <Text style={styles.icon}>👜</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.amount, {color: isIncome ? 'green' : 'red'}]}>
          {isIncome ? '+' : '-'} {currency}{' '}
          {Math.abs(amount).toLocaleString('id-ID')}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 12,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fef2cc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#999',
    fontSize: 12,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
});
