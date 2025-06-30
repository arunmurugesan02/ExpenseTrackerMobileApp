import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from '../screens/stackNavigator/BottomTabs';

const Navigator = () => {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
};

export default Navigator;
