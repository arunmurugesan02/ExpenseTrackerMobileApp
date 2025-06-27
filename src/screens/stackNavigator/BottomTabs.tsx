import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AttachmentButton from '../../components/AttachmentButton';
import {BudgetCard} from '../../components/BudgetCard';
import {CategoryBar} from '../../components/CategoryBar';
import CustomButton, {PillButton} from '../../components/CustomButton';
import {FilterTabs, SwitchTabs} from '../../components/CustomTabs';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import RecurringBottomSheet from '../../components/RecurringBottomSheet';
import ToggleItem from '../../components/ToggleItem';
import {TransactionCard} from '../../components/TransactionCard';
import Colors from '../../constants/colors';
import {n} from '../../constants/normalize';

const {width: screenWidth} = Dimensions.get('window');

// Dummy Screens
const Home = () => {
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

const Transaction = () => <CenteredText text="Transaction Screen" />;
const Budget = () => <CenteredText text="Budget Screen" />;
const Profile = () => <CenteredText text="Profile Screen" />;
const AddPlaceholder = () => null;

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const [showFAB, setShowFAB] = useState(false);

  const toggleFAB = () => setShowFAB(prev => !prev);

  const handleAction = (label: string) => {
    Alert.alert(`${label} pressed`);
    setShowFAB(false);
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="home"
                size={24}
                color={focused ? Colors.violet100 : Colors.dark25}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabLabel,
                  {color: focused ? Colors.violet100 : Colors.dark25},
                ]}>
                Home
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={Transaction}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="trending-up"
                size={24}
                color={focused ? Colors.violet100 : Colors.dark25}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabLabel,
                  {color: focused ? Colors.violet100 : Colors.dark25},
                ]}>
                Transaction
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddPlaceholder}
          options={{
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen
          name="Budget"
          component={Budget}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="pie-chart"
                size={24}
                color={focused ? Colors.violet100 : Colors.dark25}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabLabel,
                  {color: focused ? Colors.violet100 : Colors.dark25},
                ]}>
                Budget
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <Icon
                name="user"
                size={24}
                color={focused ? Colors.violet100 : Colors.dark25}
              />
            ),
            tabBarLabel: ({focused}) => (
              <Text
                style={[
                  styles.tabLabel,
                  {color: focused ? Colors.violet100 : Colors.dark25},
                ]}>
                Profile
              </Text>
            ),
          }}
        />
      </Tab.Navigator>

      {/* Enhanced Floating Action Button */}
      <TouchableOpacity
        style={styles.mainFAB}
        onPress={toggleFAB}
        activeOpacity={0.8}>
        <Icon name={showFAB ? 'x' : 'plus'} size={28} color="#fff" />
      </TouchableOpacity>

      {/* Action FABs */}
      {showFAB && (
        <>
          <ActionFAB
            icon="arrow-down"
            color="#00A86B"
            position={{bottom: 140, left: screenWidth * 0.25}}
            onPress={() => handleAction('Income')}
          />
          <ActionFAB
            icon="repeat"
            color="#0066FF"
            position={{bottom: 190, left: screenWidth * 0.5 - 25}}
            onPress={() => handleAction('Transfer')}
          />
          <ActionFAB
            icon="arrow-up"
            color="#FD3C4A"
            position={{bottom: 140, right: screenWidth * 0.25}}
            onPress={() => handleAction('Expense')}
          />
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setShowFAB(false)}
            activeOpacity={1}
          />
        </>
      )}
    </View>
  );
}

const ActionFAB = ({
  icon,
  color,
  position,
  onPress,
}: {
  icon: string;
  color: string;
  position: object;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.subFAB, {backgroundColor: color}, position]}
    onPress={onPress}
    activeOpacity={0.8}>
    <Icon name={icon} size={18} color="#fff" />
  </TouchableOpacity>
);

const CenteredText = ({text}: {text: string}) => (
  <View style={styles.screen}>
    <Text>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: n(85),
  },
  tabItemsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: n(20),
    paddingHorizontal: 20,
  },
  leftTabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  centerSpace: {
    width: n(80),
  },
  rightTabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: n(50),
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  mainFAB: {
    position: 'absolute',
    bottom: n(52), // Enhanced position to sit better in the curve
    left: screenWidth / 2 - 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.violet100,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  subFAB: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: n(50),
    height: n(50),
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    zIndex: 999,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 998,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
