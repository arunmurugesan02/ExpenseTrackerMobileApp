import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../constants/colors';
import {n, SCREEN_WIDTH} from '../../constants/normalize';
import BudgetScreen from '../BudgetScreen';
import Home from '../Home';
import ProfileScreen from '../ProfileScreen';
import TransactionScreen from '../TransactionScreen';
import { useNavigation } from '@react-navigation/native';

const AddPlaceholder = () => null;

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const [showFAB, setShowFAB] = useState(false);
   const navigation = useNavigation()
  const toggleFAB = () => setShowFAB(prev => !prev);

  const handleAction = (label: string) => {
    // Alert.alert(`${label} pressed`);
    // navigation.navigate("")
    setShowFAB(false);
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            paddingBottom: Platform.OS === 'android' ? 5 : 0,
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
          },
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

      {/* Overlay - placed before FABs to ensure proper stacking */}
      {showFAB && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setShowFAB(false)}
          activeOpacity={1}
        />
      )}

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
        </>
      )}

      {/* Main Floating Action Button - placed last for highest z-index */}
      <TouchableOpacity
        style={[
          styles.mainFAB,
          {
            bottom: Platform.OS === 'ios' ? n(50) : n(40),
            left: SCREEN_WIDTH / 2 - 30,
          },
        ]}
        onPress={toggleFAB}
        activeOpacity={0.8}>
        <Icon name={showFAB ? 'x' : 'plus'} size={28} color="#fff" />
      </TouchableOpacity>
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
    marginTop: n(4),
    fontWeight: '500',
  },
  mainFAB: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.violet100,
    width: n(60),
    height: n(60),
    borderRadius: 30,
    borderWidth: 4,
    borderColor: '#fff',
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1001,
  },
  subFAB: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: n(50),
    height: n(50),
    borderRadius: 25,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 999,
  },
});
