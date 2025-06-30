import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';
import {n, SCREEN_WIDTH} from '../../constants/normalize';
import BudgetScreen from '../BudgetScreen';
import HomeScreen from '../HomeScreen';
import ProfileScreen from '../ProfileScreen';
import TransactionScreen from '../TransactionScreen';

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
          component={HomeScreen}
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
          component={TransactionScreen}
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
          component={BudgetScreen}
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
          component={ProfileScreen}
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
            position={{bottom: n(140), left: SCREEN_WIDTH * 0.25}}
            onPress={() => handleAction('Income')}
          />
          <ActionFAB
            icon="repeat"
            color="#0066FF"
            position={{bottom: n(190), left: SCREEN_WIDTH * 0.5 - 25}}
            onPress={() => handleAction('Transfer')}
          />
          <ActionFAB
            icon="arrow-up"
            color="#FD3C4A"
            position={{bottom: n(140), right: SCREEN_WIDTH * 0.25}}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  mainFAB: {
    position: 'absolute',
    bottom: n(50),
    left: SCREEN_WIDTH / 2 - 30,
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
});
