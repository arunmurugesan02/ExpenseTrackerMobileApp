import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from '../screens/stackNavigator/BottomTabs';

export default function Navigator() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
