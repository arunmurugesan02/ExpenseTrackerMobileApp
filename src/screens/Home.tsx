import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {PillButton} from '../components/CustomButton';
import Graph from '../components/Graph';
import Header from '../components/Header';
import {TransactionCard} from '../components/TransactionCard';
import Colors from '../constants/colors';
import imageConstants from '../constants/imageConstants';
import {n} from '../constants/normalize';
import {Regular3, Title1, Title2, Title3} from '../constants/Typography';
import {Expense} from '../data/mockData';
const Home = () => {
  const InExpCard: React.FC<{val: 'Income' | 'Expense'}> = ({val}) => {
    return (
      <View style={styles.InExpCardContainer}>
        <View
          style={[
            styles.InExpCardWrapper,
            {
              backgroundColor:
                val === 'Income' ? Colors.green120 : Colors.red100,
            },
          ]}>
          <FastImage
            source={
              val === 'Income'
                ? imageConstants.incomeLogo
                : imageConstants.expenseLogo
            }
            style={styles.InExpCardImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.InExpCardTxtContainer}>
            <Regular3 style={styles.InExpCardTxt}>{val}</Regular3>
            <Title2 style={styles.InExpCardTxt}>$5000</Title2>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <LinearGradient
          colors={['#FFF6E5', '#F8EDD8']}
          style={styles.linearGradient}>
          <Header showProfileRow dropdownText="July" showBell />
          <Regular3 style={styles.titleTxt}>Account Balance</Regular3>
          <Title1 style={styles.balTxt}>$9400</Title1>
          <View style={styles.cardContainer}>
            <InExpCard val="Income" />
            <InExpCard val="Expense" />
          </View>
        </LinearGradient>
        <Graph />
        <View style={styles.recentTransactionContainer}>
          <Title3 style={styles.title}>Recent Transactions</Title3>
          <PillButton text="See All" onPress={() => {}} />
        </View>
        {Expense.map(item => (
          <TransactionCard
            key={item.id}
            title={item.category}
            subtitle={item.description}
            amount={item.amount}
            time={item.date}
          />
        ))}
        {/* <FlatList
          data={Expense}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
           
          )}
        /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  linearGradient: {
    borderBottomLeftRadius: n(20),
    borderBottomRightRadius: n(20),
    paddingBottom: n(20),
  },
  safeArea: {flex: 1, backgroundColor: Colors.light100},
  titleTxt: {
    color: Colors.dark25,
    textAlign: 'center',
  },
  balTxt: {
    textAlign: 'center',
  },
  cardContainer: {flexDirection: 'row', justifyContent: 'space-around'},
  InExpCardContainer: {paddingTop: n(20)},
  InExpCardWrapper: {
    padding: n(15),
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    gap: n(10),
    justifyContent: 'center',
  },
  InExpCardImage: {width: n(50), height: n(50), borderRadius: n(20)},
  InExpCardTxtContainer: {justifyContent: 'center', gap: n(2)},
  InExpCardTxt: {color: Colors.light100},
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  recentTransactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: n(15),
    marginBottom: n(20),
  },
});
