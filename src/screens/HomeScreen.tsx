import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import {FilterTabs, SwitchTabs} from '../components/CustomTabs';
import CustomButton, {PillButton} from '../components/CustomButton';
import {BudgetCard} from '../components/BudgetCard';
import {CategoryBar} from '../components/CategoryBar';
import {TransactionCard} from '../components/TransactionCard';
import InputField from '../components/InputField';
import AttachmentButton from '../components/AttachmentButton';
import RecurringBottomSheet from '../components/RecurringBottomSheet';
import ToggleItem from '../components/ToggleItem';
import {n} from '../constants/normalize';

const HomeScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Year');
  const [switchTab, setSwitchTab] = useState<'left' | 'right'>('left');
  const [checkbox, setCheckbox] = useState(false);
  const [radio, setRadio] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={{paddingBottom: n(20)}}>
        <Header showBack title="Home" />
        <FilterTabs
          options={['Today', 'Week', 'Month', 'Year']}
          selected={selectedTab}
          onSelect={setSelectedTab}
        />
        <SwitchTabs
          leftText="Expense"
          rightText="Income"
          selected={switchTab}
          onSelect={setSwitchTab}
        />
        <SwitchTabs
          leftText="Expense"
          rightText="Income"
          selected={switchTab}
          onSelect={setSwitchTab}
          style={{marginTop: 10}}
        />
        <CustomButton
          text="View"
          size="small"
          onPress={() => {}}
          type="outline"
        />
        <PillButton text="See All" onPress={() => {}} />
        <BudgetCard
          category="Medical"
          spent={800}
          limit={1000}
          warning={800 < 1000}
        />
        <CategoryBar category="Utilities" amount={600} />
        <TransactionCard
          title="Shopping"
          subtitle="Buy an Avocado..."
          amount={-229000}
          time="03:30 PM"
        />
        <TransactionCard
          title="Salary"
          subtitle="Buy an Avocado..."
          amount={3129000}
          time="04:30 PM"
        />
        <InputField placeholder="Password" secureToggle showEyeIcon />
        <AttachmentButton onPress={() => console.log('Attach')} />
        <RecurringBottomSheet />
        <ToggleItem
          type="checkbox"
          value={checkbox}
          onValueChange={setCheckbox}
        />
        <ToggleItem type="radio" value={radio} onValueChange={setRadio} />
        <ToggleItem
          type="switch"
          value={isSwitchOn}
          onValueChange={setIsSwitchOn}
        />
        <CategoryBar category="Utilities" amount={600} />
        <TransactionCard
          title="Shopping"
          subtitle="Buy an Avocado..."
          amount={-229000}
          time="03:30 PM"
        />
        <TransactionCard
          title="Salary"
          subtitle="Buy an Avocado..."
          amount={3129000}
          time="04:30 PM"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
