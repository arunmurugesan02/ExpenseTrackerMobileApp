import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AddTransactionScreen from './src/screens/AddTransactionScreen';

const App = () => (
  <SafeAreaProvider>
    <AddTransactionScreen type="Expense" />
    {/* <HomeScreen /> */}
    {/* <Notification /> */}
  </SafeAreaProvider>
);

export default App;
