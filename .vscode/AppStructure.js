import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenTimeTracker from './screens/ScreenTimeTracker';
import FitnessTracker from './screens/FitnessTracker';
import Settings from './screens/Settings';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Screen Time" component={ScreenTimeTracker} />
        <Tab.Screen name="Fitness" component={FitnessTracker} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
