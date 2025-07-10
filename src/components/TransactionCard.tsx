import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Colors from '../constants/colors';
import imageConstants from '../constants/imageConstants';
import {n} from '../constants/normalize';
import {Regular1, Small} from '../constants/Typography';

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
  currency = '$',
}: TransactionCardProps) => {
  const isIncome = amount > 0;

  return (
    <View style={styles.card}>
      <FastImage
        source={
          title == 'Food'
            ? imageConstants.foodLogo
            : title == 'Shopping'
            ? imageConstants.shopIcon
            : imageConstants.subLogo
        }
        style={styles.imageContainer}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={styles.content}>
        <Regular1 style={styles.title}>{title}</Regular1>
        <Small style={styles.subtitle}>{subtitle}</Small>
      </View>
      <View style={styles.right}>
        <Regular1 style={[styles.amount, {color: isIncome ? 'green' : 'red'}]}>
          {isIncome ? '+' : '-'} {currency}
          {Math.abs(amount).toLocaleString('id-ID')}
        </Regular1>
        <Small style={styles.time}>{time}</Small>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: n(15),
    borderRadius: n(12),
    backgroundColor: Colors.transactionCard,
    marginBottom: n(12),
    marginHorizontal: n(10),
  },
  imageContainer: {
    width: n(50),
    height: n(50),
  },

  content: {
    flex: 1,
    marginLeft: 12,
    gap: n(10),
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.dark25,
  },
  right: {
    alignItems: 'flex-end',
    gap: n(10),
  },
  amount: {
    fontWeight: 'bold',
  },
  time: {
    color: Colors.dark25,
  },
});
